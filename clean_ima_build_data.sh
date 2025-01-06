#!/bin/bash

export IMA_CONTRACTS_REPO_ROOT_DIR=./ima-agent/IMA
export RESTORE_CURRENT_DIR=$(pwd)

cd $IMA_CONTRACTS_REPO_ROOT_DIR; npx hardhat clean; cd $RESTORE_CURRENT_DIR
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/artifacts
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/.openzeppelin/unknown*.json
rm -rr $IMA_CONTRACTS_REPO_ROOT_DIR/data/*.json
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/cache
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/predeployed/dist
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/predeployed/venv
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/predeployed/version.txt
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/predeployed/dist
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/predeployed/src/ima_predeployed/artifacts/*
touch  $IMA_CONTRACTS_REPO_ROOT_DIR/predeployed/src/ima_predeployed/artifacts/.gitkeep
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/predeployed/src/*info
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/predeployed/test/additional.json
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/typechain
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/test-tokens/artifcats
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/test-tokens/cache

