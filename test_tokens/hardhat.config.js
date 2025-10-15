require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const path = require("path");
const os = require("os");

const privateKeyMN = process.env.PRIVATE_KEY_FOR_ETHEREUM || "23ABDBD3C61B5330AF61EBE8BEF582F4E5CC08E554053A718BDCE7813B9DC1FC"; // address 0x7aa5E36AA15E93D10F4F26357C30F052DacDde5F
const urlMN = process.env.URL_W3_ETHEREUM || "http://127.0.0.1:8545";
const cidMN = process.env.CID_ETHEREUM ? parseInt(process.env.CID_ETHEREUM) : (456);

const privateKeySC = process.env.PRIVATE_KEY_FOR_SCHAIN || "80ebc2e00b8f13c5e2622b5694ab63ee80f7c5399554d2a12feeb0212eb8c69e"; // address 0x66c5a87f4a49DD75e970055A265E8dd5C3F8f852
const urlSC_00 = process.env.URL_W3_NODE_00 || process.env.URL_W3_SCHAIN || process.env.URL_W3_S_CHAIN || "http://127.0.0.1:15000";
const urlSC_01 = process.env.URL_W3_NODE_01 || "http://127.0.0.1:15100";
const cidSC_00 = process.env.CID_SC_00 ? parseInt(process.env.CID_SC_00) : (1000);
const cidSC_01 = process.env.CID_SC_01 ? parseInt(process.env.CID_SC_01) : (1001);

const g_defaultPrivateKey = "" + privateKeyMN;
const g_defaultURL = "" + urlMN;
const g_defaultGasPrice = getGasPrice(process.env.GASPRICE);

const strAbiJsonNameSuffix = process.env.ABI_JSON_NAME_SUFFIX || "";

const strLogPrefix = " >> TT >>";

function normalizePath(strPath) {
    strPath = strPath.replace(/^~/, os.homedir());
    strPath = path.normalize(strPath);
    strPath = path.resolve(strPath);
    return strPath;
}

function getAccounts() {
    return [
        { privateKey: g_defaultPrivateKey, balance: "1000000000000000000000000000000000" }
    ];
}

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    for (const account of accounts)
        console.log(account.address);

});

function load_abi_from_artifcacts_by_name(strContractName) {
    const strArtifactPath = normalizePath(path.join(__dirname, "artifacts/contracts/" + strContractName + ".sol/" + strContractName + ".json"));
    const joArtifact = JSON.parse(fs.readFileSync(strArtifactPath, "utf-8"));
    return joArtifact.abi;
}

