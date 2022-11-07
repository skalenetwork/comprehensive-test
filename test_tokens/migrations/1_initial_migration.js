// SPDX-License-Identifier: AGPL-3.0-only

/**
 * @license
 * SKALE ADVANCED IMA JS
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file 1_initial_migration.js
 * @copyright SKALE Labs 2019-Present
 */

const fs = require( "fs" );
const path = require( "path" );
const os = require( "os" );
// const web3 = require( "web3" );

const strAbiJsonNameSuffix = process.env.ABI_JSON_NAME_SUFFIX || "";

const strLogPrefix = "   >>>>";

// const Migrations = artifacts.require( "Migrations" );
const ERC20 = artifacts.require( "ERC20" );
const ERC721 = artifacts.require( "ERC721" );
const ERC721_with_metadata = artifacts.require( "ERC721_with_metadata" );
const ERC1155 = artifacts.require( "ERC1155" );
const ChatParticipant = artifacts.require( "ChatParticipant" );
const ERC721refMM_MN = artifacts.require( "ERC721ReferenceMintAndMetadataMainnet" );
const ERC721refMM_SC = artifacts.require( "ERC721ReferenceMintAndMetadataSchain" );

function normalizePath( strPath ) {
    strPath = strPath.replace( /^~/, os.homedir() );
    strPath = path.normalize( strPath );
    strPath = path.resolve( strPath );
    return strPath;
}

