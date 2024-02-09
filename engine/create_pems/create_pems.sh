#!/bin/bash

JQ_COLOR_OPT="--color-output"
if [ "${NO_ANSI_COLORS}" == "1" ]; then
	JQ_COLOR_OPT=""
fi

echo " --------------------------- cleaning up redundant files ---------------------------------------------------------------------------------------------- "
rm -f a.csr             || true &> /dev/null
rm -f a.csr.signgleline || true &> /dev/null

echo " --------------------------- getting jq installed ----------------------------------------------------------------------------------------------------- "
if which jq >/dev/null; then
    echo "Found jq utility as $(which jq)"
else
    echo "jq utility does not exist, will install it..."
    #wget -O jq https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64; chmod +x ./jq
    sudo apt-get install jq || true
fi
jq --version

echo " --------------------------- Initial directory content ------------------------------------------------------------------------------------------------ "
echo "Initial directory content is:"
ls -1

echo " --------------------------- computing SGX Wallet URLs ------------------------------------------------------------------------------------------------ "
if [ -z "$URL_SGX_WALLET_HTTP" ]
then
    export URL_SGX_WALLET_HTTP="http://127.0.0.1:1027"
    echo "URL_SGX_WALLET_HTTP is empty, defaulting to $URL_SGX_WALLET_HTTP"
else
    echo "URL_SGX_WALLET_HTTP=$URL_SGX_WALLET_HTTP (value came from env)"
fi

if [ -z "$URL_SGX_WALLET_HTTPS" ]
then
    export URL_SGX_WALLET_HTTPS="https://127.0.0.1:1026"
    echo "URL_SGX_WALLET_HTTPS is empty, defaulting to $URL_SGX_WALLET_HTTPS"
else
    echo "URL_SGX_WALLET_HTTPS=$URL_SGX_WALLET_HTTPS (value came from env)"
fi

echo " --------------------------- computing unique certificate name ---------------------------------------------------------------------------------------- "
if [ -z "$CERT_NAME_UNIQUE" ]
then
    # if [[ -f "/dev/urandom" ]]
    # then
    #     echo "OK, no problems with /dev/urandom so far"
    # else
    #     echo "CRITICAL ERROR: cannot access /dev/urandom"
    # fi
    echo "CERT_NAME_UNIQUE is empty, generating..."
    # export CERT_NAME_UNIQUE=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w ${1:-32} | head -n 1)
    export CERT_NAME_UNIQUE=$(date +%s | sha256sum | base64 | head -c 32 ; echo)
    echo "CERT_NAME_UNIQUE was empty, so using generated random value $CERT_NAME_UNIQUE"
else
    echo "CERT_NAME_UNIQUE=$CERT_NAME_UNIQUE (value came from env)"
fi
echo "CERT_NAME_UNIQUE=$CERT_NAME_UNIQUE"

echo " --------------------------- preparing required files ------------------------------------------------------------------------------------------------- "
mkdir -p ./new_certs || true
touch ./index.txt || true
touch ./index.txt.attr || true
if [ ! -f ./serial ]; then
    echo "'serail' file will be created"
    echo "01" > ./serial
fi

echo " --------------------------- generating certificate --------------------------------------------------------------------------------------------------- "

echo " "
echo " ---"
echo " --- random gen int .rnd"
echo " ---"
openssl rand -out ./.rnd 8192

echo " "
echo " ---"
echo " --- create"
echo " ---"
export CSR_FILE=a.csr
export CSR_FILE_single_line=a.csr.signgleline
export KEY_FILE=k.key
export KEY_PEM_FILE=k.pem
echo "CERT_NAME_UNIQUE=$CERT_NAME_UNIQUE"
echo $CERT_NAME_UNIQUE > generated_cert_name.txt
openssl req -new -sha256 -nodes -out $CSR_FILE -newkey rsa:2048 -keyout $KEY_FILE -subj /CN=$CERT_NAME_UNIQUE

echo " "
echo " ---"
echo " --- $CSR_FILE"
echo " ---"
cat $CSR_FILE

echo " "
echo " ---"
echo " --- $KEY_FILE"
echo " ---"
cat $KEY_FILE

