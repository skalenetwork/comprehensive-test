#!/bin/bash

cd IMA/proxy; npx hardhat clean; cd ../..
rm -rf ./IMA/proxy/artifacts
rm -rf ./IMA/proxy/.openzeppelin/unknown*.json
rm -rr ./IMA/proxy/data/*.json
rm -rf ./IMA/proxy/cache
rm -rf ./IMA/proxy/predeployed/dist
rm -rf ./IMA/proxy/predeployed/venv
rm -rf ./IMA/proxy/predeployed/version.txt
rm -rf ./IMA/proxy/predeployed/dist
rm -rf ./IMA/proxy/predeployed/src/ima_predeployed/artifacts/*
touch  ./IMA/proxy/predeployed/src/ima_predeployed/artifacts/.gitkeep
rm -rf ./IMA/proxy/predeployed/src/*info
rm -rf ./IMA/proxy/predeployed/test/additional.json
rm -rf ./IMA/proxy/typechain
rm -rf ./IMA/test-tokens/artifcats
rm -rf ./IMA/test-tokens/cache

