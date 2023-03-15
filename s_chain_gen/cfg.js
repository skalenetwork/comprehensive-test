const fs = require( "fs" );
const path = require( "path" );
const cc = require( "./cc.js" );
const log = require( "./log.js" );

let g_strPathConfig = null;

let g_joCfg = null;

function cfgGet() {
    try {
        if( g_joCfg )
            return g_joCfg;
        if( ! fs.existsSync( g_strPathConfig ) ) {
            log.write( cc.fatal( "Configuration loading error, file does not exist:" ) + cc.error( " " ) + cc.error( g_strPathConfig ) + "\n" );
            //return {};
            process.exit( 30 ); // see https://tldp.org/LDP/abs/html/exitcodes.html
        }
        s = fs.readFileSync( g_strPathConfig, "utf8" );
        g_joCfg = JSON.parse( s );
    } catch ( e ) {
        log.write( cc.fatal( "Configuration loading error:" ) + cc.error( " " ) + cc.j( e ) + "\n" );
        process.exit( 31 ); // see https://tldp.org/LDP/abs/html/exitcodes.html
    }
    return g_joCfg ? g_joCfg : {};
}
function cfgSet( jo ) {
    try {
        g_joCfg = JSON.parse( JSON.stringify( jo ) ); // ensure jo is valid JSON
        return true;
    } catch ( e ) {
    }
    return false;
}

function cfgSave() {
    if( ! g_joCfg ) {
        log.write( cc.warn( "Skip saving empty configuration to file:" ) + cc.debug( " " ) + cc.info( g_strPathConfig ) + "\n" );
        return;
    }
    try {
        fs.writeFileSync(
            g_strPathConfig,
            JSON.stringify( g_joCfg, null, 4 )
        );
    } catch ( e ) {
        log.write( cc.fatal( "Configuration saving error:" ) + cc.error( " " ) + cc.j( e ) + "\n" );
        process.exit( 32 ); // see https://tldp.org/LDP/abs/html/exitcodes.html
    }
    log.write( cc.success( "Configuration was saved to " ) + cc.info( g_strPathConfig ) + "\n" );
}

