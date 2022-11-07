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
rm -f ../IMA/proxy/.openzeppelin/unknown-*.json || true &> /dev/null
rm -rf ../IMA/proxy/artifacts/* || true &> /dev/null

echo " --------------------------- initializing certificates ------------------------------------------------------------------------------------------------ "
cd ./create_pems && ./create_pems.sh && cd ..

echo " --------------------------- running main engine steps ------------------------------------------------------------------------------------------------ "
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

