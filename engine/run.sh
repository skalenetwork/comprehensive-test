#!/bin/bash

echo "getting console sudo-friendly earlier..."
sudo ls -1 &> /dev/null
echo "thanks!"

echo " --------------------------- setting ulimit to 65535 -------------------------------------------------------------------------------------------------- "
ulimit -n 65535 > /dev/null
echo "ulimit is now set to" $(ulimit -n)

#cd create_pems; touch index.txt; ./create_pems.sh; cd ..

#killall -9 skaled node > /dev/null

echo " --------------------------- cleaning redundant files ------------------------------------------------------------------------------------------------- "
rm -f ./mainnet.log        || true &> /dev/null
rm -f ./skaled_??_??.log   || true &> /dev/null
rm -f ./imaAgent_??_??.log || true &> /dev/null
rm -f ./ima.state.json     || true &> /dev/null
IMA_CONTRACTS_DIR="${IMA_AGENT_ROOT_DIR:+$IMA_AGENT_ROOT_DIR/IMA}"
IMA_CONTRACTS_DIR="${IMA_CONTRACTS_DIR:-../IMA}"
if [[ -d "$IMA_CONTRACTS_DIR/proxy/migrations" ]]; then
	IMA_CONTRACTS_DIR="$IMA_CONTRACTS_DIR/proxy"
fi
rm -f "$IMA_CONTRACTS_DIR"/.openzeppelin/unknown-*.json || true &> /dev/null
rm -rf "$IMA_CONTRACTS_DIR"/artifacts/* || true &> /dev/null

echo " --------------------------- initializing certificates ------------------------------------------------------------------------------------------------ "
cd ./create_pems && ./create_pems.sh && cd ..

echo " --------------------------- running main engine steps ------------------------------------------------------------------------------------------------ "
export SEPARATED_IMA_AGENT_MODE=1
node ./index.js

# echo " --------------------------- zombie clean shots ------------------------------------------------------------------------------------------------------- "
# echo "Pre-test: searching zombies..."
# ps -Al | grep node
# ps -Al | grep skaled
# echo "...Done"
# echo "Killing zombies, if any..."
# killall -9 skaled node
# echo "...Done"
# echo "Post-test: searching zombies..."
# ps -Al | grep node
# ps -Al | grep skaled
# echo "...Done"

echo " --------------------------- Finished, engine part ---------------------------------------------------------------------------------------------------- "
echo "Finished"

