# IMA functional test

The **IMA functional test** that is also known as **All SKALE** test covering functionality of many of SKALE's network features.

## SGX Wallet

- Certificate registration
- SGX Wallet container initialization in simulation mode
- BLS and ECDSA key initialization with correct key naming
- BLS and ECDSA signing
- ECDSA key import

# DKG

- Initialze S-Chain types
- DKG poly initialziation
- Secret key contribution
- DKG broadcast mechanism
- Fining expected DKG broadcast events
- Secret verification
- BLS partial key creation
- DKG allright mechanism

## Transaction Manager

Transaction Manager and Redis containers initialization

## Skale Manager

- Deployment
- MSR configuration
- Validator creation and initialization initialization including role management and initial account re-filling
- S-Chain creation with wallet re-charging

# IMA

- Deployment to Main Net
- Optionally, deployment to S-Chain
- Built in run-time byte code generation
- IMA registration for S-Chain
- Running IMA agent loop with time frames
- Gas reimbursement configuration
- Gas reimbursement wallet re-chaging
- ERC token white-listing and optional automatic deployment
- S-Chain configuration download
- SKALE network browsing via Skale Manager calls

## S-Chain creation

- S-Chain config.json file generation
- Registering two S-Chains as connected to each other
- Per S-Chain BTRFs initialization for periodic snapshots

## Test tokens

- Test tokens deployment
- Dynamic token instantiation on S-Chain
- Custom chain-to-chain smart contracts

## Transfer directions

- M2S
- S2M
- S2S, source to target
- S2S, target to source

## Transfer assets

- ETH
- ERC20
- ERC721
- ERC1155
- ERC1155 batch mode
- custom data, test chat smart contracts sending text messages between chains

## IMA token modes

- Statically deployed and linked ERC tokens, both source and target chains use manually deployed tokens
- Dynamically instantiated tokens, target S-Chain automatically deploys a clone of token from source chain

## TX signing modes

- Using calls to Transaction Manager, for Main Net only
- Using direct calls to SGX Wallet
- Using explicit insecure private key

