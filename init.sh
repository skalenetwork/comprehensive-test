#!/bin/bash

# echo " --------------------------- installing ganache cli --------------------------------------------------------------------------------------------------- "
# #sudo yarn global add ganache-cli@6.9.1
# sudo yarn global add ganache-cli

echo " --------------------------- installing truffle ------------------------------------------------------------------------------------------------------- "
sudo yarn global add truffle@5.0.12

echo " --------------------------- starting main net -------------------------------------------------------------------------------------------------------- "
# cd cli-ganache
# ./run.sh &> ../local_mainnet_output_log.txt &
# cd ..
cd cli-hh
./clean.sh
./run.sh &> ../local_mainnet_output_log.txt &
cd ..

#echo " --------------------------- pre-initializing s-chain ------------------------------------------------------------------------------------------------- "
#cd s_chain_gen; ./clean.sh; ./clean_all_node_dirs.sh; ./init.sh; cd ..

echo " --------------------------- getting skale manager deployed ------------------------------------------------------------------------------------------- "
git clone https://github.com/skalenetwork/skale-manager.git --recursive
export PRIVATE_KEY_1="0x0"
export PRIVATE_KEY_2="0x1"
export PRIVATE_KEY_3="0x2"
export PRIVATE_KEY_4="0x3"
export PRIVATE_KEY_5="0x4"
export PRIVATE_KEY_6="0x5"
export INSECURE_PRIVATE_KEY_1="0x0"
export INSECURE_PRIVATE_KEY_2="0x1"
export INSECURE_PRIVATE_KEY_3="0x2"
export INSECURE_PRIVATE_KEY_4="0x3"
export INSECURE_PRIVATE_KEY_5="0x4"
export INSECURE_PRIVATE_KEY_6="0x5"
cd skale-manager && git checkout 1.12.0-stable.0 && yarn install && cd ..
truffle migrate --network test
cd engine && ./init.sh && cd ..

# echo " --------------------------- getting transaction manager ---------------------------------------------------------------------------------------------- "
# git clone https://github.com/skalenetwork/transaction-manager.git --recursive
# cd transaction-manager
# TM_OUTPUT_LOG=tm-output-log.txt
# #
# # TO-DO: create content of ~/.skale folder and .env-docker file here
# #
# mkdir -p ~/.skale
# mkdir -p ~/.skale/contracts_info
# mkdir -p ~/.skale/node_data
# mkdir -p ~/.skale/node_data/log
# sudo rm -rf ~/.skale/node_data/log/* || true
# mkdir -p ~/.skale/node_data/sgx_certs
# sudo rm -rf ~/.skale/node_data/sgx_certs/* || true
# #
# # TO-DO: put manager.json file into ~/.skale/contracts_info, it's Skale Manager ABI from skale-manager/data/test.json as is
# #
# #
# # TO-DO: example of .env-docker file
# #
# # SGX_SERVER_URL=https://192.168.88.217:1026
# # SGX_CERTIFICATES_DIR_NAME=sgx_certs
# # ENDPOINT=http://192.168.88.217:8545
# # FLASK_APP_HOST=192.168.88.217
# # FLASK_APP_PORT=3008
# # FLASK_DEBUG_MODE=False
# # FLASK_SECRET_KEY=blablabla
# # SKALE_DIR_HOST=/home/$USER/Work/.skale
# # BLOCKS_TO_WAIT=0
# #
# # TO-DO: example of ~/.skale/node_data/node_config.json
# #
# # {
# #     "sgx_key_name": "NEK:002",
# #     "name": "long-hercules",
# #     "node_id": 24,
# #     "node_ip": "127.0.0.1"
# # }
# #
# #
# ## docker build -t test-tm .
# ## docker run --env-file .env-docker --network=host -v ~/.skale:/skale_vol -v ~/.skale/node_data:/skale_node_data test-tm > $TM_OUTPUT_LOG &
# docker pull skalenetwork/transaction-manager:1.0.0-develop.5
# docker run --env-file .env-docker --network=host -v ~/.skale:/skale_vol -v ~/.skale/node_data:/skale_node_data skalenetwork/transaction-manager:1.0.0-develop.5 > $TM_OUTPUT_LOG &
# cd ..

echo " --------------------------- getting ima -------------------------------------------------------------------------------------------------------------- "
git clone git@github.com:skalenetwork/ima-agent.git --recursive
cd IMA
#git checkout develop
git checkout ticket-1577/move-IMA-Agent-into-standing-alone-repository
git submodule update --init --recursive
git fetch
git pull
git branch
git status
cd ..

# echo " --------------------------- getting skaled and bls toolset built ----------------------------------------------------------------------------------- "
# git clone https://github.com/skalenetwork/skaled.git --recursive
# cd skaled/SkaleDeps && ./build.sh DEBUG=1 PARALLEL_COUNT=$(nproc) && cd ../..
# cd skaled && mkdir -p build && cd build
# cmake -DCMAKE_BUILD_TYPE=Debug -DSKALED_HATE_WARNINGS=ON .. && make -j $(nproc)
# cd ..

echo " --------------------------- initializing test tokens ------------------------------------------------------------------------------------------------- "
cd test_tokens && ./init.sh && cd ..

echo " --------------------------- getting docker with compose ---------------------------------------------------------------------------------------------- "
sudo apt-get install docker.io docker-compose

echo " --------------------------- configuring and restarting docker ---------------------------------------------------------------------------------------- "
sudo systemctl unmask docker
sudo groupadd docker || true
#sudo gpasswd -a username docker || true
sudo gpasswd -a $USER docker || true
sudo service docker restart || true

echo " --------------------------- getting sgx wallet ------------------------------------------------------------------------------------------------------- "
git clone https://github.com/skalenetwork/sgxwallet.git --recursive

cd sgxwallet/run_sgx_sim
rm -rf ../../local_sgxwallet_output_log.txt &> /dev/null
echo " --------------------------- stopping sgx wallet ------------------------------------------------------------------------------------------------------ "
docker-compose down
echo " --------------------------- pulling sgx wallet ------------------------------------------------------------------------------------------------------- "
docker-compose pull
echo " --------------------------- starting sgx wallet ------------------------------------------------------------------------------------------------------ "
docker-compose up &> ../../local_sgxwallet_output_log.txt &
cd ../..

# echo " --------------------------- will kill node processes, stop main net --------------------------------------------------------------------------------- "
# killall -9 node || true