async function deploy_one_test_token(strContractName, arrContractConstructorArguments, joSummaryABI, hre) {
    const networkName = hre.network.name;
    const strAbiJsonNameSuffixEffective = strAbiJsonNameSuffix || ("." + networkName.trim());
    console.log(strLogPrefix, "Will deploy \"" + strContractName + "\" smart contract...");
    deployedContract = await (await ethers.getContractFactory(strContractName)).deploy(...arrContractConstructorArguments);
    console.log(strLogPrefix, "    Deploy transaction is", deployedContract.deployTransaction.hash);
    console.log(
        strLogPrefix, "    Smart contract", "\"" + strContractName + "\"", "token with constructor arguments",
        JSON.stringify(arrContractConstructorArguments), "was deployed, contract address is", deployedContract.address
    );
    const joABI = load_abi_from_artifcacts_by_name(strContractName); // deployedContract.interface;
    const joContractABI = {};
    joContractABI[strContractName + "_address"] = deployedContract.address;
    joContractABI[strContractName + "_abi"] = joABI;
    joSummaryABI[strContractName + "_address"] = deployedContract.address;
    joSummaryABI[strContractName + "_abi"] = joABI;
    // console.log( JSON.stringify( joContractABI ) );
    const strPathAbiJsonFile = normalizePath(path.join(__dirname, "data/TestToken." + strContractName + ".abi" + strAbiJsonNameSuffixEffective + ".json"));
    try {
        fs.writeFileSync(strPathAbiJsonFile, JSON.stringify(joContractABI, null, 4) + "\n\n");
        console.log(strLogPrefix, "    Saved ABI JSON file \"" + strPathAbiJsonFile + "\"");
    } catch (err) {
        console.warn(strLogPrefix, "CRITICAL ERROR: failed to save ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err);
        process.exit(13);
    }
    return deployedContract;
}

task("deploy", "Deploy all test tokens", async (taskArgs, hre) => {
    const networkName = hre.network.name;
    console.log(strLogPrefix, "Hardhat netowork name is \"" + networkName + "\"");
    const strAbiJsonNameSuffixEffective = strAbiJsonNameSuffix || ("." + networkName.trim());

    const strContractNameERC20 = "ERC20";
    const strContractNameERC721 = "ERC721";
    const strContractNameERC721_with_metadata = "ERC721_with_metadata";
    const strContractNameERC1155 = "ERC1155";
    const strContractNameChatParticipant = "ChatParticipant";
    // const strContractNameERC721refMM_MN = "ERC721ReferenceMintAndMetadataMainnet";
    // const strContractNameERC721refMM_SC = "ERC721ReferenceMintAndMetadataSchain";

    const name = process.env.TOKEN_NAME || "SERGE";
    const symbol = process.env.TOKEN_SYMBOL || "SRG";
    const decimals = (process.env.TOKEN_DECIMALS && parseInt(process.env.TOKEN_DECIMALS)) ? parseInt(process.env.TOKEN_DECIMALS) : 18;
    const uri1155 = process.env.URI_1155 || "say something";
    console.log(strLogPrefix, "Token name is \"" + name + "\"");
    console.log(strLogPrefix, "Token symbol is \"" + symbol + "\"");
    console.log(strLogPrefix, "Token decimals is " + decimals);
    console.log(strLogPrefix, "URI for ERC1155 is \"" + uri1155 + "\"");

    console.log(strLogPrefix, "Will deploy smart contracts...");
    const joSummaryABI = {};
    const deployedContractERC20 = await deploy_one_test_token(strContractNameERC20, [name, symbol, decimals], joSummaryABI, hre);
    const deployedContractERC721 = await deploy_one_test_token(strContractNameERC721, [name, symbol], joSummaryABI, hre);
    const deployedContractERC721_with_metadata = await deploy_one_test_token(strContractNameERC721_with_metadata, [name, symbol], joSummaryABI, hre);
    const deployedContractERC1155 = await deploy_one_test_token(strContractNameERC1155, [uri1155], joSummaryABI, hre);
    //const deployedContractChatParticipant =
    await deploy_one_test_token(strContractNameChatParticipant, [], joSummaryABI, hre);
    // console.log( JSON.stringify( joSummaryABI ) );
    strPathAbiJsonFile = normalizePath(path.join(__dirname, "./data/TestTokens.abi" + strAbiJsonNameSuffixEffective + ".json"));
    try {
        fs.writeFileSync(strPathAbiJsonFile, JSON.stringify(joSummaryABI, null, 4) + "\n\n");
        console.log(strLogPrefix, "Saved summary ABI JSON file \"" + strPathAbiJsonFile + "\"");
    } catch (err) {
        console.warn(strLogPrefix, "CRITICAL ERROR: failed to save summary ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err);
        process.exit(13);
    }
    console.log(strLogPrefix, "All smart contract deployments finished.");

    console.log(strLogPrefix, "Will mint test tokens...");
    //
    // mint required tokens initially, if needed
    //
    const isSkipMint = (process.env.IS_SKIP_MINT) ? true : false;
    if (isSkipMint)
        console.log(strLogPrefix, "Did skipped token minting.");
    else {
        const arrMintToAddresses =
            (process.env.ADDRESSES_MINT_TO &&
                typeof process.env.ADDRESSES_MINT_TO == "string" &&
                process.env.ADDRESSES_MINT_TO.length > 0
            )
                ? process.env.ADDRESSES_MINT_TO.split(",")
                : ["0x7aa5E36AA15E93D10F4F26357C30F052DacDde5F"];
        const amountERC20 =
            (process.env.MINT_AMOUNT_20 &&
                typeof process.env.MINT_AMOUNT_20 == "string" &&
                process.env.MINT_AMOUNT_20.length > 0
            )
                ? parseInt(process.env.MINT_AMOUNT_20)
                : 100000000000;
        const amountERC1155 =
            (process.env.MINT_AMOUNT_1155 &&
                typeof process.env.MINT_AMOUNT_1155 == "string" &&
                process.env.MINT_AMOUNT_1155.length > 0
            )
                ? parseInt(process.env.MINT_AMOUNT_1155)
                : 100000000000;
        const nMintCount721 =
            (process.env.MINT_COUNT_721 &&
                typeof process.env.MINT_COUNT_721 == "string" &&
                process.env.MINT_COUNT_721.length > 0
            )
                ? parseInt(process.env.MINT_COUNT_721)
                : 5;
        const nMintCount1155 =
            (process.env.MINT_COUNT_1155 &&
                typeof process.env.MINT_COUNT_1155 == "string" &&
                process.env.MINT_COUNT_1155.length > 0
            )
                ? parseInt(process.env.MINT_COUNT_1155)
                : 5;
        const nFirstTokenId721 =
            (process.env.FIRST_TOKEN_ID_721 &&
                typeof process.env.FIRST_TOKEN_ID_721 == "string" &&
                process.env.FIRST_TOKEN_ID_721.length > 0
            )
                ? parseInt(process.env.FIRST_TOKEN_ID_721)
                : 1;
        const nFirstTokenId1155 =
            (process.env.FIRST_TOKEN_ID_1155 &&
                typeof process.env.FIRST_TOKEN_ID_1155 == "string" &&
                process.env.FIRST_TOKEN_ID_1155.length > 0
            )
                ? parseInt(process.env.FIRST_TOKEN_ID_1155)
                : 1;
        if (amountERC20 > 0) {
            for (const strAddress of arrMintToAddresses) {
                console.log(strLogPrefix, "Minting \"ERC20\" amount", amountERC20, "to", strAddress, "...");
                const result = await (await deployedContractERC20.mint(strAddress, amountERC20)).wait();
                console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
            }
        }
        for (const strAddress of arrMintToAddresses) {
            let id721 = nFirstTokenId721;
            for (let i = 0; i < nMintCount721; ++i) {
                console.log(strLogPrefix, "Minting \"ERC721\" token ID", id721, "to", strAddress, "...");
                const result = await (await deployedContractERC721.mint(strAddress, id721)).wait();
                console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
                ++id721;
            }
        }
        for (const strAddress of arrMintToAddresses) {
            let id721 = nFirstTokenId721;
            for (let i = 0; i < nMintCount721; ++i) {
                console.log(strLogPrefix, "Minting \"ERC721_with_metadata\" token ID", id721, "to", strAddress, "...");
                let result = await (await deployedContractERC721_with_metadata.mint(strAddress, id721)).wait();
                console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
                const tURI =
                    "https://test.token_" + strAddress + "_id_" + id721 +
                    "_uri.com/data/images/image_" + id721 + ".png";
                console.log(strLogPrefix, "Setting token URI", tURI, "for \"ERC721_with_metadata\" token ID", id721, "...");
                result = await (await deployedContractERC721_with_metadata.setTokenURI(id721, tURI)).wait();
                console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
                ++id721;
            }
        }
        if (amountERC1155 > 0) {
            let id1155 = nFirstTokenId1155;
            for (const strAddress of arrMintToAddresses) {
                for (let i = 0; i < nMintCount1155; ++i) {
                    console.log(strLogPrefix, "Minting \"ERC1155\" token ID", id1155, "(amount is " + amountERC1155 + ")", "to", strAddress, "...");
                    const result = await (await deployedContractERC1155.mint(strAddress, id1155, amountERC1155, [])).wait();
                    console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
                    ++id1155;
                }
            }
        }
        console.log(strLogPrefix, "All test tokens minted.");
    }

    console.log(strLogPrefix, "Will register token minters...");
    //
    // register privileged token minters initially, if needed
    //
    const arrMinters = (process.env.TOKEN_MINTERS &&
        typeof process.env.TOKEN_MINTERS == "string" &&
        process.env.TOKEN_MINTERS.length > 0
    )
        ? process.env.TOKEN_MINTERS.split(",")
        : [];
    // if( contractERC721ref ) {
    //     console.log( strLogPrefix, "NOTICE PLEASE: Will force use token minter", contractERC721ref.address, "to ERC721 contract" );
    //     arrMinters.push( contractERC721ref.address );
    // }
    if (arrMinters.length > 0) {
        console.log(strLogPrefix, "Minters are: " + JSON.stringify(arrMinters));
        for (const strMinterAddressWalk of arrMinters) {
            const strMinterAddress = strMinterAddressWalk.trim();
            if (strMinterAddress.length > 0) {
                //
                console.log(strLogPrefix, "Adding token minter", strMinterAddress, "to ERC20 contract", joSummaryABI.ERC20_address, "...");
                let result = await (await deployedContractERC20.privilegedAdd(strMinterAddress)).wait();
                console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
                //
                console.log(strLogPrefix, "Adding token minter", strMinterAddress, "to ERC721 contract", joSummaryABI.ERC721_address, "...");
                result = await (await deployedContractERC721.privilegedAdd(strMinterAddress)).wait();
                console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
                //
                console.log(strLogPrefix, "Adding token minter", strMinterAddress, "to ERC721_with_metadata contract", joSummaryABI.ERC721_with_metadata_address, "...");
                result = await (await deployedContractERC721_with_metadata.privilegedAdd(strMinterAddress)).wait();
                console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
                //
                console.log(strLogPrefix, "Adding token minter", strMinterAddress, "to ERC1155 contract", joSummaryABI.ERC1155_address, "...");
                result = await (await deployedContractERC1155.privilegedAdd(strMinterAddress)).wait();
                console.log(strLogPrefix, "    Done, gas spent:", result.gasUsed.toNumber());
            }
        }
        console.log(strLogPrefix, "All token minters registered.");
    } else
        console.log(strLogPrefix, "Did skipped registering minters.");

    console.log(strLogPrefix, "All actions done.");
});

function getEffectiveChainURL(strNetworkName) {
    let u = null;
    switch (strNetworkName) {
        case "mn":
            u = getCustomChainURL(urlMN);
            break;
        case "sc00":
            u = getCustomChainURL(urlSC_00);
            break;
        case "sc01":
            u = getCustomChainURL(urlSC_01);
            break;
        default:
            {
                const strError = "CRITICAL ERROR: Deployment network \"" + strNetworkName + "\" does not have URL";
                console.log(strLogPrefix, strError);
                throw new Error(strError);
            }
    }
    console.log(strLogPrefix, "Network", "\"" + strNetworkName + "\"", "URL is", u);
    return u;
}

function getEffectiveChainID(strNetworkName) {
    let chainId = null;
    switch (strNetworkName) {
        case "mn":
            chainId = cidMN;
            break;
        case "sc00":
            chainId = cidSC_00;
            break;
        case "sc01":
            chainId = cidSC_01;
            break;
        default:
            {
                const strError = "CRITICAL ERROR: Deployment network \"" + strNetworkName + "\" does not have chainId";
                console.log(strLogPrefix, strError);
                throw new Error(strError);
            }
    }
    console.log(strLogPrefix, "Network", "\"" + strNetworkName + "\"", "chainId is", chainId);
    return chainId;
}

function getEffectivePrivateKey(strNetworkName) {
    let pk = null;
    switch (strNetworkName) {
        case "mn":
            pk = getCustomPrivateKey(privateKeyMN);
            break;
        case "sc00":
        case "sc01":
            pk = getCustomPrivateKey(privateKeySC);
            break;
        default:
            {
                const strError = "CRITICAL ERROR: Deployment network \"" + strNetworkName + "\" does not have private key";
                console.log(strLogPrefix, strError);
                throw new Error(strError);
            }
    }
    console.log(strLogPrefix, "Network", "\"" + strNetworkName + "\"", "private key is", pk);
    return pk;
}

function getCustomChainURL(url, urlAlternative) {
    let u = url;
    if (!u) {
        u = urlAlternative;
        if (!u)
            u = g_defaultURL;
    }
    return u;
}

function getCustomPrivateKey(privateKey, privateKeyAlternative) {
    let pk = privateKey;
    if (!pk) {
        pk = privateKeyAlternative;
        if (!pk)
            pk = g_defaultPrivateKey;
    }
    return pk;
}

function getGasPrice(gasPrice, gasPriceAlternative) {
    if (gasPrice)
        return parseInt(gasPrice, 10);
    if (gasPriceAlternative)
        return gasPriceAlternative;
    return "auto";
}

// Go to https://hardhat.org/config/ for more info

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "mn", // "mn", // "hardhat" // "sc00" // "sc01"
    solidity: "0.6.12", // "0.8.4"
    networks: {
        hardhat: {
            accounts: getAccounts(),
            chainId: 31337,
            blockGasLimit: 0xfffffffffff, // 12000000
            gasPrice: g_defaultGasPrice, // 1000000000
            mining: {
                auto: true,
                interval: 1000
            }
        },
        mn: {
            chainId: getEffectiveChainID("mn"),
            url: getEffectiveChainURL("mn"),
            accounts: [getEffectivePrivateKey("mn")],
            gasPrice: g_defaultGasPrice
        },
        sc00: {
            chainId: getEffectiveChainID("sc00"),
            url: getEffectiveChainURL("sc00"),
            accounts: [getEffectivePrivateKey("sc00")],
            gasPrice: g_defaultGasPrice
        },
        sc01: {
            chainId: getEffectiveChainID("sc01"),
            url: getEffectiveChainURL("sc01"),
            accounts: [getEffectivePrivateKey("sc01")],
            gasPrice: g_defaultGasPrice
        }
    },
    gasReporter: {
        enabled: true,
        currency: "USD"
    }
    // etherscan: {
    //     apiKey: process.env.ETHERSCAN_API_KEY,
    // },
};