echo " "
echo " ---"
echo " --- $KEY_PEM_FILE"
echo " ---"
#openssl rsa -in $KEY_FILE -text > $KEY_PEM_FILE
openssl rsa -in $KEY_FILE -out $KEY_PEM_FILE
cat $KEY_PEM_FILE

echo " "
echo " ---"
echo " --- single line csr"
echo " ---"
# send content of a.csr as single line (by replacing real end of lines with \n) to port 1031
rm -f $CSR_FILE_single_line || true &> /dev/null
cp $CSR_FILE $CSR_FILE_single_line
#a_csr_value=$(sed -E ':a;N;$!ba;s/\r{0,1}\n/\\\\n/g' $CSR_FILE)
a_csr_value=$(sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g' $CSR_FILE)
#a_csr_value=$a_csr_value\\n
echo $a_csr_value

echo " "
echo " ---"
echo " --- curl sign"
echo " ---"
rm -f ./sign_result.json || true &> /dev/null
sign_request_json='{ "jsonrpc": "2.0", "id": 2, "method": "signCertificate", "params": { "certificate": "'$a_csr_value'" } }'
echo "WILL send: $sign_request_json"
curl --connect-timeout 30 --max-time 60 -X POST --data \
    "$sign_request_json" \
    -v \
    -H 'content-type:application/json;' \
    $URL_SGX_WALLET_HTTP > ./sign_result.json
printf "\nRaw sign_result.json is: ------------------------------------------------------------------- \n"
cat ./sign_result.json
printf "\nColorized sign_result.json is: ------------------------------------------------------------- \n"
cat ./sign_result.json | jq . $JQ_COLOR_OPT
printf "\n"
sign_hash=$(cat ./sign_result.json | jq -r ".result.hash")
echo "sign_hash =" $sign_hash

echo " "
echo " ---"
echo " --- get certificate"
echo " ---"
rm -f ./get_certificate_result.json || true &> /dev/null
get_certificate_json='{ "jsonrpc": "2.0", "id": 2, "method": "getCertificate", "params": { "hash": "'$sign_hash'" } }'
curl --connect-timeout 30 --max-time 60 -X POST --data \
    "$get_certificate_json" \
    -v \
    -H 'content-type:application/json;' \
    $URL_SGX_WALLET_HTTP > ./get_certificate_result.json
printf "\Raw get_certificate_result.json is: --------------------------------------------------------- \n"
cat ./get_certificate_result.json
printf "\Colorized get_certificate_result.json is: --------------------------------------------------- \n"
cat ./get_certificate_result.json | jq . $JQ_COLOR_OPT
printf "\n"
certificate=$(cat ./get_certificate_result.json | jq -r ".result.cert")
#echo " --- got certificate"
#echo $certificate
echo $certificate \
    | sed 's/^.*\(-----BEGIN CERTIFICATE-----.*\)/\1/g' \
    | sed 's/-----BEGIN CERTIFICATE-----/-----BEGIN-CERTIFICATE-----/g' \
    | sed 's/-----END CERTIFICATE-----/-----END-CERTIFICATE-----/g' \
    | tr " " "\n" \
    | sed 's/-----BEGIN-CERTIFICATE-----/-----BEGIN CERTIFICATE-----/g' \
    | sed 's/-----END-CERTIFICATE-----/-----END CERTIFICATE-----/g' \
    > ./client.crt

# # generate client certificate signed by root ones:
# echo " "
# echo " ---"
# echo " --- create client cert"
# echo " ---"
# #cd cert 
# #./create_client_cert
# #sign csr
# yes | openssl ca -config ca.config -in $CSR_FILE -out "client.crt"

echo " "
echo " ---"
echo " --- client.crt"
echo " ---"
cat client.crt

echo " "
echo " ---"
echo " --- client.pem"
echo " ---"
openssl x509 -inform PEM -in client.crt > client.pem
cat client.pem


# echo " "
# echo " ---"
# echo " --- test"
# echo " ---"
# curl \
#     --connect-timeout 30 --max-time 60 -X POST --data \
#     '{ "jsonrpc": "2.0", "id": 1, "method": "importBLSKeyShare", "params": { "keyShareName": "nBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3C4ceRhzMAZnG87PwlkzMROHsm3B", "n": 2, "t": 2, "index" : 1, "keyShare": "21043165427057050523208250969869713544622230829814517880078280390613973680760" } }' \
#     -H 'content-type:application/json;' \
#     -v \
#     --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem \
#     $URL_SGX_WALLET_HTTPS -k
# echo " "
# echo " "

# echo " "
# echo " ---"
# echo " --- copyping key and crt for skaled"
# echo " ---"

# sudo mkdir -p /skale_node_data/sgx_certs
# sudo rm -f /skale_node_data/sgx_certs/sgx.* || true
# sudo cp ./client.crt /skale_node_data/sgx_certs/sgx.crt
# sudo cp ./k.key /skale_node_data/sgx_certs/sgx.key
# echo "User is: $$USER"
# sudo chown -R $USER /skale_node_data/sgx_certs/
# echo " "
# echo " "

echo " "
echo " ---"
echo " --- registering couple of ECDSA keys for skaled"
echo " ---"

# curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:002", "key": "23ABDBD3C61B5330AF61EBE8BEF582F4E5CC08E554053A718BDCE7813B9DC1FC" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
# curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:003", "key": "80ebc2e00b8f13c5e2622b5694ab63ee80f7c5399554d2a12feeb0212eb8c69e" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k

curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1000", "key": "fd6d151c4afe5c1c856e5a234950252be7a90210f3aa2bad4e0db037355c1dd6" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1001", "key": "545ad381cfef8204ee0534119a56c0af32255078103034c6a6a4361fa7e7e4b2" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1002", "key": "3bf05e0649b6b93063674e17f4c2943e896658116ecda4b745df95e12477f934" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1003", "key": "5a1e6879d082a4e2d3bd170be9959ebf20fbfd235e0f1faf1667d9031996698e" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1004", "key": "f1c755d0eec645d27811ef2b003fc12bbbb9478c021594e5c60277b5a3b7135e" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1005", "key": "3e405b9c38b5cb2b4feda219373071d290ebbd9d18c270cd69c86fed90c29fa2" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1006", "key": "22cb728e0cbde81026cea9d43b701280af3f6fd49ab410f0967d436bc6c47101" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1007", "key": "2c0caa3eeff5e27e8fe0440c2b9e356a30ea6f135105888f5905f75624f04203" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1008", "key": "a7dc8a0608f4c85e1f934d73e1f642d4fd84b069c34a76479629edfe20a6d1e8" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1009", "key": "4d54e4e966f602b52146677c4a0897fd2a37283998c1b67e0c1e9fab12abe25b" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1010", "key": "6649acecdb1e6c928ef4ab9cb566885d96c9f682f25e14931e54f163177640ea" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1011", "key": "4b0e2c64cfa25e67cf6045d40f26d3ab71c80786f9dfc9cdb9dd08eaa5c32cac" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1012", "key": "a5950f775df23536174025ac1830a8a046bb6df51f392dd7ba72326a9910867c" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1013", "key": "19d198fd6b8fceaeba8b0770f854a0c95a2695e083d91ba37b6339136b1f9e1f" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1014", "key": "7bf8d85ff16e5977e4cd72820944d9bfa137205c8388a1bbb6f2acdab11469d7" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1015", "key": "99e4326a50d4ea26c92b1f4d995096dc61c16fb07d532fab428bf743e82e4846" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k
curl --connect-timeout 30 --max-time 60 -X POST --data '{ "jsonrpc": "2.0", "id": 1, "method": "importECDSAKey", "params": { "keyName": "NEK:1016", "key": "9168f1182da01de73232fe954a8ca63c9ebc0736fdbd4382a394100cad160b38" } }' -v --cacert ./rootCA.pem --key $KEY_PEM_FILE --cert ./client.pem $URL_SGX_WALLET_HTTPS -k

echo " "
echo " "

echo " --------------------------- done --------------------------------------------------------------------------------------------------------------------- "