module.exports = function( deployer, network, accounts ) {
    console.log( strLogPrefix, "Deployer network is", "\"" + network + "\"" );
    console.log( strLogPrefix, "Deployer accounts are", accounts );

    deployer.then( async() => {
        // deployer.deploy( Migrations );

        const name = process.env.TOKEN_NAME || "SERGE";
        const symbol = process.env.TOKEN_SYMBOL || "SRG";
        const decimals = ( process.env.TOKEN_DECIMALS && parseInt( process.env.TOKEN_DECIMALS ) ) ? parseInt( process.env.TOKEN_DECIMALS ) : 18;
        const uri1155 = process.env.URI_1155 || "say something";

        console.log( strLogPrefix, "Token name is \"" + name + "\"" );
        console.log( strLogPrefix, "Token symbol is \"" + symbol + "\"" );
        console.log( strLogPrefix, "Token decimals is " + decimals );
        console.log( strLogPrefix, "URI 1155 is \"" + uri1155 + "\"" );

        const contractERC20 = await deployer.deploy( ERC20, name, symbol, decimals );
        // console.log( contractERC20 );
        console.log( strLogPrefix, "Contract \"ERC20\" was successfully deployed at address", "\"" + ERC20.address + "\"" );

        const contractERC721 = await deployer.deploy( ERC721, name, symbol );
        console.log( strLogPrefix, "Contract \"ERC721\" was successfully deployed at address", "\"" + ERC721.address + "\"" );
        // console.log( contractERC721 );

        const contractERC721_with_metadata = await deployer.deploy( ERC721_with_metadata, name, symbol );
        console.log( strLogPrefix, "Contract \"ERC721_with_metadata\" was successfully deployed at address", "\"" + ERC721_with_metadata.address + "\"" );
        // console.log( contractERC721_with_metadata );

        const contractERC1155 = await deployer.deploy( ERC1155, uri1155 );
        console.log( strLogPrefix, "Contract \"ERC1155\" was successfully deployed at address", "\"" + ERC1155.address + "\"" );
        // console.log( contractERC1155 );

        //const contractChatParticipant =
        await deployer.deploy( ChatParticipant
            // , "", "0x0", "0x0"
        );

        const newMessageProxyAddress = process.env.ADDRESS_NEW_MESSAGE_PROXY;
        console.log( strLogPrefix, "New message proxy address is \"" + newMessageProxyAddress + "\"" );

        let newErc721Contract = process.env.ADDRESS_NEW_ERC_721_CONTRACT;
        if( newErc721Contract == "auto" )
            newErc721Contract = "" + contractERC721.address;
        console.log( strLogPrefix, "New ERC721 contract address is \"" + newErc721Contract + "\"" );
        let contractERC721ref = null;
        if( network == "mn" ) {
            const newSchainName = process.env.ADDRESS_NEW_SCHAIN_NAME;
            console.log( strLogPrefix, "New S-Chain name is \"" + newSchainName + "\"" );
            if( newMessageProxyAddress && newErc721Contract && newSchainName ) {
                contractERC721ref = await deployer.deploy( ERC721refMM_MN,
                    newMessageProxyAddress, // address
                    newErc721Contract, // address
                    newSchainName // string
                );
                console.log( strLogPrefix, "Contract \"ERC721ReferenceMintAndMetadataMainnet\" was successfully deployed at address", "\"" + contractERC721ref.address + "\"" );
            } else
                console.log( strLogPrefix, "WARNING: Skipped contract \"ERC721ReferenceMintAndMetadataMainnet\" deployment, not enough data to specify as constructor parameters" );

        } else {
            const newReceiverContractOnMainnet = process.env.ADDRESS_RECEIVER_CONTRACT_MN;
            console.log( strLogPrefix, "New receiver on Main NET contract address is \"" + newReceiverContractOnMainnet + "\"" );
            if( newMessageProxyAddress && newErc721Contract && newReceiverContractOnMainnet ) {
                contractERC721ref = await deployer.deploy( ERC721refMM_SC,
                    newMessageProxyAddress, // address
                    newErc721Contract, // address
                    newReceiverContractOnMainnet // address
                );
                console.log( strLogPrefix, "Contract \"ERC721ReferenceMintAndMetadataSchain\" was successfully deployed at address", "\"" + contractERC721ref.address + "\"" );
            } else
                console.log( strLogPrefix, "WARNING: Skipped contract \"ERC721ReferenceMintAndMetadataSchain\" deployment, not enough data to specify as constructor parameters" );

        }

        const strAbiJsonNameSuffixEffective = strAbiJsonNameSuffix || ( "." + network.trim() );
        //
        // save summary ABI JSON
        //
        const joAbiSummary = {
            ERC20_address: ERC20.address,
            ERC20_abi: ERC20.abi,
            ERC721_address: ERC721.address,
            ERC721_abi: ERC721.abi,
            ERC721_with_metadata_address: ERC721_with_metadata.address,
            ERC721_with_metadata_abi: ERC721_with_metadata.abi,
            ERC1155_address: ERC1155.address,
            ERC1155_abi: ERC1155.abi,
            ChatParticipant_address: ChatParticipant.address,
            ChatParticipant_abi: ChatParticipant.abi
        };
        if( contractERC721ref ) {
            joAbiSummary.ERC721ReferenceMintAndMetadata_address = contractERC721ref.address;
            joAbiSummary.ERC721ReferenceMintAndMetadata_abi = contractERC721ref.abi;
        }
        let strPathAbiJsonFile = normalizePath( path.join( __dirname, "../data/TestTokens.abi" + strAbiJsonNameSuffixEffective + ".json" ) );
        try {
            fs.writeFileSync( strPathAbiJsonFile, JSON.stringify( joAbiSummary ) + "\n\n" );
            console.log( strLogPrefix, "Saved ABI JSON file \"" + strPathAbiJsonFile + "\"" );
        } catch ( err ) {
            console.warn( strLogPrefix, "CRITICAL ERROR: failed to save ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err );
            process.exit( 13 );
        }
        //
        // save standing alone ABI JSON for ERC20 only
        //
        const joAbiOnlyERC20 = {
            ERC20_address: ERC20.address,
            ERC20_abi: ERC20.abi
        };
        strPathAbiJsonFile = normalizePath( path.join( __dirname, "../data/TestToken.ERC20.abi" + strAbiJsonNameSuffixEffective + ".json" ) );
        try {
            fs.writeFileSync( strPathAbiJsonFile, JSON.stringify( joAbiOnlyERC20 ) + "\n\n" );
            console.log( strLogPrefix, "Saved ABI JSON file \"" + strPathAbiJsonFile + "\"" );
        } catch ( err ) {
            console.warn( strLogPrefix, "CRITICAL ERROR: failed to save ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err );
            process.exit( 13 );
        }
        //
        // save standing alone ABI JSON for ERC721 only
        //
        const joAbiOnlyERC721 = {
            ERC721_address: ERC721.address,
            ERC721_abi: ERC721.abi
        };
        strPathAbiJsonFile = normalizePath( path.join( __dirname, "../data/TestToken.ERC721.abi" + strAbiJsonNameSuffixEffective + ".json" ) );
        try {
            fs.writeFileSync( strPathAbiJsonFile, JSON.stringify( joAbiOnlyERC721 ) + "\n\n" );
            console.log( strLogPrefix, "Saved ABI JSON file \"" + strPathAbiJsonFile + "\"" );
        } catch ( err ) {
            console.warn( strLogPrefix, "CRITICAL ERROR: failed to save ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err );
            process.exit( 13 );
        }
        //
        // save standing alone ABI JSON for ERC721_with_metadata only
        //
        const joAbiOnlyERC721_with_metadata = {
            ERC721_with_metadata_address: ERC721_with_metadata.address,
            ERC721_with_metadata_abi: ERC721_with_metadata.abi
        };
        strPathAbiJsonFile = normalizePath( path.join( __dirname, "../data/TestToken.ERC721_with_metadata.abi" + strAbiJsonNameSuffixEffective + ".json" ) );
        try {
            fs.writeFileSync( strPathAbiJsonFile, JSON.stringify( joAbiOnlyERC721_with_metadata ) + "\n\n" );
            console.log( strLogPrefix, "Saved ABI JSON file \"" + strPathAbiJsonFile + "\"" );
        } catch ( err ) {
            console.warn( strLogPrefix, "CRITICAL ERROR: failed to save ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err );
            process.exit( 13 );
        }
        //
        // save standing alone ABI JSON for ERC1155 only
        //
        const joAbiOnlyERC1155 = {
            ERC1155_address: ERC1155.address,
            ERC1155_abi: ERC1155.abi
        };
        strPathAbiJsonFile = normalizePath( path.join( __dirname, "../data/TestToken.ERC1155.abi" + strAbiJsonNameSuffixEffective + ".json" ) );
        try {
            fs.writeFileSync( strPathAbiJsonFile, JSON.stringify( joAbiOnlyERC1155 ) + "\n\n" );
            console.log( strLogPrefix, "Saved ABI JSON file \"" + strPathAbiJsonFile + "\"" );
        } catch ( err ) {
            console.warn( strLogPrefix, "CRITICAL ERROR: failed to save ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err );
            process.exit( 13 );
        }
        //
        // save standing alone ABI JSON for ChatParticipant only
        //
        const joAbiOnlyChatParticipant = {
            ChatParticipant_address: ChatParticipant.address,
            ChatParticipant_abi: ChatParticipant.abi
        };
        strPathAbiJsonFile = normalizePath( path.join( __dirname, "../data/TestToken.ChatParticipant.abi" + strAbiJsonNameSuffixEffective + ".json" ) );
        try {
            fs.writeFileSync( strPathAbiJsonFile, JSON.stringify( joAbiOnlyChatParticipant ) + "\n\n" );
            console.log( strLogPrefix, "Saved ABI JSON file \"" + strPathAbiJsonFile + "\"" );
        } catch ( err ) {
            console.warn( strLogPrefix, "CRITICAL ERROR: failed to save ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err );
            process.exit( 13 );
        }
        //
        // save standing alone ABI JSON for contractERC721ref only
        //
        if( contractERC721ref ) {
            const joAbiOnlyERC721ReferenceMintAndMetadata = {
                ERC721ReferenceMintAndMetadata_address: contractERC721ref.address,
                ERC721ReferenceMintAndMetadata_abi: contractERC721ref.abi
            };
            strPathAbiJsonFile = normalizePath( path.join( __dirname, "../data/TestToken.ERC721ReferenceMintAndMetadata.abi" + strAbiJsonNameSuffixEffective + ".json" ) );
            try {
                fs.writeFileSync( strPathAbiJsonFile, JSON.stringify( joAbiOnlyERC721ReferenceMintAndMetadata ) + "\n\n" );
                console.log( strLogPrefix, "Saved ABI JSON file \"" + strPathAbiJsonFile + "\"" );
            } catch ( err ) {
                console.warn( strLogPrefix, "CRITICAL ERROR: failed to save ABI JSON file \"" + strPathAbiJsonFile + "\", error is:", err );
                process.exit( 13 );
            }
        }

        //
        // mint required tokens initially, if needed
        //
        const isSkipMint = ( process.env.IS_SKIP_MINT ) ? true : false;
        if( isSkipMint )
            console.log( strLogPrefix, "Token minting is skipped.\n" );
        else {
            const arrMintToAddresses =
                ( process.env.ADDRESSES_MINT_TO &&
                typeof process.env.ADDRESSES_MINT_TO == "string" &&
                process.env.ADDRESSES_MINT_TO.length > 0
                )
                    ? process.env.ADDRESSES_MINT_TO.split( "," )
                    : [ "0x7aa5E36AA15E93D10F4F26357C30F052DacDde5F" ];
            const amountERC20 =
                ( process.env.MINT_AMOUNT_20 &&
                typeof process.env.MINT_AMOUNT_20 == "string" &&
                process.env.MINT_AMOUNT_20.length > 0
                )
                    ? parseInt( process.env.MINT_AMOUNT_20 )
                    : 100000000000;
            const amountERC1155 =
                ( process.env.MINT_AMOUNT_1155 &&
                typeof process.env.MINT_AMOUNT_1155 == "string" &&
                process.env.MINT_AMOUNT_1155.length > 0
                )
                    ? parseInt( process.env.MINT_AMOUNT_1155 )
                    : 100000000000;
            const nMintCount721 =
                ( process.env.MINT_COUNT_721 &&
                typeof process.env.MINT_COUNT_721 == "string" &&
                process.env.MINT_COUNT_721.length > 0
                )
                    ? parseInt( process.env.MINT_COUNT_721 )
                    : 5;
            const nMintCount1155 =
                ( process.env.MINT_COUNT_1155 &&
                typeof process.env.MINT_COUNT_1155 == "string" &&
                process.env.MINT_COUNT_1155.length > 0
                )
                    ? parseInt( process.env.MINT_COUNT_1155 )
                    : 5;
            const nFirstTokenId721 =
                ( process.env.FIRST_TOKEN_ID_721 &&
                typeof process.env.FIRST_TOKEN_ID_721 == "string" &&
                process.env.FIRST_TOKEN_ID_721.length > 0
                )
                    ? parseInt( process.env.FIRST_TOKEN_ID_721 )
                    : 1;
            const nFirstTokenId1155 =
                ( process.env.FIRST_TOKEN_ID_1155 &&
                typeof process.env.FIRST_TOKEN_ID_1155 == "string" &&
                process.env.FIRST_TOKEN_ID_1155.length > 0
                )
                    ? parseInt( process.env.FIRST_TOKEN_ID_1155 )
                    : 1;
            if( amountERC20 > 0 ) {
                for( const strAddress of arrMintToAddresses ) {
                    console.log( strLogPrefix, "Minting ERC20 amount", amountERC20, "to", strAddress, "..." );
                    await contractERC20.mint( strAddress, amountERC20 );
                    console.log( strLogPrefix, "Done." );
                }
            }
            for( const strAddress of arrMintToAddresses ) {
                let id721 = nFirstTokenId721;
                for( let i = 0; i < nMintCount721; ++ i ) {
                    console.log( strLogPrefix, "Minting ERC721 token ID", id721, "to", strAddress, "..." );
                    await contractERC721.mint( strAddress, id721 );
                    console.log( strLogPrefix, "Done." );
                    ++ id721;
                }
            }
            for( const strAddress of arrMintToAddresses ) {
                let id721 = nFirstTokenId721;
                for( let i = 0; i < nMintCount721; ++ i ) {
                    console.log( strLogPrefix, "Minting ERC721_with_metadata token ID", id721, "to", strAddress, "..." );
                    await contractERC721_with_metadata.mint( strAddress, id721 );
                    console.log( strLogPrefix, "Done." );
                    const tURI =
                        "https://test.token_" + strAddress + "_id_" + id721 +
                        "_uri.com/data/images/image_" + id721 + ".png";
                    console.log( strLogPrefix, "Setting token URI", tURI,"for ERC721_with_metadata token ID", id721, "..." );
                    await contractERC721_with_metadata.setTokenURI( id721, tURI );
                    console.log( strLogPrefix, "Done." );
                    ++ id721;
                }
            }
            if( amountERC1155 > 0 ) {
                let id1155 = nFirstTokenId1155;
                for( const strAddress of arrMintToAddresses ) {
                    for( let i = 0; i < nMintCount1155; ++ i ) {
                        console.log( strLogPrefix, "Minting ERC1155 token ID", id1155, "(amount is " + amountERC1155 + ")", "to", strAddress, "..." );
                        await contractERC1155.mint( strAddress, id1155, amountERC1155, [] );
                        console.log( strLogPrefix, "Done." );
                        ++ id1155;
                    }
                }
            }
        }

        //
        // register privileged token minters initially, if needed
        //
        const arrMinters = ( process.env.TOKEN_MINTERS &&
            typeof process.env.TOKEN_MINTERS == "string" &&
            process.env.TOKEN_MINTERS.length > 0
        )
            ? process.env.TOKEN_MINTERS.split( "," )
            : [];
        if( contractERC721ref ) {
            console.log( strLogPrefix, "NOTICE PLEASE: Will force use token minter", contractERC721ref.address, "to ERC721 contract" );
            arrMinters.push( contractERC721ref.address );
        }
        if( arrMinters.length > 0 ) {
            console.log( strLogPrefix, "" );
            console.log( strLogPrefix, "Minters are: " + JSON.stringify( arrMinters ) );
            for( const strMinterAddressWalk of arrMinters ) {
                const strMinterAddress = strMinterAddressWalk.trim();
                if( strMinterAddress.length > 0 ) {
                    console.log( strLogPrefix, "" );
                    //
                    console.log( strLogPrefix, "Adding token minter", strMinterAddress, "to ERC20 contract", ERC20.address, "..." );
                    await contractERC20.privilegedAdd( strMinterAddress );
                    console.log( strLogPrefix, "Done." );
                    //
                    console.log( strLogPrefix, "Adding token minter", strMinterAddress, "to ERC721 contract", ERC721.address, "..." );
                    await contractERC721.privilegedAdd( strMinterAddress );
                    console.log( strLogPrefix, "Done." );
                    //
                    console.log( strLogPrefix, "Adding token minter", strMinterAddress, "to ERC721_with_metadata contract", ERC721_with_metadata.address, "..." );
                    await contractERC721_with_metadata.privilegedAdd( strMinterAddress );
                    console.log( strLogPrefix, "Done." );
                    //
                    console.log( strLogPrefix, "Adding token minter", strMinterAddress, "to ERC1155 contract", ERC1155.address, "..." );
                    await contractERC1155.privilegedAdd( strMinterAddress );
                    console.log( strLogPrefix, "Done." );
                }
            }
        }

        console.log( strLogPrefix, "" );
        console.log( strLogPrefix, "All actions done.\n" );
    } );

};
