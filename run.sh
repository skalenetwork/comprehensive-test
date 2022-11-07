#!/bin/bash

echo "getting console sudo-friendly earlier..."
sudo ls -1 &> /dev/null
echo "thanks!"

cd cli-ganache; ./clean.sh && cd ..

export SKALED_WITH_BTRFS=1
# export SKALED_WITH_SNAPSHOTS=1

cd s_chain_gen; ./clean.sh; ./init.sh; cd ..
cd engine && ./run.sh && cd ..
