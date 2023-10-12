#!/bin/bash

export IMA_CONTRACTS_REPO_ROOT_DIR=./ima-agent/IMA
export RESTORE_CURRENT_DIR=$(pwd)

cd $IMA_CONTRACTS_REPO_ROOT_DIR/proxy; npx hardhat clean; cd $RESTORE_CURRENT_DIR
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/artifacts
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/.openzeppelin/unknown*.json
rm -rr $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/data/*.json
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/cache
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/predeployed/dist
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/predeployed/venv
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/predeployed/version.txt
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/predeployed/dist
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/predeployed/src/ima_predeployed/artifacts/*
touch  $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/predeployed/src/ima_predeployed/artifacts/.gitkeep
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/predeployed/src/*info
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/predeployed/test/additional.json
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/proxy/typechain
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/test-tokens/artifcats
rm -rf $IMA_CONTRACTS_REPO_ROOT_DIR/test-tokens/cache