function cfgInitDefault() {
    module.exports.pathSet( path.join( __dirname, "config.json" ) );
    log.write( cc.debug( "Initializing configuration..." ) + "\n" );
    log.write( cc.debug( "...." ) + cc.debug( "Configuration file is " ) + cc.info( module.exports.pathGet() ) + "\n" );
    if( fs.existsSync( module.exports.pathGet() ) ) {
        module.exports.get(); // cache cfg
        return;
    }
    log.write( cc.debug( "...." ) + cc.debug( "Will generate default configuration..." ) + "\n" );
    module.exports.set( {
        "supplier": {
            "url": "http://127.0.0.1:2231", // this is default value used as example
            "knownAccounts": {
                "Bob": { "name": "Bob", "address": "0x66c5a87f4a49DD75e970055A265E8dd5C3F8f852", "privateKey": "80ebc2e00b8f13c5e2622b5694ab63ee80f7c5399554d2a12feeb0212eb8c69e" },
                "Serge": { "name": "Serge", "address": "0x53E337BCDFe97FF4f9bA849f6799D0D37599DAAD", "privateKey": "b9f2de4fe0b7d7029b02a6a485cd36de94e36d68b4a1ae9ba27c1815139d7474" },
                "Stan": { "name": "Stan", "address": "0x6196d135CdDb9d73A0756C1E44b5b02B11acf594", "privateKey": "621761908cc4fba5f92e694e0e4a912aa9a12258a597a06783713a04610fad59" }
            },
            "moneySourceAccountName": "Bob",
            "targetAccountAddress": null,
            "targetAccountPrivateKey": null,
            "targetContractAddress": null,
            "targetContractInvocationCounter": 0,
            "contract": {
                "address": null,
                "abi": [ { "constant": true,"inputs": [],"name": "strGet","outputs": [ { "name": "","type": "string" } ],"payable": false,"stateMutability": "view","type": "function" },{ "constant": false,"inputs": [ { "name": "s","type": "string" } ],"name": "strSet","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function" },{ "constant": true,"inputs": [],"name": "number","outputs": [ { "name": "","type": "uint256" } ],"payable": false,"stateMutability": "view","type": "function" },{ "constant": true,"inputs": [],"name": "g_str","outputs": [ { "name": "","type": "string" } ],"payable": false,"stateMutability": "view","type": "function" },{ "constant": true,"inputs": [],"name": "aboutMe","outputs": [ { "name": "","type": "string" } ],"payable": false,"stateMutability": "pure","type": "function" },{ "constant": true,"inputs": [ { "name": "a","type": "uint256" },{ "name": "b","type": "uint256" } ],"name": "sum","outputs": [ { "name": "","type": "uint256" } ],"payable": false,"stateMutability": "pure","type": "function" },{ "constant": true,"inputs": [],"name": "getSomeNumber","outputs": [ { "name": "","type": "uint256" } ],"payable": false,"stateMutability": "pure","type": "function" },{ "constant": false,"inputs": [ { "name": "s","type": "string" } ],"name": "emitTestEvent","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function" },{ "inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor" },{ "anonymous": false,"inputs": [ { "indexed": false,"name": "s","type": "string" } ],"name": "TestEvent","type": "event" } ],
                "bytecode": "0x6060604052341561000f57600080fd5b606060405190810160405280602a81526020017f6a75737420696e697469616c697a6564206e65772054657374436f6e7472616381526020017f7420696e7374616e63650000000000000000000000000000000000000000000081525060009080519060200190610081929190610090565b50610315600181905550610135565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100d157805160ff19168380011785556100ff565b828001600101855582156100ff579182015b828111156100fe5782518255916020019190600101906100e3565b5b50905061010c9190610110565b5090565b61013291905b8082111561012e576000816000905550600101610116565b5090565b90565b6106cd806101446000396000f30060606040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631da2c29c146100935780637b262df5146101215780638381f58a1461017e578063ae58c386146101a7578063bc7a289814610235578063cad0899b146102c3578063d74bf20214610303578063e50b61cf1461032c575b600080fd5b341561009e57600080fd5b6100a6610389565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100e65780820151818401526020810190506100cb565b50505050905090810190601f1680156101135780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561012c57600080fd5b61017c600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610431565b005b341561018957600080fd5b61019161044b565b6040518082815260200191505060405180910390f35b34156101b257600080fd5b6101ba610451565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101fa5780820151818401526020810190506101df565b50505050905090810190601f1680156102275780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561024057600080fd5b6102486104ef565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561028857808201518184015260208101905061026d565b50505050905090810190601f1680156102b55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156102ce57600080fd5b6102ed6004808035906020019091908035906020019091905050610532565b6040518082815260200191505060405180910390f35b341561030e57600080fd5b61031661053f565b6040518082815260200191505060405180910390f35b341561033757600080fd5b610387600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610549565b005b6103916105e8565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104275780601f106103fc57610100808354040283529160200191610427565b820191906000526020600020905b81548152906001019060200180831161040a57829003601f168201915b5050505050905090565b80600090805190602001906104479291906105fc565b5050565b60015481565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104e75780601f106104bc576101008083540402835291602001916104e7565b820191906000526020600020905b8154815290600101906020018083116104ca57829003601f168201915b505050505081565b6104f76105e8565b6040805190810160405280601081526020017f48656c6c2064616d6520776f726c642100000000000000000000000000000000815250905090565b6000818301905092915050565b6000610315905090565b7fe75028ff36bb6473da3731a30e1aeeae9988e2415dba2c4e91e0357955065fba816040518080602001828103825283818151815260200191508051906020019080838360005b838110156105ab578082015181840152602081019050610590565b50505050905090810190601f1680156105d85780820380516001836020036101000a031916815260200191505b509250505060405180910390a150565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061063d57805160ff191683800117855561066b565b8280016001018555821561066b579182015b8281111561066a57825182559160200191906001019061064f565b5b509050610678919061067c565b5090565b61069e91905b8082111561069a576000816000905550600101610682565b5090565b905600a165627a7a72305820028fd61555ca5c2d50de031cfda08e81050f98fa8125e5a2df0f3e75a5fc45140029"
            }
        },
        "consumer": {
            "url": "http://127.0.0.1:2231", // this is default value used as example
            "knownAccounts": {
                "Alice": { "name": "Alice", "address": "0x651054E818a0E022Bbb681Aa3b657386f20845F5", "privateKey": "1800d6337966f6410905a6bf9af370ac2f55c7428854d995cfa719e061ac0dca" },
                "Oleg": { "name": "Oleg", "address": "0xBc63fE64158f2b8Ae06D1D72A5d8332e8be2542a", "privateKey": "725bd5cfb2288e0f1884f971012b915016b6ab186eba5bf4acb6543b40db295f" },
                "Dima": { "name": "Dima", "address": "0xEdaD142DE050f10894f3CAd439d3B3C1735B676C", "privateKey": "fe4d5902f4401d6a3899576cdf8c868ac7af75c8b62167314cf2ac47dede6499" },
                "Alex": { "name": "Alex", "address": "0x8e8311f4c4533f4C19363d6140e1D5FA16Aa4071", "privateKey": "d47f07804006486dbeba6b81e50fc93543657853a3d2f736d4fd68488ca94c17" }
            }
        }
    } );
    module.exports.save();
}

module.exports = {
    "pathGet": function() { return "" + g_strPathConfig; },
    "pathSet": function( s ) { g_strPathConfig = "" + s; return "" + g_strPathConfig; },
    "get": cfgGet,
    "set": cfgSet,
    "save": cfgSave,
    "initDefault": cfgInitDefault
}; // module.exports
