#!/bin/bash

# VERY IMPORTANT:
# VERY IMPORTANT:
# VERY IMPORTANT: this script must run in IMA/proxy folder as current directory
# VERY IMPORTANT:
# VERY IMPORTANT:

yarn install

# cd ./predeployed/test
# pip install -r requirements.txt
# cd ../..

cd ./predeployed
rm -rf ./venv
python3 -m venv venv
source venv/bin/activate
pip install -r test/requirements.txt
cd ..

cd ./predeployed/scripts
export VERSION=2
python3 -m pip install --upgrade build
./build_package.sh 
cd ..
# rm -rf ./venv
# python3 -m venv venv
# source venv/bin/activate

# pip install -U ima_predeployed==1.0.0a208
rm -rf dist
pip install --upgrade build
./scripts/build_package.sh
pip install dist/ima_predeployed-*.whl

cd test

echo " "

export SKALED_NODE_FOLDER="node_00"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_01"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_02"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_03"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_04"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_05"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_06"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_07"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_08"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_09"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_10"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_11"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_12"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_13"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_14"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

export SKALED_NODE_FOLDER="node_15"
export PATH_RESULT="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.json"
if test -f "$PATH_RESULT"; then
    echo "Generating $PATH_RESULT..."
    export PATH_GENESIS="$PATH_S_CHAIN_GEN/$SKALED_NODE_FOLDER/config.original.json"
    echo "    PATH_GENESIS    = $PATH_GENESIS"
    echo "    PATH_ADDITIONAL = $PATH_ADDITIONAL"
    echo "    PATH_RESULT     = $PATH_RESULT"
    cp $PATH_RESULT $PATH_GENESIS
    python3 ./generate_genesis.py $PATH_GENESIS $PATH_ADDITIONAL accounts > $PATH_RESULT
    echo " "
fi

# exit to parent "scripts" folder
cd ..

if [ -z "$GENERATE_ABI" ]; then
    echo "Skipped generating predeployed ABI."
else
    echo "Generating predeployed ABI..."
    export PATH_IMA_ABI_SAVED_COPY="$PATH_IMA_ABI.saved_copy"
    echo "PATH_IMA_ABI            = $PATH_IMA_ABI"
    echo "PATH_IMA_ABI_SAVED_COPY = $PATH_IMA_ABI_SAVED_COPY"
    python3 scripts/generate_abi.py > $PATH_IMA_ABI
    cp $PATH_IMA_ABI $PATH_IMA_ABI_SAVED_COPY
fi
echo " "
