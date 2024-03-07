const g_all_skale_test_version_info = require( "./version.json" );
const g_isCloudMode = process.env.ALL_SKALE_TEST_CLOUD_RUN ? true : false;

const fs = require( "fs" );
const path = require( "path" );
const os = require( "os" );
const child_process = require( "child_process" );
const fkill = require( "fkill" );
const tree_kill = require( "tree-kill" );
// const url = require( "url" );
const fetch = require( "node-fetch-commonjs" ).default;

const cc = require( "../s_chain_gen/cc.js" );
const log = require( "../s_chain_gen/log.js" );
const g_bPlainColorMode = s2b( process.env.NO_ANSI_COLORS );
cc.enable( g_bPlainColorMode ? false : true );
log.addStdout();

global.rpcCall = require( "./rpc-call.js" );
rpcCall.init( cc, log );

log.write( cc.sunny( "ALL SKALE TEST" ) + cc.debug( " version: " ) + cc.bright( g_all_skale_test_version_info.version ) + "\n" );
log.write( cc.sunny( "ALL SKALE TEST" ) + cc.debug( " is cloud mode: " ) + cc.yn( g_isCloudMode ) + "\n" );
const strUbuntuVersion = child_process.execSync( "lsb_release -r | cut -f2" ).toString().replace( /(\r\n|\n|\r)/gm, "" );
log.write( cc.sunny( "ALL SKALE TEST" ) + cc.debug( " did detected Ubuntu version: " ) + cc.info( strUbuntuVersion ) + "\n" );

global.g_w3mod = require( "web3" );
log.write( cc.sunny( "ALL SKALE TEST" ) + cc.debug( " is using " ) + cc.bright( "Web3" ) + cc.normal( " version " ) + cc.sunny( g_w3mod.version ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "PID" ) + cc.debug( " is " ) + cc.bright( process.pid ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "PPID" ) + cc.debug( " is " ) + cc.bright( process.ppid ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "EGID" ) + cc.debug( " is " ) + cc.bright( process.getegid() ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "EUID" ) + cc.debug( " is " ) + cc.bright( process.geteuid() ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "GID" ) + cc.debug( " is " ) + cc.bright( process.getgid() ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "UID" ) + cc.debug( " is " ) + cc.bright( process.getuid() ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "groups" ) + cc.debug( " are " ) + cc.j( process.getgroups() ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "CWD" ) + cc.debug( " is " ) + cc.bright( process.cwd() ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "platform" ) + cc.debug( " is " ) + cc.bright( process.platform ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "release" ) + cc.debug( " is " ) + cc.j( process.release ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "report" ) + cc.debug( " is " ) + cc.j( process.report ) + "\n" );
log.write( cc.debug( "This process " ) + cc.sunny( "config" ) + cc.debug( " is " ) + cc.j( process.config ) + "\n" );
log.write( cc.sunny( "Node JS" ) + " " + cc.bright( "detailed version information" ) + cc.debug( " is " ) + cc.j( process.versions ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "type" ) + cc.debug( " is " ) + cc.bright( os.type() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "platform" ) + cc.debug( " is " ) + cc.bright( os.platform() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "release" ) + cc.debug( " is " ) + cc.bright( os.release() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "architecture" ) + cc.debug( " is " ) + cc.bright( os.arch() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "endianness" ) + cc.debug( " is " ) + cc.bright( os.endianness() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "host name" ) + cc.debug( " is " ) + cc.bright( os.hostname() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "CPUs" ) + cc.debug( " are " ) + cc.j( os.cpus() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "network interfaces" ) + cc.debug( " are " ) + cc.j( os.networkInterfaces() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "home dir" ) + cc.debug( " is " ) + cc.bright( os.homedir() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "tmp dir" ) + cc.debug( " is " ) + cc.bright( os.tmpdir() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "uptime" ) + cc.debug( " is " ) + cc.bright( os.uptime() ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "user" ) + cc.debug( " is " ) + cc.j( os.userInfo() ) + "\n" );
const joMemory = { total: os.totalmem(), free: os.freemem() };
joMemory.freePercent = ( joMemory.free / joMemory.total ) * 100.0;
log.write( cc.sunny( "OS" ) + " " + cc.bright( "memory" ) + cc.debug( " is " ) + cc.j( joMemory ) + "\n" );
log.write( cc.sunny( "OS" ) + " " + cc.bright( "average load" ) + cc.debug( " is " ) + cc.j( os.loadavg() ) + "\n" );

const ethereumjs_tx = require( "ethereumjs-tx" );
const ethereumjs_wallet = require( "ethereumjs-wallet" );
const ethereumjs_util = require( "ethereumjs-util" );

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // allow self-signed wss and https
const g_strRecommendedShellPATH = process.env.PATH; // + ":/usr/local/bin/:/bin/:/usr/sbin:/usr/bin:/sbin"; // "$PATH:/bin/:/usr/bin/:/usr/local/bin/"

const g_bVerbose = true;

const g_bExternalMN = true; // true; // set to true to run Min Net manually outside this test)
const g_bExternalSC = false; // true; // set to true to run S-Chain manually outside this test
const g_bExternalIMA = false; // set to true to run S-Chain manually outside this test

const g_strImaDockerRepository = process.env.REPO_NAME || "skalenetwork/ima";
log.write( cc.attention( "IMA Docker Tag" ) + " " + cc.debug( " from " ) + cc.notice( "VERSION" ) +
    cc.debug( " environment variable is " ) + cc.note( process.env.VERSION ) + "\n" );
const g_strImaDockerTag = process.env.VERSION || ""; // "2.0.0-develop.14";
log.write( cc.attention( "IMA Docker Tag" ) + " " + cc.debug( " is " ) + cc.note( g_strImaDockerTag ) + "\n" );
const g_strImaDockerImageName =
    ( g_strImaDockerRepository.length > 0 && g_strImaDockerTag.length > 0 )
        ? ( g_strImaDockerRepository + ":" + g_strImaDockerTag )
        : ( process.env.IMAGE_NAME || "" );
log.write( cc.attention( "IMA Docker image name " ) + " " + cc.debug( " is " ) + cc.note( g_strImaDockerImageName ) + "\n" );
const g_bDockerIMA = g_strImaDockerTag ? true : false; // use docker image of IMA Agent, this flag is higher priority than g_bExternalIMA
log.write( cc.attention( "IMA Docker Mode" ) + " " + cc.debug( " is " ) + cc.yn( g_bDockerIMA ) + "\n" );
if( g_bDockerIMA )
    log.write( cc.attention( "IMA Docker Image" ) + " " + cc.debug( " is " ) + cc.info( g_strImaDockerImageName ) + "\n" );

const g_bSkipStartStopSChainOnImaDeploy = true;
const g_bPredeployedIMA = true;
const g_bAskExternalStartStopMN = false;
const g_bAskExternalStartStopSC = true;
const g_bAskExternalStartStopIMA = true;
const g_bAtExitStopMN = g_bExternalMN ? false : true;
const g_bAtExitStopSC = g_bExternalSC ? false : true;
const g_bAtExitStopIMA = true; // for debugging purposes, let's us stay running after all tests passed OK
const g_bAskToFinishTest = g_isCloudMode ? false : true;
const g_bDisableNewCrossImaRPC = false;
const g_bAskToContinueAfterSkaledStarted = false;
const g_bAskToContinueBeforeImaInit = false;
const g_bAskToStartCryptoAssetTransfersTest = false;

const g_bUpdateSkaledToLatestFromGithub = false;
const g_strSkaledReleaseTagCookie = "develop";

const g_bTestImaAgentDiscoveryCommandsAndExit = false; // special mode to test discovery commands of IMA Agent only

const g_strImaOutputOpts = "" +
    " " + ( g_bPlainColorMode ? "--no-colors" : "--colors" ) +
    " --verbose=9" +
    " --expose" +
    " --expose-security-info" +
    // " --accumulated-log-in-transfer" +
    // " --accumulated-log-in-bls-signer" +
    " --dynamic-log-in-transfer" +
    " --dynamic-log-in-bls-signer" +
    " "
    ;
const g_strImaRuntimeOpts = "" +
    " --gas-price-multiplier=2" +
    " --gas-multiplier=2" +
    // " --auto-exit=0" + // it's 0 by default
    // " --skip-dry-run" +
    " --no-skip-dry-run" +
    " --ignore-dry-run" +
    // " --no-ignore-dry-run" +
    " "
;

const g_bSkaledWithBTRFS = s2b( process.env.SKALED_WITH_BTRFS );
const g_bSkaledWithSnapshots = ( g_bSkaledWithBTRFS && s2b( process.env.SKALED_WITH_SNAPSHOTS ) ) ? true : false;

// owner
const g_strPrivateKeySkaleManagerMN = process.env.PRIVATE_KEY_FOR_ETHEREUM || "23ABDBD3C61B5330AF61EBE8BEF582F4E5CC08E554053A718BDCE7813B9DC1FC"; // address 0x7aa5E36AA15E93D10F4F26357C30F052DacDde5F
// let g_strPrivateKeySkaleManagerMN = "4011b9f2b53a7c372f61e5aabc699c036b7e90e3c4158d6d83ea22bb1c287b36"; // address 0xca8489dB50A548eC85eBD4A0E11a9D61cB508540

// chain names, IDs, etc
const g_strMainnetName = process.env.CHAIN_NAME_ETHEREUM || "Mainnet";
const cid_main_net = process.env.CID_ETHEREUM ? parseInt( process.env.CID_ETHEREUM ) : ( 456 );
const g_strMainNetURL = process.env.URL_W3_ETHEREUM || "http://127.0.0.1:8545";

const g_strPrivateKeyImaMN = process.env.PRIVATE_KEY_FOR_ETHEREUM || "23ABDBD3C61B5330AF61EBE8BEF582F4E5CC08E554053A718BDCE7813B9DC1FC"; // address 0x7aa5E36AA15E93D10F4F26357C30F052DacDde5F
const g_strPrivateKeyImaSC = process.env.PRIVATE_KEY_FOR_SCHAIN || "23ABDBD3C61B5330AF61EBE8BEF582F4E5CC08E554053A718BDCE7813B9DC1FC"; // "80ebc2e00b8f13c5e2622b5694ab63ee80f7c5399554d2a12feeb0212eb8c69e"; // address 0x66c5a87f4a49DD75e970055A265E8dd5C3F8f852
const g_strNetworkNameMN = process.env.NETWORK_FOR_ETHEREUM || "mainnet";
const g_strNetworkNameSC = process.env.NETWORK_FOR_SCHAIN || "schain";

const g_strUrlTransactionManager = process.env.URL_TRANSACTION_MANAGER || "redis://@127.0.0.1:6379"; // "redis://@redis:6379" // "redis://@127.0.0.1:6379"
const g_nTransactionManagerPriority = process.env.PRIORITY_TRANSACTION_MANAGER || 5;

const g_strUrlSgxWalletHTTP = process.env.URL_SGX_WALLET_HTTP || "http://127.0.0.1:1027";
const g_strUrlSgxWalletHTTPS = process.env.URL_SGX_WALLET_HTTPS || "https://127.0.0.1:1026"; // in IMA the SGX_URL_ETHEREUM and SGX_URL_S_CHAIN are used
const g_strPathForSgxSslData = path.join( __dirname, "create_pems" );
const g_joSgxRpcOptions = { // in IMA SGX_SSL_KEY_FILE_ETHEREUM/SGX_SSL_CERT_FILE_ETHEREUM and SGX_SSL_KEY_FILE_S_CHAIN/SGX_SSL_CERT_FILE_S_CHAIN are used
    //"ca":     fs.readFileSync( g_strPathForSgxSslData + "/rootCA.pem", "utf8" ) // joCall.strPathCertFile ? fs.readFileSync( joCall.strPathCertFile ) : null
    //,
    "cert_path": g_strPathForSgxSslData + "/client.crt", // for IMA
    "key_path": g_strPathForSgxSslData + "/k.key", // for IMA
    "cert": fs.readFileSync( g_strPathForSgxSslData + "/client.crt", "utf8" ),
    "key": fs.readFileSync( g_strPathForSgxSslData + "/k.key", "utf8" )
};
const g_strSgxKeyNameMN = process.env.SGX_KEY_ETHEREUM || "NEK:002";
const g_strSgxKeyNameSC = process.env.SGX_KEY_S_CHAIN || "NEK:003";
const g_bUseTransactionManagerInImaMN = g_bDockerIMA ? true : false; // false; // use g_strUrlTransactionManager
log.write( cc.attention( "Transaction Manager" ) + " " + cc.debug( " mode is " ) + cc.yn( g_bUseTransactionManagerInImaMN ) + "\n" );
const g_bUseSgxInImaMN = true; // ignored if g_bUseTransactionManagerInImaMN = true
log.write( cc.attention( "SGX/MN" ) + " " + cc.debug( " mode is " ) + cc.yn( g_bUseSgxInImaMN ) + "\n" );
const g_bUseSgxInImaSC = true; // false;
log.write( cc.attention( "SGX/MN" ) + " " + cc.debug( " mode is " ) + cc.yn( g_bUseSgxInImaSC ) + "\n" );
const g_bIsGenerateNodeEcdsaKeys = false; // true - use generateECDSAKey, false - use importECDSAKey
// IMPORTANT NOTICE: g_bIsGenerateNodeEcdsaKeys should be false because dynamically generated ECDSA key addresses are not inserted into "mapAuthorizedCallers" in config.json files for skaled

const g_nCntAttempts = 200;

const g_nTimeToSleepAfterAllSkaledNodesStartMilliseconds = 30000;
const g_nSleepTimeBetweenContractMethodInvocationAttemptsMilliseconds = 1000;
const g_nTimeToSleepWeb3TransactionCountStepMilliseconds = 1000;
const g_nTimeToSleepAfterReimbursementActionsMilliseconds = 0;
const g_nTimeToSleepBeforeNextDkgBroadcastMilliseconds = 0; // delay to invoke next DKG broadcast
const g_nTimeToSleepAfterImportEcdsaKeyMilliseconds = 1000;
const g_nTimeToSleepAfterRegisterSgxKeysMilliseconds = 2000;
const g_nTimeToSleepBeforeAddTokensByOwnerOnSChainMilliseconds = 5000;
const g_nTimeToSleepStopWaitForClonedTokenToAppearMilliseconds = 3000;
const g_nTimeToSleepBeforeConnectTwoChains = 3000;

const g_nTimeToSleepBeforeS2mReceiveMilliseconds = 60000;

const g_nTimeToSleepBeforeCrossChainChatTestMilliseconds = 45000;
const g_nTimeToSleepAfterChartParticipantsInitializedMilliseconds = 45000;
const g_nTimeToSleepBeforeWaitChatMessageArrivedMilliseconds = 10000;
const g_nChatMessageDeliveryWaitSteps = 0 + g_nCntAttempts;

const g_bIsTestS2S = s2b( process.env.DISABLE_S2S_TESTS ) ? false : true;
log.write( cc.info( "All S2S tests" ) + cc.debug( " are " ) + ( g_bIsTestS2S ? cc.success( "enabled" ) : cc.error( "disabled" ) ) + "\n" );

const g_bIsTestChatM2S = true;
const g_bIsTestChatS2S = g_bIsTestS2S ? false : true;
log.write( cc.info( "Custom chat S2S test" ) + cc.debug( " is " ) + ( g_bIsTestChatS2S ? cc.success( "enabled" ) : cc.error( "disabled" ) ) + "\n" );

const g_nCountOfSkaledInstancesToSkipStart = s2n( process.env.COUNT_OF_SKALED_INSTANCES_TO_SKIP_START );
log.write( cc.warning( "PLEASE NOTICE:" ) + cc.debug( " will skip starting of " ) + cc.info( g_nCountOfSkaledInstancesToSkipStart ) + cc.debug( " SKALED instances in each S-Chain" ) + "\n" );
const g_nCountOfImaAgentInstancesToSkipStart = s2n( process.env.COUNT_OF_IMA_AGENT_INSTANCES_TO_SKIP_START );
log.write( cc.warning( "PLEASE NOTICE:" ) + cc.debug( " will skip starting of " ) + cc.info( g_nCountOfImaAgentInstancesToSkipStart ) + cc.debug( " IMA Agent instances in each S-Chain" ) + "\n" );
const g_bEnabledImaMainNetTunnelling = s2b( process.env.ENABLED_IMA_MAIN_NET_TUNNELLING ) ? true : false;
log.write( cc.warning( "PLEASE NOTICE:" ) + " " + cc.info( "IMA to Main Net tunnelling" ) + cc.debug( " is " ) + ( g_bEnabledImaMainNetTunnelling ? cc.success( "enabled" ) : cc.error( "disabled" ) ) + "\n" );

const g_nTimeFrameSecondsIMA = 300;
const g_nTimeGapSecondsIMA = 10;
const g_nScanMessagePeriodSecondsIMA = 10;
const g_nPendingWorkAnalysisTimeoutSecondsIMA = 90;

const g_bImaMainNetConnectionProblemEmulationMode = s2b( process.env.ENABLED_IMA_MAIN_NET_CONNECTION_PROBLEMS ) ? true : false;
log.write( cc.warning( "PLEASE NOTICE:" ) + " " + cc.info( "IMA to Main Net connection problem emulation mode" ) + cc.debug( " is " ) + cc.yn( g_bImaMainNetConnectionProblemEmulationMode ) + "\n" );

let g_w3_main_net = null;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function wait_ENTER_key_press_on_console() {
    child_process.spawnSync( "read _ ", { shell: true, stdio: [ 0, 1, 2 ] } );
}

function quick_spawn( strCmd, cwd, joEnv ) {
    const options = { shell: true, stdio: [ 0, 1, 2 ], cwd: cwd ? cwd : null };
    if( joEnv && typeof joEnv == "object" && Object.keys( joEnv ).length > 0 )
        options.env = joEnv;
    if( g_bVerbose ) {
        log.write( cc.debug( "Will quick-spawn process with command line " ) + cc.notice( strCmd ) +
            cc.debug( " and options " ) + cc.j( options ) + cc.normal( "..." ) + "\n" );
    }
    const args = strCmd.match( /"[^"]+"|'[^']+'|\S+/g );
    const cmd = args.shift();
    const rv = child_process.spawnSync( cmd, args, options );
    if( g_bVerbose ) {
        if( rv.status == 0 )
            log.write( cc.success( "Done quick-spawn process with command line " ) + cc.notice( strCmd ) + "\n" );
        else {
            log.write( cc.error( "Done quick-spawn process with command line " ) + cc.notice( strCmd ) +
                cc.error( " and got exit status " ) + cc.j( rv.status ) + "\n" );
        }
    }
    return rv;
}

function quick_spawn_async( strCmd, cwd, joEnv ) {
    const options = { shell: true, stdio: [ 0, 1, 2 ], cwd: cwd ? cwd : null }; // , "detached": true
    if( joEnv && typeof joEnv == "object" && Object.keys( joEnv ).length > 0 )
        options.env = joEnv;
    if( g_bVerbose ) {
        log.write( cc.debug( "Will async-quick-spawn process with command line " ) + cc.notice( strCmd ) +
            cc.debug( " and options " ) + cc.j( options ) + cc.normal( "..." ) + "\n" );
    }
    const args = strCmd.match( /"[^"]+"|'[^']+'|\S+/g );
    const cmd = args.shift();
    const rv = child_process.spawn( cmd, args, options );
    if( g_bVerbose )
        log.write( cc.success( "Done async-quick-spawn process with command line " ) + cc.notice( strCmd ) + "\n" );
    return rv;
}

let g_bInsideEndOfTest = false;
async function end_of_test( nExitCode ) {
    if( g_bInsideEndOfTest )
        throw new Error( "Already in test finish handler" );
    g_bInsideEndOfTest = true;
    if( g_bVerbose ) {
        const s = ( nExitCode == 0 )
            ? cc.success( "SUCCESSFUL END OF TEST" )
            : ( cc.fatal( "FAILED, UNSUCCESSFUL END OF TEST" ) + cc.error( " exit code is " ) + cc.warning( nExitCode ) );
        log.write( "\n\n" + s + "\n\n" );
    }
    //
    //
    if( g_bAskToFinishTest ) {
        log.write( "\n\n" +
            cc.normal( "Press " ) + cc.attention( "<ENTER>" ) + cc.normal( " to finish test" ) +
            cc.normal( "..." ) + "\n\n" );
        wait_ENTER_key_press_on_console();
    }
    log.write( cc.normal( "Finishing test..." ) + "\n" );
    //
    //
    const fnProtected = async function( fnExec ) {
        try {
            await fnExec();
        } catch ( err ) {
            log.write( cc.fatal( "CRITICAL ERROR:" ) + cc.error( " Exception while finishing test: " ) + cc.warning( err.toString() ) + "\n" );
        }
    };
    // if( g_bAtExitStopIMA && ( !g_bDockerIMA ) )
    if( g_bAtExitStopIMA ) {
        await fnProtected( async function() { await all_ima_agents_stop(); await all_tunnels_stop(); } );
        await fnProtected( async function() { await all_ima_network_browsers_stop(); } );
    }
    if( g_bAtExitStopSC )
        await fnProtected( async function() { await all_skaled_nodes_stop(); } );
    if( g_bAtExitStopMN )
        await fnProtected( async function() { await mainnet_stop(); } );
    log.write( cc.normal( "Will exit test with code " ) + cc.info( nExitCode ) + cc.normal( "..." ) + "\n" );
    if( nExitCode != 0 )
        print_logs_at_exit(); // print all the logs on error only
    // if( g_bAtExitStopIMA && g_bDockerIMA ) {
    //     await fnProtected( async function() { await all_ima_agents_stop(); await all_tunnels_stop(); } );
    //     await fnProtected( async function() { await all_ima_network_browsers_stop(); } );
    // }
    log.write( cc.normal( "Exiting test with code " ) + cc.info( nExitCode ) + cc.normal( "..." ) + "\n" );
    process.exit( nExitCode ); // see https://tldp.org/LDP/abs/html/exitcodes.html
}

function print_empty_space_before_log() {
    for( let i = 0; i < 20; ++ i )
        log.write( "\n" );
}
function print_log_at_exit( strPath ) {
    print_empty_space_before_log();
    log.write( cc.bright( "Log at exit:" ) + " " + cc.attention( strPath ) + "\n" );
    try {
        const strCommand = "cat " + strPath;
        const strWorkingDirectory = __dirname;
        const joEnv = {
            "PATH": g_strRecommendedShellPATH,
            "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
        };
        child_process.execSync(
            strCommand,
            {
                cwd: "" + strWorkingDirectory,
                stdio: "inherit",
                env: joEnv
            } );
    } catch ( err ) {
        log.write( cc.fatal( "CRITICAL ERROR:" ) +
            " " + cc.error( "Failed print content of" ) + " " +
            cc.attention( strPath ) + cc.error( ":" ) + " " +
            cc.warning( err.toString() ) + "\n" );
    }
}
function print_logs_at_exit() {
    if( g_bDockerIMA ) {
        print_empty_space_before_log();
        log.write( cc.bright( "IMA docker images lookup:" ) + "\n" );
        quick_spawn( "docker images" );
        //
        print_empty_space_before_log();
        log.write( cc.bright( "IMA docker containers lookup:" ) + "\n" );
        quick_spawn( "docker ps" );
    }
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        for( let idxNode = 0; idxNode < g_arrChains[idxChain].arrNodeDescriptions.length; ++ idxNode ) {
            if( g_bDockerIMA ) {
                print_empty_space_before_log();
                log.write(
                    cc.bright( "At-shutdown log of IMA docker container " ) +
                    cc.sunny( schain_ima_agent_get_docker_container_name( idxChain, idxNode ) ) +
                    cc.bright( " at exit:" ) + "\n" );
                const cwd = schain_ima_agent_get_docker_cwd( idxChain, idxNode );
                const env = schain_ima_agent_get_env( idxChain, idxNode );
                quick_spawn( // IMA Agent as docker container
                    "docker logs " + schain_ima_agent_get_docker_container_name( idxChain, idxNode ),
                    cwd,
                    env
                );
            } else
                print_log_at_exit( path.join( __dirname, "imaAgent_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 ) + ".log" ) );

            print_log_at_exit( path.join( __dirname, "imaNetworkBrowser_" + zeroPad( idxChain, 2 ) + ".log" ) );
        }
    }
    if( g_bEnabledImaMainNetTunnelling ) {
        for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
            if( ! g_arrChains[idxChain].isStartEnabled )
                continue;
            for( let idxNode = 0; idxNode < g_arrChains[idxChain].arrNodeDescriptions.length; ++ idxNode )
                print_log_at_exit( path.join( __dirname, "imaMainNetTunnel_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 ) + ".log" ) );

        }
    }
    print_log_at_exit( path.join( __dirname, "tm.log" ) );
    print_log_at_exit( path.join( __dirname, "redis.log" ) );
    print_log_at_exit( path.join( "../local_sgxwallet_output_log.txt" ) );
    print_log_at_exit( path.join( "../local_mainnet_output_log.txt" ) );
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        for( let idxNode = 0; idxNode < g_arrChains[idxChain].arrNodeDescriptions.length; ++ idxNode )
            print_log_at_exit( path.join( __dirname, "skaled_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 ) + ".log" ) );
    }
    print_empty_space_before_log();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const g_arrEcdsaKeysCache = JSON.parse( fs.readFileSync( normalizePath( path.join( __dirname, "../s_chain_gen/g_arrEcdsaKeysCache.json" ) ), "utf8" ) );

function get_cached_ecdsa_key_at( idx ) {
    if( idx < 0 || idx >= g_arrEcdsaKeysCache.length ) {
        log.write( cc.fatal( "FATAL ERROR:" ) + cc.error( "Cannot get cached ECDSA key at index " ) + cc.warning( idx ) + cc.error( "(have " ) + cc.warning( g_arrEcdsaKeysCache.length ) + cc.error( " keys in cache)" ) + "\n" );
        process.exit( 55 );
    }
    const joKey = JSON.parse( JSON.stringify( g_arrEcdsaKeysCache[idx] ) );
    joKey.sgxName = compose_sgx_key_name( idx );
    return joKey;
}

function compose_sgx_key_name( idx ) {
    let s = "" + idx;
    while( s.length < 3 )
        s = "0" + s;
    return "NEK:1" + s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fix_ethers_js_abi_errors( key, value ) {
    if( key == "outputs" || key == "inputs" ) {
        try {
            for( let j = 0; j < value.length; ++ j ) {
                try {
                    if( ! ( "name" in value[j] ) )
                        value[j].name = "";

                } catch ( err ) {
                }
            }
        } catch ( err ) {
        }
    }
}

function traverse_json( o, func ) {
    for( const i in o ) {
        func.apply( this, [ i, o[i] ] );
        if( o[i] !== null && typeof( o[i] ) == "object" )
            traverse_json( o[i], func );

    }
}

const sleep = ( milliseconds ) => { return new Promise( resolve => setTimeout( resolve, milliseconds ) ); };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function parseIntOrHex( s ) {
    if( typeof s != "string" )
        return parseInt( s );
    s = s.trim();
    if( s.length > 2 && s[0] == "0" && ( s[1] == "x" || s[1] == "X" ) )
        return parseInt( s, 16 );
    return parseInt( s, 10 );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isNumericString( s ) {
    if( typeof s != "string" )
        return false; // s is not string
    return ( !isNaN( s ) ) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           ( !isNaN( parseFloat( s ) ) ); // ...and ensure strings of whitespace fail
}

function s2n( s, nDefault ) {
    nDefault = nDefault || 0;
    if( ! s )
        return nDefault;
    if( typeof s != "string" )
        return nDefault;
    return parseIntOrHex( s );
}

function s2b( s ) {
    if( ! s )
        return false;
    s = s.toString().toLowerCase().trim();
    if( ! s )
        return false;
    if( s[0] == "f" || s[0] == "n" ) // false, no
        return false;
    if( s[0] == "t" || s[0] == "y" ) // true, yes
        return true;
    if( s == "on" )
        return true;
    if( s == "off" )
        return false;
    if( isNumericString( s ) )
        return parseIntOrHex( s ) ? true : false;
    return Boolean( s );
}

function zeroPad( num, places ) {
    const zero = places - num.toString().length + 1;
    return Array( +( zero > 0 && zero ) ).join( "0" ) + num;
}

function normalizePath( strPath ) {
    if( ! strPath )
        return strPath;
    strPath = strPath.replace( /^~/, os.homedir() );
    strPath = path.normalize( strPath );
    strPath = path.resolve( strPath );
    return strPath;
}

function findExistingPath( variants, fnCheckExistence, bLogError ) {
    if( variants == null || variants == undefined )
        return null;
    bLogError = ( bLogError == undefined ) ? true : ( bLogError ? true : false );
    if( typeof variants == "string" ) {
        const strPathOriginal = variants;
        const strPath = normalizePath( strPathOriginal );
        if( fnCheckExistence( strPath ) )
            return strPath;
        if( bLogError ) {
            log.write( cc.error( "File system path " ) + cc.info( strPathOriginal ) +
                cc.error( " does not exist(was normalized to " ) + cc.info( strPath ) + cc.error( ")" ) + "\n" );
        }
        return null;
    }
    const cnt = variants.length;
    for( let i = 0; i < cnt; ++ i ) {
        const strPathOriginal = variants[i];
        const strPath = normalizePath( strPathOriginal );
        if( fnCheckExistence( strPath ) )
            return strPath;
    }
    if( bLogError ) {
        log.write( cc.error( "File system paths " ) + cc.j( variants ) +
            cc.error( " does not exist, nothing to choose from)" ) + "\n" );
    }
    return null;
}

function findExistingFilePath( variants, bLogError ) {
    return findExistingPath( variants, fileExists, bLogError );
}
function findExistingDirPath( variants, bLogError ) {
    return findExistingPath( variants, dirExists, bLogError );
}

function append_to_array( arrSrc, arrDst ) {
    for( let i = 0; i < arrSrc.length; ++ i )
        arrDst.push( arrSrc[i] );
}
function copy_array( arrSrc, arrDst ) {
    arrDst.splice( 0, arrDst.length );
    append_to_array( arrSrc, arrDst );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const g_strFolderMultiNodeDeployment = findExistingDirPath( path.join( __dirname, "../s_chain_gen" ) );
if( g_bVerbose )
    log.write( cc.normal( "Assuming " ) + cc.sunny( "Multi Node Deployment" ) + cc.normal( " is located at " ) + cc.info( g_strFolderMultiNodeDeployment ) + "\n" );

let g_bSeparatedImaAgentMode = process.env.SEPARATED_IMA_AGENT_MODE ? true : false;
if( g_bVerbose )
    log.write( cc.normal( "Assuming " ) + cc.sunny( "New Separated IMA Agent" ) + cc.normal( " mode is " ) + cc.yn( g_bSeparatedImaAgentMode ) + "\n" );

let g_strFolderRepoImaAgent = process.env.IMA_AGENT_ROOT_DIR
    ? findExistingDirPath( process.env.IMA_AGENT_ROOT_DIR )
    : findExistingDirPath( [ path.join( __dirname, "../ima-agent" ), path.join( __dirname, "../../../ima-agent" ) ] );
if( ! g_strFolderRepoImaAgent ) {
    g_bSeparatedImaAgentMode = false;
    g_strFolderRepoImaAgent =
        findExistingDirPath( [ path.join( __dirname, "../IMA" ), path.join( __dirname, "../../../IMA" ) ] );
}
const g_strFolderRepoImaContracts = g_bSeparatedImaAgentMode
    ? path.join( g_strFolderRepoImaAgent, "IMA" )
    : ( "" + g_strFolderRepoImaAgent );
if( g_bVerbose ) {
    log.write( cc.normal( "Assuming " ) + cc.sunny( "IMA Agent" ) + cc.normal( " repo is " ) + cc.info( g_strFolderRepoImaAgent ) + "\n" );
    log.write( cc.normal( "Assuming " ) + cc.sunny( "IMA Contracts" ) + cc.normal( " repo is " ) + cc.info( g_strFolderRepoImaContracts ) + "\n" );
}
const g_strFolderImaProxy = "" + g_strFolderRepoImaContracts + "/proxy";
const g_strFolderImaAgentBase = "" + g_strFolderRepoImaAgent + ( g_bSeparatedImaAgentMode ? "/src" : "/agent" );
let g_strFolderImaAgent = "" + g_strFolderImaAgentBase;
let g_strImaJsExt = ".mjs";
let g_isImaAgentTypeScriptBased = false;
if( dirExists( g_strFolderImaAgent + "/build" ) ) {
    g_isImaAgentTypeScriptBased = true;
    g_strFolderImaAgent += "/build";
    g_strImaJsExt = ".js";
}
if( g_bVerbose )
    log.write( cc.normal( "Assuming " ) + cc.sunny( "IMA Agent" ) + cc.normal( " is based on " ) + cc.info( g_isImaAgentTypeScriptBased ? "TypeScript" : "JavaScript" ) + "\n" );

// IMA ABI files
const g_strPathImaAbiMN = g_strFolderImaProxy + "/data/proxyMainnet.json";

const g_strFolderTestTokens = path.join( __dirname, "../test_tokens" );
if( g_bVerbose )
    log.write( cc.normal( "Assuming " ) + cc.sunny( "Test Tokens" ) + cc.normal( " located at " ) + cc.info( g_strFolderTestTokens ) + "\n" );
const g_strFolderTestTokensData = path.join( g_strFolderTestTokens, "data" );
let g_joAbiTestTokensMN = null;
let g_joAbiTestTokensSC = null;

const g_strFolderAppCacheBin = findExistingDirPath( path.join( __dirname, "../app_cache/bin" ) );
if( g_bVerbose )
    log.write( cc.normal( "Assuming " ) + cc.sunny( "app_cache" ) + cc.normal( " is located at " ) + cc.info( g_strFolderAppCacheBin ) + "\n" );

if( strUbuntuVersion ) {
    const strFolderAppCacheBin_source = findExistingDirPath( path.join( __dirname, "../app_cache/bin" + "_" + strUbuntuVersion ) );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Will copy cached binaries from " ) + cc.attention( strFolderAppCacheBin_source ) +
            cc.debug( " to " ) + cc.info( strFolderAppCacheBin_source ) +
            cc.debug( "..." ) + "\n" );
    }
    child_process.execSync( "yes | cp -r " + strFolderAppCacheBin_source + "/* " + g_strFolderAppCacheBin );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Will list cached binaries in " ) + cc.attention( strFolderAppCacheBin_source ) +
            cc.debug( "..." ) + "\n" );
    }
    const arrCachedBinaries = child_process.execSync( "ls " + g_strFolderAppCacheBin ).toString().trim().split( "\n" );
    if( arrCachedBinaries.length == 0 ) {
        log.write(
            cc.fatal( "FATAL:" ) + cc.error( " Failed to copy cached binaries from " ) + cc.attention( strFolderAppCacheBin_source ) +
            cc.error( " to " ) + cc.warning( strFolderAppCacheBin_source ) +
            "\n" );
        end_of_test( 28 );
    }
    if( g_bVerbose ) {
        log.write(
            cc.success( "Done, cached binaries copied to " ) + cc.attention( g_strFolderAppCacheBin ) +
            cc.success( ", got: " ) + cc.j( arrCachedBinaries ) + "\n" );
    }
}

// {
//     private_key: "1016316fe598b437cfd518c02f67467385b018e61fd048325c7e7c9e5e07cd2a",
//     address: "0xa68f946090c600eda6f139783077ee802afeb990",
//     name: "Aldo",
//     public_key: "bfb1bf43d3c6951923b2ab348593c7ae34fc5dcac757d0785f57c3f82ca43a741c709fe4a58053eb676b6f82fff247805808796892acec408c279af7aa93e54e"
// },
// {
//     private_key: "14e7e34f77749217477a6c36ddff3f5b5f217c67782dd7cc4ec4c0f9997f968b",
//     address: "0x88fd5e01078629cc194c933d9631b9448fe10b1d",
//     name: "Bear",
//     public_key: "1ba2bfbd7f4c9251c4cd88ce31fbef66f0d6855a98fafff8fbfe3b6bcb37d26bdbf31adba8030b56264e4336824023badb4861cd15293b7d124168ddd15763aa"
// },

/*
function compute_chain_id_from_schain_name( strName ) {
    let h = global.g_w3mod.utils.soliditySha3( strName );
    h = remove_starting_0x( h ).toLowerCase();
    while( h.length < 64 )
        h = "0" + h;
    h = h.substr( 0, 14 );
    return "0x" + h;
}
const g_arrChainNaming = [
    { name: "Bob1000", cid: compute_chain_id_from_schain_name( "Bob1000" ) }, // 0x975a4814cff8b9 / 975a4814cff8b9fd85b48879dade195028650b0a23f339ca81bd3b1231f72974
    { name: "Bob1001", cid: compute_chain_id_from_schain_name( "Bob1001" ) }, // 0xde9b5e1c7bac0a / de9b5e1c7bac0a60f917397dfab6ead3f6441acf0399ec81145568874dd829e9
    { name: "Bob1002", cid: compute_chain_id_from_schain_name( "Bob1002" ) }, // 0xc1f03a6ab1cc11 / c1f03a6ab1cc11851e91e0916d41f6094056a27083bef4b91fa9ecf2d3e82aab
    { name: "Bob1003", cid: compute_chain_id_from_schain_name( "Bob1003" ) }, // 0x1bda0b7c239816 / 1bda0b7c23981640bd35c7f6a70485002643fe79be2611f91689d9e2e3ebea03
    { name: "Bob1004", cid: compute_chain_id_from_schain_name( "Bob1004" ) }, // 0x440eb05c299390 / 440eb05c2993907e132063d5303f6eecb896782de42b25dbd771269d02d3a785
    { name: "Bob1005", cid: compute_chain_id_from_schain_name( "Bob1005" ) }, // 0x0846bfa594c891 / 0846bfa594c8919f9efbdebc8f875b48da66e26bd4807110bba2a93d7ef2b0cc
    { name: "Bob1006", cid: compute_chain_id_from_schain_name( "Bob1006" ) }, // 0xebd56b3f563b1e / ebd56b3f563b1e4401c8e39b7e24ece0bfee26066d1279995f21309fea144c29
    { name: "Bob1007", cid: compute_chain_id_from_schain_name( "Bob1007" ) } // 0xbfb3f7408e72d8 / bfb3f7408e72d883f4086cff38989e1868346f1580f966c7f0922b91123da57e
];
*/

const g_arrChainNaming = [
    { name: "Bob1000", cid: 1000 },
    { name: "Bob1001", cid: 1001 },
    { name: "Bob1002", cid: 1002 },
    { name: "Bob1003", cid: 1003 },
    { name: "Bob1004", cid: 1004 },
    { name: "Bob1005", cid: 1005 },
    { name: "Bob1006", cid: 1006 },
    { name: "Bob1007", cid: 1007 }
];

log.write( cc.debug( "Chain naming templates are: " ) + cc.j( g_arrChainNaming ) + "\n" );

const g_cntSyncNodesPerChain = 1;

// IMPORTANT:
// We assume all S-Chains have same number for skaled nodes for now.
// This is limitation of both s_chain_gen/init.js and this script(and s_chain_gen/init.sh too, of course).
// That is why we have g_idxMostOftenUsedSChain global variable.
const g_arrChains = [
    {
        idxChain: 0,
        isStartEnabled: true,
        cid: g_arrChainNaming[0].cid,
        name: g_arrChainNaming[0].name,
        joImaAbiSC: null,
        arrNodeDescriptions: [
            initNodeDescription( process.env.URL_W3_NODE_00 || "http://127.0.0.1:2164", 0, 0, g_arrChainNaming[0].cid, 1112, "Aldo" ),
            initNodeDescription( process.env.URL_W3_NODE_01 || "http://127.0.0.2:2264", 0, 1, g_arrChainNaming[0].cid, 1113, "Bear" ),
            initNodeDescription( process.env.URL_W3_NODE_02 || "http://127.0.0.3:2364", 0, 2, g_arrChainNaming[0].cid, 1114, "John" ),
            initNodeDescription( process.env.URL_W3_NODE_03 || "http://127.0.0.4:2464", 0, 3, g_arrChainNaming[0].cid, 1115, "Seed" )
            // initNodeDescription( process.env.URL_W3_NODE_04 || "http://127.0.0.5:2564",  0,  4, g_arrChainNaming[0].cid, 1116, "Tron" ),
            // initNodeDescription( process.env.URL_W3_NODE_05 || "http://127.0.0.6:2664",  0,  5, g_arrChainNaming[0].cid, 1117, "Neon" ),
            // initNodeDescription( process.env.URL_W3_NODE_06 || "http://127.0.0.7:2764",  0,  6, g_arrChainNaming[0].cid, 1118, "Lion" ),
            // initNodeDescription( process.env.URL_W3_NODE_07 || "http://127.0.0.8:2864",  0,  7, g_arrChainNaming[0].cid, 1119, "Bonk" ),
            // initNodeDescription( process.env.URL_W3_NODE_08 || "http://127.0.0.9:2964",  0,  8, g_arrChainNaming[0].cid, 1120, "Gold" ),
            // initNodeDescription( process.env.URL_W3_NODE_09 || "http://127.0.0.10:3064", 0,  9, g_arrChainNaming[0].cid, 1121, "Iron" ),
            // initNodeDescription( process.env.URL_W3_NODE_10 || "http://127.0.0.11:3164", 0, 10, g_arrChainNaming[0].cid, 1122, "Sims" ),
            // initNodeDescription( process.env.URL_W3_NODE_11 || "http://127.0.0.12:3264", 0, 11, g_arrChainNaming[0].cid, 1123, "Zeon" ),
            // initNodeDescription( process.env.URL_W3_NODE_12 || "http://127.0.0.13:3364", 0, 12, g_arrChainNaming[0].cid, 1124, "Daft" ),
            // initNodeDescription( process.env.URL_W3_NODE_13 || "http://127.0.0.14:3464", 0, 13, g_arrChainNaming[0].cid, 1125, "Punk" ),
            // initNodeDescription( process.env.URL_W3_NODE_14 || "http://127.0.0.15:3564", 0, 14, g_arrChainNaming[0].cid, 1126, "Ally" ),
            // initNodeDescription( process.env.URL_W3_NODE_15 || "http://127.0.0.16:3664", 0, 15, g_arrChainNaming[0].cid, 1127, "Trez" )
        ],
        arrSyncNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_02 || "http://127.0.0.3:2364", 0, 2, g_arrChainNaming[0].cid, 1114, "John" )
            //
            initNodeDescription( process.env.URL_W3_NODE_04 || "http://127.0.0.5:2564", 0, 4, g_arrChainNaming[0].cid, 1116, "Tron" )
            // initNodeDescription( process.env.URL_W3_NODE_17 || "http://127.0.0.16:3764", 0, 15, g_arrChainNaming[0].cid, 1127, "Barbie" )
        ],
        arrAssignedNodeIndices: []
    },
    {
        idxChain: 1,
        isStartEnabled: true,
        cid: g_arrChainNaming[1].cid,
        name: g_arrChainNaming[1].name,
        joImaAbiSC: null,
        arrNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_03 || "http://127.0.0.4:2464", 1, 0, g_arrChainNaming[1].cid, 1115, "Seed" ),
            // initNodeDescription( process.env.URL_W3_NODE_04 || "http://127.0.0.5:2564", 1, 1, g_arrChainNaming[1].cid, 1116, "Tron" )
            //
            initNodeDescription( process.env.URL_W3_NODE_05 || "http://127.0.0.6:2664", 1, 0, g_arrChainNaming[0].cid, 1117, "Neon" ),
            initNodeDescription( process.env.URL_W3_NODE_06 || "http://127.0.0.7:2764", 1, 1, g_arrChainNaming[0].cid, 1118, "Lion" ),
            initNodeDescription( process.env.URL_W3_NODE_07 || "http://127.0.0.8:2864", 1, 2, g_arrChainNaming[0].cid, 1119, "Bonk" ),
            initNodeDescription( process.env.URL_W3_NODE_08 || "http://127.0.0.9:2964", 1, 3, g_arrChainNaming[0].cid, 1120, "Gold" )
        ],
        arrSyncNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_05 || "http://127.0.0.6:2664", 1, 2, g_arrChainNaming[1].cid, 1117, "Neon" )
            //
            initNodeDescription( process.env.URL_W3_NODE_09 || "http://127.0.0.10:3064", 1, 4, g_arrChainNaming[0].cid, 1121, "Iron" )
        ],
        arrAssignedNodeIndices: []
    },
    {
        idxChain: 2,
        isStartEnabled: false,
        cid: g_arrChainNaming[2].cid,
        name: g_arrChainNaming[2].name,
        joImaAbiSC: null,
        arrNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_06 || "http://127.0.0.7:2764", 2, 0, g_arrChainNaming[2].cid, 1118, "Lion" ),
            // initNodeDescription( process.env.URL_W3_NODE_07 || "http://127.0.0.8:2864", 2, 1, g_arrChainNaming[2].cid, 1119, "Bonk" )
            //
            initNodeDescription( process.env.URL_W3_NODE_10 || "http://127.0.0.11:3164", 2, 0, g_arrChainNaming[2].cid, 1122, "Ken" ),
            initNodeDescription( process.env.URL_W3_NODE_11 || "http://127.0.0.12:3264", 2, 1, g_arrChainNaming[2].cid, 1123, "Jason" ),
            initNodeDescription( process.env.URL_W3_NODE_12 || "http://127.0.0.13:3364", 2, 2, g_arrChainNaming[2].cid, 1124, "Elephant" ),
            initNodeDescription( process.env.URL_W3_NODE_13 || "http://127.0.0.14:3464", 2, 3, g_arrChainNaming[2].cid, 1125, "Rat" )
        ],
        arrSyncNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_08 || "http://127.0.0.9:2964", 2, 3, g_arrChainNaming[2].cid, 1120, "Gold" )
            //
            initNodeDescription( process.env.URL_W3_NODE_14 || "http://127.0.0.15:3564", 2, 4, g_arrChainNaming[2].cid, 1126, "Cherry" )
        ],
        arrAssignedNodeIndices: []
    },
    {
        idxChain: 3,
        isStartEnabled: false,
        cid: g_arrChainNaming[3].cid,
        name: g_arrChainNaming[3].name,
        joImaAbiSC: null,
        arrNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_09 || "http://127.0.0.10:3064", 3, 0, g_arrChainNaming[3].cid, 1121, "Iron" ),
            // initNodeDescription( process.env.URL_W3_NODE_10 || "http://127.0.0.11:3164", 3, 1, g_arrChainNaming[3].cid, 1122, "Sims" )
            //
            initNodeDescription( process.env.URL_W3_NODE_15 || "http://127.0.0.16:3664", 3, 0, g_arrChainNaming[3].cid, 1127, "Sara" ),
            initNodeDescription( process.env.URL_W3_NODE_16 || "http://127.0.0.17:3764", 3, 1, g_arrChainNaming[3].cid, 1128, "Moises" ),
            initNodeDescription( process.env.URL_W3_NODE_17 || "http://127.0.0.18:3864", 3, 2, g_arrChainNaming[3].cid, 1129, "Aaron" ),
            initNodeDescription( process.env.URL_W3_NODE_18 || "http://127.0.0.19:3964", 3, 3, g_arrChainNaming[3].cid, 1130, "Mouse" )
        ],
        arrSyncNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_11 || "http://127.0.0.12:3264", 3, 2, g_arrChainNaming[3].cid, 1123, "Zeon" )
            //
            initNodeDescription( process.env.URL_W3_NODE_19 || "http://127.0.0.20:4064", 3, 4, g_arrChainNaming[3].cid, 1131, "Rabbit" )
        ],
        arrAssignedNodeIndices: []
    },
    {
        idxChain: 4,
        isStartEnabled: false,
        cid: g_arrChainNaming[4].cid,
        name: g_arrChainNaming[4].name,
        joImaAbiSC: null,
        arrNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_12 || "http://127.0.0.13:3364", 4, 0, g_arrChainNaming[4].cid, 1124, "Daft" ),
            // initNodeDescription( process.env.URL_W3_NODE_13 || "http://127.0.0.14:3464", 4, 1, g_arrChainNaming[4].cid, 1125, "Punk" )
            //
            initNodeDescription( process.env.URL_W3_NODE_20 || "http://127.0.0.21:4064", 4, 0, g_arrChainNaming[4].cid, 1132, "Black" ),
            initNodeDescription( process.env.URL_W3_NODE_21 || "http://127.0.0.22:4064", 4, 1, g_arrChainNaming[4].cid, 1133, "White" ),
            initNodeDescription( process.env.URL_W3_NODE_22 || "http://127.0.0.23:4064", 4, 2, g_arrChainNaming[4].cid, 1134, "Yellow" ),
            initNodeDescription( process.env.URL_W3_NODE_23 || "http://127.0.0.24:4064", 4, 3, g_arrChainNaming[4].cid, 1135, "Orange" )
        ],
        arrSyncNodeDescriptions: [
            // initNodeDescription( process.env.URL_W3_NODE_14 || "http://127.0.0.15:3564", 4, 2, g_arrChainNaming[4].cid, 1126, "Ally" )
            //
            initNodeDescription( process.env.URL_W3_NODE_24 || "http://127.0.0.25:4064", 4, 4, g_arrChainNaming[4].cid, 1136, "Magenta" )
        ],
        arrAssignedNodeIndices: []
    }
];
reset_global_serial_indices_in_global_chains_array();
reset_port_numbers_in_global_chains_array();
prepare_for_ima_docker_mode_global_chains_array();
const g_idxMostOftenUsedSChain = 0; // S-Chain which is tested most for purposes line Main Net to one S-Chain IMA transfers

for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
    log.write(
        cc.debug( "Did initialized test chain name " ) + cc.info( g_arrChains[idxChain].name ) +
        cc.debug( " with chain ID " ) + cc.attention( g_arrChains[idxChain].cid ) +
        cc.debug( " and " ) + cc.info( g_arrChains[idxChain].arrNodeDescriptions.length ) + cc.debug( " node(s), startup is " ) +
        ( g_arrChains[idxChain].isStartEnabled ? cc.success( "enabled" ) : cc.error( "disabled" ) ) + "\n" );
}

let g_joChainEventInfoSM = null;
const g_mapEvBroadcastAndKeyShare = {}; // assigned node index (BroadcastAndKeyShare.fromNode) -> data of BroadcastAndKeyShare event

function getWeb3FromURL( strURL ) {
    let w3 = null;
    try {
        const u = cc.safeURL( strURL );
        const strProtocol = u.protocol.trim().toLowerCase().replace( ":", "" ).replace( "/", "" );
        if( strProtocol == "ws" || strProtocol == "wss" ) {
            const w3ws = new g_w3mod.providers.WebsocketProvider( strURL, {
                // see: https://github.com/ChainSafe/web3.js/tree/1.x/packages/web3-providers-ws#usage
                clientConfig: {
                    // // if data too large:
                    // maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
                    // maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
                    // keep a connection alive
                    keepalive: true,
                    keepaliveInterval: 200000 // ms
                },
                reconnect: { // enable auto reconnection
                    auto: true,
                    delay: 5000, // ms
                    maxAttempts: 10000000, // 10 million times
                    onTimeout: false
                }
            } );
            w3 = new g_w3mod( w3ws );
        } else {
            const w3http = new g_w3mod.providers.HttpProvider( strURL );
            w3 = new g_w3mod( w3http );
        }
    } catch ( err ) {
        log.write( cc.fatal( "CRITICAL ERROR:" ) + cc.error( " Failed to create " ) +
            cc.attention( "Web3" ) + cc.error( " connection to " ) + cc.info( strURL ) +
            cc.error( ": " ) + cc.warning( err.toString() ) + "\n" );
        w3 = null;
    }
    return w3;
}

function getNonEmptyString( s, defVal ) {
    if( s != null && s != undefined && typeof s == "string" && s.length > 0 )
        return s;
    return defVal;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class ProcessController {
    // see https://stackoverflow.com/questions/25323703/nodejs-execute-command-in-background-and-forget
    // see https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
    constructor( strCommand, arrArgs, strLogPath, nListeningPort, cwd, env ) {
        this.strCommand = strCommand ? "" + strCommand : "";
        this.arrArgs = arrArgs || [];
        this.strLogPath = strLogPath ? "" + strLogPath : "";
        this.nListeningPort = nListeningPort ? ( 0 + parseInt( nListeningPort ) ) : null;
        this.cwd = cwd ? cwd : null;
        this.pidCached = null;
        this.pidDetached = null;
        this.child = null;
        this.redirectedStreamOut = null;
        this.redirectedStreamErr = null;
        this.strColorizedProcessDescription = cc.notice( "\"" ) + cc.note( this.strCommand ) + cc.notice( "\"" );
        this.strShortProcessDescription = "" + this.strColorizedProcessDescription;
        this.env = env || null;
    }
    close_redirected_streams() {
        if( this.redirectedStreamOut ) {
            try { this.redirectedStreamOut.close(); } catch ( err ) { }
            this.redirectedStreamOut = null;
        }
        if( this.redirectedStreamErr ) {
            try { this.redirectedStreamErr.close(); } catch ( err ) { }
            this.redirectedStreamErr = null;
        }
    }
    async stop( sig ) {
        const self = this;
        if( ! ( self.pidCached != null || self.pidDetached != null ) ) {
            log.write( cc.fatal( "WARNING:" ) + " " +
                cc.warning( "No way to stop process " ) + self.strColorizedProcessDescription +
                cc.warning( " because PID is unknown for it, it may still run or already was stopped before" ) +
                "\n" );
        }
        const pid = ( self.pidCached != null ) ? self.pidCached : self.pidDetached;
        const strType = ( self.pidCached != null ) ? "contained" : ( ( self.pidDetached != null ) ? "detached" : "unknown-process-type" );
        let cntKillSuccess = 0;
        if( pid != null ) {
            if( g_bVerbose ) {
                log.write( cc.notice( "NOTICE:" ) + " " +
                    cc.debug( "Will kill " + strType + " PID " ) + cc.info( pid ) +
                    cc.debug( " of process " ) + self.strColorizedProcessDescription +
                    "\n" );
            }
            try {
                tree_kill( pid );
                ++ cntKillSuccess;
                if( g_bVerbose ) {
                    log.write( cc.notice( "NOTICE:" ) + " " +
                        cc.success( "1st Tree-kill " + strType + " PID " ) + cc.info( pid ) +
                        cc.success( " of process " ) + self.strShortProcessDescription +
                        cc.success( " passed OKay" ) +
                        "\n" );
                }
            } catch ( err ) {
                log.write( cc.fatal( "ERROR:" ) + " " +
                    cc.error( "1st Tree-kill failed for " + strType + " PID " ) + cc.info( pid ) +
                    cc.error( " of process " ) + self.strShortProcessDescription +
                    cc.error( " with error: " ) + cc.warning( err.toString() ) +
                    "\n" );
            }
            try {
                tree_kill( pid );
                ++ cntKillSuccess;
                if( g_bVerbose ) {
                    log.write( cc.notice( "NOTICE:" ) + " " +
                        cc.success( "2nd Tree-kill " + strType + " PID " ) + cc.info( pid ) +
                        cc.success( " of process " ) + self.strShortProcessDescription +
                        cc.success( " passed OKay" ) +
                        "\n" );
                }
            } catch ( err ) {
                if( cntKillSuccess == 0 ) {
                    log.write( cc.fatal( "ERROR:" ) + " " +
                        cc.error( "2nd Tree-kill failed for " + strType + " PID " ) + cc.info( pid ) +
                        cc.error( " of process " ) + self.strShortProcessDescription +
                        cc.error( " with error: " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
            }
            try {
                await fkill( pid );
                ++ cntKillSuccess;
                if( g_bVerbose ) {
                    log.write( cc.notice( "NOTICE:" ) + " " +
                        cc.success( "1st F-kill " + strType + " PID " ) + cc.info( pid ) +
                        cc.success( " of process " ) + self.strShortProcessDescription +
                        cc.success( " passed OKay" ) +
                        "\n" );
                }
            } catch ( err ) {
                if( cntKillSuccess == 0 ) {
                    log.write( cc.fatal( "ERROR:" ) + " " +
                        cc.error( "1st F-kill failed for " + strType + " PID " ) + cc.info( pid ) +
                        cc.error( " of process " ) + self.strShortProcessDescription +
                        cc.error( " with error: " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
            }
            try {
                await fkill( pid );
                ++ cntKillSuccess;
                if( g_bVerbose ) {
                    log.write( cc.notice( "NOTICE:" ) + " " +
                        cc.success( "2nd F-kill " + strType + " PID " ) + cc.info( pid ) +
                        cc.success( " of process " ) + self.strShortProcessDescription +
                        cc.success( " passed OKay" ) +
                        "\n" );
                }
            } catch ( err ) {
                if( cntKillSuccess == 0 ) {
                    log.write( cc.fatal( "ERROR:" ) + " " +
                        cc.error( "2nd F-kill failed for " + strType + " PID " ) + cc.info( pid ) +
                        cc.error( " of process " ) + self.strShortProcessDescription +
                        cc.error( " with error: " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
            }
            try {
                if( self.child )
                    self.child.kill( sig ? sig : "SIGKILL" ); // "SIGHUP"
                ++ cntKillSuccess;
                if( g_bVerbose ) {
                    log.write( cc.notice( "NOTICE:" ) + " " +
                        cc.success( "C-kill " + strType + " PID " ) + cc.info( pid ) +
                        cc.success( " of process " ) + self.strShortProcessDescription +
                        cc.success( " passed OKay" ) +
                        "\n" );
                }
            } catch ( err ) {
                if( cntKillSuccess == 0 ) {
                    log.write( cc.fatal( "ERROR:" ) + " " +
                        cc.error( "C-kill failed for " + strType + " PID " ) + cc.info( pid ) +
                        cc.error( " of process " ) + self.strShortProcessDescription +
                        cc.error( " with error: " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
            }
            self.child = null;
            self.pidCached = null;
            self.pidDetached = null;
        } // if( pid != null )
        if( self.nListeningPort != null ) {
            if( g_bVerbose ) {
                log.write(
                    cc.debug( "Will kill process(es) listening on port " ) + cc.info( self.nListeningPort ) +
                    cc.debug( " as attempt to stop process " ) + self.strColorizedProcessDescription +
                    "\n" );
            }
            try {
                await fkill( ":" + self.nListeningPort );
                ++ cntKillSuccess;
                if( g_bVerbose ) {
                    log.write( cc.notice( "NOTICE:" ) + " " +
                        cc.success( " Killing process(es) listening on port " ) + cc.info( self.nListeningPort ) +
                        cc.success( " as attempt to stop process " ) + self.strShortProcessDescription +
                        cc.success( " passed OKay" ) +
                        "\n" );
                }
            } catch ( err ) {
                if( cntKillSuccess == 0 ) {
                    log.write( cc.fatal( "ERROR:" ) + " " +
                        cc.error( " Failed to F-kill process(es) listening on port " ) + cc.info( self.nListeningPort ) +
                        cc.error( " as attempt to stop process " ) + self.strShortProcessDescription +
                        cc.error( ", error description: " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
            }
            self.nListeningPort = null;
        } // if( self.nListeningPort != null )
        self.strColorizedProcessDescription = cc.notice( "\"" ) + cc.note( self.strCommand ) + cc.notice( "\"" );
        self.strShortProcessDescription = "" + self.strColorizedProcessDescription;
        self.close_redirected_streams();
    }
    continueDetached() {
        if( ! this.child )
            return;
        if( g_bVerbose )
            log.write( cc.attention( "Will detach process " ) + this.strColorizedProcessDescription + cc.attention( "..." ) + "\n" );
        this.pidDetached = 0 + this.pidCached;
        this.pidCached = null;
        this.child.unref();
        this.child = null;
    }
    run() {
        const self = this;
        self.stop();
        let cwd = self.cwd ? self.cwd : path.dirname( self.strCommand );
        if( ! cwd )
            cwd = __dirname;
        if( g_bVerbose )
            log.write( cc.attention( "Will start process " ) + self.strColorizedProcessDescription + cc.attention( " in cwd " ) + cc.normal( cwd ) + cc.attention( "..." ) + "\n" );
        let bIsDetached = false;
        let stdio_option = "inherit";
        if( self.strLogPath == "" || self.strLogPath == "inherit" )
            stdio_option = "inherit";
        else if( self.strLogPath == "ignore" )
            stdio_option = [ "ignore", "ignore", "ignore" ];
        else if( self.strLogPath == "detached" ) {
            stdio_option = [ "ignore", "ignore", "ignore" ];
            bIsDetached = true;
        } else if( self.strLogPath == "output" )
            stdio_option = [ process.stdin, process.stdout, process.stderr ];
        else {
            self.redirectedStreamOut = fs.openSync( self.strLogPath, "a" );
            self.redirectedStreamErr = fs.openSync( self.strLogPath, "a" );
            stdio_option = [ "ignore", self.redirectedStreamOut, self.redirectedStreamErr ];
        }
        let envEffective = self.env;
        if( ! envEffective ) {
            envEffective = {
                "PATH": g_strRecommendedShellPATH,
                "NO_ULIMIT_CHECK": 1
            };
        }
        self.child = child_process.spawn(
            "" + self.strCommand
            , [] // args
            , { // options
                cwd: cwd,
                "detached": bIsDetached,
                "shell": true,
                env: envEffective,
                stdio: stdio_option // stdio_option // "inherit" // [ "ignore", "ignore", "ignore" ] // [ 0, 1, 2 ]
            }
        );
        self.pidCached = 0 + self.child.pid;
        if( self.nListeningPort != null ) {
            self.strColorizedProcessDescription =
                cc.sunny( self.pidCached ) +
                cc.debug( "(listening on port " ) + cc.info( self.nListeningPort ) + cc.debug( ")" ) +
                cc.bright( "/" ) + self.strColorizedProcessDescription;
            self.strShortProcessDescription =
                cc.sunny( self.pidCached ) +
                cc.debug( "(listening on port " ) + cc.info( self.nListeningPort ) + cc.debug( ")" );
        } else {
            self.strColorizedProcessDescription =
                cc.sunny( self.pidCached ) +
                cc.bright( "/" ) + self.strColorizedProcessDescription;
            self.strShortProcessDescription =
                cc.sunny( self.pidCached );
        }
        if( g_bVerbose )
            log.write( cc.attention( "Did started process " ) + self.strShortProcessDescription + "\n" );
        //
        // The 'close' event is emitted when the stdio streams of a child process have been closed.
        // This is distinct from the 'exit' event, since multiple processes might share the same stdio streams.
        self.child.on( "close", function( code ) {
            log.write( cc.warning( "Process " ) + self.strColorizedProcessDescription + cc.warning( " stream closed with code " ) + cc.info( code ) + "\n" );
            self.child = null;
            self.close_redirected_streams();
        } );
        //
        // The 'exit' event is emitted after the child process ends.
        // If the process exited, code is the final exit code of the process, otherwise null.
        //  If the process terminated due to receipt of a signal, signal is the string name of the signal, otherwise null.
        // One of the two will always be non-null.
        self.child.on( "exit", function( code, signal ) {
            log.write( cc.warning( "Process " ) + self.strColorizedProcessDescription + cc.warning( " exited with code " ) + cc.info( code ) + cc.warning( " and signal " ) + cc.info( signal ) + "\n" );
            self.child = null;
            self.close_redirected_streams();
        } );
        //
        // The 'error' event is emitted whenever:
        // - The process could not be spawned, or
        // - The process could not be killed, or
        // - Sending a message to the child process failed.
        // The 'exit' event may or may not fire after an error has occurred.
        // When listening to both the 'exit' and 'error' events, guard against accidentally invoking handler functions multiple times.
        self.child.on( "error", function( code ) {
            log.write( cc.error( "Process " ) + self.strColorizedProcessDescription + cc.error( " error event occurred: " ) + cc.info( code ) + "\n" );
            self.child = null;
            self.close_redirected_streams();
        } );
        //
        // The 'disconnect' event is emitted after calling the subprocess.disconnect() method in parent process or process.disconnect() in child process.
        // After disconnecting it is no longer possible to send or receive messages, and the subprocess.connected property is false.
        self.child.on( "disconnect", function( code ) {
            log.write( cc.warning( "Process " ) + self.strColorizedProcessDescription + cc.warning( " did disconnected with code " ) + cc.info( code ) + "\n" );
            self.child = null;
        } );
        // if( bRedirectProcessOutputStreamsToLog ) {
        //     // STDOUT
        //     self.child.stdout.on( "data", function( data ) {
        //         if( self.strLogPath.length > 0 )
        //             fs.appendFileSync( self.strLogPath, data, function( err ) {
        //                 if( err ) {
        //                     log.write( cc.error("Process ") + self.strColorizedProcessDescription + cc.error(" STDOUT data streaming error: ") + cc.warning(err) + "\n" );
        //                     throw err;
        //                 }
        //             } );
        //     } );
        //     // STDERR
        //     self.child.stderr.on( "data", function( data ) {
        //         //console.error( `child stderr:\n${data}` );
        //         if( self.strLogPath.length > 0 )
        //             fs.appendFileSync( self.strLogPath, data, function( err ) {
        //                 if( err ) {
        //                     log.write( cc.error("Process ") + self.strColorizedProcessDescription + cc.error(" STDERR data streaming error: ") + cc.warning(err) + "\n" );
        //                     throw err;
        //                 }
        //             } );
        //     } );
        // }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function reset_global_serial_indices_in_global_chains_array() {
    let nWalk = 0;
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            joNodeDesc.idxSerialGlobal = 0 + nWalk;
            ++ nWalk;
        }
    }
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        const arrNodeDescriptions = g_arrChains[idxChain].arrSyncNodeDescriptions;
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            joNodeDesc.idxSerialGlobal = 0 + nWalk;
            ++ nWalk;
        }
    }
}

function reset_port_numbers_in_global_chains_array() {
    let nWalk = 2161;
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        let arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            joNodeDesc.basePort = 0 + nWalk;
            joNodeDesc.nJsonRpcPort4ImaAgent = joNodeDesc.basePort + 10;
            nWalk += 100;
        }
        arrNodeDescriptions = g_arrChains[idxChain].arrSyncNodeDescriptions;
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            joNodeDesc.basePort = 0 + nWalk;
            joNodeDesc.nJsonRpcPort4ImaAgent = joNodeDesc.basePort + 10;
            nWalk += 100;
        }
    }
}

function prepare_for_ima_docker_mode_global_chains_array() {
    if( ! g_bDockerIMA )
        return;
    while( g_arrChains.length > 1 )
        g_arrChains.pop();
    if( g_arrChains.length > 0 ) {
        const arrNodeDescriptions = g_arrChains[0].arrNodeDescriptions;
        while( arrNodeDescriptions.length > 1 )
            arrNodeDescriptions.pop();
    }
}

function initNodeDescription( strURL, idxChain, idxNode, chainId, nodeID, strName ) {
    const simpleNumber = chainId; // 1000 + idxChain;
    const strFolderNodeSkaled = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/node_" + zeroPad( idxNode, 2 );
    const dkgID = randomFixedInteger( 5 ) % 65000; // randomHexString( 32 * 2 );
    const joNodeDesc = {
        url: "" + strURL,
        ipInfo: extract_ipInfo_from_url( strURL ), // for contracts, example of valid result: { ip: "127.0.0.1", hexIp: "7f000001", port: "2161" }
        basePort: 0, // will be reset in reset_port_numbers_in_global_chains_array()
        nameNode: getNonEmptyString( strName, null ),
        idxChain: 0 + idxChain,
        idxNode: 0 + idxNode,
        nodeID: 0 + nodeID,
        idxSerialGlobal: 0, // will be reset in reset_global_serial_indices_in_global_chains_array()
        nodeAddress: get_cached_ecdsa_key_at( idxNode ).address, // used later as nodeAddress for skale-manager calls
        nodePublicKey: get_cached_ecdsa_key_at( idxNode ).publicKey, // used later as nodeAddress for skale-manager calls via web3.eth.sign
        nodePrivateKey: get_cached_ecdsa_key_at( idxNode ).privateKey, // used later as nodeAddress for skale-manager calls via web3.eth.accounts.sign
        checkedNodeAddress: "", // came from Nodes.getNodeAddress call
        //            ++ nWalk;

        dkgID: dkgID,
        nameEcdsaPubKey: get_cached_ecdsa_key_at( idxNode ).sgxName,
        nameSgxPoly: generateSgxPolyName( simpleNumber, nodeID, dkgID ),
        publicKey: get_cached_ecdsa_key_at( idxNode ).publicKey,
        isSecretVerified: false,
        nameBlsPrivateKey: generateBlsPrivateKey( simpleNumber, nodeID, dkgID ),
        isBlsPrivateKeyCreated: false,
        blsPublicKey: null,
        joNodeEventInfoSM: null,
        joBroadcastEventData: null,
        bSgxPassedPre: false,
        bSgxPassedPost: false,
        //
        nodeFolder: "" + strFolderNodeSkaled,
        nodeConfigJsonPath: "" + strFolderNodeSkaled + "/config.json",
        runCmd4skaled: "" + strFolderNodeSkaled + "/run-skaled.sh",
        logPath4skaled: normalizePath( path.join( __dirname, "skaled_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 ) + ".log" ) ), // strFolderNodeSkaled + "/skaled.log"
        proc4skaled: null,
        //
        agentFolder: "" + g_strFolderImaAgent,
        runCmd4imaAgent: "", // initialized later by the compose_node_runCmd4imaAgent() function
        logPath4imaAgent: normalizePath( path.join( __dirname, "imaAgent_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 ) + ".log" ) ),
        proc4imaAgent: null,
        logPath4tunnel: normalizePath( path.join( __dirname, "imaMainNetTunnel_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 ) + ".log" ) ),
        proc4tunnel: null,
        port4tunnel: 14000 + idxChain * 100 + idxNode,
        //
        nJsonRpcPort4ImaAgent: 0 // basePort + 10 // will be reset in reset_port_numbers_in_global_chains_array()
    };
    return joNodeDesc;
}

function extract_ipInfo_from_url( strURL ) { // for contracts, example of valid result: { ip: "127.0.0.1", hexIp: "7f000001", port: "2161" }
    try {
        const u = new URL( strURL );
        const ipInfo = {
            ip: "" + u.hostname.toString(),
            hexIp: "",
            port: "" + parseInt( u.port.toString() )
        };
        ipInfo.hexIp = IPv4_2_hexIP( ipInfo.ip ); // throws on error, does the "127.0.0.1" -> "7f000001" string conversion
        if( g_bVerbose )
            log.write( cc.normal( "URL " ) + cc.info( strURL ) + cc.normal( " was parsed into IP info " ) + cc.j( ipInfo ) + "\n" );
        // while( ipInfo.port.length < 4 )
        //     ipInfo.port = "0" + ipInfo.port; // ??????
        return ipInfo;
    } catch ( err ) {
        log.write(
            cc.fatal( "Error:" ) + cc.error( " Failed to parse URL " ) + cc.warning( strURL ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        end_of_test( 29 );
    }
}

function IPv4_2_hexIP( strIPv4 ) { // throws on error, does the "127.0.0.1" -> "7f000001" string conversion
    const arrIpParts = strIPv4.split( "." );
    if( arrIpParts.length != 4 )
        throw new Error( "Not a valid IPv4 address(expect 4 numbers)" );
    let s = "";
    for( let i = 0; i < arrIpParts.length; ++ i ) {
        const strPart = arrIpParts[i];
        if( ! ( strPart.length >= 1 && strPart.length <= 3 ) )
            throw new Error( "Not a valid IPv4 address(number " + strPart + " is invalid IPv4 part)" );
        for( let j = 0; j < strPart.length; ++ j ) {
            const ch = strPart[j];
            const k = parseInt( ch );
            if( ! ( k >= 0 && k <= 255 ) )
                throw new Error( "Not a valid IPv4 address(number " + strPart + " is invalid IPv4 part)" );
        }
        const n = parseInt( strPart );
        if( ! ( n >= 0 && n <= 255 ) )
            throw new Error( "Not a valid IPv4 address(number " + n + " is invalid IPv4 part)" );
        let part = n.toString( 16 );
        while( part.length < 2 )
            part = "0" + part;
        s += part;
    }
    return s;
}

function get_ima_abi_schain_path( idxChain ) {
    return g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/ima_abi/abi.json";
}
function get_ima_abi_schain_path_saved_copy( idxChain ) {
    return get_ima_abi_schain_path( idxChain ) + ".saved_copy";
}

function compose_ima_cli_account_options_mn_tm( idxChain, nNodeIndex ) {
    return " --tm-url-main-net=\"" + g_strUrlTransactionManager + "\"" +
        " --address-main-net=\"" + private_key_2_account_address( g_w3mod, g_strPrivateKeyImaMN ) + "\"" + // address instead of key here
        " --tm-priority-main-net=" + g_nTransactionManagerPriority +
        // URL of SGX is also needed to BLS-sign IMA messages in skale_imaVerifyAndSign handler
        " --sgx-url-main-net=\"" + g_strUrlSgxWalletHTTPS + "\"" +
        " --sgx-ssl-key-main-net=\"" + g_joSgxRpcOptions.key_path + "\"" +
        " --sgx-ssl-cert-main-net=\"" + g_joSgxRpcOptions.cert_path + "\"" +
        " --sgx-url-s-chain=\"" + g_strUrlSgxWalletHTTPS + "\"" +
        " --sgx-ssl-key-s-chain=\"" + g_joSgxRpcOptions.key_path + "\"" +
        " --sgx-ssl-cert-s-chain=\"" + g_joSgxRpcOptions.cert_path + "\""
    ;
}

function compose_ima_cli_account_options_mn_sgx( idxChain, nNodeIndex ) {
    const joNodeDesc = g_arrChains[idxChain].arrNodeDescriptions[nNodeIndex];
    return " --sgx-url-main-net=\"" + g_strUrlSgxWalletHTTPS + "\"" +
        " --sgx-ecdsa-key-main-net=\"" + joNodeDesc.nameEcdsaPubKey + "\"" +
        " --sgx-ssl-key-main-net=\"" + g_joSgxRpcOptions.key_path + "\"" +
        " --sgx-ssl-cert-main-net=\"" + g_joSgxRpcOptions.cert_path + "\"" +
        // " --address-main-net=\"" + private_key_2_account_address( g_w3mod, g_strPrivateKeyImaMN ) + "\"" // address instead of key here
        // " --address-main-net=\"" + public_key_2_account_address( g_w3mod, joNodeDesc.publicKey ) + "\"" // address instead of key here
        " --address-main-net=" + joNodeDesc.nodeAddress // + joNodeDesc.checkedNodeAddress
    ;
}

function compose_ima_cli_account_options_sc_sgx( idxChain, nNodeIndex ) {
    const joNodeDesc = g_arrChains[idxChain].arrNodeDescriptions[nNodeIndex];
    return " --sgx-url-s-chain=\"" + g_strUrlSgxWalletHTTPS + "\"" +
        " --sgx-ecdsa-key-s-chain=\"" + joNodeDesc.nameEcdsaPubKey + "\"" +
        " --sgx-ssl-key-s-chain=\"" + g_joSgxRpcOptions.key_path + "\"" +
        " --sgx-ssl-cert-s-chain=\"" + g_joSgxRpcOptions.cert_path + "\"" +
        // " --address-s-chain=\"" + private_key_2_account_address( g_w3mod, g_strPrivateKeyImaSC ) + "\"" // address instead of key here
        // " --address-s-chain=\"" + public_key_2_account_address( g_w3mod, joNodeDesc.publicKey ) + "\"" // address instead of key here
        " --address-s-chain=" + joNodeDesc.nodeAddress // + joNodeDesc.checkedNodeAddress
    ;
}

function compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) {
    let s = "";
    s += " --key-main-net=" + g_strPrivateKeyImaMN; // explicit private key
    s += " --key-s-chain=" + g_strPrivateKeyImaSC; // explicit private key
    return s;
}

function compose_ima_cli_account_options( idxChain, nNodeIndex ) {
    let s = "";
    //
    if( g_bUseTransactionManagerInImaMN )
        s += compose_ima_cli_account_options_mn_tm( idxChain, nNodeIndex );
    else if( g_bUseSgxInImaMN )
        s += compose_ima_cli_account_options_mn_sgx( idxChain, nNodeIndex );
    else
        s += " --key-main-net=" + g_strPrivateKeyImaMN; // explicit private key
    //
    if( g_bUseSgxInImaSC )
        s += compose_ima_cli_account_options_sc_sgx( idxChain, nNodeIndex );
    else
        s += " --key-s-chain=" + g_strPrivateKeyImaSC; // explicit private key
    //
    return s;
}

function compose_ima_cli_account_options_force_raw_private_keys( idxChain, nNodeIndex ) {
    let s = "";
    s += " --key-main-net=" + g_strPrivateKeyImaMN; // explicit private key
    s += " --key-s-chain=" + g_strPrivateKeyImaSC; // explicit private key
    return s;
}

let g_nNextPort4UsageOnOneMachine = 29400;
function alloc_port_4_usage_on_one_machine() {
    const nPort = 0 + g_nNextPort4UsageOnOneMachine;
    ++ g_nNextPort4UsageOnOneMachine;
    return nPort;
}

function compose_node_runCmd4imaAgent( joNodeDesc ) {
    // runCmd4imaAgent property of joNodeDesc cannot be initialized in loop that initializes all node descriptions
    // because it needs final count of nodes
    // so, we initialize it in this function
    const schain_name = g_arrChains[joNodeDesc.idxChain].name;
    const cid = g_arrChains[joNodeDesc.idxChain].cid;
    //
    //
    let nMonitoringPort4ImaAgent = joNodeDesc.nMonitoringPort4ImaAgent ? ( 0 + joNodeDesc.nMonitoringPort4ImaAgent ) : 0;
    if( ! nMonitoringPort4ImaAgent ) {
        joNodeDesc.nMonitoringPort4ImaAgent = alloc_port_4_usage_on_one_machine();
        nMonitoringPort4ImaAgent = 0 + joNodeDesc.nMonitoringPort4ImaAgent;
    }
    let nJsonRpcPort4ImaAgent = joNodeDesc.nJsonRpcPort4ImaAgent ? ( 0 + joNodeDesc.nJsonRpcPort4ImaAgent ) : 0;
    if( ! nJsonRpcPort4ImaAgent ) {
        joNodeDesc.nJsonRpcPort4ImaAgent = alloc_port_4_usage_on_one_machine();
        nJsonRpcPort4ImaAgent = 0 + joNodeDesc.nJsonRpcPort4ImaAgent;
    }
    //
    //
    joNodeDesc.runCmd4imaAgent =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --loop" + // " " + ( g_isCloudMode ? "--simple-loop" : "--loop" ) +
        //
        ( g_bDisableNewCrossImaRPC
            ? " --json-rpc-port=0 --no-cross-ima"
            : ( " --json-rpc-port=" + nJsonRpcPort4ImaAgent + " --cross-ima" )
        ) +
        //
        " --monitoring-port=" + nMonitoringPort4ImaAgent +
        get_ima_network_browser_cli_opt( joNodeDesc.idxChain ) +
        " --s2s-enable" +
        " --url-main-net=" + get_main_net_url_4_ima( joNodeDesc.idxChain, joNodeDesc.idxNode ) + // g_strMainNetURL +
        " --url-s-chain=" + joNodeDesc.url +
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( joNodeDesc.idxChain ) +
        " " + compose_ima_cli_account_options( joNodeDesc.idxChain, joNodeDesc.idxNode ) +
        " --sgx-bls-key-main-net=" + joNodeDesc.nameBlsPrivateKey + // g_arrChains[0].arrNodeDescriptions[0].nameBlsPrivateKey +
        " --sgx-bls-key-s-chain=" + joNodeDesc.nameBlsPrivateKey +
        //
        " --sign-messages" +
        " --bls-glue=" + g_strFolderAppCacheBin + "/bls_glue" +
        " --hash-g1=" + g_strFolderAppCacheBin + "/hash_g1" +
        " --bls-verify=" + g_strFolderAppCacheBin + "/verify_bls" +
        // transfer loop parameters
        " --m2s-transfer-block-size=" + 4 + // ........Number of transactions in one block to use in money transfer loop from Main-net to S-chain
        " --s2m-transfer-block-size=" + 4 + // ........Number of transactions in one block to use in money transfer loop from S-chain to Main-net
        " --s2s-transfer-block-size=" + 4 + // ........Number of transactions in one block to use in money transfer loop from S-chain to S-chain
        " --m2s-transfer-steps=" + 8 + // .............Maximal number of blocks to transfer at a job run from Main-net to S-chain
        " --s2m-transfer-steps=" + 8 + // .............Maximal number of blocks to transfer at a job run from S-chain to Main-net
        " --s2s-transfer-steps=" + 8 + // .............Maximal number of blocks to transfer at a job run from S-chain to S-chain
        " --m2s-max-transactions=" + 0 + // ...........Maximal number of transactions to do in money transfer loop from Main-net to S-chain (0 is unlimited)
        " --s2m-max-transactions=" + 0 + // ...........Maximal number of transactions to do in money transfer loop from S-chain to Main-net (0 is unlimited)
        " --s2s-max-transactions=" + 0 + // ...........Maximal number of transactions to do in money transfer loop from S-chain to S-Chain (0 is unlimited)
        " --m2s-await-blocks=" + 0 + // ...............Maximal number of blocks to wait to appear in blockchain before transaction from Main-net to S-chain (0 is no wait)
        " --s2m-await-blocks=" + 0 + // ...............Maximal number of blocks to wait to appear in blockchain before transaction from S-chain to Main-net (0 is no wait)
        " --s2s-await-blocks=" + 0 + // ...............Maximal number of blocks to wait to appear in blockchain before transaction from S-chain to S-Chain (0 is no wait)
        " --m2s-await-time=" + 0 + // .................Minimal age of transaction message in seconds before it will be transferred from Main-net to S-chain (0 is no wait)
        " --s2m-await-time=" + 0 + // .................Minimal age of transaction message in seconds before it will be transferred from S-chain to Main-net (0 is no wait)
        " --s2s-await-time=" + 0 + // .................Minimal age of transaction message in seconds before it will be transferred from S-chain to S-Chain (0 is no wait)
        // time framing for transfer loop
        " --period=" + g_nScanMessagePeriodSecondsIMA + // ........................Transfer loop period(seconds)
        " --node-number=" + joNodeDesc.idxNode + // ....................S-Chain node number(zero based)
        " --nodes-count=" + g_arrChains[joNodeDesc.idxChain].arrNodeDescriptions.length + // ....................S-Chain nodes count
        " --time-framing=" + g_nTimeFrameSecondsIMA + // ..................Specifies period(in seconds) for time framing. Zero means disable time framing
        " --time-gap=" + g_nTimeGapSecondsIMA + // ......................Specifies gap(in seconds) before next time frame
        " --pwa --pwa-timeout=" + g_nPendingWorkAnalysisTimeoutSecondsIMA +
        " --expose-pwa " + // " --no-expose-pwa " +
        // " --no-pwa " +
        // " --enable-oracle" +
        " --disable-oracle" +
        ""
    ;
    return "" + joNodeDesc.runCmd4imaAgent;
}

function generateBlsPrivateKey( cid, nodeID, dkgID ) {
    // BLS keys are named BLS_KEY:SCHAIN_ID:N1:NODE_ID:N2:DKG_ID:N3,
    // Where N1 and N3 are 32byte hexadecimal numbers, N2 is a decimal number in range 0 - 65000
    const s = "BLS_KEY:SCHAIN_ID:" + cid + ":NODE_ID:" + nodeID + ":DKG_ID:" + dkgID;
    return s;
}

function generateSgxPolyName( cid, nodeID, dkgID ) {
    // DKG polynomials are named  POLY:SCHAIN_ID:N1:NODE_ID:N2:DKG_ID:N3,
    // Where N1 and N3 are 32byte hexadecimal numbers, N2 is a decimal number in range 0 - 65000
    const s = "POLY:SCHAIN_ID:" + cid + ":NODE_ID:" + nodeID + ":DKG_ID:" + dkgID;
    return s;
}

function initContract( w3, joABI, strContractName ) {
    try {
        if( strContractName == null || strContractName == undefined || typeof strContractName != "string" || strContractName.length == 0 )
            throw new Error( "Bad contract name \"" + strContractName + "\"" );
        if( w3 == null || w3 == undefined || typeof w3 != "object" )
            throw new Error( "Bad Web3 provided to load contract \"" + strContractName + "\"" );
        if( joABI == null || joABI == undefined || typeof joABI != "object" )
            throw new Error( "Bad ABI JSON provided to load contract \"" + strContractName + "\"" );
        const strKeyABI = "" + strContractName + "_abi";
        const strKeyAddress = "" + strContractName + "_address";
        if( !( strKeyABI in joABI ) )
            throw new Error( "Failed to load contract \"" + strContractName + "\", no ABI entry found" );
        if( !( strKeyAddress in joABI ) )
            throw new Error( "Failed to load contract \"" + strContractName + "\", no address entry found" );
        const joEntryABI = joABI[strKeyABI];
        const strAddress = joABI[strKeyAddress];
        const joContract = new w3.eth.Contract( joEntryABI, strAddress );
        if( g_bVerbose )
            log.write( cc.normal( "Loaded " ) + cc.info( strContractName ) + cc.normal( " contract with address " ) + cc.info( joContract.options.address ) + "\n" );
        return joContract;
    } catch ( err ) {
        log.write( cc.fatal( "Init contract error (" + strContractName + "):" ) + " " + cc.error( err.toString() ) + "\n" );
        throw err;
    }
}

function toHex( w3, d, pad ) {
    if( pad == undefined || pad == null || parseInt( pad ) <= 0 )
        pad = 64;
    const t_d = typeof d;
    if( ( t_d == "array" ) || ( t_d == "object" ) ) {
        let s = "";
        for( let i = 0; i < d.length; ++i )
            s += toHex( w3, d[i] );
        return s;
    }
    const h = w3.utils.toHex( d );
    let s = h.toString();
    if( s.length >= 2 && s.substr( 0, 2 ).toLowerCase() == "0x" )
        s = s.substr( 2, s.length - 2 );
    while( s.length < pad )
        s = "0" + s;
    return s;
}

// function toHexArr( w3, d, pad ) {
//     if( typeof d == "array" || typeof d == "object" ) {
//         const arr = [];
//         for( let i = 0; i < d.length; ++i )
//             arr.push( toHex( w3, d[i], pad ) );
//         return arr;
//     }
//     return toHex( w3, d, pad );
// }

function chainDescByIndex( idxChain ) {
    const s =
        cc.attention( idxChain ) + cc.debug( "/" ) +
        cc.info( g_arrChains[idxChain].name ) + cc.debug( "/" ) +
        cc.info( g_arrChains[idxChain].cid );
    return s;
}

function nodeItemDesc( joNodeDesc ) {
    const s = cc.sunny( joNodeDesc.idxSerialGlobal ) +
        cc.debug( "(" ) + cc.sunny( joNodeDesc.nNodeIndex ) + cc.debug( ")" ) +
        cc.normal( "/" ) + cc.bright( joNodeDesc.nameNode ) + cc.normal( "/" ) +
        cc.success( joNodeDesc.nameSgxPoly ) + cc.normal( "/" ) + cc.attention( joNodeDesc.nameEcdsaPubKey );
    return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function fileExists( strPath ) {
    try {
        if( fs.existsSync( strPath ) ) {
            const stats = fs.statSync( strPath );
            if( stats.isFile() )
                return true;
        }
    } catch ( err ) {}
    return false;
}

function dirExists( strPath ) {
    try {
        const stats = fs.lstatSync( strPath );
        if( stats.isDirectory() )
            return true;
    } catch ( err ) {}
}

// function fileLoad( strPath, strDefault ) {
//     strDefault = strDefault || "";
//     if( !fileExists( strPath ) )
//         return strDefault;
//     try {
//         const s = fs.readFileSync( strPath );
//         return s;
//     } catch ( err ) {}
//     return strDefault;
// }

function fileSave( strPath, s ) {
    try {
        fs.writeFileSync( strPath, s );
        return true;
    } catch ( err ) {}
    return false;
}

function jsonFileLoad( strPath, joDefault, bLogOutput ) {
    if( bLogOutput == undefined || bLogOutput == null )
        bLogOutput = false;
    joDefault = joDefault || {};
    if( bLogOutput )
        log.write( cc.normal( "Will load JSON file " ) + cc.info( strPath ) + cc.normal( "..." ) + "\n" );
    if( !fileExists( strPath ) ) {
        if( bLogOutput )
            log.write( cc.error( "Cannot load JSON file " ) + cc.info( strPath ) + cc.error( ", it does not exist" ) + "\n" );
        return joDefault;
    }
    try {
        const s = fs.readFileSync( strPath );
        if( bLogOutput )
            log.write( cc.normal( "Did loaded content of JSON file " ) + cc.info( strPath ) + cc.normal( ", will parse it..." ) + "\n" );
        const jo = JSON.parse( s );
        if( bLogOutput )
            log.write( cc.success( "Done, loaded content of JSON file " ) + cc.info( strPath ) + cc.success( "." ) + "\n" );
        return jo;
    } catch ( err ) {
        if( bLogOutput )
            log.write( cc.fatal( "Error:" ) + cc.error( " failed to load JSON file " ) + cc.info( strPath ) + cc.error( ": " ) + cc.warning( err.toString() ) + "\n" );
    }
    return joDefault;
}

function jsonFileSave( strPath, jo, bLogOutput ) {
    if( bLogOutput == undefined || bLogOutput == null )
        bLogOutput = false;
    if( bLogOutput )
        log.write( cc.normal( "Will save JSON file " ) + cc.info( strPath ) + cc.normal( "..." ) + "\n" );
    try {
        const s = JSON.stringify( jo, null, 4 );
        fs.writeFileSync( strPath, s );
        if( bLogOutput )
            log.write( cc.success( "Done, saved content of JSON file " ) + cc.info( strPath ) + cc.success( "." ) + "\n" );
        return true;
    } catch ( err ) {
        if( bLogOutput )
            log.write( cc.fatal( "Error:" ) + cc.error( " failed to save JSON file " ) + cc.info( strPath ) + cc.error( ": " ) + cc.warning( err.toString() ) + "\n" );
    }
    return false;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function waitAsyncUntil( fnCondition, fnAfter, nStepTimeoutMilliseconds ) {
    fnCondition = fnCondition || function() {
        return true;
    };
    fnAfter = fnAfter || function() {};
    if( nStepTimeoutMilliseconds == null || nStepTimeoutMilliseconds == undefined || typeof nStepTimeoutMilliseconds != "number" )
        nStepTimeoutMilliseconds = 500;
    if( fnCondition() ) {
        fnAfter();
        return;
    }
    setTimeout( function() {
        waitAsyncUntil( fnCondition, fnAfter, nStepTimeoutMilliseconds );
    }, nStepTimeoutMilliseconds );
}

function randomFixedInteger( length ) {
    return Math.floor( Math.pow( 10, length - 1 ) + Math.random() * ( Math.pow( 10, length ) - Math.pow( 10, length - 1 ) - 1 ) );
}

function randomStringABC( length, arrCharacters ) {
    length = parseInt( length );
    if( length <= 0 || arrCharacters.length == 0 )
        return "";
    let s = "";
    for( let i = 0; i < length; ++i )
        s += arrCharacters.charAt( Math.floor( Math.random() * arrCharacters.length ) );
    return s;
}

function randomString( length, isABC, isDigits, isSpecChr, isPunctuation ) { // by default only isABC=true
    length = parseInt( length );
    if( length <= 0 )
        return "";
    isABC = ( isABC == null || isABC == undefined ) ? true : ( isABC ? true : false );
    isDigits = ( isDigits == null || isDigits == undefined ) ? false : ( isDigits ? true : false );
    isSpecChr = ( isSpecChr == null || isSpecChr == undefined ) ? false : ( isSpecChr ? true : false );
    isPunctuation = ( isPunctuation == null || isPunctuation == undefined ) ? false : ( isPunctuation ? true : false );
    let arrCharacters = "";
    if( isABC )
        arrCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if( isDigits )
        arrCharacters += "0123456789";
    if( isSpecChr )
        arrCharacters += "(){}[]~!?@#$%^&*_+-='\"/\\";
    if( isPunctuation )
        arrCharacters += ",.:;";
    if( arrCharacters.length == 0 )
        return "";
    return randomStringABC( length, arrCharacters );
}

// function randomHexString( length ) { // length in characters, not bytes, each byte is 2 characters
//     const arrCharacters = "0123456789abcdef";
//     return randomStringABC( length, arrCharacters );
// }

function replaceAll( str, find, replace ) {
    return str.replace( new RegExp( find, "g" ), replace );
}

// function fn_address_impl_( w3 ) {
//     if( this.address_ == undefined || this.address_ == null )
//         this.address_ = "" + private_key_2_account_address( w3, this.privateKey );
//     return this.address_;
// }

function ensure_starts_with_0x( s, isAutoCheckLength ) {
    if( s == null || s == undefined || typeof s !== "string" )
        return s;
    if( s.length < 2 )
        return "0x" + s;
    if( s[0] == "0" && s[1] == "x" )
        return s;
    if( isAutoCheckLength && ( s.length % 2 ) != 0 )
        s = "0" + s;
    return "0x" + s;
}

function remove_starting_0x( s ) {
    if( s == null || s == undefined || typeof s !== "string" )
        return s;
    if( s.length < 2 )
        return s;
    if( s[0] == "0" && s[1] == "x" )
        return s.substr( 2 );
    return s;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function private_key_2_public_key( w3, keyPrivate ) {
    if( w3 == null || w3 == undefined || keyPrivate == null || keyPrivate == undefined )
        return "";
    // get a wallet instance from a private key
    const privateKeyBuffer = ethereumjs_util.toBuffer( ensure_starts_with_0x( keyPrivate ) );
    const wallet = ethereumjs_wallet.fromPrivateKey( privateKeyBuffer );
    // get a public key
    const keyPublic = wallet.getPublicKeyString();
    return remove_starting_0x( keyPublic );
}

function public_key_2_account_address( w3, keyPublic ) {
    if( w3 == null || w3 == undefined || keyPublic == null || keyPublic == undefined )
        return "";
    const hash = w3.utils.sha3( ensure_starts_with_0x( keyPublic ) );
    const strAddress = ensure_starts_with_0x( hash.substr( hash.length - 40 ) );
    return strAddress;
}

function private_key_2_account_address( w3, keyPrivate ) {
    const keyPublic = private_key_2_public_key( w3, keyPrivate );
    const strAddress = public_key_2_account_address( w3, keyPublic );
    return strAddress;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function int2ip( ipInt ) {
//     return ( ( ipInt >>> 24 ) + "." + ( ipInt >> 16 & 255 ) + "." + ( ipInt >> 8 & 255 ) + "." + ( ipInt & 255 ) );
// }
function ip2int( ip ) {
    return ip.split( "." ).reduce( function( ipInt, octet ) { return ( ipInt << 8 ) + parseInt( octet, 10 ); }, 0 ) >>> 0;
}
function d2h( number ) {
    if( number < 0 )
        number = 0xFFFFFFFF + number + 1;
    return number.toString( 16 ).toUpperCase();
}
function ip2h( ip ) {
    return "0x" + zeroPad( d2h( ip2int( ip ) ), 8 ).toLowerCase();

}

// function generateBytesForNode( port, ip, account, name, nonce ) {
//     if( g_bVerbose )
//         log.write( "    " + cc.normal( "Entered " ) + cc.info( "generateBytesForNode" ) + "\n" );
//     const bytes = "0x01";
//     let portHex = port.toString( 16 );
//     while( portHex.length < 4 )
//         portHex = "0" + portHex;
//     if( g_bVerbose )
//         log.write( "    " + "    " + cc.notice( "portHex" ) + cc.normal( "=" ) + cc.info( portHex ) + "\n" );
//     const ips = new Array( 4 );
//     let index = 0;
//     let num = 0;
//     for( let i = 0; i < ip.length; i++ ) {
//         if( ip[i] == "." ) {
//             ips[index] = num.toString( 16 );
//             index++;
//             num = 0;
//             if( ips[index - 1].length == 1 )
//                 ips[index - 1] = "0" + ips[index - 1];
//         } else
//             num = num * 10 + ip.charCodeAt( i ) - 48;
//     }
//     ips[index] = num.toString( 16 );
//     if( ips[index].length == 1 )
//         ips[index] = "0" + ips[index];
//     if( g_bVerbose )
//         log.write( "    " + "    " + cc.notice( "account" ) + cc.normal( "=" ) + cc.info( account ) + "\n" );
//     if( !account || !account.length )
//         return;
//     let acc = "";
//     if( account ) {
//         for( let i = 0; i < 128; i++ )
//             acc += account[i % 40 + 2];
//     }
//     if( g_bVerbose )
//         log.write( "    " + "    " + cc.notice( "acc" ) + cc.normal( "=" ) + cc.info( acc ) + "\n" );
//     if( nonce == null || nonce == undefined )
//         nonce = Math.floor( Math.random() * 65536 );
//     let nonceHex = nonce.toString( 16 );
//     while( nonceHex.length < 4 )
//         nonceHex = "0" + nonceHex;
//     if( g_bVerbose ) {
//         log.write( "    " + "    " + cc.notice( "nonceHex" ) + cc.normal( "=" ) + cc.info( nonceHex ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "acc.length" ) + cc.normal( "=" ) + cc.info( acc.length ) + "\n" );
//     }
//     const rv = bytes + portHex + nonceHex + ips[0] + ips[1] + ips[2] + ips[3] + ips[0] + ips[1] + ips[2] + ips[3] + acc + Buffer.from( name, "utf8" ).toString( "hex" );
//     if( g_bVerbose ) {
//         log.write( "    " + "    " + cc.notice( "rv" ) + cc.normal( "=" ) + cc.info( rv ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "rv.length" ) + cc.normal( "=" ) + cc.info( rv.length ) + "\n" );
//     }
//     return rv;
// }
//
// //0x 01 2161 935b 2c7e18d8 2c7e18d8 d1bc96aad4ab81ba84c18e115664eaab3e7f842cd1bc96aad4ab81ba84c18e11 5664eaab3e7f842cd1bc96aad4ab81ba84c18e115664eaab3e7f842cd1bc96aa 4e6f6465 39333338
//
// function generateBytesForSchain( w3, lifetime, typeOfSchain, name, nonce ) {
//     if( g_bVerbose )
//         log.write( "    " + cc.normal( "Entered " ) + cc.info( "generateBytesForSchain" ) + "\n" );
//     const bytes = "0x10";
//     let lifetimeHex = lifetime.toString( 16 );
//     while( lifetimeHex.length < 64 )
//         lifetimeHex = "0" + lifetimeHex;
//     let typeOfSchainHex = typeOfSchain.toString( 16 );
//     if( typeOfSchainHex.length < 2 )
//         typeOfSchainHex = "0" + typeOfSchainHex;
//     const nonce = Math.floor( Math.random() * 65536 );
//     let nonceHex = nonce.toString( 16 );
//     while( nonceHex.length < 4 )
//         nonceHex = "0" + nonceHex;
//     const data = bytes + lifetimeHex + typeOfSchainHex + nonceHex + Buffer.from( name, "utf8" ).toString( "hex" );
//     if( g_bVerbose ) {
//         log.write( "    " + "    " + cc.notice( "bytes" ) + cc.normal( "=" ) + cc.info( bytes ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "bytes.length" ) + cc.normal( "=" ) + cc.info( bytes.length ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "lifetimeHex" ) + cc.normal( "=" ) + cc.info( lifetimeHex ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "lifetimeHex.length" ) + cc.normal( "=" ) + cc.info( lifetimeHex.length ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "nonceHex" ) + cc.normal( "=" ) + cc.info( nonceHex ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "nonceHex.length" ) + cc.normal( "=" ) + cc.info( nonceHex.length ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "typeOfSchainHex" ) + cc.normal( "=" ) + cc.info( typeOfSchainHex ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "typeOfSchainHex.length" ) + cc.normal( "=" ) + cc.info( typeOfSchainHex.length ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "data" ) + cc.normal( "=" ) + cc.info( data ) + "\n" );
//         log.write( "    " + "    " + cc.notice( "data.length" ) + cc.normal( "=" ) + cc.info( data.length ) + "\n" );
//     }
//     return data;
// }

function generateBytesForSchain( w3, lifetime, typeOfSchain, name, nonce ) {
    const arrEmpty = [];
    const addrOriginator = "0x0000000000000000000000000000000000000000";
    const data =
        w3.eth.abi.encodeParameter(
            {
                "SchainParameters": {
                    "lifetime": "uint256",
                    "typeOfSchain": "uint8",
                    "nonce": "uint16",
                    "name": "string",
                    "originator": "address",
                    "options": "tuple[]"
                }
            }, {
                "lifetime": lifetime,
                "typeOfSchain": typeOfSchain,
                "nonce": nonce,
                "name": name,
                "originator": addrOriginator,
                "options": arrEmpty
            } );
    return data;
    //
    // const addrOriginator = "0x0000000000000000000000000000000000000000";
    // const arrEmpty = [];
    // const data = w3.eth.abi.encodeParameters(
    //     [ "uint",   "uint8",      "uint16", "string", "address",       "tuple(string,bytes)[]" ], // lifetime, type of schain, nonce, name, originator, array of structures/tuples
    //     [ lifetime, typeOfSchain, nonce,    name,      addrOriginator, arrEmpty           ]
    // ); // see https://ethereum.stackexchange.com/questions/97402/web3-eth-abi-encodeparameter-for-array-of-structs
    // return data;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// function generateRandomIP() {
//     const ip1 = Math.floor( Math.random() * 255 );
//     const ip2 = Math.floor( Math.random() * 255 );
//     const ip3 = Math.floor( Math.random() * 255 );
//     const ip4 = Math.floor( Math.random() * 255 );
//     return "" + ip1 + "." + ip2 + "." + ip3 + "." + ip4 + "";
// }

function generateRandomName() {
    const number = Math.floor( Math.random() * 100000 );
    return "Node" + number;
}

// async function createNode( w3, name, ip, port, privateKey ) {
//     name = ( name != null && name != undefined && typeof name == "string" && name.length > 0 ) ? name : generateRandomName();
//     ip = ( ip != null && ip != undefined && typeof ip == "string" && ip.length > 0 ) ? ip : generateRandomIP();
//     port = ( port != null && port != undefined ) ? parseInt( port ) : 8545;
//     let addressFrom = private_key_2_account_address( w3, privateKey );
//     let publicKey = private_key_2_public_key( w3, privateKey );
//     // privateKey
//     if( g_bVerbose )
//         log.write( cc.normal( "Entered " ) + cc.info( "createNode" ) +
//             cc.normal( ", " ) + cc.notice( "name" ) + cc.normal( "=" ) + cc.info( name ) +
//             cc.normal( ", " ) + cc.notice( "ip" ) + cc.normal( "=" ) + cc.info( ip ) +
//             cc.normal( ", " ) + cc.notice( "port" ) + cc.normal( "=" ) + cc.info( port ) +
//             cc.normal( ", " ) + cc.notice( "addressFrom" ) + cc.normal( "=" ) + cc.info( addressFrom ) +
//             cc.normal( ", " ) + cc.notice( "privateKey" ) + cc.normal( "=" ) + cc.info( privateKey ) +
//             cc.normal( ", " ) + cc.notice( "publicKey" ) + cc.normal( "=" ) + cc.info( publicKey ) +
//             "\n" );
//     let k = await jo_nodes.methods.nodesNameCheck( w3.utils.soliditySha3( name ) ).call(); // jo_nodes_data
//     if( g_bVerbose )
//         log.write( "    " + cc.notice( "k" ) + cc.normal( "=" ) + cc.info( k ) + "\n" );
//     while( k ) {
//         name = generateRandomName();
//         k = await jo_nodes.methods.nodesNameCheck( w3.utils.soliditySha3( name ) ).call(); // jo_nodes_data
//         if( g_bVerbose )
//             log.write( "    " + cc.notice( "k" ) + cc.normal( "=" ) + cc.info( k ) + "\n" );
//     }
//     let data = generateBytesForNode( port, ip, publicKey, name );
//     if( g_bVerbose ) {
//         log.write( "    " + cc.notice( "data" ) + cc.normal( "=" ) + cc.info( data ) + "\n" );
//         log.write( "    " + cc.notice( "data.length" ) + cc.normal( "=" ) + cc.info( data.length ) + "\n" );
//     }
//     let nonce = parseInt( data.slice( 8, 12 ), 16 );
//     if( g_bVerbose )
//         log.write( "    " + cc.notice( "nonce" ) + cc.normal( "=" ) + cc.info( nonce ) + "\n" );
//     let deposit = 100000000000000000000;
//     let accountDeposit = await jo_skale_token.methods.balanceOf( addressFrom ).call( {
//         from: addressFrom
//     } );
//     let transfer_amount = w3.utils.toBN( 100000000000000000000 ).toString();
//     if( g_bVerbose ) {
//         log.write( "    " + cc.notice( "account" ) + cc.normal( " is " ) + cc.info( addressFrom ) + "\n" );
//         log.write( "    " + cc.notice( "data" ) + cc.normal( "=" ) + cc.info( data ) + "\n" );
//         log.write( "    " + cc.notice( "data.length" ) + cc.normal( "=" ) + cc.info( data.length ) + "\n" );
//         log.write( "    " + cc.notice( "deposit" ) + cc.normal( "=" ) + cc.info( deposit ) + "\n" );
//         log.write( "    " + cc.notice( "account deposit" ) + cc.normal( "=" ) + cc.info( accountDeposit ) + "\n" );
//         log.write( "    " + cc.notice( "skale_token_address" ) + cc.normal( "=" ) + cc.info( jo_skale_token.options.address ) + "\n" );
//         log.write( "    " + cc.normal( "Will call " ) + cc.notice( "ERC777-send()" ) + cc.normal( " with:" ) + "\n" );
//         log.write( "    " + cc.notice( "address" ) + cc.normal( "=" ) + cc.info( jo_skale_manager.options.address ) + "\n" );
//         log.write( "    " + cc.notice( "transfer_amount" ) + cc.normal( "=" ) + cc.info( transfer_amount ) + "\n" );
//         log.write( "    " + cc.notice( "data" ) + cc.normal( "=" ) + cc.info( data ) + "\n" );
//         log.write( "    " + cc.notice( "addressFrom" ) + cc.normal( "=" ) + cc.info( addressFrom ) + "\n" );
//     }
//     // ERC777 - function send(address recipient, uint256 amount, bytes calldata data)
//     let res =
//         await jo_skale_token.methods.send(
//             jo_skale_manager.options.address
//             , transfer_amount
//             , data
//         ).send( {
//             chainId: parseIntOrHex( cid_main_net )
//             , from: addressFrom
//             , gas: 8000000
//         } );
//     if( g_bVerbose )
//         log.write( "    " + cc.notice( "res" ) + cc.normal( "=" ) + cc.j( res ) + "\n" );
//     let blockNumber = res.blockNumber;
//     //if ( g_bVerbose )
//     //    log.write( "    " + cc.notice( "blockNumber" ) + cc.normal( "=" ) + cc.j( blockNumber ) + "\n" );
//     let nodeIndex = -1;
//     let joNodeEventInfoSM = null;
//     arrEvents = await jo_nodes.getPastEvents(// jo_nodes_functionality
//        "NodeCreated", {
//              "fromBlock": blockNumber,
//              "toBlock": blockNumber
//         } );
//     for( i = 0; i < arrEvents.length; i++ ) {
//         if( arrEvents[ i ].returnValues[ "nonce" ] == nonce ) {
//             joNodeEventInfoSM = arrEvents[ i ];
//             nodeIndex = joNodeEventInfoSM.returnValues[ "nodeIndex" ];
//         }
//     }
//     // if ( g_bVerbose ) {
//     //     arrEvents = await jo_monitors_functionality.getPastEvents( "Iterations", {
//     //         "fromBlock": blockNumber,
//     //         "toBlock": blockNumber
//     //     } );
//     //     for ( i = 0; i < arrEvents.length; i++ ) {
//     //         log.write( "    " + cc.notice( "eventsRetValues[" ) + cc.info( i ) + cc.notice( "]" ) + cc.normal( "=" ) + cc.info( events[ i ].returnValues ) + "\n" );
//     //     }
//     // }
//     if( g_bVerbose )
//         log.write(
//             "    " + cc.normal( "Node " ) + cc.info( nodeIndex ) + cc.normal( " created with " ) + cc.info( res.gasUsed )
//             + cc.normal( " gas consumption, node info: " ) + cc.j( joNodeEventInfoSM )
//             + "\n" );
//     return joNodeEventInfoSM;
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function init_schain_types( w3, privateKey ) {
    // jo_schains_internal.addSchainType(1, 16) - Small
    // jo_schains_internal.addSchainType(4, 16) - Medium
    // jo_schains_internal.addSchainType(128, 16) - Large
    // jo_schains_internal.addSchainType(0, 2) - Test 2 node schain
    // jo_schains_internal.addSchainType(32, 4) - Test 4 node schain
    // jo_schains_internal.addSchainType(32, 1) - Test 5 node schain
    // see: function addSchainType(uint8 partOfNode, uint numberOfNodes)
    const arr_schain_types = [
        {
            partOfNode: 1,
            numberOfNodes: 16,
            name: "small"
        }, {
            partOfNode: 4,
            numberOfNodes: 16,
            name: "medium"
        }, {
            partOfNode: 128,
            numberOfNodes: 16,
            name: "large"
        }, {
            partOfNode: 0,
            numberOfNodes: 2,
            name: "test2"
        }, {
            partOfNode: 32,
            numberOfNodes: 4,
            name: "test4"
        }, {
            partOfNode: 128,
            numberOfNodes: 1,
            name: "test5"
        }
    ];
    const addressFrom = private_key_2_account_address( w3, privateKey );
    await role_check_and_grant(
        g_w3_main_net,
        cid_main_net,
        privateKey, // private_key_2_account_address( w3, g_strPrivateKeySkaleManagerMN )
        jo_schains_internal,
        "SCHAIN_TYPE_MANAGER_ROLE",
        addressFrom
    );
    for( const typeOfSChain of arr_schain_types ) {
        if( g_bVerbose ) {
            log.write(
                cc.normal( "Will add S-Chain type " ) + cc.info( typeOfSChain.name ) +
                cc.normal( ", part of node is " ) + cc.sunny( typeOfSChain.partOfNode ) +
                cc.normal( ", number of nodes is " ) + cc.sunny( typeOfSChain.numberOfNodes ) +
                cc.normal( "..." ) +
                "\n" );
        }
        const res =
            await jo_schains_internal.methods.addSchainType(
                typeOfSChain.partOfNode
                , typeOfSChain.numberOfNodes
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: addressFrom,
                gas: 8000000
            } );
        if( g_bVerbose ) {
            log.write( cc.debug( "Add S-Chain result is " ) + cc.j( res ) + cc.debug( "." ) + "\n" );
            log.write(
                cc.success( "Done, added S-Chain type " ) + cc.info( typeOfSChain.name ) +
                cc.success( ", part of node is " ) + cc.sunny( typeOfSChain.partOfNode ) +
                cc.success( ", number of nodes is " ) + cc.sunny( typeOfSChain.numberOfNodes ) +
                cc.success( "." ) +
                "\n" );
        }
    }
}

function get_needed_type_of_s_chain( cntNodes ) {
    switch ( cntNodes ) {
    case 1: return 6; // see addSchainType call
    case 2: return 4;
    case 4: return 5;
    case 16: return 1;
    } // switch( cntNodes )
    log.write( cc.fatal( "CRITICAL ERROR:" ) + " " + cc.error( "S-Chain type does not exist for " ) +
        cc.warning( cntNodes ) + cc.error( " number of nodes" ) + "\n" );
    throw new Error( "S-Chain type does not exist for " + cntNodes + " number of nodes" );
}

function get_needed_threshold( cntNodes ) {
    switch ( cntNodes ) {
    case 1: return 1;
    case 2: return 1;
    case 4: return 3;
    case 16: return 11;
    } // switch( cntNodes )
    log.write( cc.fatal( "CRITICAL ERROR:" ) + " " + cc.error( "Cannot compute needed BLS threshold for " ) + cc.warning( cntNodes ) + cc.error( " number of nodes" ) + "\n" );
    throw new Error( "Cannot compute needed BLS threshold for " + cntNodes + " number of nodes" );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function createSChain( w3, lifetime, typeOfSchain, name, privateKey ) {
    name = ( name != null && name != undefined && typeof name == "string" && name.length > 0 ) ? name : generateRandomName();
    lifetime = ( lifetime && typeof lifetime == "number" ) ? lifetime : 5;
    typeOfSchain = ( typeOfSchain && typeof typeOfSchain == "number" ) ? typeOfSchain : 4;
    const addressFrom = private_key_2_account_address( w3, privateKey );
    const publicKey = private_key_2_public_key( w3, privateKey );
    if( g_bVerbose ) {
        log.write( cc.normal( "Entered " ) + cc.info( "createSChain" ) +
            cc.normal( ", " ) + cc.notice( "name" ) + cc.normal( "=" ) + cc.info( name ) +
            cc.normal( ", " ) + cc.notice( "lifetime" ) + cc.normal( "=" ) + cc.info( lifetime ) +
            cc.normal( ", " ) + cc.notice( "typeOfSchain" ) + cc.normal( "=" ) + cc.info( typeOfSchain ) +
            cc.normal( ", " ) + cc.notice( "addressFrom" ) + cc.normal( "=" ) + cc.info( addressFrom ) +
            cc.normal( ", " ) + cc.notice( "privateKey" ) + cc.normal( "=" ) + cc.info( privateKey ) +
            cc.normal( ", " ) + cc.notice( "publicKey" ) + cc.normal( "=" ) + cc.info( publicKey ) +
            "\n" );
    }
    const isNameAvailable = await jo_schains_internal.methods.isSchainNameAvailable( name ).call();
    if( !isNameAvailable ) {
        log.write( "    " + cc.fatal( "CRITICAL ERROR:" ) + " " + cc.error( "S-Chain name" ) + cc.warning( name ) + cc.error( " is not available" ) + "\n" );
        throw new Error( "S-CHAIN name \"" + name + "\" is not available" );
    }
    const nonce = 0;
    const data = generateBytesForSchain( w3, lifetime, typeOfSchain, name, nonce );
    if( g_bVerbose ) {
        log.write( "    " + cc.notice( "data" ) + cc.normal( "=" ) + cc.info( data ) + "\n" );
        log.write( "    " + cc.notice( "data.length" ) + cc.normal( "=" ) + cc.info( data.length ) + "\n" );
    }
    // let nonce = parseInt( data.slice( 8, 12 ), 16 );
    // if ( g_bVerbose )
    //     log.write( "    " + cc.notice( "nonce" ) + cc.normal( "=" ) + cc.info( nonce ) + "\n" );
    const deposit = 100000000000000000000;
    const accountDeposit = await jo_skale_token.methods.balanceOf( addressFrom ).call( {
        from: addressFrom
    } );
    const transfer_amount = w3.utils.toBN( 100000000000000000000 ).toString();
    if( g_bVerbose ) {
        log.write( "    " + cc.notice( "account" ) + cc.normal( " is " ) + cc.info( addressFrom ) + "\n" );
        log.write( "    " + cc.notice( "data" ) + cc.normal( "=" ) + cc.info( data ) + "\n" );
        log.write( "    " + cc.notice( "data.length" ) + cc.normal( "=" ) + cc.info( data.length ) + "\n" );
        log.write( "    " + cc.notice( "deposit" ) + cc.normal( "=" ) + cc.info( deposit ) + "\n" );
        log.write( "    " + cc.notice( "account deposit" ) + cc.normal( "=" ) + cc.info( accountDeposit ) + "\n" );
        log.write( "    " + cc.notice( "skale_token_address" ) + cc.normal( "=" ) + cc.info( jo_skale_token.options.address ) + "\n" );
        log.write( "    " + cc.normal( "Will call " ) + cc.notice( "ERC777-send()" ) + cc.normal( " with:" ) + "\n" );
        log.write( "    " + cc.notice( "address" ) + cc.normal( "=" ) + cc.info( jo_skale_manager.options.address ) + "\n" );
        log.write( "    " + cc.notice( "transfer_amount" ) + cc.normal( "=" ) + cc.info( transfer_amount ) + "\n" );
        log.write( "    " + cc.notice( "data" ) + cc.normal( "=" ) + cc.info( data ) + "\n" );
        log.write( "    " + cc.notice( "addressFrom" ) + cc.normal( "=" ) + cc.info( addressFrom ) + "\n" );
    }
    // ERC777 - function send(address recipient, uint256 amount, bytes calldata data)
    const res =
        await jo_skale_token.methods.send(
            jo_skale_manager.options.address
            , transfer_amount
            , data
        ).send( {
            chainId: parseIntOrHex( cid_main_net ),
            from: addressFrom,
            gas: 8000000
        } );
    if( g_bVerbose )
        log.write( "    " + cc.notice( "res" ) + cc.normal( "=" ) + cc.j( res ) + "\n" );
    const blockNumber = res.blockNumber;
    //if ( g_bVerbose )
    //    log.write( "    " + cc.notice( "blockNumber" ) + cc.normal( "=" ) + cc.j( blockNumber ) + "\n" );
    let joChainEventInfoSM = null;
    arrEvents = await jo_schains.getPastEvents( "SchainCreated", {
        "fromBlock": blockNumber,
        "toBlock": blockNumber
    } );
    for( i = 0; i < arrEvents.length; i++ ) {
        if( arrEvents[i].returnValues.name == name )
            joChainEventInfoSM = arrEvents[i];

    }
    if( g_bVerbose ) {
        log.write(
            "    " + cc.success( "S-CHAIN " ) + cc.info( name ) + cc.normal( " created with " ) + cc.info( res.gasUsed ) +
            cc.normal( " gas consumption, chain info: " ) + cc.j( joChainEventInfoSM ) +
            "\n" );
    }
    return joChainEventInfoSM;
}

async function getSChainNodeIndices( w3, strSChainName ) {
    if( g_bVerbose ) {
        log.write( cc.normal( "Entered " ) + cc.info( "getSChainNodeIndices" ) +
            cc.normal( ", " ) + cc.notice( "name" ) + cc.normal( "=" ) + cc.info( strSChainName ) +
            "\n" );
    }
    const res = await jo_schains_internal.methods.getNodesInGroup( w3.utils.soliditySha3( strSChainName ) ).call();
    if( g_bVerbose )
        log.write( "    " + cc.success( "S-CHAIN " ) + cc.info( strSChainName ) + cc.normal( " node indices " ) + cc.j( res ) + "\n" );
    return res;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// async function setGroupPK( w3, privateKey, strSChainName, joCommonPublicKeyBLS ) {
//     if( g_bVerbose ) {
//         log.write( cc.normal( "Entered " ) + cc.info( "setGroupPK" ) +
//             cc.normal( ", " ) + cc.notice( "S-CHAIN name" ) + cc.normal( "=" ) + cc.info( strSChainName ) +
//             cc.normal( ", " ) + cc.notice( "privateKey" ) + cc.normal( "=" ) + cc.info( privateKey ) +
//             cc.normal( ", " ) + cc.notice( "joCommonPublicKeyBLS" ) + cc.normal( "=" ) + cc.j( joCommonPublicKeyBLS ) +
//             "\n" );
//     }
//     const res =
//         await jo_schains.methods.setGroupsPublicKey(
//             w3.utils.soliditySha3( strSChainName )
//             , joCommonPublicKeyBLS.commonBLSPublicKey0
//             , joCommonPublicKeyBLS.commonBLSPublicKey1
//             , joCommonPublicKeyBLS.commonBLSPublicKey2
//             , joCommonPublicKeyBLS.commonBLSPublicKey3
//         ).send( {
//             chainId: parseIntOrHex( cid_main_net ),
//             from: addressFrom,
//             gas: 8000000
//         } );
//     if( g_bVerbose )
//         log.write( "    " + cc.notice( "res" ) + cc.normal( "=" ) + cc.j( res ) + "\n" );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init_schain_node_description( w3, joNodeDesc ) {
    const simpleNumber = g_arrChains[joNodeDesc.idxChain].cid; // 1000 + joNodeDesc.idxChain;
    const nDefaultNameLength = 5;
    if( joNodeDesc.nameNode == null || joNodeDesc.nameNode == undefined || typeof joNodeDesc.nameNode != "string" || joNodeDesc.nameNode.length == 0 )
        joNodeDesc.nameNode = randomString( nDefaultNameLength );
    if( joNodeDesc.nameSgxPoly == null || joNodeDesc.nameSgxPoly == undefined || typeof joNodeDesc.nameSgxPoly != "string" || joNodeDesc.nameSgxPoly.length == 0 )
        joNodeDesc.nameSgxPoly = generateSgxPolyName( simpleNumber, joNodeDesc.nodeID, joNodeDesc.dkgID );
    if( joNodeDesc.nameEcdsaPubKey == null || joNodeDesc.nameEcdsaPubKey == undefined || typeof joNodeDesc.nameEcdsaPubKey != "string" || joNodeDesc.nameEcdsaPubKey.length == 0 )
        joNodeDesc.nameEcdsaPubKey = get_cached_ecdsa_key_at( joNodeDesc.idxNode ).sgxName;
    if( joNodeDesc.nameBlsPrivateKey == null || joNodeDesc.nameBlsPrivateKey == undefined || typeof joNodeDesc.nameBlsPrivateKey != "string" || joNodeDesc.nameBlsPrivateKey.length == 0 )
        joNodeDesc.nameBlsPrivateKey = generateBlsPrivateKey( simpleNumber, joNodeDesc.nodeID, joNodeDesc.dkgID );
    // joNodeDesc.publicKey = private_key_2_public_key( w3, joNodeDesc.privateKey );
    // joNodeDesc.address = private_key_2_account_address( w3, joNodeDesc.privateKey );
    joNodeDesc.arrVerificationVector = [];
    joNodeDesc.secretShare = "";
}

function init_schain_node_descriptions( idxChain, w3 ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Initializing node descriptions in chain " ) + cc.info( idxChain ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        joNodeDesc.nNodeIndex = 0 + i;
        init_schain_node_description( w3, joNodeDesc );
        if( g_bVerbose ) {
            log.write(
                cc.normal( "Node " ) + cc.info( joNodeDesc.nNodeIndex ) +
                cc.normal( " in chain " ) + cc.info( idxChain ) +
                cc.normal( " is " ) + cc.j( joNodeDesc ) + "\n"
            );
        }
    }
}

function get_all_public_keys_array( idxChain ) {
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const arr = [];
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        arr.push( joNodeDesc.publicKey );
    }
    return arr;
}

function get_verification_vector_summary( w3, joNodeDesc ) {
    let vvSummary = "";
    const cnt = joNodeDesc.arrVerificationVector.length;
    for( let j = 0; j < cnt; ++j ) {
        const arrPairs = joNodeDesc.arrVerificationVector[j];
        // log.write(
        //     cc.normal( "------------- hex pairs [" ) +
        //     cc.info( j ) + cc.normal( "/" ) + cc.info( cnt ) + cc.normal( "] of " ) +
        //     nodeItemDesc( joNodeDesc ) + cc.normal( ":  " ) + cc.j( toHexArr( w3, arrPairs ) ) +
        //     "\n" );
        vvSummary += toHex( w3, arrPairs );
    }
    // log.write(
    //     cc.normal( "------------- get_verification_vector_summary() of " ) +
    //     nodeItemDesc( joNodeDesc ) + cc.normal( ":  " ) + cc.j( vvSummary ) +
    //     "\n" );
    return vvSummary;
}

// function get_verification_vector_summary_inv( w3, joNodeDesc ) {
//     let vvSummary = "";
//     const cnt = joNodeDesc.arrVerificationVector.length;
//     for( let j = 0; j < cnt; ++j ) {
//         const arrPairs = joNodeDesc.arrVerificationVector[j];
//         // log.write(
//         //     cc.normal( "------------- hex pairs [" ) +
//         //     cc.info( j ) + cc.normal( "/" ) + cc.info( cnt ) + cc.normal( "] of " ) +
//         //     nodeItemDesc( joNodeDesc ) + cc.normal( ":  " ) + cc.j( toHexArr( w3, arrPairs ) ) +
//         //     "\n" );
//         vvSummary += toHex( w3, arrPairs[1] );
//         vvSummary += toHex( w3, arrPairs[0] );
//         vvSummary += toHex( w3, arrPairs[3] );
//         vvSummary += toHex( w3, arrPairs[2] );
//     }
//     // log.write(
//     //     cc.normal( "------------- get_verification_vector_summary_inv() of " ) +
//     //     nodeItemDesc( joNodeDesc ) + cc.normal( ":  " ) + cc.j( vvSummary ) +
//     //     "\n" );
//     return vvSummary;
// }

function ss2blob( ss ) {
    let strComposed = "";
    const arrPublicKey = ss[0];
    const share = ss[1];
    strComposed += remove_starting_0x( arrPublicKey[0] );
    strComposed += remove_starting_0x( arrPublicKey[1] );
    strComposed += remove_starting_0x( share );
    return strComposed;
}

function ssn2blob( ss ) {
    let strComposed = "";
    for( const item of ss )
        strComposed += remove_starting_0x( ss2blob( item ) );
    return strComposed;
}

function sgx_do_verify_secret( w3, joNodeDescA, joNodeDescB, joCall ) {
    // joNodeDescA - who is verifier - master
    // joNodeDescB - who is verified - slave
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Performing " ) + cc.sunny( "DKG/SGX Verification" ) + cc.bright( ", master/verifier is " ) +
            nodeItemDesc( joNodeDescA ) + cc.bright( ", verified slave is " ) + nodeItemDesc( joNodeDescB ) +
            cc.bright( "..." ) + "\n\n" );
    }
    //let vvSummaryA = get_verification_vector_summary( w3, joNodeDescA );
    const vvSummaryB = get_verification_vector_summary( w3, joNodeDescB );
    // if( g_bVerbose )
    //     log.write( "    " + cc.normal( "Node " ) + nodeItemDesc( joNodeDescA ) +
    //         cc.normal( " summary verification vector is " ) + cc.notice( vvSummaryA ) +
    //         cc.normal( ", its length is " ) + cc.notice( vvSummaryA.length ) +
    //         "\n" );
    if( g_bVerbose )
        log.write( cc.debug( "Source secret key contribution is " ) + cc.notice( joNodeDescB.joBroadcastEventData.secretKeyContribution ) + "\n" );
    const entire_ss = remove_starting_0x( joNodeDescB.joBroadcastEventData.secretKeyContribution );
    if( g_bVerbose )
        log.write( cc.debug( "Well formed secret key contribution is " ) + cc.j( entire_ss ) + "\n" );
    //let ss = joNodeDescB.secretShare.substr( 192 * joNodeDescA.nNodeIndex, 192 );
    const ss = entire_ss[joNodeDescA.nNodeIndex]; // entire_ss.substr( 192 * joNodeDescA.nNodeIndex, 192 );
    const ss_blob = ss2blob( ss );
    if( g_bVerbose )
        log.write( cc.debug( "Extracted part of secret key contribution is " ) + cc.notice( ss ) + "\n" );
    //let ss = joNodeDescB.secretShare.substr( 192 * joNodeDescA.nNodeIndex, 192 );
    //let vvs = vvSummaryA;
    const vvs = vvSummaryB;
    const ekn = joNodeDescA.nameEcdsaPubKey;
    const arrNodeDescriptions = g_arrChains[joNodeDescA.idxChain].arrNodeDescriptions;
    const nThreshold = get_needed_threshold( arrNodeDescriptions.length );
    if( g_bVerbose ) {
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "index" ) + cc.normal( "=" ) + cc.info( joNodeDescA.nNodeIndex ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "t" ) + cc.normal( "=" ) + cc.info( nThreshold ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "n" ) + cc.normal( "=" ) + cc.info( arrNodeDescriptions.length ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "secretKeyContribution" ) + cc.normal( "=" ) + cc.info( ss ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "publicShares" ) + cc.normal( "=" ) + cc.info( vvs ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "ethKeyName" ) + cc.normal( "=" ) + cc.info( ekn ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "secretShare" ) + cc.normal( "=" ) + cc.j( ss ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "secretShare as blob" ) + cc.normal( "=" ) + cc.j( ss_blob ) + "\n" );
        log.write( "    " + cc.normal( "Using slaves entire " ) + cc.attention( "secretKeyContribution" ) + cc.normal( "=" ) + cc.j( entire_ss ) + "\n" );
    }
    const joCallData = {
        "method": "dkgVerification", // old - "DKGVerification", new - "dkgVerification"
        "params": {
            "publicShares": vvs,
            "ethKeyName": ekn,
            "secretShare": ss_blob, // ss,
            "t": nThreshold,
            "n": arrNodeDescriptions.length,
            "index": joNodeDescA.nNodeIndex
        }
    };
    if( g_bVerbose )
        log.write( cc.info( "joCallData" ) + cc.debug( "=" ) + cc.j( joCallData ) + "\n" );
    joCall.call( joCallData, async function( joIn, joOut, err ) {
        if( joOut && g_bVerbose )
            log.write( cc.info( "joOut" ) + cc.debug( "=" ) + cc.j( joOut ) + "\n" );
        if( err )
            log.write( cc.info( "err" ) + cc.debug( "=" ) + cc.j( err ) + "\n" );
        if( joOut != null && joOut != undefined && typeof joOut == "object" ) {
            if( "result" in joOut && typeof joOut.result == "object" && "errorMessage" in joOut.result && typeof joOut.result.errorMessage == "string" && joOut.result.errorMessage.length > 0 )
                err = "" + joOut.result.errorMessage.toString();
            else if( "error" in joOut )
                err = "" + JSON.stringify( joOut.error );
        }
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " RPC call problem in " ) + cc.info( "sgx_do_verify_secret" ) +
                cc.error( " for master node " ) + nodeItemDesc( joNodeDescA ) +
                cc.error( " and slave node " ) + nodeItemDesc( joNodeDescB ) +
                cc.error( ", error description: " ) + cc.warning( err ) + "\n" );
            end_of_test( 30 ); // old: 1100 + joNodeDescA.nNodeIndex
        }
        if( g_bVerbose ) {
            log.write( cc.success( "DKG/SGX verification passed for master node " ) + nodeItemDesc( joNodeDescA ) +
                cc.success( " and slave node " ) + nodeItemDesc( joNodeDescB ) +
                "\n" );
        }
        joNodeDescA.isSecretVerified = true;
    } );
}

function sgx_do_secret_key_contribution( w3, joNodeDesc, joCall ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Getting " ) + cc.attention( "secret key contribution" ) + cc.bright( " for node " ) + nodeItemDesc( joNodeDesc ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[joNodeDesc.idxChain].arrNodeDescriptions;
    const nThreshold = get_needed_threshold( arrNodeDescriptions.length );
    joCall.call( {
        "method": "getSecretShare",
        "params": {
            "polyName": joNodeDesc.nameSgxPoly,
            "publicKeys": get_all_public_keys_array( joNodeDesc.idxChain ),
            "t": nThreshold,
            "n": arrNodeDescriptions.length
        }
    }, async function( joIn, joOut, err ) {
        if( joOut != null && joOut != undefined && typeof joOut == "object" ) {
            if( "result" in joOut && typeof joOut.result == "object" && "errorMessage" in joOut.result && typeof joOut.result.errorMessage == "string" && joOut.result.errorMessage.length > 0 )
                err = "" + joOut.result.errorMessage;
            else if( "error" in joOut )
                err = "" + joOut.error.toString();
        }
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " RPC call problem in " ) + cc.info( "sgx_do_secret_key_contribution" ) + cc.error( " for node " ) + cc.info( joNodeDesc.nNodeIndex ) + cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
            end_of_test( 31 ); // old: 1200 + joNodeDesc.nNodeIndex
        }
        joNodeDesc.secretShare = joOut.result.secretShare;
        joNodeDesc.bSgxPassedPre = true;
        if( g_bVerbose ) {
            log.write( cc.normal( "Secret share " ) +
                nodeItemDesc( joNodeDesc ) +
                cc.normal( " was generated: " ) + cc.notice( joNodeDesc.secretShare ) +
                "\n" );
        }
    } );
}

function sgx_get_verification_vector( w3, joNodeDesc, joCall ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Getting " ) + cc.attention( "verification vector" ) + cc.bright( " for node " ) + nodeItemDesc( joNodeDesc ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[joNodeDesc.idxChain].arrNodeDescriptions;
    const nThreshold = get_needed_threshold( arrNodeDescriptions.length );
    joCall.call( {
        "method": "getVerificationVector",
        "params": {
            "polyName": joNodeDesc.nameSgxPoly,
            "t": nThreshold,
            "n": arrNodeDescriptions.length
        }
    }, async function( joIn, joOut, err ) {
        if( joOut != null && joOut != undefined && typeof joOut == "object" ) {
            if( "result" in joOut && typeof joOut.result == "object" && "errorMessage" in joOut.result && typeof joOut.result.errorMessage == "string" && joOut.result.errorMessage.length > 0 )
                err = "" + joOut.result.errorMessage;
            else if( "error" in joOut )
                err = "" + joOut.error.toString();
        }
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " RPC call problem in " ) + cc.info( "sgx_get_verification_vector" ) + cc.error( " for node " ) + cc.info( joNodeDesc.nNodeIndex ) + cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
            end_of_test( 32 ); // old: 1300 + joNodeDesc.nNodeIndex
        }
        joNodeDesc.arrVerificationVector = joOut.result.verificationVector; // old "Verification Vector", new "verificationVector"
        if( g_bVerbose ) {
            log.write( cc.normal( "Verification vector " ) +
                nodeItemDesc( joNodeDesc ) +
                cc.normal( " was generated: " ) +
                cc.j( joNodeDesc.arrVerificationVector ) + // + JSON.stringify( joNodeDesc.arrVerificationVector )
                "\n" );
        }
    } );
}

function sgx_generate_dkg_poly( w3, joNodeDesc, joCall ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Generating " ) + cc.attention( "poly" ) + cc.bright( " for node " ) + nodeItemDesc( joNodeDesc ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[joNodeDesc.idxChain].arrNodeDescriptions;
    const nThreshold = get_needed_threshold( arrNodeDescriptions.length );
    joCall.call( {
        "method": "generateDKGPoly",
        "params": {
            "polyName": joNodeDesc.nameSgxPoly,
            "t": nThreshold
        }
    }, async function( joIn, joOut, err ) {
        if( joOut != null && joOut != undefined && typeof joOut == "object" ) {
            if( "result" in joOut && typeof joOut.result == "object" && "errorMessage" in joOut.result && typeof joOut.result.errorMessage == "string" && joOut.result.errorMessage.length > 0 )
                err = "" + joOut.result.errorMessage;
            else if( "error" in joOut )
                err = "" + joOut.error.toString();
        }
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " RPC call problem in " ) + cc.info( "sgx_generate_dkg_poly" ) + cc.error( " for node " ) + cc.info( joNodeDesc.nNodeIndex ) + cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
            end_of_test( 33 ); // old: 1400 + joNodeDesc.nNodeIndex
        }
        if( g_bVerbose ) {
            log.write( cc.normal( "Poly " ) + nodeItemDesc( joNodeDesc ) +
                cc.normal( " was generated" ) +
                "\n" );
        }
        sgx_get_verification_vector( w3, joNodeDesc, joCall );
    } );
}

async function sgx_generate_key( w3, joNodeDesc, joCall ) {
    if( ! g_bIsGenerateNodeEcdsaKeys ) {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Importing existing " ) + cc.attention( "ECDSA key" ) + cc.bright( " for node " ) + nodeItemDesc( joNodeDesc ) +
                cc.bright( "..." ) + "\n\n" );
        }
        const strKeyName = joNodeDesc.nameEcdsaPubKey;
        const strKeyPrivate = joNodeDesc.nodePrivateKey;
        const strKeyPublic = private_key_2_public_key( g_w3_main_net, strKeyPrivate );
        if( g_bVerbose ) {
            log.write( cc.normal( "Node key name in SGX is " ) + cc.info( strKeyName ) + "\n" );
            log.write( cc.normal( "Node private key is " ) + cc.notice( strKeyPrivate ) + "\n" );
            log.write( cc.normal( "Node public key is " ) + cc.notice( strKeyPublic ) + "\n" );
        }
        await ima_import_key( joCall, strKeyName, strKeyPrivate );
        joNodeDesc.publicKey = strKeyPublic;
        return;
    }
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Generating " ) + cc.attention( "ECDSA key" ) + cc.bright( " for node " ) + nodeItemDesc( joNodeDesc ) +
            cc.bright( "..." ) + "\n\n" );
    }
    joCall.call( {
        "method": "generateECDSAKey",
        "params": {
            //"keyName": joNodeDesc.nameEcdsaPubKey
        }
    }, async function( joIn, joOut, err ) {
        if( joOut != null && joOut != undefined && typeof joOut == "object" ) {
            if( "result" in joOut && typeof joOut.result == "object" && "errorMessage" in joOut.result && typeof joOut.result.errorMessage == "string" && joOut.result.errorMessage.length > 0 )
                err = "" + joOut.result.errorMessage;
            else if( "error" in joOut )
                err = "" + joOut.error.toString();
        }
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " RPC call problem in " ) + cc.info( "sgx_generate_key" ) + cc.error( " for node " ) + cc.info( joNodeDesc.nNodeIndex ) + cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
            end_of_test( 34 ); // old: 1500 + joNodeDesc.nNodeIndex
        }
        // here PublicKey -> publicKey
        joNodeDesc.publicKey = "" + joOut.result.publicKey;
        joNodeDesc.nameEcdsaPubKey = "" + joOut.result.keyName; // nameEcdsaPubKey -> keyName
        if( g_bVerbose ) {
            log.write( cc.normal( "ECDSAKey " ) + nodeItemDesc( joNodeDesc ) +
                cc.normal( " was generated: " ) +
                ( joOut ? ( joOut.result ? cc.j( joOut.result ) : cc.error( "empty-result" ) ) : cc.error( "empty-call-output" ) ) + // cc.info( joNodeDesc.publicKey ) +
                "\n" );
        }
    } );
}

function sgx_create_node_bls_private_key( joNodeDesc, joCall ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Creating " ) + cc.attention( "BLS private key" ) + cc.bright( " for node " ) + nodeItemDesc( joNodeDesc ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[joNodeDesc.idxChain].arrNodeDescriptions;
    const nThreshold = get_needed_threshold( arrNodeDescriptions.length );
    //let ss = joNodeDesc.secretShare;
    // let ss = "";
    const ss = [];
    for( i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeWalk = arrNodeDescriptions[i];
        const xx = remove_starting_0x( joNodeWalk.joBroadcastEventData.secretKeyContribution[joNodeDesc.nNodeIndex] );
        ss.push( xx );
    }
    const ss_blob = ssn2blob( ss );
    if( g_bVerbose ) {
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "blsKeyName" ) + cc.normal( "=" ) + cc.info( joNodeDesc.nameBlsPrivateKey ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "ethKeyName" ) + cc.normal( "=" ) + cc.info( joNodeDesc.nameEcdsaPubKey ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "polyName" ) + cc.normal( "=" ) + cc.info( joNodeDesc.nameSgxPoly ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "secretShare" ) + cc.normal( "=" ) + cc.j( ss ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "secretShare as blob" ) + cc.normal( "=" ) + cc.j( ss_blob ) + "\n" );
    }
    joCall.call( {
        "method": "createBLSPrivateKey", // old - "CreateBLSPrivateKey", new - "createBLSPrivateKey"
        "params": {
            "blsKeyName": joNodeDesc.nameBlsPrivateKey,
            "ethKeyName": joNodeDesc.nameEcdsaPubKey,
            "polyName": joNodeDesc.nameSgxPoly,
            "secretShare": ss_blob, // ss,
            "t": nThreshold,
            "n": arrNodeDescriptions.length
        }
    }, async function( joIn, joOut, err ) {
        if( joOut != null && joOut != undefined && typeof joOut == "object" ) {
            if( "result" in joOut && typeof joOut.result == "object" && "errorMessage" in joOut.result && typeof joOut.result.errorMessage == "string" && joOut.result.errorMessage.length > 0 )
                err = "" + joOut.result.errorMessage;
            else if( "error" in joOut )
                err = "" + joOut.error.toString();
        }
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " RPC call problem in " ) + cc.info( "sgx_create_node_bls_private_key" ) + cc.error( " for node " ) + cc.info( joNodeDesc.nNodeIndex ) + cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
            end_of_test( 35 ); // old: 1600 + joNodeDesc.nNodeIndex
        }
        if( g_bVerbose ) {
            log.write( cc.normal( "BLS private key for node " ) + nodeItemDesc( joNodeDesc ) +
                cc.normal( " was created " ) +
                "\n" );
        }
        joNodeDesc.isBlsPrivateKeyCreated = true;
    } );
}

function sgx_fetch_node_public_key( joNodeDesc, joCall ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Fetching " ) + cc.attention( "BLS public key" ) + cc.bright( " for node " ) + nodeItemDesc( joNodeDesc ) +
            cc.bright( " for BLS key name " ) + cc.sunny( joNodeDesc.nameBlsPrivateKey ) +
            cc.bright( "..." ) + "\n\n" );
    }
    joCall.call( {
        "method": "getBLSPublicKeyShare", // old - "GetBLSPublicKeyShare", new - "getBLSPublicKeyShare"
        "params": {
            "blsKeyName": joNodeDesc.nameBlsPrivateKey
        }
    }, async function( joIn, joOut, err ) {
        if( joOut != null && joOut != undefined && typeof joOut == "object" && "error" in joOut ) {
            if( "result" in joOut && typeof joOut.result == "object" && "errorMessage" in joOut.result && typeof joOut.result.errorMessage == "string" && joOut.result.errorMessage.length > 0 )
                err = "" + joOut.result.errorMessage;
            else if( "error" in joOut )
                err = "" + joOut.error.toString();
        }
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " RPC call problem in " ) + cc.info( "sgx_fetch_node_public_key" ) + cc.error( " for node " ) + cc.info( joNodeDesc.nNodeIndex ) + cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
            end_of_test( 36 ); // old: 1700 + joNodeDesc.nNodeIndex
        }
        joNodeDesc.blsPublicKey = joOut.result.blsPublicKeyShare; // BLSPublicKeyShare -> blsPublicKeyShare
        if( joNodeDesc.blsPublicKey == null || joNodeDesc.blsPublicKey == undefined ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " RPC call problem in " ) + cc.info( "sgx_fetch_node_public_key" ) + cc.error( " for node " ) + cc.info( joNodeDesc.nNodeIndex ) + cc.error( ", no BLS key returned, full answer is: " ) + cc.j( joOut ) + "\n" );
            end_of_test( 37 ); // old: 1800 + joNodeDesc.nNodeIndex
        }
        if( g_bVerbose ) {
            log.write( cc.normal( "BLS public key for node " ) + nodeItemDesc( joNodeDesc ) +
                cc.normal( ": " ) + cc.j( joNodeDesc.blsPublicKey ) +
                "\n" );
        }
        joNodeDesc.bSgxPassedPost = true;
    } );
}

async function sgx_dkg_process_pre( idxChain, w3, joCall ) {
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        joNodeDesc.nNodeIndex = 0 + i;
        await sgx_generate_key( w3, joNodeDesc, joCall );
    }
    waitAsyncUntil( function() {
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            if( joNodeDesc.publicKey == null || joNodeDesc.publicKey == undefined )
                return false;
        }
        return true;
    }, async function() {
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            joNodeDesc.nNodeIndex = 0 + i;
            sgx_generate_dkg_poly( w3, joNodeDesc, joCall );
        }
        waitAsyncUntil( function() {
            for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                const joNodeDesc = arrNodeDescriptions[i];
                if( joNodeDesc.arrVerificationVector.length == 0 )
                    return false;
            }
            return true;
        }, async function() {
            for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                const joNodeDesc = arrNodeDescriptions[i];
                sgx_do_secret_key_contribution( w3, joNodeDesc, joCall );
            }
            waitAsyncUntil( function() {
                for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                    const joNodeDesc = arrNodeDescriptions[i];
                    if( joNodeDesc.secretShare.length == 0 ) // old SecretShare - new secretShare
                        return false;
                }
                return true;
            }, async function() {} );
        } );
    } );
}

function sgx_dkg_process_post( idxChain, w3, joCall ) {
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDescA = arrNodeDescriptions[i]; // who is verifier - master
        for( let j = 0; j < arrNodeDescriptions.length; ++j ) {
            const joNodeDescB = arrNodeDescriptions[j]; // who is verified - slave
            sgx_do_verify_secret( w3, joNodeDescA, joNodeDescB, joCall );
        }
    }
    waitAsyncUntil( function() {
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            if( !joNodeDesc.isSecretVerified )
                return false;
        }
        return true;
    }, async function() {
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            sgx_create_node_bls_private_key( joNodeDesc, joCall );
        }
        waitAsyncUntil( function() {
            for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                const joNodeDesc = arrNodeDescriptions[i];
                if( !joNodeDesc.isBlsPrivateKeyCreated )
                    return false;
            }
            return true;
        }, async function() {
            for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                const joNodeDesc = arrNodeDescriptions[i];
                sgx_fetch_node_public_key( joNodeDesc, joCall );
            }
            waitAsyncUntil( function() {
                for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                    const joNodeDesc = arrNodeDescriptions[i];
                    if( joNodeDesc.blsPublicKey == null )
                        return false;
                }
                return true;
            }, async function() {} );
        } );
    } );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function rest_based_split_by( s, lengthPart ) {
    s = remove_starting_0x( s );
    const arr = [];
    while( s.length > 0 ) {
        if( s.length > lengthPart ) {
            const n = s.length - lengthPart;
            arr.splice( 0, 0, ensure_starts_with_0x( s.substr( n ), true ) );
            s = s.substr( 0, n );
        } else {
            arr.splice( 0, 0, ensure_starts_with_0x( "" + s ) );
            s = "";
        }
    }
    return arr;
}

function string_to_FP2_point( s ) {
    s = remove_starting_0x( s );
    const arrParts = rest_based_split_by( s, 64 );
    if( arrParts.length != 2 ) {
        log.write(
            cc.fatal( "FATAL:" ) + cc.error( " error converting value " ) + cc.warning( s ) +
            cc.error( " into " ) + cc.info( "FP2 point" ) +
            "\n" );
        end_of_test( 38 );
        return;
    }
    return {
        a: ensure_starts_with_0x( "" + arrParts[0], true ),
        b: ensure_starts_with_0x( "" + arrParts[1], true )
    };
}

function string_to_G2_point( s ) {
    s = remove_starting_0x( s );
    const arrParts = rest_based_split_by( s, 128 );
    if( arrParts.length != 2 ) {
        log.write(
            cc.fatal( "FATAL:" ) + cc.error( " error converting value " ) + cc.warning( s ) +
            cc.error( " into " ) + cc.info( "G2 point" ) +
            "\n" );
        end_of_test( 39 );
        return;
    }
    return {
        x: string_to_FP2_point( arrParts[0] ),
        y: string_to_FP2_point( arrParts[1] )
    };
}

function vv_split( vv, t ) {
    vv = remove_starting_0x( vv );
    const vvs = [];
    const cnt = vv.length;
    const lengthInLevel1 = Math.ceil( cnt / t );
    const arrLevel1 = rest_based_split_by( vv, lengthInLevel1 );
    for( const s of arrLevel1 )
        vvs.push( string_to_G2_point( s ) );
    return vvs;
}

function secret_key_contribution_split( secretKeyContribution, n ) {
    secretKeyContribution = remove_starting_0x( secretKeyContribution );
    const cnt = secretKeyContribution.length;
    const lengthInLevel1 = Math.ceil( cnt / n );
    const arrLevel1 = rest_based_split_by( secretKeyContribution, lengthInLevel1 );
    const skcs = [];
    for( const s of arrLevel1 ) {
        const arrLevel2 = rest_based_split_by( s, 64 );
        if( arrLevel2.length != 3 ) {
            log.write(
                cc.fatal( "FATAL:" ) + cc.error( " error converting value " ) + cc.warning( s ) +
                cc.error( " into " ) + cc.info( "KeyShare structure" ) +
                "\n" );
            end_of_test( 40 );
            return;
        }
        const entry = {
            share: ensure_starts_with_0x( "" + arrLevel2[2], true ),
            publicKey: [
                ensure_starts_with_0x( "" + arrLevel2[0], true ),
                ensure_starts_with_0x( "" + arrLevel2[1], true )
            ]
        };
        skcs.push( entry );
    }
    return skcs;
}

async function send_dkg_broadcast( w3, joNodeDesc, privateKey ) {
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Sending " ) + cc.attention( "DKG broadcast" ) + cc.bright( " from node " ) + nodeItemDesc( joNodeDesc ) +
                cc.bright( "..." ) + "\n\n" );
        }
        const arrNodeDescriptions = g_arrChains[joNodeDesc.idxChain].arrNodeDescriptions;
        const nThreshold = get_needed_threshold( arrNodeDescriptions.length );
        // const arrAssignedNodeIndices = g_arrChains[joNodeDesc.idxChain].arrAssignedNodeIndices;
        // const addressFrom = private_key_2_account_address( w3, privateKey );
        const groupName = g_joChainEventInfoSM.returnValues.name;
        const groupIndex = w3.utils.soliditySha3( groupName );
        const vv = "0x" + get_verification_vector_summary( w3, joNodeDesc ); // get_verification_vector_summary_inv( w3, joNodeDesc );
        const secretKeyContribution = ensure_starts_with_0x( joNodeDesc.secretShare );
        //
        // TO-FIX: the nodeIndexAssigned value MUST BE computed as arrAssignedNodeIndices[joNodeDesc.nNodeIndex], right???
        //
        const nodeIndexAssigned = joNodeDesc.idxSerialGlobal; // joNodeDesc.nNodeIndex; // arrAssignedNodeIndices[joNodeDesc.nNodeIndex]; // joNodeDesc.nNodeIndex
        if( g_bVerbose ) {
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "name" ) + cc.normal( "=" ) + cc.info( groupName ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "groupIndex" ) + cc.normal( "=" ) + cc.info( groupIndex ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "nodeSerialIndex" ) + cc.normal( "=" ) + cc.info( joNodeDesc.nNodeIndex ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "nodeIndexAssigned" ) + cc.normal( "=" ) + cc.info( nodeIndexAssigned ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "verificationVector" ) + cc.normal( "=" ) + cc.info( vv ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "secretKeyContribution" ) + cc.normal( "=" ) + cc.info( secretKeyContribution ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "nodeAddress" ) + cc.normal( "=" ) + cc.info( joNodeDesc.nodeAddress ) + "\n" );
        }
        const vvs = vv_split( vv, nThreshold );
        const skcs = secret_key_contribution_split( secretKeyContribution, arrNodeDescriptions.length );
        if( g_bVerbose ) {
            log.write( "    " + cc.normal( "Transformed " ) + cc.attention( "verificationVector" ) + cc.normal( "=" ) + cc.j( vvs ) + "\n" );
            log.write( "    " + cc.normal( "Transformed " ) + cc.attention( "secretKeyContribution" ) + cc.normal( "=" ) + cc.j( skcs ) + "\n" );
        }
        const res =
            await jo_skale_dkg.methods.broadcast(
                groupIndex
                , nodeIndexAssigned
                , vvs // vv
                , skcs // secretKeyContribution
                , 0 // rotationCounter
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: joNodeDesc.nodeAddress, // addressFrom
                gas: 8000000
            } );
        if( g_bVerbose )
            log.write( "    " + cc.notice( "res" ) + cc.normal( "=" ) + cc.j( res ) + "\n" );
        return res;
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " problem in " ) + cc.info( "DKG broadcast" ) +
        cc.error( " invoked for for node " ) + nodeItemDesc( joNodeDesc ) +
        cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 41 );
    }
}

async function fetch_event_BroadcastAndKeyShare( idxChain, w3, nodeSerialIndex, nodeIndexAssigned ) {
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Fetching " ) + cc.attention( "broadcast event" ) + cc.bright( " for node #" ) + cc.info( nodeSerialIndex ) +
                cc.bright( " with assigned index #" ) + cc.info( nodeIndexAssigned ) +
                cc.bright( "..." ) + "\n\n" );
        }
        const joFilter = {
            "schainHash": w3.utils.soliditySha3( g_arrChains[idxChain].name ),
            "fromNode": "0x" + w3.utils.toBN( nodeIndexAssigned.toString() ).toString( 16 ) // nodeIndexAssigned
        };
        if( g_bVerbose )
            log.write( cc.debug( "Fetching filter is " ) + cc.j( joFilter ) + "\n" );
        const res =
            await jo_skale_dkg.getPastEvents( "BroadcastAndKeyShare", {
                filter: joFilter,
                fromBlock: 0,
                toBlock: "latest"
            } );
        if( g_bVerbose ) {
            log.write(
                "    " + cc.debug( "Search result for " ) + cc.info( "BroadcastAndKeyShare" ) +
                cc.debug( " event on S-Chain " ) + cc.info( g_arrChains[idxChain].name ) +
                cc.debug( " node " ) + cc.info( nodeSerialIndex ) +
                cc.normal( "(" ) + cc.info( nodeIndexAssigned ) + cc.normal( ")" ) +
                cc.debug( " is " ) + cc.j( res ) + "\n" );
        }
        const cnt = res.length;
        if( cnt != 1 ) {
            log.write(
                cc.fatal( "FATAL ERROR:" ) + cc.error( " Found " ) + cc.warning( cnt ) +
                cc.error( " events but expecting only " ) + cc.info( 1 ) +
                cc.error( ", will stop test sequence end exit" ) + "\n" );
            await end_of_test( 42 );
        }

        const joBroadcastEventData = {
            "serialIndex": nodeSerialIndex,
            "groupIndex": res[0].returnValues.groupIndex,
            "fromNode": res[0].returnValues.fromNode,
            "verificationVector": res[0].returnValues.verificationVector,
            "secretKeyContribution": res[0].returnValues.secretKeyContribution
        };
        if( g_bVerbose )
            log.write( "    " + cc.notice( "Event data" ) + cc.normal( " is " ) + cc.j( joBroadcastEventData ) + "\n" );
        // typical joBroadcastEventData is:
        // {
        //     serialIndex: 0,
        //     groupIndex: "0x91ad6c5a901038b4f5c60ca8f54fe83da96195cc18d5701e5256d48e8acbd4bf",
        //     fromNode: "1",
        //     verificationVector: "0x058fa6b14a14f17e36aa27b141273288cf44669f77388153dc04ac51f0a921a619fa68628052bdd230146cf9aa0f12e632aae609e817ffacbad7e01b5e4d8f800e66d99ae8628c9492fc5a0b63dd2f04506557eb67565308d3e4e024e48a6e202b6b3cac61b34ea5bd49909c44c4eebc1b3aea178922be30863b113a2d0474e51b653c1d326c7036ad9d7e73bb49bc5e4a978bb7ed7c75de2420d2fe6db392901e95bac043a562fa1564f27b292107cc9caa036279d4424f4b76616f55557cbe1e5567f7e32b068bf381e3f3a929a2264f6c3f9026633f3890db50eeaafac8b91ae57f7101e978a82c769a80a8482a2fb7567ca398b7122557717e580e674bdf",
        //     secretKeyContribution: "0x87521a893d18a74e43b6f5836db2ffa786f26ff805824a06681de7b2658da3be702cc6c26a2b35050b56a6d123c6284931a5b799b33190c8b1911f092001307fe45a05050c191b6677981dfe02b364b963a1996cf4294dec1a88f01e42e79812823cc427be7fa6bb434351b06ff8c0f197a9afdb038de3582e7758d277ae491eb7acb63ab16217fb70777e906ce8caa643454feae29d55588bac83145849e84528216c25dd6952469c0b24b21da56774e233548e4d677119fda9c7fca3c25667"
        // }
        return joBroadcastEventData;
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " problem while fetching " ) + cc.info( "broadcast event" ) +
        cc.error( " invoked for for node with serial index " ) + nodeItemDesc( nodeSerialIndex ) +
        cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 43 );
    }
}

async function send_dkg_alright( idxChain, w3, nodeSerialIndex, nodeIndexAssigned, privateKey ) {
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Saying " ) + cc.attention( "DKG alright" ) + cc.bright( " from node #" ) + cc.info( nodeSerialIndex ) +
                cc.bright( "..." ) + "\n\n" );
        }
        const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
        const joNodeDesc = arrNodeDescriptions[nodeSerialIndex];
        // const addressFrom = private_key_2_account_address( w3, privateKey );
        const groupName = g_joChainEventInfoSM.returnValues.name;
        const groupIndex = w3.utils.soliditySha3( groupName );
        if( g_bVerbose ) {
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "name" ) + cc.normal( "=" ) + cc.info( groupName ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "groupIndex" ) + cc.normal( "=" ) + cc.info( groupIndex ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "nodeSerialIndex" ) + cc.normal( "=" ) + cc.info( joNodeDesc.nNodeIndex ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "nodeIndexAssigned" ) + cc.normal( "=" ) + cc.info( nodeIndexAssigned ) + "\n" );
            log.write( "    " + cc.normal( "Using " ) + cc.attention( "nodeAddress" ) + cc.normal( "=" ) + cc.info( joNodeDesc.nodeAddress ) + "\n" );
        }
        const res =
            await jo_skale_dkg.methods.alright(
                groupIndex
                , joNodeDesc.idxSerialGlobal // nNodeIndex
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: joNodeDesc.nodeAddress, // addressFrom
                gas: 8000000
            } );
        if( g_bVerbose )
            log.write( "    " + cc.notice( "res" ) + cc.normal( "=" ) + cc.j( res ) + "\n" );
        return res;
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " problem while saying " ) + cc.info( "DKG alright" ) +
        cc.error( " invoked for for node with serial index " ) + nodeItemDesc( nodeSerialIndex ) +
        cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 44 );
    }
}

async function fetch_bls_common_public_key( w3 ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Fetching " ) + cc.attention( "BLS common public key" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const groupName = g_joChainEventInfoSM.returnValues.name;
    const groupIndex = w3.utils.soliditySha3( groupName );
    if( g_bVerbose ) {
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "name" ) + cc.normal( "=" ) + cc.info( groupName ) + "\n" );
        log.write( "    " + cc.normal( "Using " ) + cc.attention( "groupIndex" ) + cc.normal( "=" ) + cc.info( groupIndex ) + "\n" );
    }
    const res = await jo_key_storage.methods.getCommonPublicKey( groupIndex ).call();
    if( g_bVerbose )
        log.write( "    " + cc.notice( "res" ) + cc.normal( "=" ) + cc.j( res ) + "\n" );
    const joCommonPublicKeyBLS = {
        // "commonBLSPublicKey0": res[1],
        // "commonBLSPublicKey1": res[0],
        // "commonBLSPublicKey2": res[3],
        // "commonBLSPublicKey3": res[2]
        "commonBLSPublicKey0": res[0][1],
        "commonBLSPublicKey1": res[0][0],
        "commonBLSPublicKey2": res[1][1],
        "commonBLSPublicKey3": res[1][0]
    };
    if( g_bVerbose )
        log.write( "    " + cc.notice( "BLS common public key" ) + cc.normal( " is " ) + cc.j( joCommonPublicKeyBLS ) + "\n" );
    return joCommonPublicKeyBLS;
}

// async function fetch_node_public_key( w3, joNodeDesc, nodeIndexAssigned ) {
//     if( g_bVerbose )
//         log.write( "\n\n"
//             + cc.bright( "Fetching public key for node " ) + nodeItemDesc( joNodeDesc )
//             + cc.bright( "..." ) + "\n\n" );
//     let groupName = g_joChainEventInfoSM.returnValues.name;
//     let groupIndex = w3.utils.soliditySha3( groupName );
//     if( g_bVerbose ) {
//         log.write( "    " + cc.normal( "Using " ) + cc.attention( "nodeIndexAssigned" ) + cc.normal( "=" ) + cc.info( nodeIndexAssigned ) + "\n" );
//     }
//     let res = await jo_nodes.methods.getNodePublicKey( nodeIndexAssigned ).call(); // jo_nodes_data
//     if( g_bVerbose )
//         log.write( "    " + cc.notice( "res" ) + cc.normal( "=" ) + cc.j( res ) + "\n" );
//     return res;
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init_sgx_ssl_for_nodes( idxChain ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Initializing " ) + cc.sunny( "SGX SSL" ) + cc.bright( " for nodes" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        // const joNodeDesc = arrNodeDescriptions[i];
        const strFolderNodeSkaled = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/node_" + zeroPad( i, 2 );
        // const strConfigPath = joNodeDesc.nodeConfigJsonPath;
        const strCommand = "cp -rf ./create_pems " + strFolderNodeSkaled;
        const strWorkingDirectory = __dirname;
        const joEnv = {
            "PATH": g_strRecommendedShellPATH,
            "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
        };
        if( g_bVerbose ) {
            log.write(
                cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
        }
        child_process.execSync(
            strCommand,
            {
                cwd: "" + strWorkingDirectory,
                stdio: "inherit",
                env: joEnv
            } );
        const strSkaledNodeSgxDataFolder = strFolderNodeSkaled + "/create_pems";
        init_sgx_ssl_in_folder( strSkaledNodeSgxDataFolder );
    } // for( let i = 0; i < arrNodeDescriptions.length; ++i )

    if( g_bVerbose )
        log.write( cc.success( "Finished SGX SSL initialization" ) + "\n" );
}

function get_node_desc_by_node_id( idxChain, nodeID ) {
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        if( joNodeDesc.nodeID == nodeID )
            return joNodeDesc;
    }
    return null;
}

function perform_multi_node_deployment( idxChain ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Performing " ) + cc.sunny( "Multi Node Deployment" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        const strFolderNodeSkaled = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/node_" + zeroPad( i, 2 );
        const strConfigPath = strFolderNodeSkaled + "/config.json";
        const strSkaledNodeSgxDataFolder = strFolderNodeSkaled + "/create_pems";
        const nThreshold = get_needed_threshold( arrNodeDescriptions.length );
        if( g_bVerbose ) {
            log.write( cc.normal( "Loading config file for node " ) + nodeItemDesc( joNodeDesc ) +
                cc.normal( " from file " ) + cc.info( strConfigPath ) + cc.normal( "..." ) +
                "\n" );
        }
        joNodeDesc.joConfig = jsonFileLoad( strConfigPath, null, g_bVerbose );
        //
        // // // joNodeDesc.joConfig.skaleConfig.nodeInfo.imaMainNet = g_strMainNetURL; // ... or ... + get_main_net_url_4_ima( joNodeDesc.idxChain, joNodeDesc.idxNode )
        // joNodeDesc.joConfig.skaleConfig.nodeInfo.imaMessageProxySChain
        // joNodeDesc.joConfig.skaleConfig.nodeInfo.imaMessageProxyMainNet
        joNodeDesc.joConfig.skaleConfig.nodeInfo.imaCallerAddressSChain = process.env.ACCOUNT_FOR_SCHAIN || "0x66c5a87f4a49DD75e970055A265E8dd5C3F8f852";
        joNodeDesc.joConfig.skaleConfig.nodeInfo.imaCallerAddressMainNet = process.env.ACCOUNT_FOR_ETHEREUM || "0x7aa5e36aa15e93d10f4f26357c30f052dacdde5f";
        if( ! ( "wallets" in joNodeDesc.joConfig.skaleConfig.nodeInfo ) )
            joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets = {};
        if( ! ( "ima" in joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets ) )
            joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima = {};
        // joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.url = g_strUrlSgxWalletHTTPS; // obsolete
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.caFile = strSkaledNodeSgxDataFolder + "/rootCA.pem"; // TO-DO: should be different for each skaled
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.certFile = strSkaledNodeSgxDataFolder + "/client.crt"; // TO-DO: should be different for each skaled
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.keyFile = strSkaledNodeSgxDataFolder + "/k.pem"; // "/k.key" // TO-DO: should be different for each skaled
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.keyShareName = joNodeDesc.nameBlsPrivateKey;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.t = nThreshold;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.n = arrNodeDescriptions.length;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.BLSPublicKey0 = "" + joNodeDesc.blsPublicKey[0];
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.BLSPublicKey1 = "" + joNodeDesc.blsPublicKey[1];
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.BLSPublicKey2 = "" + joNodeDesc.blsPublicKey[2];
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.BLSPublicKey3 = "" + joNodeDesc.blsPublicKey[3];
        joNodeDesc.joConfig.skaleConfig.nodeInfo.ecdsaKeyName = joNodeDesc.nameEcdsaPubKey;
        //
        // joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.commonBLSPublicKey0 = "" + g_joCommonPublicKeyBLS.commonBLSPublicKey0;
        // joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.commonBLSPublicKey1 = "" + g_joCommonPublicKeyBLS.commonBLSPublicKey1;
        // joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.commonBLSPublicKey2 = "" + g_joCommonPublicKeyBLS.commonBLSPublicKey2;
        // joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.commonBLSPublicKey3 = "" + g_joCommonPublicKeyBLS.commonBLSPublicKey3;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.commonBLSPublicKey0 = "" + g_joCommonPublicKeyBLS.commonBLSPublicKey1;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.commonBLSPublicKey1 = "" + g_joCommonPublicKeyBLS.commonBLSPublicKey0;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.commonBLSPublicKey2 = "" + g_joCommonPublicKeyBLS.commonBLSPublicKey3;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.wallets.ima.commonBLSPublicKey3 = "" + g_joCommonPublicKeyBLS.commonBLSPublicKey2;
        //
        joNodeDesc.joConfig.skaleConfig.sChain.nodeGroups = {
            "0": {
                "nodes": { },
                "finish_ts": null,
                "bls_public_key": {
                    "blsPublicKey0": "" + g_joCommonPublicKeyBLS.commonBLSPublicKey1,
                    "blsPublicKey1": "" + g_joCommonPublicKeyBLS.commonBLSPublicKey0,
                    "blsPublicKey2": "" + g_joCommonPublicKeyBLS.commonBLSPublicKey3,
                    "blsPublicKey3": "" + g_joCommonPublicKeyBLS.commonBLSPublicKey2
                }
            }
        };
        //
        joNodeDesc.joConfig.skaleConfig.nodeInfo["skale-manager"] = {
            "SchainsInternal": "" + g_joSkaleManagerABI.schains_internal_address,
            "Nodes": "" + g_joSkaleManagerABI.nodes_address
        };
        //
        for( const joConfigNode of joNodeDesc.joConfig.skaleConfig.sChain.nodes ) {
            // update ECDSA public keys for all nodes in particular config.json
            const joCorrespondingNodeDesc = get_node_desc_by_node_id( idxChain, joConfigNode.nodeID );
            joConfigNode.publicKey = ensure_starts_with_0x( joCorrespondingNodeDesc.publicKey, true );
            joConfigNode.blsPublicKey0 = joCorrespondingNodeDesc.blsPublicKey[0];
            joConfigNode.blsPublicKey1 = joCorrespondingNodeDesc.blsPublicKey[1];
            joConfigNode.blsPublicKey2 = joCorrespondingNodeDesc.blsPublicKey[2];
            joConfigNode.blsPublicKey3 = joCorrespondingNodeDesc.blsPublicKey[3];
        }
        //
        log.write( cc.normal( "Saving config file for node " ) + nodeItemDesc( joNodeDesc ) +
            cc.normal( " to file " ) + cc.info( strConfigPath ) + cc.normal( "..." ) +
            "\n" );
        jsonFileSave( strConfigPath, joNodeDesc.joConfig, g_bVerbose );
    } // for( let i = 0; i < arrNodeDescriptions.length; ++i )
    if( g_bVerbose )
        log.write( cc.success( "Finished Multi Node deployment" ) + "\n" );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const g_strPrepareMainNetCmd = findExistingFilePath( [ path.join( __dirname, "../cli-ganache/clean.sh" ), path.join( __dirname, "../../skaled-tests/cli-ganache/clean.sh" ) ] );
const g_strRunMainNetCmd = findExistingFilePath( [ path.join( __dirname, "../cli-ganache/run.sh" ), path.join( __dirname, "../../skaled-tests/cli-ganache/run.sh" ) ] );
if( g_bVerbose )
    log.write( cc.normal( "Assuming " ) + cc.sunny( "Main NET run script" ) + cc.normal( " is located at " ) + cc.info( g_strRunMainNetCmd ) + "\n" );
const g_strLogPathMainNet = normalizePath( path.join( __dirname, "mainnet.log" ) );
if( g_bVerbose ) {
    log.write( cc.normal( "Assuming " ) + cc.success( "MAIN NET" ) + cc.normal( " run command is " ) + cc.info( g_strRunMainNetCmd ) + "\n" );
    log.write( cc.normal( "Assuming " ) + cc.success( "MAIN NET" ) + cc.normal( " log file is " ) + cc.info( g_strLogPathMainNet ) + "\n" );
}

function mainnet_prepare() {
    if( g_bExternalMN )
        quick_spawn( g_strPrepareMainNetCmd );
}

let g_procMainNet = null;

function mainnet_start() {
    if( g_bExternalMN ) {
        if( g_bAskExternalStartStopMN ) {
            log.write(
                "\n\n" + cc.normal( "Please" ) + " " + cc.sunny( "start" ) + " " + cc.success( "MAIN NET" ) +
                cc.normal( ", then press " ) + cc.attention( "<ENTER>" ) + cc.normal( "  to continue test..." ) +
                "\n" );
            wait_ENTER_key_press_on_console();
            log.write( cc.normal( "Resuming test..." ) + "\n" );
        } else {
            log.write(
                cc.normal( "Assuming " ) + cc.success( "MAIN NET" ) +
                cc.normal( " is " ) + cc.sunny( "started" ) +
                cc.normal( "... continuing test..." ) +
                "\n" );
        }
        return;
    }
    if( g_procMainNet )
        return;
    if( g_bVerbose )
        log.write( cc.normal( "Starting " ) + cc.success( "MAIN NET" ) + cc.normal( "..." ) + "\n" );
    g_procMainNet = new ProcessController(
        g_strRunMainNetCmd,
        [],
        g_strLogPathMainNet,
        8545
    );
    g_procMainNet.run();
}
async function mainnet_stop() {
    if( g_bExternalMN ) {
        if( g_bAskExternalStartStopMN ) {
            log.write(
                "\n\n" + cc.normal( "Please" ) + " " + cc.error( "stop" ) + " " + cc.success( "MAIN NET" ) +
                cc.normal( ", then press " ) + cc.attention( "<ENTER>" ) + cc.normal( " to continue test..." ) +
                "\n" );
            wait_ENTER_key_press_on_console();
            log.write( cc.normal( "Resuming test..." ) + "\n" );
        } else {
            log.write(
                cc.normal( "Assuming " ) + cc.success( "MAIN NET" ) +
                cc.normal( " is " ) + cc.error( "stopped" ) +
                cc.normal( "... continuing test..." ) +
                "\n" );
        }
        return;
    }
    if( ! g_procMainNet )
        return;
    if( g_bVerbose )
        log.write( cc.normal( "Stopping " ) + cc.success( "MAIN NET" ) + cc.normal( "..." ) + "\n" );
    await g_procMainNet.stop();
    g_procMainNet = null;
}

async function check_s_chain_public_key( strSChainName ) {
    const w3 = g_w3_main_net;
    const privateKey = "" + g_strPrivateKeySkaleManagerMN;
    const addressFrom = private_key_2_account_address( w3, privateKey );
    const strSChainDesc = cc.debug( "S-Chain " ) + cc.info( strSChainName );
    try {
        if( g_bVerbose )
            log.write( cc.debug( "Checking public ley of " ) + strSChainDesc + cc.debug( "..." ) + "\n" );
        const hashOfSchainName = w3.utils.keccak256( strSChainName );
        const r = await jo_key_storage.methods.getCommonPublicKey(
            hashOfSchainName // strSChainName
        ).call( { from: addressFrom } );
        if( g_bVerbose )
            log.write( cc.debug( "Got public ley of " ) + strSChainDesc + cc.debug( ": " ) + cc.info( r ) + "\n" );
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " checking public ley of " ) + strSChainDesc + cc.error( ": " ) + cc.warning( err.toString() ) + "\n" );
    }
}

async function skaled_node_check_address( joNodeDesc ) {
    const w3 = g_w3_main_net;
    const privateKey = "" + g_strPrivateKeySkaleManagerMN;
    const addressFrom = private_key_2_account_address( w3, privateKey );
    // const publicKey = private_key_2_public_key( w3, privateKey );
    const validator = "" + addressFrom;
    const idx = joNodeDesc.idxNode; // joNodeDesc.nodeID
    const strNodeDesc = cc.sunny( joNodeDesc.idxNode ) + cc.debug( "/" ) + cc.info( joNodeDesc.nodeID );
    try {
        if( g_bVerbose )
            log.write( cc.debug( "Checking node " ) + strNodeDesc + cc.debug( "..." ) + "\n" );
        const r = await jo_nodes.methods.getNodeAddress( idx ).call( { from: validator } );
        if( g_bVerbose )
            log.write( cc.debug( "Got node " ) + strNodeDesc + cc.debug( " address: " ) + cc.info( r ) + "\n" );
        joNodeDesc.checkedNodeAddress = "" + r; // came from Nodes.getNodeAddress call
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " checking node " ) + strNodeDesc + cc.error( " address: " ) + cc.warning( err.toString() ) + "\n" );
    }
}

function all_skaled_nodes_fix_config_json() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            log.write(
                "\n\n" + cc.normal( "Validating config of " ) + " " + cc.sunny( "skaled" ) + cc.normal( " number " ) +
                cc.info( i ) + cc.normal( " in chain " ) + cc.info( idxChain ) + cc.normal( "..." ) +
                "\n" );
            // const joNodeDesc = arrNodeDescriptions[i];
            const strFolderNodeSkaled = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/node_" + zeroPad( i, 2 );
            const strConfigPath = strFolderNodeSkaled + "/config.json";
            const joConfig = jsonFileLoad( strConfigPath, null, g_bVerbose );
            const arrAccounts = Object.keys( joConfig.accounts );
            let cntModifications = 0;
            for( let j = 0; j < arrAccounts.length; ++ j ) {
                const strAccountAddress = arrAccounts[j];
                const joAccount = joConfig.accounts[strAccountAddress];
                if( "code" in joAccount ) {
                    if( ! ( "balance" in joAccount ) ) {
                        joAccount.balance = "0";
                        cntModifications ++;
                    }
                    if( ! ( "storage" in joAccount ) ) {
                        joAccount.storage = {};
                        cntModifications ++;
                    }
                    if( ! ( "nonce" in joAccount ) ) {
                        joAccount.nonce = "0";
                        cntModifications ++;
                    }
                }
            }
            if( cntModifications > 0 ) {
                log.write( cc.warning( "Done " ) + " " + cc.info( cntModifications ) + cc.warning( " modifications" ) + "\n" );
                jsonFileSave( strConfigPath, joConfig, g_bVerbose );
            } else
                log.write( cc.success( "Done, no modifications needed" ) + "\n" );
        }
    }
}

async function all_skaled_nodes_prepare() {
    if( g_bExternalSC )
        return;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
        "GEN_CNT_CHAINS": g_arrChains.length,
        "GEN_CNT_NODES": g_arrChains[0].arrNodeDescriptions.length,
        "GEN_CNT_SYNC_NODES": g_cntSyncNodesPerChain
    };
    if( g_bSkaledWithBTRFS ) {
        joEnv.SKALED_WITH_BTRFS = "1";
        if( g_bSkaledWithSnapshots )
            joEnv.SKALED_WITH_SNAPSHOTS = "1";
    }
    const cwd = "" + g_strFolderMultiNodeDeployment;
    quick_spawn( path.join( g_strFolderMultiNodeDeployment, "/clean.sh" ), cwd, joEnv );
    quick_spawn( path.join( g_strFolderMultiNodeDeployment, "/clean_all_node_dirs.sh" ), cwd, joEnv );
    quick_spawn( path.join( g_strFolderMultiNodeDeployment, "/init.sh" ), cwd, joEnv );
}

async function all_skaled_nodes_check_addresses() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const joNodeDesc = arrNodeDescriptions[i];
            await skaled_node_check_address( joNodeDesc );
        }
    }
}

async function all_skaled_nodes_init_BTRFS_if_needed() {
    if( ! g_bSkaledWithBTRFS )
        return;
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_skaled_nodes_init_BTRFS_if_needed( idxChain );
    }
}

async function all_skaled_nodes_start() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_skaled_nodes_start( idxChain );
    }
    if( g_nTimeToSleepAfterAllSkaledNodesStartMilliseconds > 0 ) {
        log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepAfterAllSkaledNodesStartMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
        await sleep( g_nTimeToSleepAfterAllSkaledNodesStartMilliseconds );
        log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepAfterAllSkaledNodesStartMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
    }
}

async function all_skaled_nodes_stop() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_skaled_nodes_stop( idxChain );
    }

}

async function schain_skaled_nodes_init_BTRFS_if_needed( idxChain ) {
    if( ! g_bSkaledWithBTRFS )
        return;
    let nCountStartSkipped = 0;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        if( g_nCountOfSkaledInstancesToSkipStart > 0 && i >= 1 && nCountStartSkipped < g_nCountOfSkaledInstancesToSkipStart ) {
            ++ nCountStartSkipped;
            if( g_bVerbose )
                log.write( cc.warning( "Skipping BTRFS init of " ) + cc.attention( "SKALED" ) + cc.warning( " node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            continue;
        }
        if( g_bVerbose )
            log.write( cc.normal( "Initializing " ) + cc.success( "BTRFS" ) + cc.normal( " on chain " ) + cc.sunny( idxChain ) + cc.normal( " node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
        const joEnv = {
            "SKALED_WITH_BTRFS": "1",
            "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
        };
        if( g_bSkaledWithSnapshots )
            joEnv.SKALED_WITH_SNAPSHOTS = "1";
        const arrCommands = [
            "./btrfs-create.sh"
        ];
        await exec_array_of_commands_safe( arrCommands, joNodeDesc.nodeFolder, joEnv );
    } // for( let i = 0; i < arrNodeDescriptions.length; ++i )
}

async function schain_skaled_nodes_start( idxChain ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    if( g_bExternalSC ) {
        if( g_bAskExternalStartStopSC ) {
            log.write(
                "\n\n" + cc.normal( "Please" ) + " " + cc.sunny( "start" ) + " " + cc.success( "S-CHAIN" ) +
                cc.normal( ", then press " ) + cc.attention( "<ENTER>" ) + cc.normal( " to continue test..." ) +
                "\n" );
            wait_ENTER_key_press_on_console();
            log.write( cc.normal( "Resuming test..." ) + "\n" );
        } else {
            log.write(
                cc.normal( "Assuming " ) + cc.success( "S-CHAIN" ) +
                cc.normal( " is " ) + cc.sunny( "started" ) +
                cc.normal( "... continuing test..." ) +
                "\n" );
        }
        return;
    }
    if( g_bVerbose )
        log.write( cc.normal( "Starting " ) + cc.success( "S-CHAIN" ) + cc.normal( "..." ) + "\n" );
    let nCountStartSkipped = 0;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        if( g_nCountOfSkaledInstancesToSkipStart > 0 && i >= 1 && nCountStartSkipped < g_nCountOfSkaledInstancesToSkipStart ) {
            ++ nCountStartSkipped;
            if( g_bVerbose )
                log.write( cc.warning( "Skipping start of " ) + cc.attention( "SKALED" ) + cc.warning( " node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            continue;
        }
        if( g_bVerbose )
            log.write( cc.normal( "Starting " ) + cc.success( "SKALED" ) + cc.normal( " node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
        if( ! joNodeDesc.proc4skaled ) {
            const u = new URL( joNodeDesc.url );
            const joEnv = {
                "PATH": g_strRecommendedShellPATH,
                "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
            };
            joNodeDesc.proc4skaled = new ProcessController(
                joNodeDesc.runCmd4skaled,
                [],
                joNodeDesc.logPath4skaled, // "detached"
                u.port,
                undefined,
                joEnv
            );
        }
        joNodeDesc.proc4skaled.run();
        //joNodeDesc.proc4skaled.continueDetached();
    }
    if( g_bAskToContinueAfterSkaledStarted ) {
        log.write( "\n\n" +
            cc.normal( "Press " ) + cc.attention( "<ENTER>" ) + cc.normal( " to continue test" ) +
            cc.normal( "..." ) + "\n\n" );
        wait_ENTER_key_press_on_console();
    }
}

async function schain_skaled_nodes_stop( idxChain ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    if( g_bExternalSC ) {
        if( g_bAskExternalStartStopSC ) {
            log.write(
                "\n\n" + cc.normal( "Please" ) + " " + cc.error( "stop" ) + " " + cc.success( "S-CHAIN" ) +
                cc.normal( ", then press " ) + cc.attention( "<ENTER>" ) + cc.normal( " to continue test..." ) +
                "\n" );
            wait_ENTER_key_press_on_console();
            log.write( cc.normal( "Resuming test..." ) + "\n" );
        } else {
            log.write(
                cc.normal( "Assuming " ) + cc.success( "S-CHAIN" ) +
                cc.normal( " is " ) + cc.error( "stopped" ) +
                cc.normal( "... continuing test..." ) +
                "\n" );
        }
        return;
    }
    if( g_bVerbose )
        log.write( cc.normal( "Stopping " ) + cc.success( "S-CHAIN" ) + cc.normal( "..." ) + "\n" );
    let nCountStartSkipped = 0;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        if( g_nCountOfSkaledInstancesToSkipStart > 0 && i >= 1 && nCountStartSkipped < g_nCountOfSkaledInstancesToSkipStart ) {
            ++ nCountStartSkipped;
            if( g_bVerbose )
                log.write( cc.warning( "Skipping stop of " ) + cc.attention( "SKALED" ) + cc.warning( " node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            continue;
        }
        if( g_bVerbose )
            log.write( cc.normal( "Stopping " ) + cc.success( "SKALED" ) + cc.normal( " node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
        if( joNodeDesc.proc4skaled ) {
            await joNodeDesc.proc4skaled.stop();
            joNodeDesc.proc4skaled = null;
        }
    }
    //
    try {
        // await fkill( "skaled" );
        const strCommand = "killall -9 skaled";
        const strWorkingDirectory = __dirname;
        const joEnv = {
            "PATH": g_strRecommendedShellPATH,
            "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
        };
        if( g_bVerbose ) {
            log.write(
                cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
        }
        child_process.execSync(
            strCommand,
            {
                cwd: "" + strWorkingDirectory,
                stdio: "inherit",
                env: joEnv
            } );
    } catch ( err ) { }
    try {
        const strCommand = "pkill -9 -f skaled";
        const strWorkingDirectory = __dirname;
        const joEnv = {
            "PATH": g_strRecommendedShellPATH,
            "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
        };
        if( g_bVerbose ) {
            log.write(
                cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
        }
        child_process.execSync(
            strCommand,
            {
                cwd: "" + strWorkingDirectory,
                stdio: "inherit",
                env: joEnv
            } );
    } catch ( err ) { }
}

async function ima_get_docker_image() {
    if( ! g_bDockerIMA )
        return;
    log.write( cc.debug( "Will download docker image " ) + cc.sunny( g_strImaDockerImageName ) +
        cc.debug( "..." ) + "\n" );
    quick_spawn( "docker pull " + g_strImaDockerImageName );
    log.write( cc.debug( "List of available docker containers:" ) + "\n" );
    quick_spawn( "docker containers" );
    log.write( cc.success( "Done." ) + "\n" );
}

function ima_prepare_docker_shares_node( idxChain, idxNode ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    if( g_bVerbose ) {
        log.write( cc.normal( "Will prepare " ) + cc.sunny( "IMA Agent#" ) +
            cc.info( idxChain ) + cc.normal( "/" ) + cc.info( idxNode ) +
            cc.normal( " share for its docker container on node" ) +
            cc.j( idxNode ) + cc.normal( " of chain" ) +
            cc.notice( g_arrChains[idxChain].name ) + cc.debug( "/" ) + cc.note( g_arrChains[idxChain].cid ) +
            cc.normal( "..." ) + "\n" );
    }
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[idxNode];
    const strImaDockerDataFolder = schain_ima_agent_get_docker_cwd( idxChain, idxNode );
    quick_spawn( "mkdir -p " + strImaDockerDataFolder );
    if( g_bVerbose ) {
        log.write( cc.normal( "Copying pre-requisites for " ) + cc.sunny( "IMA Agent#" ) +
            cc.info( idxChain ) + cc.normal( "/" ) + cc.info( idxNode ) +
            cc.normal( "..." ) + "\n" );
    }
    quick_spawn( "cp " + g_strSkaleManagerAbiJsonPath + " .", strImaDockerDataFolder );
    quick_spawn( "cp " + g_strPathImaAbiMN + " .", strImaDockerDataFolder );
    const strPathImaAbiSC = get_ima_abi_schain_path( idxChain );
    quick_spawn( "cp " + strPathImaAbiSC + " .", strImaDockerDataFolder );
    quick_spawn( "cp " + g_strPathForSgxSslData + "/client.crt" + " .", strImaDockerDataFolder );
    quick_spawn( "cp " + g_strPathForSgxSslData + "/k.key" + " .", strImaDockerDataFolder );
    quick_spawn( "ls -1", strImaDockerDataFolder );
    if( g_bVerbose ) {
        log.write( cc.normal( "Creating environment file for " ) + cc.sunny( "IMA Agent#" ) +
            cc.info( idxChain ) + cc.normal( "/" ) + cc.info( idxNode ) +
            cc.normal( "..." ) + "\n" );
    }
    //
    //
    let nMonitoringPort4ImaAgent = joNodeDesc.nMonitoringPort4ImaAgent ? ( 0 + joNodeDesc.nMonitoringPort4ImaAgent ) : 0;
    if( ! nMonitoringPort4ImaAgent ) {
        joNodeDesc.nMonitoringPort4ImaAgent = alloc_port_4_usage_on_one_machine();
        nMonitoringPort4ImaAgent = 0 + joNodeDesc.nMonitoringPort4ImaAgent;
    }
    let nJsonRpcPort4ImaAgent = joNodeDesc.nJsonRpcPort4ImaAgent ? ( 0 + joNodeDesc.nJsonRpcPort4ImaAgent ) : 0;
    if( ! nJsonRpcPort4ImaAgent ) {
        joNodeDesc.nJsonRpcPort4ImaAgent = alloc_port_4_usage_on_one_machine();
        nJsonRpcPort4ImaAgent = 0 + joNodeDesc.nJsonRpcPort4ImaAgent;
    }
    //
    //
    const strContentOfEnvFile =
        "SCHAIN_DIR=/tmp" + "\n" +
        "MAINNET_PROXY_PATH=/tmp/" + path.basename( g_strPathImaAbiMN ) + "\n" +
        "SCHAIN_PROXY_PATH=/tmp/" + path.basename( strPathImaAbiSC ) + "\n" +
        "MANAGER_ABI_PATH=/tmp/" + path.basename( g_strSkaleManagerAbiJsonPath ) + "\n" +
        "STATE_FILE=/tmp/state.file" + "\n" +
        "SCHAIN_NAME=" + g_arrChains[idxChain].name + "\n" +
        "CID_MAIN_NET=" + cid_main_net + "\n" +
        "CID_SCHAIN=" + g_arrChains[idxChain].cid + "\n" +
        "SCHAIN_RPC_URL=" + arrNodeDescriptions[idxNode].url + "\n" +
        "MAINNET_RPC_URL=" + get_main_net_url_4_ima( joNodeDesc.idxChain, joNodeDesc.idxNode ) + "\n" + // g_strMainNetURL + "\n" +
        "NODE_NUMBER=" + idxNode + "\n" +
        "NODES_COUNT=" + arrNodeDescriptions.length + "\n" +
        "RPC_PORT=" + nJsonRpcPort4ImaAgent + "\n" +
        "MONITORING_PORT=" + nMonitoringPort4ImaAgent + "\n" +
        "TM_URL_MAIN_NET=" + g_strUrlTransactionManager + "\n" + // TO-FIX: this must be one TM per one Node
        "SGX_URL=" + g_strUrlSgxWalletHTTPS + "\n" +
        "BLS_KEY_NAME=" + joNodeDesc.nameBlsPrivateKey + "\n" +
        "ECDSA_KEY_NAME=" + joNodeDesc.nameEcdsaPubKey + "\n" +
        "SGX_SSL_KEY_PATH=/tmp/k.key" + "\n" +
        "SGX_SSL_CERT_PATH=/tmp/client.crt" + "\n" +
        "NODE_ADDRESS=" + joNodeDesc.nodeAddress + "\n" + // + joNodeDesc.checkedNodeAddress + "\n" +
        "IMA_NETWORK_BROWSER_DATA_PATH=/tmp/network-browser.json" + "\n" +
        "MULTICALL=false" + "\n" +
        "\n";
    const strPathOfEnvFile = strImaDockerDataFolder + "/env.file";
    if( g_bVerbose ) {
        log.write( cc.debug( "Content for environment file " ) + cc.notice( strPathOfEnvFile ) +
            cc.debug( " for " ) + cc.sunny( "IMA Agent#" ) +
            cc.info( idxChain ) + cc.normal( "/" ) + cc.info( idxNode ) +
            cc.debug( " is:" ) + "\n" + cc.normal( strContentOfEnvFile ) );
    }
    fileSave( strPathOfEnvFile, strContentOfEnvFile );
    if( g_bVerbose ) {
        log.write( cc.success( "Did prepared " ) + cc.sunny( "IMA Agent#" ) +
            cc.info( idxChain ) + cc.normal( "/" ) + cc.info( idxNode ) +
            cc.success( " share for its docker container on node " ) +
            cc.j( idxNode ) + cc.success( " of chain" ) +
            cc.notice( g_arrChains[idxChain].name ) + cc.debug( "/" ) + cc.note( g_arrChains[idxChain].cid ) +
            cc.success( "..." ) + "\n" );
    }
}
function ima_prepare_docker_shares_schain( idxChain ) {
    if( g_bVerbose ) {
        log.write( cc.normal( "Will prepare all " ) + cc.success( "IMA Agents" ) +
            cc.normal( " shares for their docker containers on chain" ) +
            cc.notice( g_arrChains[idxChain].name ) + cc.debug( "/" ) + cc.note( g_arrChains[idxChain].cid ) +
            cc.normal( "..." ) + "\n" );
    }
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let idxNode = 0; idxNode < arrNodeDescriptions.length; ++idxNode )
        ima_prepare_docker_shares_node( idxChain, idxNode );
    if( g_bVerbose ) {
        log.write( cc.success( "Will prepare all " ) + cc.success( "IMA Agents" ) +
            cc.success( " shares for their docker containers on chain" ) +
            cc.notice( g_arrChains[idxChain].name ) + cc.debug( "/" ) + cc.note( g_arrChains[idxChain].cid ) +
            cc.success( "..." ) + "\n" );
    }
}
function ima_prepare_docker_shares_all() {
    if( g_bVerbose )
        log.write( cc.normal( "Will prepare all " ) + cc.success( "IMA Agents" ) + cc.normal( " shares for their docker containers..." ) + "\n" );
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        ima_prepare_docker_shares_schain( idxChain );
    }
    if( g_bVerbose )
        log.write( cc.success( "Done preparing all " ) + cc.success( "IMA Agents" ) + cc.success( " shares for their docker containers" ) + "\n" );
}

function schain_ima_agent_get_docker_container_name( idxChain, idxNode ) {
    const strImaAgentDockerContainerName =
        "ima_agent_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 );
    return strImaAgentDockerContainerName;
}
function schain_ima_agent_get_docker_cwd( idxChain, idxNode ) {
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[idxNode];
    const strImaDockerDataFolder = "" + joNodeDesc.nodeFolder + "/ima_docker_data";
    return strImaDockerDataFolder;
}
function schain_ima_agent_get_env( idxChain, idxNode ) {
    return null;
}

async function all_ima_agents_start() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_ima_agents_start( idxChain );
    }
}

async function all_ima_agents_stop() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_ima_agents_stop( idxChain );
    }
}

async function schain_ima_agents_start( idxChain ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    let nCountStartSkipped = 0;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    if( g_bDockerIMA ) {
        if( g_bVerbose )
            log.write( cc.normal( "Starting " ) + cc.notice( "IMA" ) + cc.normal( " agents as docker containers ..." ) + "\n" );
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const idxNode = 0 + i;
            const joNodeDesc = arrNodeDescriptions[idxNode];
            if( g_nCountOfImaAgentInstancesToSkipStart > 0 && i >= 1 && nCountStartSkipped < g_nCountOfImaAgentInstancesToSkipStart ) {
                ++ nCountStartSkipped;
                if( g_bVerbose )
                    log.write( cc.warning( "Skipping(1) startup of " ) + cc.success( "IMA Agent" ) + cc.warning( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
                continue;
            }
            if( g_bVerbose )
                log.write( cc.normal( "Pre-cleaning " ) + cc.success( "IMA Agent" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            const cname = schain_ima_agent_get_docker_container_name( idxChain, idxNode );
            const cwd = schain_ima_agent_get_docker_cwd( idxChain, idxNode );
            const env = schain_ima_agent_get_env( idxChain, idxNode );
            //const strImaDockerDataFolder = "" + cwd;
            const tmp = cwd; // path.relative( strImaDockerDataFolder, cwd );
            const ef = "./env.file"; // path.relative( path.join( strImaDockerDataFolder, "/env.file" ), cwd );
            const rm_cmd = "docker rm -f " + cname;
            const run_cmd = "docker run " +
                // "-it " + // interactive mode
                "-v " + tmp + ":/tmp " +
                "--name " + cname + " " +
                "--env-file " + ef + " " +
                "--network=\"host\" " +
                g_strImaDockerImageName // +
                // " > " + path.join( __dirname, "imaAgent_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 ) + ".log" ) + // redirect
                // " &" // background mode
                ;
            if( g_bVerbose ) {
                log.write(
                    cc.debug( "............Docker container is.... " ) + cc.sunny( cname ) + "\n" +
                    cc.debug( "............Docker CWD is.......... " ) + cc.info( cwd ) + "\n" +
                    cc.debug( "............Docker ENV vars are.... " ) + cc.j( env ) + "\n" +
                    cc.debug( "............Docker TMP is.......... " ) + cc.info( tmp ) + "\n" +
                    cc.debug( "............Docker ENV file is..... " ) + cc.info( ef ) + "\n" +
                    cc.debug( "............Cleanup command is..... " ) + cc.normal( rm_cmd ) + "\n" +
                    cc.debug( "............Run command is......... " ) + cc.normal( run_cmd ) + "\n"
                );
            }
            quick_spawn( rm_cmd, cwd, env );
            if( g_bVerbose )
                log.write( cc.normal( "Starting " ) + cc.success( "IMA Agent" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            quick_spawn_async( run_cmd, cwd, env );
        }
        await sleep( 10 * 1000 );
        nCountStartSkipped = 0;
        for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
            for( let idxNode = 0; idxNode < g_arrChains[idxChain].arrNodeDescriptions.length; ++ idxNode ) {
                const joNodeDesc = arrNodeDescriptions[idxNode];
                if( g_nCountOfImaAgentInstancesToSkipStart > 0 && idxNode >= 1 && nCountStartSkipped < g_nCountOfImaAgentInstancesToSkipStart ) {
                    ++ nCountStartSkipped;
                    if( g_bVerbose )
                        log.write( cc.warning( "Skipping(2) startup of " ) + cc.success( "IMA Agent" ) + cc.warning( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
                    continue;
                }
                if( g_bDockerIMA ) {
                    const cname = schain_ima_agent_get_docker_container_name( idxChain, idxNode );
                    print_empty_space_before_log();
                    log.write(
                        cc.bright( "At-startup log of IMA docker container " ) + cc.sunny( cname ) +
                        cc.bright( " after it was just started:" ) + "\n" );
                    const cwd = schain_ima_agent_get_docker_cwd( idxChain, idxNode );
                    const env = schain_ima_agent_get_env( idxChain, idxNode );
                    quick_spawn( "docker logs " + cname, cwd, env );
                } else
                    print_log_at_exit( path.join( __dirname, "imaAgent_" + zeroPad( idxChain, 2 ) + "_" + zeroPad( idxNode, 2 ) + ".log" ) );
            }
        }
        if( g_bVerbose )
            log.write( cc.success( "Done, started " ) + cc.notice( "IMA" ) + cc.success( " agents as docker containers" ) + "\n" );
        return;
    }
    if( g_bExternalIMA ) {
        if( g_bAskExternalStartStopIMA ) {
            log.write(
                "\n\n" + cc.normal( "Please" ) + " " + cc.sunny( "start" ) + " " + cc.success( "IMA Agent" ) +
                cc.normal( ", then press " ) + cc.attention( "<ENTER>" ) + cc.normal( " to continue test..." ) +
                "\n" );
            wait_ENTER_key_press_on_console();
            log.write( cc.normal( "Resuming test..." ) + "\n" );
        } else {
            log.write(
                cc.normal( "Assuming " ) + cc.success( "IMA Agent" ) +
                cc.normal( " is " ) + cc.sunny( "started" ) +
                cc.normal( "... continuing test..." ) +
                "\n" );
        }
        return;
    }
    nCountStartSkipped = 0;
    if( g_bVerbose )
        log.write( cc.normal( "Starting " ) + cc.notice( "IMA" ) + cc.normal( " agents as node processes..." ) + "\n" );
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        if( g_nCountOfImaAgentInstancesToSkipStart > 0 && i >= 1 && nCountStartSkipped < g_nCountOfImaAgentInstancesToSkipStart ) {
            ++ nCountStartSkipped;
            if( g_bVerbose )
                log.write( cc.warning( "Skipping(3) startup of " ) + cc.success( "IMA Agent" ) + cc.warning( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            continue;
        }
        if( g_bVerbose )
            log.write( cc.normal( "Starting " ) + cc.success( "IMA Agent" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
        if( ! joNodeDesc.proc4imaAgent ) {
            // const u = new URL( joNodeDesc.url );
            const joEnv = {
                "PATH": g_strRecommendedShellPATH,
                "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
            };
            joNodeDesc.proc4imaAgent = new ProcessController(
                compose_node_runCmd4imaAgent( joNodeDesc ), // composes and returns value of joNodeDesc.runCmd4imaAgent
                [],
                joNodeDesc.logPath4imaAgent, // "detached"
                undefined, // port
                joNodeDesc.agentFolder,
                undefined,
                joEnv
            );
            if( g_bVerbose ) {
                log.write( cc.normal( "Notice, " ) + cc.bright( "IMA Agent" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) +
                cc.normal( " folder is " ) + cc.info( joNodeDesc.agentFolder ) +
                cc.normal( ", log output is " ) + cc.info( joNodeDesc.logPath4imaAgent ) +
                "\n" );
            }
        }
        joNodeDesc.proc4imaAgent.run();
        //joNodeDesc.proc4imaAgent.continueDetached();
    }
    if( g_bVerbose )
        log.write( cc.success( "Done, started " ) + cc.notice( "IMA" ) + cc.success( " agents as node processes" ) + "\n" );
}
async function schain_ima_agents_stop( idxChain ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    let nCountStartSkipped = 0;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    if( g_bDockerIMA ) {
        if( g_bVerbose )
            log.write( cc.normal( "Stopping " ) + cc.success( "IMA" ) + cc.normal( " agents as docker containers..." ) + "\n" );
        for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
            const idxNode = 0 + i;
            const joNodeDesc = arrNodeDescriptions[idxNode];
            if( g_nCountOfImaAgentInstancesToSkipStart > 0 && idxNode >= 1 && nCountStartSkipped < g_nCountOfImaAgentInstancesToSkipStart ) {
                ++ nCountStartSkipped;
                if( g_bVerbose )
                    log.write( cc.warning( "Skipping(1) stop of " ) + cc.success( "IMA Agent" ) + cc.warning( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
                continue;
            }
            if( g_bVerbose )
                log.write( cc.normal( "Stopping " ) + cc.success( "IMA Agent" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            const cwd = schain_ima_agent_get_docker_cwd( idxChain, idxNode );
            const env = schain_ima_agent_get_env( idxChain, idxNode );
            quick_spawn_async( // IMA Agent as docker container
                "docker stop " + schain_ima_agent_get_docker_container_name( idxChain, idxNode ),
                cwd,
                env
            );
        }
        if( g_bVerbose )
            log.write( cc.success( "Done, stopped " ) + cc.notice( "IMA" ) + cc.success( " agents as docker containers" ) + "\n" );
        return;
    }
    if( g_bExternalIMA ) {
        if( g_bAskExternalStartStopIMA ) {
            log.write(
                "\n\n" + cc.normal( "Please" ) + " " + cc.error( "stop" ) + " " + cc.success( "IMA Agent" ) +
                cc.normal( ", then press " ) + cc.attention( "<ENTER>" ) + cc.normal( " to continue test..." ) +
                "\n" );
            wait_ENTER_key_press_on_console();
            log.write( cc.normal( "Resuming test..." ) + "\n" );
        } else {
            log.write(
                cc.normal( "Assuming " ) + cc.success( "IMA Agent" ) +
                cc.normal( " is " ) + cc.error( "stopped" ) +
                cc.normal( "... continuing test..." ) +
                "\n" );
        }
        return;
    }
    if( g_bVerbose )
        log.write( cc.normal( "Stopping " ) + cc.success( "IMA" ) + cc.normal( " agents as node processes..." ) + "\n" );
    nCountStartSkipped = 0;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        if( g_nCountOfImaAgentInstancesToSkipStart > 0 && i >= 1 && nCountStartSkipped < g_nCountOfImaAgentInstancesToSkipStart ) {
            ++ nCountStartSkipped;
            if( g_bVerbose )
                log.write( cc.warning( "Skipping(1) stop of " ) + cc.success( "IMA Agent" ) + cc.warning( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            continue;
        }
        if( g_bVerbose )
            log.write( cc.normal( "Stopping " ) + cc.success( "IMA Agent" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
        if( joNodeDesc.proc4imaAgent ) {
            await joNodeDesc.proc4imaAgent.stop();
            joNodeDesc.proc4imaAgent = null;
        }
    }
    if( g_bVerbose )
        log.write( cc.success( "Done, stopped " ) + cc.notice( "IMA" ) + cc.success( " agents as node processes" ) + "\n" );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function all_tunnels_start() {
    if( ! g_bEnabledImaMainNetTunnelling )
        return;
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_tunnels_start( idxChain );
    }
}

async function all_tunnels_stop() {
    if( ! g_bEnabledImaMainNetTunnelling )
        return;
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_tunnels_stop( idxChain );
    }
}

async function schain_tunnels_start( idxChain ) {
    if( ! g_bEnabledImaMainNetTunnelling )
        return;
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    let nCountStartSkipped = 0;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    nCountStartSkipped = 0;
    if( g_bVerbose )
        log.write( cc.normal( "Starting " ) + cc.notice( "Main Net tunnel" ) + cc.normal( " as node processes..." ) + "\n" );
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        if( g_nCountOfImaAgentInstancesToSkipStart > 0 && i >= 1 && nCountStartSkipped < g_nCountOfImaAgentInstancesToSkipStart ) {
            ++ nCountStartSkipped;
            if( g_bVerbose )
                log.write( cc.warning( "Skipping(3) startup of " ) + cc.success( "Main Net tunnel" ) + cc.warning( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            continue;
        }
        const env = {
            "PATH": g_strRecommendedShellPATH + ":" + normalizePath( "~/.bun/bin" ),
            "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
            "PORT_LISTEN": "" + joNodeDesc.port4tunnel,
            "IP_REMOTE": "127.0.0.1",
            "PORT_REMOTE": "8545",
            "IDX_CHAIN": "" + idxChain,
            "IDX_NODE": "" + i,
            "CNT_NODES": "" + arrNodeDescriptions.length,
            "IMA_TIME_FRAME": "" + g_nTimeFrameSecondsIMA,
            "IMA_TIME_GAP": "" + g_nTimeGapSecondsIMA,
            "IMA_SCAN_MESSAGES_PERIOD": "" + g_nScanMessagePeriodSecondsIMA,
            "IMA_MAIN_NET_CONNECTION_PROBLEM_EMULATION": g_bImaMainNetConnectionProblemEmulationMode ? 1 : 0 // must be passed as number
        };
        const cmd4tunnel = "node --no-warnings " + path.join( __dirname, "tunnel.js" );
        if( g_bVerbose ) {
            log.write( cc.normal( "Starting " ) + cc.success( "Main Net tunnel" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) +
            cc.normal( " with command line " ) + cc.attention( cmd4tunnel ) +
            cc.normal( " and environment " ) + cc.j( env ) + "\n" );
        }
        if( ! joNodeDesc.proc4tunnel ) {
            joNodeDesc.proc4tunnel = new ProcessController(
                cmd4tunnel,
                [],
                joNodeDesc.logPath4tunnel, // "detached"
                undefined, // joNodeDesc.port4tunnel, // undefined, // port
                joNodeDesc.agentFolder,
                env
            );
            if( g_bVerbose ) {
                log.write( cc.normal( "Notice, " ) + cc.bright( "Main Net tunnel" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) +
                cc.normal( " log output is " ) + cc.info( joNodeDesc.logPath4tunnel ) +
                "\n" );
            }
        }
        joNodeDesc.proc4tunnel.run();
        //joNodeDesc.proc4tunnel.continueDetached();
        await sleep( 3 * 1000 );
    }
    if( g_bVerbose )
        log.write( cc.success( "Done, started " ) + cc.notice( "Main Net tunnel" ) + cc.success( " as node processes" ) + "\n" );
}
async function schain_tunnels_stop( idxChain ) {
    if( ! g_bEnabledImaMainNetTunnelling )
        return;
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    let nCountStartSkipped = 0;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    if( g_bVerbose )
        log.write( cc.normal( "Stopping " ) + cc.success( "Main Net tunnel" ) + cc.normal( " as node processes..." ) + "\n" );
    nCountStartSkipped = 0;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        if( g_nCountOfImaAgentInstancesToSkipStart > 0 && i >= 1 && nCountStartSkipped < g_nCountOfImaAgentInstancesToSkipStart ) {
            ++ nCountStartSkipped;
            if( g_bVerbose )
                log.write( cc.warning( "Skipping(1) stop of " ) + cc.success( "Main Net tunnel" ) + cc.warning( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
            continue;
        }
        if( g_bVerbose )
            log.write( cc.normal( "Stopping " ) + cc.success( "Main Net tunnel" ) + cc.normal( " for node " ) + cc.sunny( joNodeDesc.nodeID ) + "\n" );
        if( joNodeDesc.proc4tunnel ) {
            await joNodeDesc.proc4tunnel.stop();
            joNodeDesc.proc4tunnel = null;
        }
    }
    if( g_bVerbose )
        log.write( cc.success( "Done, stopped " ) + cc.notice( "Main Net tunnel" ) + cc.success( " as node processes" ) + "\n" );
}

function get_main_net_url_4_ima( idxChain, idxNode ) {
    if( ! g_bEnabledImaMainNetTunnelling )
        return "" + g_strMainNetURL;
    if( ! g_arrChains[idxChain].isStartEnabled )
        return "" + g_strMainNetURL;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[idxNode];
    const strURL = "http://127.0.0.1:" + joNodeDesc.port4tunnel;
    return strURL;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function detect_ima_network_browser_path() {
    if( g_bDockerIMA )
        return null;
    const strPathImaNetworkBrowser = path.join( g_strFolderRepoImaAgent, "network-browser" );
    if( ! dirExists( strPathImaNetworkBrowser ) )
        return null;
    return strPathImaNetworkBrowser;
}

function get_ima_network_browser_data_json_path( idxChain ) {
    return g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/network-browser-data.json";
}

function get_ima_network_browser_cli_opt( idxChain ) {
    if( ! detect_ima_network_browser_path() )
        return "";
    return " --network-browser-path=" + get_ima_network_browser_data_json_path( idxChain );
}

async function all_ima_network_browsers_start() {
    if( g_bDockerIMA )
        return;
    const strPathImaNetworkBrowser = detect_ima_network_browser_path();
    if( ! strPathImaNetworkBrowser )
        return;
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        const joChain = g_arrChains[idxChain];
        if( ! joChain.isStartEnabled )
            continue;
        if( g_bVerbose )
            log.write( cc.normal( "Starting one " ) + cc.notice( "IMA network browser" ) + cc.normal( " for S-Chain " ) + cc.notice( idxChain ) + cc.normal( "..." ) + "\n" );
        const joNode = joChain.arrNodeDescriptions[0];
        joChain.runCmd4imaNetworkBrowser = "bun browse";
        joChain.logPath4imaNetworkBrowser = normalizePath( path.join( __dirname, "imaNetworkBrowser_" + zeroPad( idxChain, 2 ) + ".log" ) );
        const env = {
            "PATH": g_strRecommendedShellPATH + ":" + normalizePath( "~/.bun/bin" ),
            "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
            "MAINNET_RPC_URL": "" + g_strMainNetURL,
            "SCHAIN_RPC_URL": "" + joNode.url,
            "SCHAIN_NAME": "" + joChain.name,
            "SCHAIN_PROXY_PATH": get_ima_abi_schain_path( idxChain ),
            "MANAGER_ABI_PATH": "" + g_strSkaleManagerAbiJsonPath,
            "IMA_NETWORK_BROWSER_DATA_PATH": get_ima_network_browser_data_json_path( idxChain ),
            "MULTICALL": "false",
            "LOG_PATH_IS": joChain.logPath4imaNetworkBrowser
        };
        joChain.proc4imaNetworkBrowser = new ProcessController(
            joChain.runCmd4imaNetworkBrowser,
            [],
            joChain.logPath4imaNetworkBrowser, // "detached"
            undefined, // port
            strPathImaNetworkBrowser,
            env
        );
        if( g_bVerbose ) {
            log.write( cc.normal( "Notice, " ) + cc.bright( "IMA Network Browser" ) + cc.normal( " for chain " ) + cc.sunny( idxChain ) +
                cc.normal( " folder is " ) + cc.info( strPathImaNetworkBrowser ) +
                cc.normal( ", environment is " ) + cc.j( env ) +
                cc.normal( ", log output is " ) + cc.info( joChain.logPath4imaNetworkBrowser ) +
                "\n" );
        }
        joChain.proc4imaNetworkBrowser.run();
        //joChain.proc4imaNetworkBrowser.continueDetached();
        if( g_bVerbose )
            log.write( cc.success( "Done, started one " ) + cc.notice( "IMA network browser" ) + cc.success( " for S-Chain " ) + cc.notice( idxChain ) + cc.success( "." ) + "\n" );
    }
}

async function all_ima_network_browsers_stop() {
    const strPathImaNetworkBrowser = detect_ima_network_browser_path();
    if( ! strPathImaNetworkBrowser )
        return;
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        const joChain = g_arrChains[idxChain];
        if( ! joChain.isStartEnabled )
            continue;
        if( g_bVerbose )
            log.write( cc.normal( "Stopping one " ) + cc.notice( "IMA network browser" ) + cc.normal( " for S-Chain " ) + cc.notice( idxChain ) + cc.normal( "..." ) + "\n" );
        if( joChain.proc4imaNetworkBrowser ) {
            await joChain.proc4imaNetworkBrowser.stop();
            joChain.proc4imaNetworkBrowser = null;
        }
        if( g_bVerbose )
            log.write( cc.success( "Done, stopped one " ) + cc.notice( "IMA network browser" ) + cc.success( " for S-Chain " ) + cc.notice( idxChain ) + cc.success( "." ) + "\n" );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const g_strGithubRepoOwner = "skalenetwork";
const g_strGithubRepoName = "skaled";
const g_strGithubUrlReleases = "https://api.github.com/repos/" + g_strGithubRepoOwner + "/" + g_strGithubRepoName + "/releases";

async function skaled_find_latest_releases_raw() {
    const joRR = await ( await fetch( g_strGithubUrlReleases ) ).json();
    return joRR;
}

async function skaled_find_latest_releases() {
    const joRR = await skaled_find_latest_releases_raw();
    const joReleases = [], str_url_ending = "/skaled";
    for( let i = 0; i < joRR.length; ++ i ) {
        const joRawReleaseDesc = joRR[i];
        if( ! ( "assets" in joRawReleaseDesc ) || joRawReleaseDesc.assets.length <= 0 )
            continue;
        let browser_download_url = "";
        for( let j = 0; j < joRawReleaseDesc.assets.length; ++ j ) {
            const joAsset = joRawReleaseDesc.assets[j];
            if( ! ( "browser_download_url" in joAsset ) || joAsset.browser_download_url.length <= 0 )
                continue;
            if( joAsset.browser_download_url.lastIndexOf( str_url_ending ) != ( joAsset.browser_download_url.length - str_url_ending.length ) )
                continue;
            browser_download_url = "" + joAsset.browser_download_url;
            break;
        }
        if( browser_download_url.length <= 0 )
            continue;
        const joRelease = {
            tag_name: "" + joRawReleaseDesc.tag_name,
            published_at_str: "" + joRawReleaseDesc.published_at,
            published_at: Date.parse( joRawReleaseDesc.published_at ),
            browser_download_url: "" + browser_download_url
            //, joRawReleaseDesc: joRawReleaseDesc
        };
        joReleases.push( joRelease );
    }
    return joReleases;
}

async function skaled_find_latest_release( strTagPart ) {
    const joReleases = await skaled_find_latest_releases();
    let joReleaseCandidate = null;
    for( let i = 0; i < joReleases.length; ++ i ) {
        const joRelease = joReleases[i];
        if( typeof strTagPart == "string" && strTagPart.length > 0 ) {
            if( joRelease.tag_name.indexOf( strTagPart ) < 0 )
                continue;
        }
        if( joReleaseCandidate != null ) {
            if( joRelease.published_at > joReleaseCandidate.published_at )
                joReleaseCandidate = joRelease;

            continue;
        }
        joReleaseCandidate = joRelease;
    }
    return joReleaseCandidate;
}

async function skaled_download_release( joRelease, isShowVersion ) {
    if( typeof isShowVersion == "undefined" )
        isShowVersion = true;
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Will download " ) + cc.sunny( "skaled" ) +
            cc.debug( " release " ) + cc.j( joRelease ) + cc.debug( " ..." ) +
            "\n" );
    }
    await skaled_backup_current();
    const buffer = await ( await fetch( joRelease.browser_download_url ) ).buffer();
    const strPathOld = path.join( g_strFolderAppCacheBin, "skaled" );
    fs.writeFileSync( strPathOld, buffer, "binary" );
    fs.chmodSync( strPathOld, "111" );
    if( isShowVersion )
        child_process.execSync( strPathOld + " --version", { stdio: "inherit" } );
    if( g_bVerbose ) {
        log.write(
            cc.success( "Did downloaded " ) + cc.sunny( "skaled" ) +
            cc.success( " release " ) + cc.j( joRelease ) + cc.success( " ." ) +
            "\n" );
    }
}

async function skaled_backup_current() {
    try {
        const d = new Date(); // now
        const nUtcUnixTimeStampWithMilliseconds = d.getTime();
        const strPathOld = path.join( g_strFolderAppCacheBin, "skaled" );
        const strPathNew = path.join( g_strFolderAppCacheBin, "skaled-backup-" + nUtcUnixTimeStampWithMilliseconds.toString() );
        if( ! fileExists( strPathOld ) )
            return;
        fs.renameSync( strPathOld, strPathNew );
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " Failed to backup skaled executable: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 45 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_connect_two_schains( idxChainA, idxChainB, cntAttempts ) {
    if( ! g_arrChains[idxChainA].isStartEnabled )
        return;
    if( ! g_arrChains[idxChainB].isStartEnabled )
        return;
    cntAttempts = cntAttempts || 1;
    const cid_A = g_arrChains[idxChainA].cid;
    const cid_B = g_arrChains[idxChainB].cid;
    const schain_name_A = g_arrChains[idxChainA].name;
    const schain_name_B = g_arrChains[idxChainB].name;
    const strDescA = cc.info( schain_name_A ) + cc.debug( "/" ) + cc.sunny( cid_A );
    const strDescB = cc.info( schain_name_B ) + cc.debug( "/" ) + cc.sunny( cid_B );
    if( g_bVerbose )
        log.write( cc.debug( "Connecting S-Chain " ) + strDescA + cc.debug( " to S-Chain " ) + strDescB + cc.debug( "..." ) + "\n" );
    if( g_nTimeToSleepBeforeConnectTwoChains > 0 ) {
        log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepBeforeConnectTwoChains ) + cc.debug( " milliseconds..." ) + "\n" );
        await sleep( g_nTimeToSleepBeforeConnectTwoChains );
        log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepBeforeConnectTwoChains ) + cc.debug( " milliseconds." ) + "\n" );
    }
    const nPreferredNodeIndex = 0;
    const arrNodeDescriptions = g_arrChains[idxChainB].arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const addressFrom = private_key_2_account_address( w3schain, g_strPrivateKeyImaSC );
    const cid = parseIntOrHex( g_arrChains[idxChainB].cid );
    let bSuccess = false;
    for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
        try {
            if( g_bVerbose ) {
                log.write( cc.debug( "Performing attempt " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + cc.debug( "..." ) + "\n" );
                log.write( strDescB + cc.debug( " chain ID is " ) + cc.info( cid ) + "\n" );
                log.write( cc.debug( "Private key is " ) + cc.info( g_strPrivateKeyImaSC ) + "\n" );
                log.write( cc.debug( "Address is " ) + cc.info( addressFrom ) + "\n" );
            }
            const joImaAbiSC = g_arrChains[idxChainB].joImaAbiSC;
            init_account_from_private_key( w3schain, g_strPrivateKeyImaSC );
            const jo_message_proxy_s_chain = new w3schain.eth.Contract( joImaAbiSC.message_proxy_chain_abi, joImaAbiSC.message_proxy_chain_address );
            // await role_check_and_grant( // CHAIN_CONNECTOR_ROLE
            //     w3schain,
            //     cid,
            //     g_strPrivateKeyImaSC,
            //     jo_message_proxy_s_chain,
            //     "CHAIN_CONNECTOR_ROLE",
            //     private_key_2_account_address( w3schain, g_strPrivateKeyImaSC )
            //     );
            // const res = await jo_message_proxy_s_chain.methods.addConnectedChain(
            //     schain_name_A
            // ).send( {
            //     chainId: parseIntOrHex( cid ),
            //     from: addressFrom,
            //     gas: 8000000
            // } );
            const jo_token_manager_linker = new w3schain.eth.Contract( joImaAbiSC.token_manager_linker_abi, joImaAbiSC.token_manager_linker_address );
            await role_check_and_grant( // CHAIN_CONNECTOR_ROLE
                w3schain,
                cid,
                g_strPrivateKeyImaSC,
                jo_message_proxy_s_chain,
                "CHAIN_CONNECTOR_ROLE",
                jo_token_manager_linker.options.address
            );
            await role_check_and_grant( // REGISTRAR_ROLE
                w3schain,
                cid,
                g_strPrivateKeyImaSC,
                jo_token_manager_linker,
                "REGISTRAR_ROLE",
                private_key_2_account_address( w3schain, g_strPrivateKeyImaSC )
            );
            const res = await jo_token_manager_linker.methods.connectSchain(
                schain_name_A
            ).send( {
                chainId: parseIntOrHex( cid ),
                from: addressFrom,
                gas: 8000000
            } );
            bSuccess = true;
            if( g_bVerbose )
                log.write( cc.success( "Done, connected S-Chain " ) + strDescA + cc.success( " to S-Chain " ) + strDescB + cc.success( " with result: " ) + cc.j( res ) + "\n\n" );
            break;
        } catch ( err ) {
            log.write( cc.fatal( "WARNING:" ) + cc.warning( " Failed to connect S-Chain " ) + strDescA + cc.warning( " to S-Chain " ) + strDescB + cc.warning( " with error: " ) + cc.error( err.toString() ) + "\n" );
        }
        await sleep( 3000 );
    } // for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt )
    if( ! bSuccess ) {
        log.write( cc.fatal( "CRITICAL ERROR:" ) + cc.error( " Failed to connect S-Chain " ) + strDescA + cc.error( " to S-Chain " ) + strDescB + "\n" );
        await end_of_test( 46 );
    }
}

async function ima_connect_all_schains_together_each_other( cntAttempts ) {
    if( g_arrChains.length <= 1 )
        return;
    cntAttempts = cntAttempts || 1;
    if( g_bVerbose )
        log.write( "\n\n" + cc.bright( "Connecting S-Chains together each other..." ) + "\n\n" );
    for( let idxChainA = 0; idxChainA < g_arrChains.length; ++ idxChainA ) {
        for( let idxChainB = 0; idxChainB < g_arrChains.length; ++ idxChainB ) {
            if( idxChainA == idxChainB )
                continue;
            if( ! g_arrChains[idxChainA].isStartEnabled )
                continue;
            if( ! g_arrChains[idxChainB].isStartEnabled )
                continue;
            await ima_connect_two_schains( idxChainA, idxChainB, cntAttempts );
        }
    }
    if( g_bVerbose )
        log.write( cc.success( "Done connecting S-Chains together each other" ) + "\n" );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_gas_reimbursement_configure_zero_timeout() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_ima_gas_reimbursement_configure_zero_timeout( idxChain );
    }

}

async function schain_ima_gas_reimbursement_configure_zero_timeout( idxChain, fnContinue ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    fnContinue = fnContinue || function() { };
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Checking " ) + cc.sunny( "Gas Reimbursement" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const nPreferredNodeIndex = 0;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    init_account_from_private_key( w3schain, g_strPrivateKeyImaSC );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    const jo_community_locker = new w3schain.eth.Contract( joImaAbiSC.community_locker_abi, joImaAbiSC.community_locker_address );
    const cid = g_arrChains[idxChain].cid;
    const schain_name = g_arrChains[idxChain].name;
    await role_check_and_grant( // CONSTANT_SETTER_ROLE
        w3schain,
        cid,
        g_strPrivateKeyImaSC,
        jo_community_locker,
        "CONSTANT_SETTER_ROLE",
        private_key_2_account_address( w3schain, g_strPrivateKeyImaSC )
    );
    const nNodeIndex = 0;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --reimbursement-range=0" +
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + arrNodeDescriptions[0].url + // first skaled node URL
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
        // " " + compose_ima_cli_account_options( joNodeDesc.idxChain, nNodeIndex )
        " " + compose_ima_cli_account_options_all_direct( joNodeDesc.idxChain, nNodeIndex )
        ;
    const strWorkingDirectory = "" + g_strFolderImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
            cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
            cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
            "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished checking IMA registration" ) + "\n" );
    fnContinue();
}

async function ima_gas_reimbursement_show() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_ima_gas_reimbursement_show( idxChain );
    }

}

async function schain_ima_gas_reimbursement_show( idxChain, fnContinue ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    fnContinue = fnContinue || function() { };
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Checking " ) + cc.sunny( "Gas Reimbursement" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const nPreferredNodeIndex = 0;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const nNodeIndex = 0;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --reimbursement-chain=" + schain_name + " --reimbursement-balance" +
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + arrNodeDescriptions[0].url + // first skaled node URL
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
        // " " + compose_ima_cli_account_options( joNodeDesc.idxChain, nNodeIndex )
        " " + compose_ima_cli_account_options_all_direct( joNodeDesc.idxChain, nNodeIndex )
        ;
    const strWorkingDirectory = "" + g_strFolderImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
            cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
            cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
            "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished checking IMA registration" ) + "\n" );
    fnContinue();
}

async function ima_gas_reimbursement_recharge() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await schain_ima_gas_reimbursement_recharge( idxChain );
    }
}

async function schain_ima_gas_reimbursement_recharge( idxChain, fnContinue ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    fnContinue = fnContinue || function() { };
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Recharging " ) + cc.sunny( "Gas Reimbursement" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const nPreferredNodeIndex = 0;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const nNodeIndex = 0;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --reimbursement-chain=" + schain_name + " --reimbursement-recharge=1000eth" +
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + arrNodeDescriptions[0].url + // first skaled node URL
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
        // " " + compose_ima_cli_account_options( joNodeDesc.idxChain, nNodeIndex )
        " " + compose_ima_cli_account_options_all_direct( joNodeDesc.idxChain, nNodeIndex )
        ;
    const strWorkingDirectory = "" + g_strFolderImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
            cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
            cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
            "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished checking IMA registration" ) + "\n" );
    fnContinue();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_enable_pausable_role() {
    try {
        if( g_bVerbose )
            log.write( cc.debug( "Adjusting " ) + cc.sunny( "PAUSABLE_ROLE" ) + cc.debug( " role..." ) + "\n" );
        const strPrivateKey = g_strPrivateKeyImaMN;
        const addressFrom = private_key_2_account_address( g_w3_main_net, strPrivateKey );
        const jo_message_proxy_MN = new g_w3_main_net.eth.Contract(
            g_joImaAbiMN.message_proxy_mainnet_abi,
            g_joImaAbiMN.message_proxy_mainnet_address
        );
        await role_check_and_grant( // PAUSABLE_ROLE
            g_w3_main_net,
            cid_main_net,
            strPrivateKey,
            jo_message_proxy_MN,
            "PAUSABLE_ROLE",
            addressFrom
        );
        if( g_bVerbose )
            log.write( cc.success( "Done." ) + "\n" );
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) +
            cc.error( " Failed to adjust " ) + cc.sunny( "PAUSABLE_ROLE" ) + cc.error( " role, error description: " ) +
            cc.warning( err.toString() ) + "\n" );
        await end_of_test( 47 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_test_browse_skale_network( idxChain, idxNode ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const joChain = g_arrChains[idxChain];
    const arrNodeDescriptions = joChain.arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[idxNode];
    const idxChainTarget = ( idxChain + 1 ) % g_arrChains.length;
    const joChainTarget = g_arrChains[idxChainTarget];
    const arrNodeDescriptionsTarget = joChainTarget.arrNodeDescriptions;
    const joNodeDescTarget = arrNodeDescriptionsTarget[idxNode];
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Performing " ) + cc.sunny( "SKALE Network" ) +
            cc.bright( " discovery on chain " ) + cc.info( joChain.name ) +
            cc.bright( " known as ID " ) + cc.info( joChain.cid ) +
            cc.bright( " via node " ) + cc.info( joNodeDesc.nameNode ) +
            cc.bright( " with URL " ) + cc.info( joNodeDesc.strURL ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[joNodeDesc.idxChain].name;
    const cid = g_arrChains[joNodeDesc.idxChain].cid;
    const schain_name_target = g_arrChains[joNodeDescTarget.idxChain].name;
    const cid_target = g_arrChains[joNodeDescTarget.idxChain].cid;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --browse-skale-network" +
        //
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + joNodeDesc.url +
        " --url-t-chain=" + joNodeDescTarget.url +
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --id-t-chain=" + schain_name_target +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --cid-t-chain=" + cid_target +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( joNodeDesc.idxChain ) +
        " " + compose_ima_cli_account_options_force_raw_private_keys( joNodeDesc.idxChain, joNodeDesc.idxNode ) +
        ""
    ;
    const strWorkingDirectory = "" + g_strFolderRepoImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished SKALE Network discovery" ) + "\n" );
}

async function ima_test_browse_skale_networks() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        const joChain = g_arrChains[idxChain];
        const arrNodeDescriptions = joChain.arrNodeDescriptions;
        for( let idxNode = 0; idxNode < arrNodeDescriptions.length; ++ idxNode )
            await ima_test_browse_skale_network( idxChain, idxNode );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_test_browse_connected_chain( idxChain, idxNode ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const joChain = g_arrChains[idxChain];
    const arrNodeDescriptions = joChain.arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[idxNode];
    const idxChainTarget = ( idxChain + 1 ) % g_arrChains.length;
    const joChainTarget = g_arrChains[idxChainTarget];
    const arrNodeDescriptionsTarget = joChainTarget.arrNodeDescriptions;
    const joNodeDescTarget = arrNodeDescriptionsTarget[idxNode];
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Performing " ) + cc.sunny( "connected S-Chains" ) +
            cc.bright( " discovery on chain " ) + cc.info( joChain.name ) +
            cc.bright( " known as ID " ) + cc.info( joChain.cid ) +
            cc.bright( " via node " ) + cc.info( joNodeDesc.nameNode ) +
            cc.bright( " with URL " ) + cc.info( joNodeDesc.strURL ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[joNodeDesc.idxChain].name;
    const cid = g_arrChains[joNodeDesc.idxChain].cid;
    const schain_name_target = g_arrChains[joNodeDescTarget.idxChain].name;
    const cid_target = g_arrChains[joNodeDescTarget.idxChain].cid;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --browse-connected-schains" +
        //
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + joNodeDesc.url +
        " --url-t-chain=" + joNodeDescTarget.url +
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --id-t-chain=" + schain_name_target +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --cid-t-chain=" + cid_target +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( joNodeDesc.idxChain ) +
        " " + compose_ima_cli_account_options_force_raw_private_keys( joNodeDesc.idxChain, joNodeDesc.idxNode ) +
        ""
    ;
    const strWorkingDirectory = "" + g_strFolderRepoImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished connected S-Chains discovery" ) + "\n" );
}

async function ima_test_browse_connected_chains() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        const joChain = g_arrChains[idxChain];
        const arrNodeDescriptions = joChain.arrNodeDescriptions;
        for( let idxNode = 0; idxNode < arrNodeDescriptions.length; ++ idxNode )
            await ima_test_browse_connected_chain( idxChain, idxNode );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_test_browse_s_chain( idxChain, idxNode ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const joChain = g_arrChains[idxChain];
    const arrNodeDescriptions = joChain.arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[idxNode];
    const idxChainTarget = ( idxChain + 1 ) % g_arrChains.length;
    const joChainTarget = g_arrChains[idxChainTarget];
    const arrNodeDescriptionsTarget = joChainTarget.arrNodeDescriptions;
    const joNodeDescTarget = arrNodeDescriptionsTarget[idxNode];
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Performing " ) + cc.sunny( "own S-Chain" ) +
            cc.bright( " investigation on chain " ) + cc.info( joChain.name ) +
            cc.bright( " known as ID " ) + cc.info( joChain.cid ) +
            cc.bright( " via node " ) + cc.info( joNodeDesc.nameNode ) +
            cc.bright( " with URL " ) + cc.info( joNodeDesc.strURL ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[joNodeDesc.idxChain].name;
    const cid = g_arrChains[joNodeDesc.idxChain].cid;
    const schain_name_target = g_arrChains[joNodeDescTarget.idxChain].name;
    const cid_target = g_arrChains[joNodeDescTarget.idxChain].cid;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --browse-s-chain" +
        //
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + joNodeDesc.url +
        " --url-t-chain=" + joNodeDescTarget.url +
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --id-t-chain=" + schain_name_target +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --cid-t-chain=" + cid_target +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( joNodeDesc.idxChain ) +
        " " + compose_ima_cli_account_options_force_raw_private_keys( joNodeDesc.idxChain, joNodeDesc.idxNode ) +
        ""
    ;
    const strWorkingDirectory = "" + g_strFolderRepoImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished own S-Chain investigation" ) + "\n" );
}

async function ima_test_browse_s_chains() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        const joChain = g_arrChains[idxChain];
        const arrNodeDescriptions = joChain.arrNodeDescriptions;
        for( let idxNode = 0; idxNode < arrNodeDescriptions.length; ++ idxNode )
            await ima_test_browse_s_chain( idxChain, idxNode );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_test_show_balance( idxChain, idxNode ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const joChain = g_arrChains[idxChain];
    const arrNodeDescriptions = joChain.arrNodeDescriptions;
    const joNodeDesc = arrNodeDescriptions[idxNode];
    const idxChainTarget = ( idxChain + 1 ) % g_arrChains.length;
    const joChainTarget = g_arrChains[idxChainTarget];
    const arrNodeDescriptionsTarget = joChainTarget.arrNodeDescriptions;
    const joNodeDescTarget = arrNodeDescriptionsTarget[idxNode];
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Performing " ) + cc.sunny( "Wallet Balances" ) +
            cc.bright( " discovery on chain " ) + cc.info( joChain.name ) +
            cc.bright( " known as ID " ) + cc.info( joChain.cid ) +
            cc.bright( " via node " ) + cc.info( joNodeDesc.nameNode ) +
            cc.bright( " with URL " ) + cc.info( joNodeDesc.strURL ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[joNodeDesc.idxChain].name;
    const cid = g_arrChains[joNodeDesc.idxChain].cid;
    const schain_name_target = g_arrChains[joNodeDescTarget.idxChain].name;
    const cid_target = g_arrChains[joNodeDescTarget.idxChain].cid;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --show-balance" +
        //
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + joNodeDesc.url +
        " --url-t-chain=" + joNodeDescTarget.url +
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --id-t-chain=" + schain_name_target +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --cid-t-chain=" + cid_target +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( joNodeDesc.idxChain ) +
        " " + compose_ima_cli_account_options_force_raw_private_keys( joNodeDesc.idxChain, joNodeDesc.idxNode ) +
        ""
    ;
    const strWorkingDirectory = "" + g_strFolderRepoImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished Wallet Balances discovery" ) + "\n" );
}

async function ima_test_show_balances() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        const joChain = g_arrChains[idxChain];
        const arrNodeDescriptions = joChain.arrNodeDescriptions;
        for( let idxNode = 0; idxNode < arrNodeDescriptions.length; ++ idxNode )
            await ima_test_show_balance( idxChain, idxNode );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function walkDirSync( dir, file_list, isRecursive, isFullPathResult ) {
    file_list = file_list || [];
    const files = fs.readdirSync( dir );
    file_list = file_list || [];
    files.forEach( function( file ) {
        if( fs.statSync( dir + "/" + file ).isDirectory() ) {
            if( isRecursive )
                file_list = walkDirSync( dir + "/" + file, file_list, isRecursive, isFullPathResult );
        } else
            file_list.push( isFullPathResult ? path.join( dir, file ) : file );

    } );
    return file_list;
}

function matchWildcardRule( str, rule ) {
    // "str" is tested string
    // "rule" is string with wildcards
    // see https://stackoverflow.com/questions/26246601/wildcard-string-comparison-in-javascript
    // const escapeRegex = ( str ) => str.replace( /([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1" );
    const escapeRegex = ( str ) => str.replace( /([.*+?^=!:${}()|[\]/\\])/g, "\\$1" );
    return new RegExp( "^" + rule.split( "*" ).map( escapeRegex ).join( ".*" ) + "$" ).test( str );
}

// function searchDirSync( rule, dir, isRecursive, isFullPathResult ) {
//     const result_list = [];
//     const file_list = walkDirSync( dir, [], isRecursive, isFullPathResult );
//     for( const item of file_list ) {
//         if( matchWildcardRule( item, rule ) )
//             result_list.push( item );
//     }
//     return result_list;
// }

function searchDirSyncForFirstItem( rule, dir, isRecursive, isFullPathResult ) {
    const file_list = walkDirSync( dir, [], isRecursive, isFullPathResult );
    for( const item of file_list ) {
        if( matchWildcardRule( item, rule ) )
            return isFullPathResult ? item : path.join( dir, item );
    }
    return null;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const g_strFolderRepoSkaleManager = findExistingDirPath( path.join( __dirname, "../skale-manager" ) );
if( g_bVerbose )
    log.write( cc.normal( "Assuming " ) + cc.sunny( "Skale Manager" ) + cc.normal( " repo is " ) + cc.info( g_strFolderRepoSkaleManager ) + "\n" );
const g_strSkaleManagerAbiJsonName = "skale-manager-1.9.4-develop.5-custom-abi.json";
let g_strSkaleManagerAbiJsonPath = normalizePath( g_strFolderRepoSkaleManager + "/data/" + g_strSkaleManagerAbiJsonName );
if( g_bVerbose )
    log.write( cc.normal( "Assuming " ) + cc.sunny( "Skale Manager ABI file" ) + cc.normal( " is " ) + cc.info( g_strSkaleManagerAbiJsonPath ) + "\n" );

let g_joSkaleManagerABI = null;

let jo_constants_holder = null;
// let jo_contract_manager = null;
// let jo_decryption = null;
// let jo_delegation_controller = null;
// let jo_delegation_period_manager = null;
// let jo_distributor = null;
// let jo_ecdh = null;
// let jo_manager_data = null;
// let jo_monitors_data = null;
// let jo_monitors_functionality = null;
let jo_nodes = null;
// let jo_pricing = null;
// let jo_punisher = null;
let jo_key_storage = null;
let jo_schains = null;
let jo_schains_internal = null;
// let jo_schains_functionality = null;
// let jo_schains_functionality_internal = null;
let jo_skale_dkg = null;
let jo_skale_manager = null;
let jo_skale_token = null;
// let jo_skale_verifier = null;
// let jo_slashing_table = null;
// let jo_time_helpers = null;
// let jo_time_helpers_with_debug = null;
// let jo_token_state = null;
let jo_validator_service = null;
let jo_wallets = null;

async function redeploy_skale_manager( w3, fnContinue ) {
    fnContinue = fnContinue || function() { };
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Performing " ) + cc.sunny( "Skale Manager Deployment" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const strCommand = "npx hardhat run migrations/deploy.ts --network custom";
    const strCommandClean = "rm -rf *unknown*.json";
    const strWorkingDirectory = "" + g_strFolderRepoSkaleManager;
    const strWorkingDirectoryCleanup = "" + g_strFolderRepoSkaleManager + "/.openzeppelin";
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
        "ENDPOINT": g_strMainNetURL,
        "ETH_PRIVATE_KEY": g_strPrivateKeySkaleManagerMN,
        "PRIVATE_KEY": g_strPrivateKeySkaleManagerMN,
        "NETWORK": "" + g_strNetworkNameMN, // "mainnet"
        "PRIVATE_KEY_1": "0x0",
        "PRIVATE_KEY_2": "0x1",
        "PRIVATE_KEY_3": "0x2",
        "PRIVATE_KEY_4": "0x3",
        "PRIVATE_KEY_5": "0x4",
        "PRIVATE_KEY_6": "0x5",
        "INSECURE_PRIVATE_KEY_1": "0x0",
        "INSECURE_PRIVATE_KEY_2": "0x1",
        "INSECURE_PRIVATE_KEY_3": "0x2",
        "INSECURE_PRIVATE_KEY_4": "0x3",
        "INSECURE_PRIVATE_KEY_5": "0x4",
        "INSECURE_PRIVATE_KEY_6": "0x5"
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run cleanup command " ) + cc.notice( "\"" ) + cc.info( strCommandClean ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectoryCleanup ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
    }
    child_process.execSync(
        strCommandClean,
        {
            cwd: "" + strWorkingDirectoryCleanup,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run deployment command " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished Skale Manager deployment" ) + "\n" );
    fnContinue();
}
async function reload_deployed_skale_manager( w3, fnContinue ) {
    fnContinue = fnContinue || function() { };
    if( ! fileExists( g_strSkaleManagerAbiJsonPath ) ) {
        g_strSkaleManagerAbiJsonPath = normalizePath( searchDirSyncForFirstItem( "skale-manager-*develop*-custom-abi.json", g_strFolderRepoSkaleManager + "/data" ) );
        if( g_bVerbose )
            log.write( cc.normal( "Re-assuming " ) + cc.sunny( "Skale Manager ABI file" ) + cc.normal( " is " ) + cc.info( g_strSkaleManagerAbiJsonPath ) + "\n" );
    }
    if( ! fileExists( g_strSkaleManagerAbiJsonPath ) ) {
        log.write( cc.error( "Skale Manager ABI JSON file " ) + cc.attention( g_strSkaleManagerAbiJsonPath ) + cc.error( " does not exist." ) + "\n" );
        await end_of_test( 48 );
    }
    // g_joSkaleManagerABI = jsonFileLoad( g_strSkaleManagerAbiJsonPath, null, g_bVerbose );
    // traverse_json( g_joSkaleManagerABI, fix_ethers_js_abi_errors );
    g_joSkaleManagerABI = jsonFileLoad( g_strSkaleManagerAbiJsonPath, null, g_bVerbose );
    traverse_json( g_joSkaleManagerABI, fix_ethers_js_abi_errors );
    jsonFileSave( g_strFolderImaProxy + "/data/skaleManagerComponents.json", {
        "contract_manager_address": g_joSkaleManagerABI.contract_manager_address,
        "contract_manager_abi": g_joSkaleManagerABI.contract_manager_abi
    }, g_bVerbose );

    jo_constants_holder = initContract( w3, g_joSkaleManagerABI, "constants_holder" );
    // jo_contract_manager = initContract( w3, g_joSkaleManagerABI, "contract_manager" );
    // jo_decryption = initContract( w3, g_joSkaleManagerABI, "decryption" );
    // jo_delegation_controller = initContract( w3, g_joSkaleManagerABI, "delegation_controller" );
    // jo_delegation_period_manager = initContract( w3, g_joSkaleManagerABI, "delegation_period_manager" );
    // jo_distributor = initContract( w3, g_joSkaleManagerABI, "distributor" );
    // jo_ecdh = initContract( w3, g_joSkaleManagerABI, "e_c_d_h" );
    // jo_manager_data = initContract( w3, g_joSkaleManagerABI, "manager_data" );
    // jo_monitors_data = initContract( w3, g_joSkaleManagerABI, "monitors_data" );
    // jo_monitors_functionality = initContract( w3, g_joSkaleManagerABI, "monitors_functionality" );
    jo_nodes = initContract( w3, g_joSkaleManagerABI, "nodes" );
    // jo_pricing = initContract( w3, g_joSkaleManagerABI, "pricing" );
    // jo_punisher = initContract( w3, g_joSkaleManagerABI, "punisher" );
    jo_key_storage = initContract( w3, g_joSkaleManagerABI, "key_storage" );
    jo_schains = initContract( w3, g_joSkaleManagerABI, "schains" );
    jo_schains_internal = initContract( w3, g_joSkaleManagerABI, "schains_internal" );
    // jo_schains_functionality = initContract( w3, g_joSkaleManagerABI, "schains_functionality" );
    // jo_schains_functionality_internal = initContract( w3, g_joSkaleManagerABI, "schains_functionality_internal" );
    jo_skale_dkg = initContract( w3, g_joSkaleManagerABI, "skale_d_k_g" );
    jo_skale_manager = initContract( w3, g_joSkaleManagerABI, "skale_manager" );
    jo_skale_token = initContract( w3, g_joSkaleManagerABI, "skale_token" );
    // jo_skale_verifier = initContract( w3, g_joSkaleManagerABI, "skale_verifier" );
    // jo_slashing_table = initContract( w3, g_joSkaleManagerABI, "slashing_table" );
    // jo_time_helpers = initContract( w3, g_joSkaleManagerABI, "time_helpers" );
    // jo_time_helpers_with_debug = initContract( w3, g_joSkaleManagerABI, "time_helpers_with_debug" );
    // jo_token_state = initContract( w3, g_joSkaleManagerABI, "token_state" );
    jo_validator_service = initContract( w3, g_joSkaleManagerABI, "validator_service" );
    jo_wallets = initContract( w3, g_joSkaleManagerABI, "wallets" );

    fnContinue();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function sm_pre_configure( w3, fnContinue ) {
    fnContinue = fnContinue || function() { };
    try {
        const privateKey = "" + g_strPrivateKeySkaleManagerMN;
        const addressFrom = private_key_2_account_address( w3, privateKey );
        // const publicKey = private_key_2_public_key( w3, privateKey );
        if( g_bVerbose )
            log.write( cc.debug( "Adjusting " ) + cc.sunny( "CONSTANTS_HOLDER_MANAGER_ROLE" ) + cc.debug( " role..." ) + "\n" );
        await role_check_and_grant( // CONSTANTS_HOLDER_MANAGER_ROLE
            g_w3_main_net,
            cid_main_net,
            privateKey,
            jo_constants_holder,
            "CONSTANTS_HOLDER_MANAGER_ROLE",
            addressFrom
        );
        if( g_bVerbose )
            log.write( cc.success( "Done." ) + "\n" );
        //
        const validator = "" + addressFrom;
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Pre-configuring " ) + cc.sunny( "Skale Manager" ) +
                cc.bright( "..." ) + "\n\n" );
        }
        const nMSR = 0; // MSR - Minimum Staking Requirement
        if( g_bVerbose )
            log.write( cc.debug( "Setting " ) + cc.info( "MSR" ) + cc.debug( "(Minimum Staking Requirement) to value " ) + cc.notice( nMSR ) + cc.debug( "..." ) + "\n" );
        const result_of_setMSR =
            jo_constants_holder.methods.setMSR( // MSR - Minimum Staking Requirement
                nMSR
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: validator,
                gas: 8000000
            } );
        if( g_bVerbose )
            log.write( cc.success( "Success, MSR was set with result result: " ) + cc.j( result_of_setMSR ) + "\n" );
        if( g_bVerbose )
            log.write( cc.success( "Success, " ) + cc.sunny( "Skale Manager" ) + cc.success( " pre-configured" ) + "\n" );
        fnContinue();
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " Skale Manager pre-configuring problem, error description: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 49 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let g_validatorID = null;

async function sm_init_validator( w3, fnContinue ) {
    fnContinue = fnContinue || function() { };
    try {
        const privateKey = "" + g_strPrivateKeySkaleManagerMN;
        const addressFrom = private_key_2_account_address( w3, privateKey );
        const publicKey = private_key_2_public_key( w3, privateKey );
        //
        const validator = "" + addressFrom;
        const strValidatorName = "GoodValidator";
        const strValidatorDescription = "Really good validator";
        const nValidatorFeeRate = 500; // solidity int
        const nValidatorMinimumDelegationAmount = 0; ; // solidity uint
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Initializing validator " ) + cc.sunny( validator ) + cc.bright( " in " ) + cc.sunny( "Skale Manager" ) +
                cc.bright( "..." ) + "\n\n" );
            log.write(
                "\n" +
                cc.debug( "...." ) + cc.info( "Private Key" ) + cc.debug( " is.................." ) + cc.notice( privateKey ) + "\n" +
                cc.debug( "...." ) + cc.info( "Address From" ) + cc.debug( " is................." ) + cc.notice( addressFrom ) + "\n" +
                cc.debug( "...." ) + cc.info( "Public Key" ) + cc.debug( " is..................." ) + cc.notice( publicKey ) + "\n" +
                cc.debug( "...." ) + cc.info( "Name" ) + cc.debug( " is........................." ) + cc.notice( strValidatorName ) + "\n" +
                cc.debug( "...." ) + cc.info( "Description" ) + cc.debug( " is.................." ) + cc.notice( strValidatorDescription ) + "\n" +
                cc.debug( "...." ) + cc.info( "Free Rate" ) + cc.debug( " is...................." ) + cc.notice( nValidatorFeeRate ) + "\n" +
                cc.debug( "...." ) + cc.info( "Minimum Delegation Amount" ) + cc.debug( " is...." ) + cc.notice( nValidatorMinimumDelegationAmount ) + "\n"
            );
        }
        const gasPrice = parseInt( await w3.eth.getGasPrice() );
        if( g_bVerbose )
            log.write( cc.debug( "Current " ) + cc.info( "gas price" ) + cc.debug( " = " ) + cc.sunny( gasPrice ) + "\n" );
        let tcnt = parseInt( await w3.eth.getTransactionCount( validator, null ) );
        if( g_bVerbose )
            log.write( cc.debug( "Current " ) + cc.info( "tcnt" ) + cc.debug( " = " ) + cc.sunny( tcnt ) + "\n" );
        let result_of_registerValidator = null;
        for( let idxAttempt = 0; idxAttempt < 3; ++ idxAttempt ) {
            try {
                tcnt = parseInt( await w3.eth.getTransactionCount( validator, null ) );
                ++tcnt; // tmo
                if( g_bVerbose )
                    log.write( cc.debug( "Performing attempt " ) + cc.info( idxAttempt ) + cc.debug( " to " ) + cc.sunny( "registerValidator" ) + cc.debug( " with " ) + cc.info( "tcnt" ) + cc.debug( " = " ) + cc.sunny( tcnt ) + cc.debug( "..." ) + "\n" );
                result_of_registerValidator =
                    await jo_validator_service.methods.registerValidator(
                        "" + strValidatorName
                        , "" + strValidatorDescription
                        , 0 + nValidatorFeeRate
                        , 0 + nValidatorMinimumDelegationAmount
                    ).send( {
                        chainId: parseIntOrHex( cid_main_net ),
                        from: validator,
                        gas: 8000000,
                        gasLimit: 8000000,
                        gasPrice: gasPrice,
                        nonce: tcnt
                    } );
                if( result_of_registerValidator ) {
                    log.write( cc.j( result_of_registerValidator ) + "\n" );
                    if( g_bVerbose )
                        log.write( cc.success( "Successful attempt " ) + cc.info( idxAttempt ) + cc.success( " to " ) + cc.sunny( "registerValidator" ) + cc.success( " with " ) + cc.info( "tcnt" ) + cc.success( " = " ) + cc.sunny( tcnt ) + cc.success( "." ) + "\n" );
                    break;
                }
            } catch ( err ) {
                if( g_bVerbose )
                    log.write( cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt ) + cc.error( " to " ) + cc.sunny( "registerValidator" ) + cc.error( " with " ) + cc.warning( "tcnt" ) + cc.error( " = " ) + cc.warning( tcnt ) + cc.error( ", error is: " ) + cc.warning( err.toString() ) + "\n" );
                result_of_registerValidator = null;
            }
            ++ tcnt; // TO-FIX: workaround
        }
        if( result_of_registerValidator == null )
            throw new Error( "Failed to register validator" );
        if( g_bVerbose ) {
            log.write( cc.success( "Success, new validator was registered, got result: " ) + cc.j( result_of_registerValidator ) + "\n" );
            log.write( cc.debug( "Querying " ) + cc.info( "ID" ) + cc.debug( " for validator " ) + cc.notice( validator ) + cc.debug( "..." ) + "\n" );
        }
        g_validatorID = await jo_validator_service.methods.getValidatorId( validator ).call( { from: validator } );
        if( g_bVerbose )
            log.write( cc.success( "Success, fetched validator " ) + cc.info( "ID" ) + cc.debug( " is " ) + cc.sunny( g_validatorID ) + "\n" );
        //
        // await jo_validator_service.linkNodeAddress( nodeAddress, { from: validator } );
        //
        const owner = "" + addressFrom;
        const valueAmount = "0x410D586A20A4C00000";
        if( g_bVerbose ) {
            log.write(
                cc.debug( "Transferring " ) + cc.notice( valueAmount ) + cc.debug( " of " ) + cc.info( "Skale Token" ) +
                cc.debug( "s from owner " ) + cc.notice( owner ) +
                cc.debug( " to validator " ) + cc.notice( validator ) +
                cc.debug( "..." ) +
                "\n" );
        }
        const result_of_transfer =
            await jo_skale_token.methods.transfer(
                validator
                , valueAmount
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: owner,
                gas: 8000000
            } );
        if( g_bVerbose )
            log.write( cc.success( "Success, " ) + cc.info( "Skale Token" ) + cc.success( "s transferred with result: " ) + cc.j( result_of_transfer ) + "\n" );
        await role_check_and_grant( // VALIDATOR_MANAGER_ROLE
            g_w3_main_net,
            cid_main_net,
            privateKey,
            jo_validator_service,
            "VALIDATOR_MANAGER_ROLE",
            owner
        );
        if( g_bVerbose )
            log.write( cc.debug( "Enabling validator " ) + cc.sunny( g_validatorID ) + cc.debug( "..." ) + "\n" );
        const result_of_enableValidator =
            await jo_validator_service.methods.enableValidator(
                g_validatorID
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: owner,
                gas: 8000000
            } );
        if( g_bVerbose )
            log.write( cc.success( "Success, " ) + cc.info( "validator" ) + cc.success( " enabled with result: " ) + cc.j( result_of_enableValidator ) + "\n" );
        //
        fnContinue();
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " validator initialization problem, error description: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 50 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// async function role_check_and_print( cid, jo_contract, strRoleName, addressTo, addressOwner ) {
//     cid = cid || cid_main_net;
//     addressOwner = addressOwner || addressTo;
//     if( g_bVerbose ) {
//         log.write(
//             cc.debug( "Checking the " ) + cc.info( strRoleName ) + cc.debug( " role of address " ) + cc.info( addressTo ) +
//             cc.debug( "..." ) + "\n" );
//     }
//     const role = await jo_contract.methods[strRoleName]().call( {
//         chainId: parseIntOrHex( cid ),
//         from: addressOwner,
//         gas: 8000000
//     } );
//     const has_role = await jo_contract.methods.hasRole( role, addressTo ).call( {
//         chainId: parseIntOrHex( cid ),
//         from: addressOwner,
//         gas: 8000000
//     } );
//     if( g_bVerbose ) {
//         log.write(
//             cc.debug( "The " ) + cc.info( strRoleName ) + cc.debug( " role of address " ) + cc.info( addressTo ) + cc.debug( " is " ) +
//             ( has_role ? cc.success( "granted" ) : cc.error( "denied" ) ) +
//             "\n" );
//     }
//     return has_role;
// }

async function payed_invoke_method(
    w3,
    cid,
    contract,
    methodWithArguments,
    strPrivateKeyFrom,
    gas,
    gasPrice
) {
    gas = gas || 8000000;
    gasPrice = gasPrice || 10000000000;
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( w3, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await w3.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: gas,
        to: contract.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await w3.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, transaction receipt is " ) + cc.j( joReceipt ) + "\n" );
}

async function role_check_and_grant( w3, cid, strPrivateKeyFrom, jo_contract, strRoleName, addressTo ) { // for example "VALIDATOR_MANAGER_ROLE"
    w3 = w3 || g_w3_main_net;
    cid = cid || cid_main_net;
    const addressSendTxFrom = private_key_2_account_address( w3, strPrivateKeyFrom );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Checking the " ) + cc.info( strRoleName ) + cc.debug( " role of address " ) + cc.info( addressTo ) +
            cc.debug( "..." ) + "\n" );
    }
    const role = await jo_contract.methods[strRoleName]().call( {
        chainId: parseIntOrHex( cid ),
        from: addressSendTxFrom,
        gas: 8000000
    } );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Role " ) + cc.info( strRoleName ) + cc.debug( " as object is " ) + cc.j( role ) +
            cc.debug( "..." ) + "\n" );
    }
    let has_role = await jo_contract.methods.hasRole( role, addressTo ).call( {
        chainId: parseIntOrHex( cid ),
        from: addressSendTxFrom,
        gas: 8000000
    } );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "The " ) + cc.info( strRoleName ) + cc.debug( " role of address " ) + cc.info( addressTo ) + cc.debug( " is " ) +
            ( has_role ? cc.success( "granted" ) : cc.error( "denied" ) ) +
            "\n" );
    }
    if( ! has_role ) {
        log.write(
            cc.debug( "Granting the " ) + cc.info( strRoleName ) + cc.debug( " role of address " ) + cc.info( addressTo ) +
            cc.debug( "..." ) + "\n" );

        if( g_bVerbose ) {
            log.write( "    " + cc.debug( "contract is........" ) + cc.j( jo_contract.options.address ) + "\n" );
            log.write( "    " + cc.debug( "role is............" ) + cc.j( role ) + "\n" );
            log.write( "    " + cc.debug( "addressTo is......." ) + cc.info( addressTo ) + "\n" );
            log.write( "    " + cc.debug( "TX sending from...." ) + cc.info( addressSendTxFrom ) + "\n" );
            log.write( "    " + cc.debug( "chain ID is........" ) + cc.info( cid ) + "\n" );
        }

        // await jo_contract.methods.grantRole( role, addressTo ).send( {
        //     chainId: parseIntOrHex( cid ),
        //     from: addressSendTxFrom,
        //     gas: 8000000
        // } );
        const methodWithArguments = jo_contract.methods.grantRole( role, addressTo );
        await payed_invoke_method(
            w3,
            cid,
            jo_contract,
            methodWithArguments,
            strPrivateKeyFrom,
            8000000, // gas
            10000000000 // gasPrice
        );

        has_role = await jo_contract.methods.hasRole( role, addressTo ).call( {
            chainId: parseIntOrHex( cid ),
            from: addressSendTxFrom,
            gas: 8000000
        } );
        if( g_bVerbose ) {
            log.write(
                cc.debug( "The " ) + cc.info( strRoleName ) + cc.debug( " role of address " ) + cc.info( addressTo ) + cc.debug( " is " ) +
                ( has_role ? cc.success( "granted" ) : cc.error( "denied" ) + cc.debug( " (post check) " ) ) +
                "\n" );
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function sm_init_node_address( idxChain, w3, idxNode ) {
    try {
        const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
        const joNodeDesc = arrNodeDescriptions[idxNode];
        const nodeAddress = "" + joNodeDesc.nodeAddress;
        const privateKey = "" + g_strPrivateKeySkaleManagerMN;
        const addressFrom = private_key_2_account_address( w3, privateKey );
        const publicKey = private_key_2_public_key( w3, privateKey );
        const validator = "" + addressFrom;
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Linking node " ) + cc.info( idxNode ) + cc.bright( "/" ) + cc.info( joNodeDesc.nameNode ) +
                cc.bright( " address " ) + cc.sunny( nodeAddress ) + cc.bright( " in " ) + cc.sunny( "Skale Manager" ) +
                cc.bright( "..." ) + "\n\n" );
            log.write(
                "\n" +
                cc.debug( "...." ) + cc.info( "Private Key" ) + cc.debug( " is.................." ) + cc.notice( privateKey ) + "\n" +
                cc.debug( "...." ) + cc.info( "Address From" ) + cc.debug( " is................." ) + cc.notice( addressFrom ) + "\n" +
                cc.debug( "...." ) + cc.info( "Public Key" ) + cc.debug( " is..................." ) + cc.notice( publicKey ) + "\n" +
                cc.debug( "...." ) + cc.info( "Node Index" ) + cc.debug( " is..................." ) + cc.notice( idxNode ) + "\n" +
                cc.debug( "...." ) + cc.info( "Node Name" ) + cc.debug( " is...................." ) + cc.notice( joNodeDesc.nameNode ) + "\n" +
                cc.debug( "...." ) + cc.info( "Validator" ) + cc.debug( " is...................." ) + cc.notice( validator ) + "\n" +
                cc.debug( "...." ) + cc.info( "Validator ID" ) + cc.debug( " is................." ) + cc.notice( g_validatorID ) + "\n" +
                cc.debug( "...." ) + cc.info( "Node Address" ) + cc.debug( " is................." ) + cc.notice( nodeAddress ) + "\n"
            );
        }
        if( g_bVerbose )
            log.write( cc.debug( "Querying validator node indices(before)..." ) + "\n" );
        const arrNodeIndicesBefore = await jo_nodes.methods.getValidatorNodeIndexes( g_validatorID ).call( { from: validator } );
        if( g_bVerbose )
            log.write( cc.success( "Got node indices(before): " ) + cc.j( arrNodeIndicesBefore ) + "\n" );

        if( g_bVerbose )
            log.write( cc.debug( "Generating link signature(before)..." ) + "\n" );
        let signature = "" + ( await w3.eth.sign( w3.utils.soliditySha3(
            g_validatorID.toString() ), // validatorIndex
        nodeAddress ) );
        // let signature = "" + ( await w3.eth.accounts.sign( w3.utils.soliditySha3(
        //    g_validatorID.toString() ), // validatorIndex
        //    joNodeDesc.nodePrivateKey
        //    ) ).signature;
        if( g_bVerbose )
            log.write( cc.success( "Generating link signature(middle): " ) + cc.j( signature ) + "\n" );
        signature = ( signature.slice( 130 ) === "00" ? signature.slice( 0, 130 ) + "1b"
            : ( signature.slice( 130 ) === "01" ? signature.slice( 0, 130 ) + "1c" : signature ) );
        if( g_bVerbose )
            log.write( cc.success( "Generating link signature(after): " ) + cc.j( signature ) + "\n" );

        const result_of_linkNodeAddress =
            await jo_validator_service.methods.linkNodeAddress(
                nodeAddress,
                signature
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: validator,
                gas: 8000000
            } );
        if( g_bVerbose )
            log.write( cc.success( "Success, " ) + cc.info( "Node Address" ) + cc.success( " was linked, result is: " ) + cc.j( result_of_linkNodeAddress ) + "\n" );
        // if( g_bVerbose )
        //     log.write( cc.debug( "Checking result, whether node was linked to specified validator") + cc.debug( "..." ) + "\n" );
        // let linkedValidatorID = await jo_validator_service.methods.getValidatorId( nodeAddress ).call( { from: validator } );
        // if( g_bVerbose )
        //     log.write( cc.debug( "got linked validator ID ") + cc.notice( linkedValidatorID ) + cc.debug( "..." ) + "\n" );
        // if( linkedValidatorID != g_validatorID )
        //     throw new Error( "Node linkage failed, returned different validator ID then attempted to link to" );
        if( g_bVerbose )
            log.write( cc.debug( "Querying validator node indices(after)..." ) + "\n" );
        const arrNodeIndicesAfter = await jo_nodes.methods.getValidatorNodeIndexes( g_validatorID ).call( { from: validator } );
        if( g_bVerbose )
            log.write( cc.success( "Got node indices(after): " ) + cc.j( arrNodeIndicesAfter ) + "\n" );

        if( g_bVerbose )
            log.write( cc.debug( "Querying validatorID by node address(after)..." ) + "\n" );
        const queriedValidatorID = await jo_validator_service.methods.getValidatorIdByNodeAddress( nodeAddress ).call( { from: validator } );
        if( g_bVerbose )
            log.write( cc.success( "Got validator ID by node address(after): " ) + cc.sunny( queriedValidatorID ) + "\n" );

        if( g_bVerbose ) {
            log.write(
                cc.success( "Success, node " ) + cc.info( idxNode ) + cc.success( "/" ) + cc.info( joNodeDesc.nameNode ) +
                cc.success( " was linked to validator ID " ) + cc.notice( g_validatorID ) +
                "\n" );
        }
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " sm_init_node_address() problem, error description: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 51 );
    }
}

async function sm_init_node_addresses_schain( idxChain, w3 ) {
    try {
        const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
        const cnt = arrNodeDescriptions.length;
        for( let i = 0; i < cnt; ++ i )
            await sm_init_node_address( idxChain, w3, i );
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " sm_init_node_addresses_schain() problem, error description: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 52 );
    }
}

async function sm_init_node_addresses_all( w3 ) {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain )
        await sm_init_node_addresses_schain( idxChain, w3 );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function sendMoneyFromTo( w3, privateKey, addressFrom, addressTo, valueToSend, fnContinue ) {
    fnContinue = fnContinue || function() {};
    log.write(
        cc.normal( "Sending money from " ) + cc.info( addressFrom ) +
        cc.normal( " to " ) + cc.info( addressTo ) +
        cc.normal( ", amount is " ) + cc.notice( valueToSend ) +
        cc.normal( "..." ) + "\n" );
    const strAddress = addressFrom;
    try {
        const gasPrice = await w3.eth.getGasPrice();
        if( g_bVerbose )
            log.write( cc.debug( "Current " ) + cc.info( "gas price" ) + cc.debug( " = " ) + cc.sunny( gasPrice ) + "\n" );
        if( g_bVerbose )
            log.write( cc.notice( "Will call " ) + cc.notice( "w3.eth.getTransactionCount()" ) + cc.notice( "..." ) + "\n" );
        const tcnt = await w3.eth.getTransactionCount( strAddress, null );
        if( g_bVerbose )
            log.write( cc.success( "Done" ) + cc.notice( ", got " ) + cc.sunny( tcnt ) + "\n" );
        //
        const v = "0x" + w3.utils.toBN( valueToSend.toString() ).toString( 16 );
        const rawTx = {
            "nonce": tcnt,
            "gasPrice": gasPrice,
            "gas": 8000000,
            "to": addressTo,
            "value": v
        };
        if( g_bVerbose )
            log.write( cc.debug( "...composed " ) + cc.j( rawTx ) + "\n" );
        const tx = new ethereumjs_tx( rawTx );
        // if( g_bVerbose )
        //     log.write( cc.debug("...ethereum js tx ") + cc.j(tx) + "\n" );
        const key = Buffer.from( privateKey, "hex" ); // convert private key to buffer
        // if( g_bVerbose )
        //     log.write( cc.debug("...created key ") + cc.j(key) + "\n" );
        tx.sign( key ); // arg is privateKey as buffer
        // if( g_bVerbose )
        //     log.write( cc.debug("...signed tx ") + cc.j(tx) + "\n" );
        const serializedTx = tx.serialize();
        // if( g_bVerbose )
        //     log.write( cc.debug("...serialized tx ") + cc.j(serializedTx) + "\n" );
        if( g_bVerbose )
            log.write( cc.debug( "Sending signed method call transaction..." ) + "\n" );
        const joReceipt = await w3.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
        if( g_bVerbose )
            log.write( cc.debug( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
        log.write( cc.success( "Done" ) + cc.notice( ", money sent" ) + "\n" );
        fnContinue();
    } catch ( err ) {
        isError = true;
        log.write(
            cc.fatal( "ETH MONEY SEND ERROR:" ) +
            cc.error( " from " ) + cc.info( addressFrom ) +
            cc.error( " to " ) + cc.info( addressTo ) +
            cc.error( ", error description is: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 53 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function publicKey2arr( s ) {
    s = remove_starting_0x( s );
    const arr = [];
    const n = s.length;
    const n2 = Math.ceil( n / 2 );
    const n1 = n - n2;
    arr.push( ensure_starts_with_0x( s.substring( 0, n1 ), true ) );
    arr.push( ensure_starts_with_0x( s.substring( n1 ), true ) );
    return arr;
}

async function sm_createNode( w3, joNodeDesc ) {
    try {
        const privateKey = "" + g_strPrivateKeySkaleManagerMN;
        const addressFrom = private_key_2_account_address( w3, privateKey );
        // let publicKey = private_key_2_public_key( w3, privateKey );
        const validator = "" + addressFrom;
        // let strBasePort = "" + joNodeDesc.basePort;
        // while( strBasePort.length < 4 )
        //     strBasePort = "0" + strBasePort;
        const nodePort = joNodeDesc.basePort;
        const nodeIP = joNodeDesc.ipInfo.ip;
        const nodeIPh = ip2h( nodeIP );
        const nodePublicKey = joNodeDesc.nodePublicKey;
        const nodeName = joNodeDesc.nameNode;
        const nodeAddress = joNodeDesc.nodeAddress;
        if( g_bVerbose ) {
            log.write( cc.normal( "Entered " ) + cc.info( "sm_createNode" ) +
                cc.normal( ", " ) + cc.notice( "name" ) + cc.normal( "=" ) + cc.info( nodeName ) +
                cc.normal( ", " ) + cc.notice( "ip" ) + cc.normal( "=" ) + cc.info( nodeIP ) + cc.normal( "=" ) + cc.sunny( nodeIPh ) +
                cc.normal( ", " ) + cc.notice( "port" ) + cc.normal( "=" ) + cc.info( nodePort ) +
                cc.normal( ", " ) + cc.notice( "addressFrom" ) + cc.normal( "=" ) + cc.info( validator ) +
                // cc.normal( ", " ) + cc.notice( "privateKey" ) + cc.normal( "=" ) + cc.info( privateKey ) +
                // cc.normal( ", " ) + cc.notice( "publicKey" ) + cc.normal( "=" ) + cc.info( publicKey ) +
                "\n" );
        }
        // if ( g_bVerbose )
        //     log.write( cc.debug( "Sending money to node address..." ) + "\n" );
        // let valueToSend = w3.utils.toBN( 1000000000 ).toString(); // 100000000000000000000 // 1000000000
        // await sendMoneyFromTo( w3, privateKey, addressFrom, nodeAddress, valueToSend );
        if( g_bVerbose )
            log.write( cc.debug( "Checking node name..." ) + "\n" );
        const k = await jo_nodes.methods.nodesNameCheck( w3.utils.soliditySha3( nodeName ) ).call(); // jo_nodes_data
        if( g_bVerbose )
            log.write( "    " + cc.notice( "k" ) + cc.normal( "=" ) + cc.info( k ) + "\n" );

        if( g_bVerbose )
            log.write( cc.debug( "Generating node bytes..." ) + "\n" );
        const nonce = Math.floor( Math.random() * 65536 );
        log.write( cc.debug( "raw node public key is" ) + cc.info( nodePublicKey ) + "\n" );
        log.write( cc.debug( "node public key is" ) + cc.info( ensure_starts_with_0x( nodePublicKey, true ) ) + "\n" );
        const arrNodePublicKey = publicKey2arr( nodePublicKey );
        log.write( cc.debug( "array node public key is" ) + cc.j( arrNodePublicKey ) + "\n" );
        // const nodeData = generateBytesForNode( nodePort, nodeIP, nodePublicKey, nodeName, nonce );
        const result_of_createNode =
            await jo_skale_manager.methods.createNode(
                // nodeData
                // // "0x01" + // create node
                // // strBasePort + // "2161" + // port
                // // "0000" + // nonce
                // // joNodeDesc.ipInfo.hexIp + // "7f000001" + // ip
                // // joNodeDesc.ipInfo.hexIp + // "7f000001" + // public ip
                // // //
                // // "1122334455667788990011223344556677889900112233445566778899001122" +
                // // "1122334455667788990011223344556677889900112233445566778899001122" + // public key
                // // //
                // // "6432" // name
                //
                nodePort, // uint16 port
                nonce, // uint16 nonce
                nodeIPh, // bytes4 ip
                nodeIPh, // bytes4 publicIp
                arrNodePublicKey,
                nodeName, // string calldata name
                "test.domain.name.here" // string calldata domainName
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: nodeAddress, // validator // nodeAddress
                gas: 8000000
            } );
        if( g_bVerbose ) {
            log.write(
                cc.success( "Success, node " ) + cc.info( joNodeDesc.idxNode ) + cc.success( "/" ) + cc.info( joNodeDesc.nameNode ) +
                cc.success( " was created for validator ID " ) + cc.notice( g_validatorID ) +
                cc.success( ", result is " ) + cc.j( result_of_createNode ) +
                "\n" );
        }
        //
        // Additional check
        //
        const blockNumber = result_of_createNode.blockNumber;
        if( g_bVerbose )
            log.write( "    " + cc.notice( "blockNumber" ) + cc.normal( "=" ) + cc.j( blockNumber ) + "\n" );
        let nodeIndex = -1;
        let joNodeEventInfoSM = null;
        arrEvents = await jo_nodes.getPastEvents( // jo_nodes_functionality
            "NodeCreated", {
                "fromBlock": blockNumber,
                "toBlock": blockNumber
            } );
        for( i = 0; i < arrEvents.length; i++ ) {
            if( arrEvents[i].returnValues.nonce == nonce ) {
                joNodeEventInfoSM = arrEvents[i];
                nodeIndex = joNodeEventInfoSM.returnValues.nodeIndex;
            }
        }
        // if ( g_bVerbose ) {
        //     arrEvents = await jo_monitors_functionality.getPastEvents( "Iterations", {
        //         "fromBlock": blockNumber,
        //         "toBlock": blockNumber
        //     } );
        //     for ( i = 0; i < arrEvents.length; i++ ) {
        //         log.write( "    " + cc.notice( "eventsRetValues[" ) + cc.info( i ) + cc.notice( "]" ) + cc.normal( "=" ) + cc.info( events[ i ].returnValues ) + "\n" );
        //     }
        // }
        if( g_bVerbose ) {
            log.write(
                "    " + cc.normal( "Node " ) + cc.info( nodeIndex ) + cc.normal( " created with " ) + cc.info( result_of_createNode.gasUsed ) +
                cc.normal( " gas consumption, node info: " ) + cc.j( joNodeEventInfoSM ) +
                "\n" );
        }
        return joNodeEventInfoSM;
    } catch ( err ) {
        log.write( cc.fatal( "Error:" ) + cc.error( " sm_createNode() problem, error description: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 54 );
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let g_joCommonPublicKeyBLS = null;
// {
//     "commonBLSPublicKey0": "14175454883274808069161681493814261634483894346393730614200347712729091773660",
//     "commonBLSPublicKey1": "8121803279407808453525231194818737640175140181756432249172777264745467034059",
//     "commonBLSPublicKey2": "16178065340009269685389392150337552967996679485595319920657702232801180488250",
//     "commonBLSPublicKey3": "1719704957996939304583832799986884557051828342008506223854783585686652272013"
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function init_sgx_ssl_in_folder( strWorkingDirectory ) {
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Initializing " ) + cc.sunny( "SGX SSL" ) + cc.bright( " in folder " ) + cc.info( strWorkingDirectory ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const strCommand = "./create_pems.sh";
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
        "URL_SGX_WALLET_HTTPS": g_strUrlSgxWalletHTTPS,
        "URL_SGX_WALLET_HTTP": g_strUrlSgxWalletHTTP
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
            cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
            cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
            "\n" );
    }
    child_process.execSync( strCommand, {
        cwd: "" + strWorkingDirectory,
        stdio: "inherit",
        env: joEnv
    } );
    if( g_bVerbose )
        log.write( cc.success( "Passed SGX SSL initialization" ) + "\n" );
}

function init_sgx_ssl() {
    return init_sgx_ssl_in_folder( g_strPathForSgxSslData );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function node_set_maintenance( joNodeDesc, isOn, countOfAttempts ) {
    if( g_bVerbose ) {
        log.write( "    " +
            cc.debug( "Will set " ) + ( isOn ? cc.success( "on" ) : cc.error( "off" ) ) +
            cc.debug( " maintenance mode on node " ) + nodeItemDesc( joNodeDesc ) +
            cc.debug( " ..." ) + "\n" );
    }
    if( countOfAttempts == null || countOfAttempts == undefined || countOfAttempts < 1 )
        countOfAttempts = 3;
    let isSuccess = false;
    for( let idxAttempt = 0; idxAttempt < countOfAttempts; ++ idxAttempt ) {
        try {
            const privateKey = "" + g_strPrivateKeySkaleManagerMN;
            const addressFrom = private_key_2_account_address( g_w3_main_net, privateKey );
            const met = isOn ? jo_nodes.methods.setNodeInMaintenance : jo_nodes.methods.removeNodeFromInMaintenance;
            await met(
                joNodeDesc.idxSerialGlobal
            ).send( {
                chainId: parseIntOrHex( cid_main_net ),
                from: addressFrom,
                gas: 8000000
            } );
            isSuccess = true;
            break; // success
        } catch ( err ) {
            log.write( "    " +
                cc.error( "Failed to set " ) + ( isOn ? cc.success( "on" ) : cc.error( "off" ) ) +
                cc.error( " maintenance mode on node " ) + nodeItemDesc( joNodeDesc ) +
                cc.error( ", error description is: " ) + cc.warning( err.toString() ) + "\n" );
        }
        await sleep( 2000 );
    }
    if( ! isSuccess ) {
        log.write( "    " + cc.fatal( "Failed." ) + "\n" );
        await end_of_test( 55 );
    }
    if( g_bVerbose )
        log.write( "    " + cc.success( "Done." ) + "\n" );

}

async function schain_set_maintenance( idxChain, isOn, countOfAttempts ) {
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Will set " ) + ( isOn ? cc.success( "on" ) : cc.error( "off" ) ) +
            cc.debug( " maintenance mode on chain " ) + chainDescByIndex( idxChain ) +
            cc.debug( " ..." ) + "\n" );
    }
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        await node_set_maintenance( joNodeDesc, isOn, countOfAttempts );
    }
    if( g_bVerbose )
        log.write( cc.success( "Done." ) + "\n" );
}

async function all_set_maintenance( isOn, countOfAttempts ) {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain )
        await schain_set_maintenance( idxChain, isOn, countOfAttempts );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function init_sgx_sm_dkg_all() {
    if( g_bVerbose )
        log.write( "\n\n" + cc.bright( "Initializing SSL for SGX" ) + cc.bright( "..." ) + "\n\n" );
    init_sgx_ssl();
    if( g_bVerbose )
        log.write( "\n\n" + cc.bright( "Creating types of S-Chains on Main Net" ) + cc.bright( "..." ) + "\n\n" );
    await init_schain_types( g_w3_main_net, g_strPrivateKeySkaleManagerMN );
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        let isComplete = false, isResolved = false, iv = null;
        const promiseComplete = new Promise( function( resolve, reject ) {
            iv = setInterval( function() {
                if( isComplete ) {
                    if( ! isResolved ) {
                        isResolved = true;
                        resolve();
                    }
                }
            }, 1000 );
        } );
        await init_sgx_sm_dkg_schain( idxChain, function() {
            isComplete = true;
        } );
        await Promise.all( [ promiseComplete ] );
        if( iv )
            clearInterval( iv );
    }
    await all_set_maintenance( false );
}

async function init_sgx_sm_dkg_schain( idxChain, fnContinue ) {
    fnContinue = fnContinue || function() { };
    //
    // General DKG process sequence description:
    //     init_sgx_ssl - was called before
    //     init_schain_types - was called before
    //     init_schain_node_descriptions
    //     sgx_dkg_process_pre
    //     ....... sgx_generate_key ................... []
    //     ....... sgx_generate_dkg_poly .............. []
    //     ....... sgx_do_secret_key_contribution ..... []
    //     ....... send_dkg_broadcast ................. []
    //     ....... fetch_event_BroadcastAndKeyShare ... [] secret key contribution generated here
    //     sgx_dkg_process_post
    //     ....... sgx_do_verify_secret ............... [] []
    //     ....... sgx_create_node_bls_private_key .... []
    //     ....... sgx_fetch_node_public_key .......... []
    //     ....... send_dkg_alright .................. []
    //
    init_schain_node_descriptions( idxChain, g_w3_main_net );
    //
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Creating S-Chain " ) + cc.info( idxChain ) + cc.bright( " nodes" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const arrAssignedNodeIndices = g_arrChains[idxChain].arrAssignedNodeIndices;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        arrNodeDescriptions.joNodeEventInfoSM = await sm_createNode( g_w3_main_net, joNodeDesc );
    }
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Creating S-Chain " ) + cc.info( idxChain ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[idxChain].name;
    g_joChainEventInfoSM = await createSChain(
        g_w3_main_net,
        5, // lifetime
        get_needed_type_of_s_chain( arrNodeDescriptions.length ), // 4, // typeOfSchain
        schain_name, // name  null
        g_strPrivateKeySkaleManagerMN
    );
    //
    const privateKey = "" + g_strPrivateKeySkaleManagerMN;
    const addressFrom = private_key_2_account_address( g_w3_main_net, privateKey );
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Sending money from " ) + cc.info( addressFrom ) + cc.bright( " to " ) + cc.info( "wallets" ) + cc.bright( " contract" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const valueToSend = "100000000000000000000";
    await sendMoneyFromTo( g_w3_main_net, privateKey, addressFrom, jo_wallets.options.address, valueToSend );
    if( g_bVerbose )
        log.write( cc.success( "Done." ) );
    //
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Will invoke " ) + cc.info( "rechargeSchainWallet" ) +
            cc.debug( " for S-Chain " ) + cc.info( g_arrChains[idxChain].name ) +
            cc.debug( " with value " ) + cc.info( valueToSend ) +
            cc.debug( " ..." ) + "\n" );
    }
    await jo_wallets.methods.rechargeSchainWallet(
        g_w3_main_net.utils.soliditySha3( g_arrChains[idxChain].name )
    ).send( {
        chainId: parseIntOrHex( cid_main_net ),
        from: addressFrom,
        gas: 8000000,
        value: "0x" + g_w3_main_net.utils.toBN( valueToSend ).toString( 16 )
    } );
    if( g_bVerbose )
        log.write( cc.success( "Done." ) );

    copy_array( await getSChainNodeIndices( g_w3_main_net, g_joChainEventInfoSM.returnValues.name ), arrAssignedNodeIndices );
    for( let idx = 0; idx < arrAssignedNodeIndices.length; ++ idx )
        arrAssignedNodeIndices[idx] = parseInt( arrAssignedNodeIndices[idx] );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Got assigned global node indices " ) + cc.j( arrAssignedNodeIndices ) +
            cc.debug( " for S-Chain " ) + cc.info( g_arrChains[idxChain].name ) + "\n"
        );
    }
    //
    if( g_bVerbose ) {
        log.write(
            cc.info( "SGX HTTPS URL: " ) + cc.u( g_strUrlSgxWalletHTTPS ) + "\n" +
            cc.info( "SGX RPC options: " ) + cc.j( g_joSgxRpcOptions ) + "\n"
        );
    }
    // const joCall =
    rpcCall.create( g_strUrlSgxWalletHTTPS, g_joSgxRpcOptions, async function( joCall, err ) {
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " SGX RPC connection problem for url " ) + cc.warning( g_strUrlSgxWalletHTTPS ) + cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
            if( joCall )
                await joCall.disconnect();
            await end_of_test( 55 );
        }
        await sgx_dkg_process_pre( idxChain, g_w3_main_net, joCall );
        waitAsyncUntil( function() {
            for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                const joNodeDesc = arrNodeDescriptions[i];
                if( !joNodeDesc.bSgxPassedPre )
                    return false;
            }
            return true;
        }, async function() {
            for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                const joNodeDesc = arrNodeDescriptions[i];
                await send_dkg_broadcast( g_w3_main_net, joNodeDesc, g_strPrivateKeySkaleManagerMN );
                if( g_nTimeToSleepBeforeNextDkgBroadcastMilliseconds > 0 ) {
                    log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepBeforeNextDkgBroadcastMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
                    await sleep( g_nTimeToSleepBeforeNextDkgBroadcastMilliseconds );
                    log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepBeforeNextDkgBroadcastMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
                }
            }
            for( let i = 0; i < arrAssignedNodeIndices.length; ++i ) {
                const nodeIndexAssigned = arrAssignedNodeIndices[i];
                const joBroadcastEventData = await fetch_event_BroadcastAndKeyShare( idxChain, g_w3_main_net, i, nodeIndexAssigned );
                g_mapEvBroadcastAndKeyShare[nodeIndexAssigned] = joBroadcastEventData;
                const joNodeDesc = arrNodeDescriptions[i]; // [ nodeIndexAssigned ]
                joNodeDesc.joBroadcastEventData = joBroadcastEventData;
            }
            sgx_dkg_process_post( idxChain, g_w3_main_net, joCall );
            waitAsyncUntil( function() {
                for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                    const joNodeDesc = arrNodeDescriptions[i];
                    if( !joNodeDesc.bSgxPassedPost )
                        return false;
                }
                return true;
            }, async function() {
                for( let i = 0; i < arrAssignedNodeIndices.length; ++i ) {
                    const nodeIndexAssigned = arrAssignedNodeIndices[i];
                    await send_dkg_alright( idxChain, g_w3_main_net, i, nodeIndexAssigned, g_strPrivateKeySkaleManagerMN );
                }
                g_joCommonPublicKeyBLS = await fetch_bls_common_public_key( g_w3_main_net );
                // for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
                //     let joNodeDesc = arrNodeDescriptions[ i ];
                //     let nodeIndexAssigned = arrAssignedNodeIndices[ i ];
                //     await fetch_node_public_key( g_w3_main_net, joNodeDesc, nodeIndexAssigned );
                // }
                perform_multi_node_deployment( idxChain );
                init_sgx_ssl_for_nodes( idxChain );
                // await all_skaled_nodes_stop();
                await schain_set_maintenance( idxChain, true );
                if( g_bVerbose )
                    log.write( cc.success( "Done, created S-Chain " ) + cc.info( idxChain ) + "\n\n" );
                fnContinue();
            } );
        } );
    } );
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function exec_array_of_commands( arrCommands, strWorkingDirectory, joEnv ) {
    if( ! joEnv )
        joEnv = { };
    if( ! ( "PATH" in joEnv ) )
        joEnv.PATH = g_strRecommendedShellPATH;
    if( strWorkingDirectory == null || strWorkingDirectory == undefined || typeof strWorkingDirectory != "string" || strWorkingDirectory.length == 0 )
        strWorkingDirectory = __dirname;
    const cnt = arrCommands.length;
    for( let i = 0; i < cnt; ++ i ) {
        const strCommand = "" + arrCommands[i];
        if( g_bVerbose ) {
            log.write(
                cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
                cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
                cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
                "\n" );
        }
        child_process.execSync(
            strCommand,
            {
                cwd: "" + strWorkingDirectory,
                stdio: "inherit", //, "shell": true, stdio: [ 0, 1, 2 ] //, "stdio": "inherit"
                env: joEnv
            } );
    }
}

async function exec_array_of_commands_safe( arrCommands, strWorkingDirectory, joEnv, countOfAttempts ) {
    if( countOfAttempts == null || countOfAttempts == undefined || countOfAttempts < 1 )
        countOfAttempts = 1;
    for( let idxAttempt = 0; idxAttempt < countOfAttempts; ++ idxAttempt ) {
        try {
            log.write( cc.debug( "Execution attempt " ) + cc.info( idxAttempt ) + cc.debug( " of " ) + cc.info( countOfAttempts ) + cc.debug( "..." ) + "\n" );
            await exec_array_of_commands( arrCommands, strWorkingDirectory, joEnv );
            log.write( cc.success( "Done execution attempt " ) + cc.info( idxAttempt ) + cc.success( " of " ) + cc.info( countOfAttempts ) + cc.success( "." ) + "\n" );
            return;
        } catch ( err ) {
            log.write(
                cc.fatal( "Error in batch command executor:" ) +
                cc.error( ", error description is: " ) + cc.warning( err.toString() ) + "\n" );
        }
    } // for( let idxAttempt = 0; idxAttempt < countOfAttempts; ++ idxAttempt )
    await end_of_test( 56 );
}

// { shell: true, stdio: [ 0, 1, 2 ] }

async function ima_import_key( joCall, strKeyName, strKeyValue ) {
    const joIn = {
        "method": "importECDSAKey",
        "params": {
            "keyName": "" + strKeyName,
            "key": "" + strKeyValue
        }
    };
    log.write( cc.debug( "Calling SGX to import ECDSA key with: " ) + cc.j( joIn ) + "\n" );
    await joCall.call( joIn, async function( joIn, joOut, err ) {
        if( err ) {
            log.write( cc.fatal( "CRITICAL SGX ECDSA KEY \"" + strKeyName + "\" IMPORT ERROR:" ) + cc.error( " JSON RPC call to SGX wallet failed, error: " ) + cc.warning( err ) + "\n" );
            // await
            end_of_test( 54 );
        }
        log.write( cc.debug( "SGX ECDSA key \"" + strKeyName + "\" import result result is: " ) + cc.j( joOut ) + "\n" );
    } );
    if( g_nTimeToSleepAfterImportEcdsaKeyMilliseconds > 0 ) {
        log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepAfterImportEcdsaKeyMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
        await sleep( g_nTimeToSleepAfterImportEcdsaKeyMilliseconds );
        log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepAfterImportEcdsaKeyMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
    }
}

async function ima_register_sgx_keys() {
    if( ! ( g_bUseSgxInImaMN || g_bUseSgxInImaSC ) )
        return;
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Registering IMA/ECDSA key(s) in SGX wallet" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    await rpcCall.create( g_strUrlSgxWalletHTTPS, g_joSgxRpcOptions, async function( joCall, err ) {
        if( err ) {
            log.write( cc.fatal( "Error:" ) + cc.error( " SGX RPC connection problem for url " ) + cc.warning( g_strUrlSgxWalletHTTPS ) + cc.error( ", error description: " ) + cc.warning( err.toString() ) + "\n" );
            await end_of_test( 57 );
        }
        if( g_bUseSgxInImaMN )
            await ima_import_key( joCall, g_strSgxKeyNameMN, g_strPrivateKeyImaMN );
        if( g_bUseSgxInImaSC )
            await ima_import_key( joCall, g_strSgxKeyNameSC, g_strPrivateKeyImaSC );
    } );
    if( g_nTimeToSleepAfterRegisterSgxKeysMilliseconds > 0 ) {
        log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepAfterRegisterSgxKeysMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
        await sleep( g_nTimeToSleepAfterRegisterSgxKeysMilliseconds );
        log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepAfterRegisterSgxKeysMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
    }
}

async function rebuild_ima() {
    if( ! g_isImaAgentTypeScriptBased )
        return;
    const joEnv = { };
    const arrCommands = [
        "yarn rebuild"
    ];
    await exec_array_of_commands_safe( arrCommands, g_strFolderImaAgentBase, joEnv );
}

let g_joImaAbiMN = null;

async function redeploy_ima_to_main_net( fnContinue ) {
    fnContinue = fnContinue || function() { };
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "IMA deployment - Main NET" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    // jsonFileSave( g_strFolderImaProxy + "/data/skaleManagerComponents.json", {
    //     "contract_manager_address": "" + g_joSkaleManagerABI.contract_manager_address
    // }, g_bVerbose );
    jsonFileSave( g_strFolderImaProxy + "/data/skaleManagerComponents.json", {
        "contract_manager_address": g_joSkaleManagerABI.contract_manager_address,
        "contract_manager_abi": g_joSkaleManagerABI.contract_manager_abi
    }, g_bVerbose );
    const schain_name = g_arrChains[0].name;
    const arrNodeDescriptions = g_arrChains[0].arrNodeDescriptions;
    const joEnv = {
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
        "NETWORK_FOR_ETHEREUM": "" + g_strNetworkNameMN,
        "NETWORK_FOR_SCHAIN": "" + g_strNetworkNameSC,
        "CHAIN_NAME_SCHAIN": "" + schain_name,
        "URL_W3_ETHEREUM": "" + g_strMainNetURL,
        "URL_W3_S_CHAIN": "" + arrNodeDescriptions[0].url, // first skaled node URL
        "PRIVATE_KEY_FOR_ETHEREUM": "" + g_strPrivateKeyImaMN,
        "PRIVATE_KEY_FOR_SCHAIN": "" + g_strPrivateKeyImaSC,
        "ACCOUNT_FOR_ETHEREUM": "" + private_key_2_account_address( g_w3_main_net, g_strPrivateKeyImaMN ),
        "ACCOUNT_FOR_SCHAIN": "" + private_key_2_account_address( g_w3_main_net, g_strPrivateKeyImaSC )
    };
    const arrCommands_prepare = [
        "node --version",
        "yarn --version",
        "which node",
        "which yarn",
        "mkdir -p data",
        "rm -rf ./build",
        "rm -rf ./data/proxy*",
        "rm -rf ./node_modules",
        "yarn install"
    ];
    await exec_array_of_commands_safe( arrCommands_prepare, g_strFolderImaProxy, joEnv );
    //
    const arrCommands_main_net = [
        "yarn deploy-to-mainnet",
        "ls -1 ./data/"
    ];
    await exec_array_of_commands_safe( arrCommands_main_net, g_strFolderImaProxy, joEnv, 3 );
    fnContinue();
}
async function redeploy_ima_to_schain_all() {
    if( g_bPredeployedIMA )
        return;
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await redeploy_ima_to_schain_one( idxChain );
    }
}
async function redeploy_ima_to_schain_one( idxChain, fnContinue ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    fnContinue = fnContinue || function() { };
    if( g_bPredeployedIMA ) {
        fnContinue();
        return;
    }
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "IMA deployment - S-Chain " ) + cc.info( idxChain ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[idxChain].name;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const joEnv = {
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
        "NETWORK_FOR_ETHEREUM": "" + g_strNetworkNameMN,
        "NETWORK_FOR_SCHAIN": "" + g_strNetworkNameSC,
        "CHAIN_NAME_SCHAIN": "" + schain_name,
        "URL_W3_ETHEREUM": "" + g_strMainNetURL,
        "URL_W3_S_CHAIN": "" + arrNodeDescriptions[0].url, // first skaled node URL
        "PRIVATE_KEY_FOR_ETHEREUM": "" + g_strPrivateKeyImaMN,
        "PRIVATE_KEY_FOR_SCHAIN": "" + g_strPrivateKeyImaSC,
        "ACCOUNT_FOR_ETHEREUM": "" + private_key_2_account_address( g_w3_main_net, g_strPrivateKeyImaMN ),
        "ACCOUNT_FOR_SCHAIN": "" + private_key_2_account_address( g_w3_main_net, g_strPrivateKeyImaSC )
    };
    //
    // const arrCommands_check_IMA_alive = [
    //     "node --no-warnings " +
    //     g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
    //     " --browse-s-chain" +
    //     " --url-s-chain=" + arrNodeDescriptions[0].url // skaled node URL for node 00
    //     ,
    //     "node --no-warnings " +
    //     g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
    //     " --browse-s-chain" +
    //     " --url-s-chain=" + arrNodeDescriptions[1].url // skaled node URL for node 01
    // ];
    // await exec_array_of_commands_safe( arrCommands_check_IMA_alive, g_strFolderImaAgent, joEnv, 3 );
    //
    const arrCommands_s_chain = [
        "yarn deploy-to-schain",
        "ls -1 ./data/"
    ];
    await exec_array_of_commands_safe( arrCommands_s_chain, g_strFolderImaProxy, joEnv, 3 );
    //
    // copy IMA ABIs to destination location
    //
    const strPathImaAbiSC_just_deployed = "" + g_strFolderImaProxy + "/data/proxySchain_" + schain_name + ".json";
    const strPathImaAbiSC = get_ima_abi_schain_path( idxChain );
    const strPathImaAbiSC_saved_copy = get_ima_abi_schain_path_saved_copy( idxChain );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Copying " ) + cc.info( strPathImaAbiSC_just_deployed ) +
            cc.debug( " to " ) + cc.info( strPathImaAbiSC ) +
            cc.debug( "..." ) + "\n" );
    }
    quick_spawn( "cp \"" + strPathImaAbiSC_just_deployed + "\" \"" + strPathImaAbiSC + "\"" );
    if( g_bVerbose )
        log.write( cc.success( "Done" ) + "\n" );
    if( g_bVerbose ) {
        log.write(
            cc.debug( "Copying " ) + cc.info( strPathImaAbiSC_just_deployed ) +
            cc.debug( " to " ) + cc.info( strPathImaAbiSC_saved_copy ) +
            cc.debug( "..." ) + "\n" );
    }
    quick_spawn( "cp \"" + strPathImaAbiSC_just_deployed + "\" \"" + strPathImaAbiSC_saved_copy + "\"" );
    if( g_bVerbose )
        log.write( cc.success( "Done" ) + "\n" );
    fnContinue();
}
async function reload_ima_abi_for_main_net( fnContinue ) {
    fnContinue = fnContinue || function() { };
    if( ! fileExists( g_strPathImaAbiMN ) ) {
        log.write( cc.error( "IMA Main Net ABI JSON file " ) + cc.attention( g_strPathImaAbiMN ) + cc.error( " does not exist." ) + "\n" );
        await end_of_test( 58 );
    }
    g_joImaAbiMN = jsonFileLoad( g_strPathImaAbiMN, null, g_bVerbose );
    traverse_json( g_joImaAbiMN, fix_ethers_js_abi_errors );
    fnContinue();
}
async function reload_ima_abi_for_schain_all() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain )
        await reload_ima_abi_for_schain_one( idxChain );
}
async function reload_ima_abi_for_schain_one( idxChain, fnContinue ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    fnContinue = fnContinue || function() { };
    const strPathImaAbiSC = get_ima_abi_schain_path( idxChain );
    const strPathImaAbiSC_saved_copy = get_ima_abi_schain_path_saved_copy( idxChain );
    if( ! fileExists( strPathImaAbiSC ) ) {
        if( g_bPredeployedIMA ) {
            log.write( cc.normal( "Restoring saved copy of IMA S-Chain ABI JSON file " ) + cc.attention( strPathImaAbiSC ) + cc.normal( "..." ) + "\n" );
            quick_spawn( "cp \"" + strPathImaAbiSC_saved_copy + "\" \"" + strPathImaAbiSC + "\"" );
            if( ! fileExists( strPathImaAbiSC ) ) {
                log.write( cc.error( "IMA S-Chain ABI JSON file " ) + cc.attention( strPathImaAbiSC ) + cc.error( " does not exist(and failed to use saved copy)." ) + "\n" );
                await end_of_test( 59 );
            }
            log.write( cc.success( "Done." ) + "\n" );
        } else {
            log.write( cc.error( "IMA S-Chain ABI JSON file " ) + cc.attention( strPathImaAbiSC ) + cc.error( " does not exist." ) + "\n" );
            await end_of_test( 60 );
        }
    }
    const joImaAbiSC = jsonFileLoad( strPathImaAbiSC, null, g_bVerbose );
    traverse_json( joImaAbiSC, fix_ethers_js_abi_errors );
    g_arrChains[idxChain].joImaAbiSC = joImaAbiSC;
    fnContinue();
}

async function generate_predeployed_artifacts_all() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain )
        await generate_predeployed_artifacts_schain( idxChain );
}
async function generate_predeployed_artifacts_schain( idxChain, fnContinue ) {
    fnContinue = fnContinue || function() { };
    if( ! g_bPredeployedIMA ) {
        fnContinue();
        return;
    }
    const schain_name = g_arrChains[idxChain].name;
    const joAdditional = {
        schain_owner: "" + ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, g_strPrivateKeyImaSC ) ),
        "schain_name": "" + schain_name,
        "eth_deposit_box": "" + ensure_starts_with_0x( g_joImaAbiMN.deposit_box_eth_address ),
        "erc20_deposit_box": "" + ensure_starts_with_0x( g_joImaAbiMN.deposit_box_erc20_address ),
        "erc721_deposit_box": "" + ensure_starts_with_0x( g_joImaAbiMN.deposit_box_erc721_address ),
        "erc1155_deposit_box": "" + ensure_starts_with_0x( g_joImaAbiMN.deposit_box_erc1155_address ),
        // "erc721_deposit_box_with_metadata":
        "erc721_with_metadata_deposit_box": "" + ensure_starts_with_0x( g_joImaAbiMN.deposit_box_erc721_with_metadata_address ),
        "linker": "" + ensure_starts_with_0x( g_joImaAbiMN.linker_address ),
        "community_pool": "" + ensure_starts_with_0x( g_joImaAbiMN.community_pool_address )
    };
    const strAdditionalPath = path.join( g_strFolderRepoImaContracts, "/proxy/predeployed/test/additional.json" );
    log.write( cc.normal( "Saving additional information for skaled configuration update: " ) + cc.j( joAdditional ) +
        cc.normal( " to file " ) + cc.info( strAdditionalPath ) + cc.normal( "..." ) +
        "\n" );
    jsonFileSave( strAdditionalPath, joAdditional, g_bVerbose );
    log.write( cc.bright( "Generating " ) + cc.attention( "predeployed artifacts" ) + "\n" );
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
        "PATH_IMA_ABI": "" + get_ima_abi_schain_path( idxChain ),
        "PATH_S_CHAIN_GEN": "" + g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ),
        "PATH_ADDITIONAL": "" + strAdditionalPath
    };
    if( g_bPredeployedIMA )
        joEnv.GENERATE_ABI = "true";
    await exec_array_of_commands_safe( [ path.join( __dirname, "update_predeployed.sh" ) ], g_strFolderImaProxy, joEnv, 3 );
    fnContinue();
}

function write_down_mn_contract_addresses_into_config_json_tree( joSkaledConfigJsonRoot ) {
    const proxyMainnetContracts = [
        {
            address: g_joImaAbiMN.deposit_box_eth_address,
            referenceVariableName: "DepositBoxEth"
        }, {
            address: g_joImaAbiMN.deposit_box_erc20_address,
            referenceVariableName: "DepositBoxERC20"
        }, {
            address: g_joImaAbiMN.deposit_box_erc721_address,
            referenceVariableName: "DepositBoxERC721"
        }, {
            address: g_joImaAbiMN.deposit_box_erc721_with_metadata,
            referenceVariableName: "DepositBoxERC721WithMetadata"
        }, {
            address: g_joImaAbiMN.community_pool_address,
            referenceVariableName: "CommunityPool"
        }, {
            address: g_joImaAbiMN.linker_address,
            referenceVariableName: "Linker"
        }
    ];
    for( let idxContract = 0; idxContract < proxyMainnetContracts.length; ++ idxContract ) {
        const joContractProperties = proxyMainnetContracts[idxContract];
        if( g_bVerbose )
            log.write( cc.normal( "Processing Main Net contract " ) + cc.info( joContractProperties.referenceVariableName ) + cc.normal( "..." ) + "\n" );
        joSkaledConfigJsonRoot.skaleConfig.contractSettings.IMA[joContractProperties.referenceVariableName] = joContractProperties.address;
    }
}

async function ima_update_skaled_configurations_all( fnContinue ) {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        await ima_update_skaled_configurations_schain( idxChain );
    }
}

async function ima_update_skaled_configurations_schain( idxChain, fnContinue ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    fnContinue = fnContinue || function() { };
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Updating " ) + cc.sunny( "SKALED" ) + cc.bright( " configurations with " ) + cc.info( "IMA contracts" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    for( let i = 0; i < arrNodeDescriptions.length; ++i ) {
        const joNodeDesc = arrNodeDescriptions[i];
        const strFolderNodeSkaled = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/node_" + zeroPad( i, 2 );
        const strConfigPath = strFolderNodeSkaled + "/config.json";
        // const strSkaledNodeSgxDataFolder = strFolderNodeSkaled + "/create_pems";
        if( g_bVerbose ) {
            log.write( cc.normal( "Loading config file for node " ) + nodeItemDesc( joNodeDesc ) +
                cc.normal( " from file " ) + cc.info( strConfigPath ) + cc.normal( "..." ) +
                "\n" );
        }
        joNodeDesc.joConfig = jsonFileLoad( strConfigPath, null, g_bVerbose );
        //
        // joNodeDesc.joConfig.skaleConfig.nodeInfo.imaMainNet = g_strMainNetURL;
        const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.imaMessageProxyMainNet = "" + g_joImaAbiMN.message_proxy_mainnet_address;
        joNodeDesc.joConfig.skaleConfig.nodeInfo.imaMessageProxySChain = "" + joImaAbiSC.message_proxy_chain_address;
        write_down_mn_contract_addresses_into_config_json_tree( joNodeDesc.joConfig );
        //
        log.write( cc.normal( "Saving config file for node " ) + nodeItemDesc( joNodeDesc ) +
            cc.normal( " to file " ) + cc.info( strConfigPath ) + cc.normal( "..." ) +
            "\n" );
        jsonFileSave( strConfigPath, joNodeDesc.joConfig, g_bVerbose );
    } // for( let i = 0; i < arrNodeDescriptions.length; ++i )
    if( g_bVerbose )
        log.write( cc.success( "Finished skaled configuration update with IMA contracts" ) + "\n" );
    fnContinue();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ima_register_all( ) {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        ima_register_schain( idxChain );
    }
}

function ima_register_schain( idxChain, fnContinue ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    fnContinue = fnContinue || function() { };
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Performing " ) + cc.sunny( "IMA registration" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const nPreferredNodeIndex = 0;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const nNodeIndex = 0;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --register" +
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + arrNodeDescriptions[0].url + // first skaled node URL
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
        " " + compose_ima_cli_account_options_all_direct( joNodeDesc.idxChain, nNodeIndex ) // + compose_ima_cli_account_options( joNodeDesc.idxChain, nNodeIndex )
        ;
    const strWorkingDirectory = "" + g_strFolderImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
            cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
            cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
            "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            "stdio": "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished IMA registration" ) + "\n" );
    fnContinue();
}

function ima_check_registration_all() {
    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain ) {
        if( ! g_arrChains[idxChain].isStartEnabled )
            continue;
        ima_check_registration_schain( idxChain );
    }
}

function ima_check_registration_schain( idxChain, fnContinue ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    fnContinue = fnContinue || function() { };
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.bright( "Checking " ) + cc.sunny( "IMA registration" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const nPreferredNodeIndex = 0;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const nNodeIndex = 0;
    const strCommand =
        "node --no-warnings " +
        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
        " --check-registration" +
        " --url-main-net=" + g_strMainNetURL +
        " --url-s-chain=" + arrNodeDescriptions[0].url + // first skaled node URL
        " --id-main-net=" + g_strMainnetName +
        " --id-s-chain=" + schain_name +
        " --cid-main-net=" + cid_main_net +
        " --cid-s-chain=" + cid +
        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
        " --abi-main-net=" + g_strPathImaAbiMN +
        " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
        " " + compose_ima_cli_account_options( joNodeDesc.idxChain, nNodeIndex )
        ;
    const strWorkingDirectory = "" + g_strFolderImaAgent;
    const joEnv = {
        "PATH": g_strRecommendedShellPATH,
        "NO_ANSI_COLORS": ( g_bPlainColorMode ? "0" : "1" )
    };
    if( g_bVerbose ) {
        log.write(
            cc.debug( "will run " ) + cc.notice( "\"" ) + cc.info( strCommand ) + cc.notice( "\"" ) +
            cc.debug( " in folder " ) + cc.notice( "\"" ) + cc.info( strWorkingDirectory ) + cc.notice( "\"" ) +
            cc.debug( " with environment: " ) + cc.j( joEnv ) + cc.debug( " ..." ) +
            "\n" );
    }
    child_process.execSync(
        strCommand,
        {
            cwd: "" + strWorkingDirectory,
            stdio: "inherit",
            env: joEnv
        } );
    if( g_bVerbose )
        log.write( cc.success( "Finished checking IMA registration" ) + "\n" );
    fnContinue();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ima_transfer_options_from_direction( idxChain, strDirection, nPreferredNodeIndex ) {
    strDirection = strDirection.toLowerCase();
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    if( arrNodeDescriptions.length <= 0 )
        throw new Error( "no S-Chain nodes described, cannot compute transfer options" );
    const nNodeIndex = (
        nPreferredNodeIndex != undefined && nPreferredNodeIndex != null && typeof nPreferredNodeIndex == "number" &&
        nPreferredNodeIndex >= 0 && nPreferredNodeIndex < arrNodeDescriptions.length
    )
        ? nPreferredNodeIndex
        : 0 // ( arrNodeDescriptions.length - 1 )
        ;
    const strSchainURL = "" + arrNodeDescriptions[nNodeIndex].url; // last node
    const w3schain = getWeb3FromURL( strSchainURL );
    if( strDirection === "m2s" ) {
        const joTransferOptions = {
            w3src: g_w3_main_net,
            w3dst: w3schain,
            urlSrc: g_strMainNetURL,
            urlDst: strSchainURL,
            nameSrc: "Main Net",
            nameDst: "S-Chain",
            // common
            schainNodeIndex: nNodeIndex,
            w3mainnet: g_w3_main_net,
            w3schain: w3schain,
            urlMainNet: g_strMainNetURL,
            urlSChain: strSchainURL
        };
        return joTransferOptions;
    }
    if( strDirection === "s2m" ) {
        const joTransferOptions = {
            w3src: w3schain,
            w3dst: g_w3_main_net,
            urlSrc: strSchainURL,
            urlDst: g_strMainNetURL,
            nameSrc: "S-Chain",
            nameDst: "Main Net",
            // common
            schainNodeIndex: nNodeIndex,
            w3mainnet: g_w3_main_net,
            w3schain: w3schain,
            urlMainNet: g_strMainNetURL,
            urlSChain: strSchainURL
        };
        return joTransferOptions;
    }
    throw new Error( "bad direction specification, cannot compute transfer options" );
}

async function impl_get_ballance_eth( w3, strAddress, strNetworkName ) {
    const cntAttempts = 0 + g_nCntAttempts;
    for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
        try {
            const balance = ( await w3.eth.getBalance( strAddress ) ).toString();
            return balance;
        } catch ( err ) {
            log.write( cc.error( "Failed to get " ) + cc.info( strAddress ) + cc.error( " ETH ballance on " ) + cc.info( strNetworkName ) + cc.error( " network - " ) + cc.warning( err.toString() ) );
        }
        await sleep( 1000 );
    }
    await end_of_test( 61 );
}
async function impl_get_ballance_erc20_from_instance_of_contract( w3, strAddress, strNetworkName, contract ) {
    const cntAttempts = 0 + g_nCntAttempts;
    for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
        try {
            const balance = ( await contract.methods.balanceOf( strAddress ).call() ).toString();
            return balance;
        } catch ( err ) {
            log.write( cc.error( "Failed to get " ) + cc.info( strAddress ) + cc.error( " ERC20 ballance on " ) + cc.info( strNetworkName ) + cc.error( " network - " ) + cc.warning( err.toString() ) );
        }
        await sleep( 1000 );
    }
    await end_of_test( 62 );
}
async function impl_get_ballance_erc20( w3, strAddress, strNetworkName, joABI, strContractAddress ) {
    let contract = null;
    const cntAttempts = 0 + g_nCntAttempts;
    for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
        try {
            contract = new w3.eth.Contract( joABI, strContractAddress );
        } catch ( err ) {
            log.write( cc.error( "Failed to create ERC20 contract object with address  " ) + cc.info( strContractAddress ) + cc.error( " for " ) + cc.error( strNetworkName ) + cc.error( " network - " ) + cc.warning( err.toString() ) );
        }
        if( contract )
            break;
        await sleep( 1000 );
    }
    if( ! contract )
        await end_of_test( 63 );
    return await impl_get_ballance_erc20_from_instance_of_contract( w3, strAddress, strNetworkName, contract );
}

async function ima_send_eth( idxChain, strPrivateKeyFrom, strPrivateKeyTo, strDirection, moneySpec, nPreferredNodeIndex, isWaitBallanceChanged ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    isWaitBallanceChanged = ( isWaitBallanceChanged === undefined || isWaitBallanceChanged === null ) ? true : ( !!isWaitBallanceChanged );
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.sunny( strDirection ) + cc.bright( " cross-chain ETH " ) + cc.sunny( "IMA transfer" ) +
                cc.bright( "..." ) + "\n\n" );
        }
        strDirection = strDirection.toLowerCase();
        if( ! ( strDirection === "m2s" || strDirection === "s2m" ) )
            throw new Error( "bad direction specification, cannot send eth" );
        strPrivateKeyFrom = remove_starting_0x( strPrivateKeyFrom );
        strPrivateKeyTo = remove_starting_0x( strPrivateKeyTo );
        const joTransferOptions = ima_transfer_options_from_direction( idxChain, strDirection, nPreferredNodeIndex );
        const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( joTransferOptions.w3src, strPrivateKeyFrom ) );
        const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( joTransferOptions.w3dst, strPrivateKeyTo ) );
        let strAddrMN = "_", strAddrSC = "_";
        if( strDirection === "m2s" ) {
            strAddrMN = strAddressFrom;
            strAddrSC = strAddressTo;
        }
        if( strDirection === "s2m" ) {
            strAddrMN = strAddressTo;
            strAddrSC = strAddressFrom;
        }
        const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
        const fnGetBallanceMN = async function() {
            return await impl_get_ballance_eth( joTransferOptions.w3mainnet, strAddrMN, "Main Net" );
        };
        const fnGetBallanceSC = async function() {
            return await impl_get_ballance_erc20( joTransferOptions.w3schain, strAddrSC, "S-Chain", joImaAbiSC.eth_erc20_abi, joImaAbiSC.eth_erc20_address );
        };
        // let strKeyMN = "_", strKeySC = "_";
        let fnGetBallanceFrom = null, fnGetBallanceTo = null;
        if( strDirection === "m2s" ) {
            // strKeyMN = strPrivateKeyFrom;
            // strKeySC = strPrivateKeyTo;transfer tests start here
            fnGetBallanceFrom = fnGetBallanceMN;
            fnGetBallanceTo = fnGetBallanceSC;
        } else {
            fnGetBallanceFrom = fnGetBallanceSC;
            fnGetBallanceTo = fnGetBallanceMN;
        }
        const initialBalanceFrom = await fnGetBallanceFrom();
        const initialBalanceTo = await fnGetBallanceTo();
        if( g_bVerbose ) {
            const joImaAbiSC = g_arrChains[g_idxMostOftenUsedSChain].joImaAbiSC;
            log.write( "\n" +
                cc.debug( "...." ) + cc.info( "Direction" ) + cc.debug( " is...................." ) + cc.sunny( strDirection ) + "\n" +
                cc.debug( "...." ) + cc.info( "Network From" ) + cc.debug( " is................." ) + cc.bright( joTransferOptions.nameSrc ) + "\n" +
                cc.debug( "...." ) + cc.info( "Network To" ) + cc.debug( " is..................." ) + cc.bright( joTransferOptions.nameDst ) + "\n" +
                cc.debug( "...." ) + cc.info( "Web3 URL From" ) + cc.debug( " is................" ) + cc.u( joTransferOptions.urlSrc ) + "\n" +
                cc.debug( "...." ) + cc.info( "Web3 URL To" ) + cc.debug( " is.................." ) + cc.u( joTransferOptions.urlDst ) + "\n" +
                cc.debug( "...." ) + cc.info( "S-Chain node index" ) + cc.debug( " is..........." ) + cc.notice( joTransferOptions.schainNodeIndex ) + "\n" +
                cc.debug( "...." ) + cc.info( "ERC20 token on S-Chain" ) + cc.debug( " is......." ) + cc.sunny( joImaAbiSC.eth_erc20_address ) + "\n" +
                cc.debug( "...." ) + cc.info( "Private Key From" ) + cc.debug( " is............." ) + cc.warning( strPrivateKeyFrom ) + "\n" +
                cc.debug( "...." ) + cc.info( "Private Key To" ) + cc.debug( " is..............." ) + cc.warning( strPrivateKeyTo ) + "\n" +
                cc.debug( "...." ) + cc.info( "Address From" ) + cc.debug( " is................." ) + cc.normal( strAddressFrom ) + "\n" +
                cc.debug( "...." ) + cc.info( "Address To" ) + cc.debug( " is..................." ) + cc.normal( strAddressTo ) + "\n" +
                cc.debug( "...." ) + cc.info( "Initial balance From" ) + cc.debug( " is........." ) + cc.attention( initialBalanceFrom ) + "\n" +
                cc.debug( "...." ) + cc.info( "Initial balance To" ) + cc.debug( " is..........." ) + cc.attention( initialBalanceTo ) + "\n" +
                cc.debug( "...." ) + cc.info( "Amount to transfer" ) + cc.debug( " is..........." ) + cc.bright( moneySpec ) + "\n"
            );
        }
        const schain_name = g_arrChains[idxChain].name;
        const cid = g_arrChains[idxChain].cid;
        const nNodeIndex = 0;
        const strCommandPayment =
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --" + strDirection + "-payment" +
            " --value=" + moneySpec +
            // " --wei=" + parseMoneySpecToWei( g_w3_main_net, moneySpec, true )
            " --url-main-net=" + joTransferOptions.urlMainNet +
            " --url-s-chain=" + joTransferOptions.urlSChain +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) // compose_ima_cli_account_options( idxChain, nNodeIndex )
            ;
        const cntAttempts = 0 + g_nCntAttempts;
        const joEnv = { };
        await exec_array_of_commands_safe( [ strCommandPayment ], g_strFolderImaAgent, joEnv, 3 );
        if( isWaitBallanceChanged ) {
            let isMoneyReceived = false;
            if( strDirection === "s2m" ) { // receive payment after delay
                if( g_nTimeToSleepBeforeS2mReceiveMilliseconds > 0 ) {
                    log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepBeforeS2mReceiveMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
                    await sleep( g_nTimeToSleepBeforeS2mReceiveMilliseconds );
                    log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepBeforeS2mReceiveMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
                }
                // NOTICE: S2M will run its own preliminary state analysis lo
                for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                    log.write( cc.normal( "Receive " ) + cc.sunny( strDirection ) + cc.normal( " ETH payment attempt " ) + cc.info( idxAttempt ) + cc.normal( "..." ) + "\n" );
                    if( g_bVerbose )
                        log.write( cc.normal( "Waiting before receive " ) + cc.sunny( strDirection ) + cc.success( " ETH payment" ) + "\n" );
                    const nNodeIndex = 0;
                    const strCommandReceive =
                        "node --no-warnings " +
                        g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
                        " --s2m-receive" +
                        " --url-main-net=" + joTransferOptions.urlMainNet +
                        " --url-s-chain=" + joTransferOptions.urlSChain +
                        " --id-main-net=" + g_strMainnetName +
                        " --id-s-chain=" + schain_name +
                        " --cid-main-net=" + cid_main_net +
                        " --cid-s-chain=" + cid +
                        " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
                        " --abi-main-net=" + g_strPathImaAbiMN +
                        " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
                        " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) // compose_ima_cli_account_options( idxChain, nNodeIndex )
                        ;
                    await exec_array_of_commands_safe( [ strCommandReceive ], g_strFolderImaAgent, joEnv, 3 );
                    const currentBalanceFrom = await fnGetBallanceFrom();
                    const currentBalanceTo = await fnGetBallanceTo();
                    const isChangedFrom = ( initialBalanceFrom == currentBalanceFrom ) ? false : true;
                    const isChangedTo = ( initialBalanceTo == currentBalanceTo ) ? false : true;
                    log.write(
                        cc.debug( "...." ) + cc.info( "Initial balance From" ) + cc.debug( " is........." ) + cc.attention( initialBalanceFrom ) + "\n" +
                        cc.debug( "...." ) + cc.info( "Current balance From" ) + cc.debug( " is........." ) + cc.attention( currentBalanceFrom ) + "\n" +
                        cc.debug( "...." ) + cc.info( "Changed balance From" ) + cc.debug( " is........." ) + cc.yn( isChangedFrom ) + "\n" +
                        cc.debug( "...." ) + cc.info( "Initial balance To" ) + cc.debug( " is..........." ) + cc.attention( initialBalanceTo ) + "\n" +
                        cc.debug( "...." ) + cc.info( "Current balance To" ) + cc.debug( " is..........." ) + cc.attention( currentBalanceTo ) + "\n" +
                        cc.debug( "...." ) + cc.info( "Changed balance To" ) + cc.debug( " is..........." ) + cc.yn( isChangedTo ) + "\n"
                    );
                    if( isChangedTo ) {
                        isMoneyReceived = true;
                        log.write( cc.success( "Money received." ) + "\n" );
                        break;
                    }
                    if( isMoneyReceived )
                        break;
                    await sleep( 1000 );
                } // for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt )
            } // receive payment after delay
            if( ! isMoneyReceived ) {
                for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) { // loop to wait ballance changed
                    const currentBalanceFrom = await fnGetBallanceFrom();
                    const currentBalanceTo = await fnGetBallanceTo();
                    const isChangedFrom = ( initialBalanceFrom == currentBalanceFrom ) ? false : true;
                    const isChangedTo = ( initialBalanceTo == currentBalanceTo ) ? false : true;
                    if( g_bVerbose ) {
                        const joImaAbiSC = g_arrChains[g_idxMostOftenUsedSChain].joImaAbiSC;
                        log.write( "\n" +
                            cc.debug( "...." ) + cc.info( "Direction" ) + cc.debug( " is...................." ) + cc.sunny( strDirection ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Network From" ) + cc.debug( " is................." ) + cc.bright( joTransferOptions.nameSrc ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Network To" ) + cc.debug( " is..................." ) + cc.bright( joTransferOptions.nameDst ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Web3 URL From" ) + cc.debug( " is................" ) + cc.u( joTransferOptions.urlSrc ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Web3 URL To" ) + cc.debug( " is.................." ) + cc.u( joTransferOptions.urlDst ) + "\n" +
                            cc.debug( "...." ) + cc.info( "S-Chain node index" ) + cc.debug( " is..........." ) + cc.notice( joTransferOptions.schainNodeIndex ) + "\n" +
                            cc.debug( "...." ) + cc.info( "ERC20 token on S-Chain" ) + cc.debug( " is......." ) + cc.sunny( joImaAbiSC.eth_erc20_address ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Private Key From" ) + cc.debug( " is............." ) + cc.warning( strPrivateKeyFrom ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Private Key To" ) + cc.debug( " is..............." ) + cc.warning( strPrivateKeyTo ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Address From" ) + cc.debug( " is................." ) + cc.normal( strAddressFrom ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Address To" ) + cc.debug( " is..................." ) + cc.normal( strAddressTo ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Amount to transfer" ) + cc.debug( " is..........." ) + cc.bright( moneySpec ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Initial balance From" ) + cc.debug( " is........." ) + cc.attention( initialBalanceFrom ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Current balance From" ) + cc.debug( " is........." ) + cc.attention( currentBalanceFrom ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Changed balance From" ) + cc.debug( " is........." ) + cc.yn( isChangedFrom ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Initial balance To" ) + cc.debug( " is..........." ) + cc.attention( initialBalanceTo ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Current balance To" ) + cc.debug( " is..........." ) + cc.attention( currentBalanceTo ) + "\n" +
                            cc.debug( "...." ) + cc.info( "Changed balance To" ) + cc.debug( " is..........." ) + cc.yn( isChangedTo ) + "\n"
                        );
                    }
                    if( isChangedTo ) {
                        isMoneyReceived = true;
                        log.write( cc.success( "Money received." ) + "\n" );
                        break;
                    }
                    await sleep( 1000 );
                } // loop to wait ballance changed
            } // if( ! isMoneyReceived )
            if( ! isMoneyReceived )
                throw new Error( "IMA transfer done, but money receive was not confirmed due to wait timeout" );
        } // if( isWaitBallanceChanged )
        if( g_bVerbose )
            log.write( cc.success( "Successful " ) + cc.sunny( strDirection ) + cc.success( " ETH transfer" ) + "\n" );
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) + cc.info( strDirection ) + cc.error( " cross-chain money sending using source private key " ) +
            cc.info( strPrivateKeyFrom ) + cc.error( " and destination private key " ) + cc.info( strPrivateKeyTo ) + " " +
            cc.warning( err.toString() ) + "\n" );
        await end_of_test( 64 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let g_contractERC20MN = null;
let g_contractERC20SC = null;
let g_contractERC721MN = null;
let g_contractERC721_with_metadata_MN = null;
let g_contractERC721SC = null;
let g_contractERC721_with_metadata_SC = null;
let g_contractERC1155MN = null;
let g_contractERC1155SC = null;
// const g_nCountERC721 = 10, g_nFirstTokenIdERC721 = 1, g_nFirstTokenIdERC1155 = 1, g_nCountERC1155 = 10;

function clean_test_tokens() {
    g_contractERC20MN = null;
    g_contractERC20SC = null;
    g_contractERC721MN = null;
    g_contractERC721_with_metadata_MN = null;
    g_contractERC721SC = null;
    g_contractERC721_with_metadata_SC = null;
    g_contractERC1155MN = null;
    g_contractERC1155SC = null;
    //
    g_joAbiTestTokensMN = null;
    g_joAbiTestTokensSC = null;
}

async function deploy_test_tokens_to( idxChain, strDeploymentNetworkName, strMintToAddress, isMint, isInit, optOut ) { // network name like "mn", "sc00", "sc01"
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Deploying " ) + cc.sunny( "Test Tokens" ) + cc.bright( " to " ) + cc.sunny( strDeploymentNetworkName ) +
                cc.bright( "..." ) + "\n\n" );
        }
        const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
        const nPreferredNodeIndex = 0;
        const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
        const strAddress = ( strMintToAddress || private_key_2_account_address( g_w3_main_net, g_strPrivateKeyImaMN ) );
        const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
        const joEnv = {
            "NO_ANSI_COLORS": ( g_bPlainColorMode ? "1" : "0" ),
            "ADDRESSES_MINT_TO": "" + strAddress,
            "TOKEN_MINTERS": "" + strAddress,
            "IS_SKIP_MINT": "" + ( isMint ? "" : "true" ),
            "MINT_AMOUNT_20": "100000000000",
            "MINT_AMOUNT_1155": "100000000000",
            "MINT_COUNT_721": "5",
            "MINT_COUNT_1155": "5",
            "FIRST_TOKEN_ID_721": "1",
            "FIRST_TOKEN_ID_1155": "1",
            "URL_W3_ETHEREUM": "" + g_strMainNetURL,
            "URL_W3_SCHAIN": "" + joNodeDesc.url,
            "URL_W3_NODE_00": "" + joNodeDesc.url,
            "CID_ETHEREUM": "" + cid_main_net,
            "CID_SC_00": "" + g_arrChains[idxChain].cid,
            "PRIVATE_KEY_FOR_ETHEREUM": "" + g_strPrivateKeyImaMN,
            "PRIVATE_KEY_FOR_SCHAIN": "" + g_strPrivateKeyImaSC
        };
        if( strDeploymentNetworkName == "sc00" ) {
            if( joEnv.TOKEN_MINTERS.length > 0 )
                joEnv.TOKEN_MINTERS += ",";
            joEnv.TOKEN_MINTERS +=
                "" + joImaAbiSC.token_manager_erc20_address +
                "," + joImaAbiSC.token_manager_erc721_address +
                "," + joImaAbiSC.token_manager_erc721_with_metadata_address +
                "," + joImaAbiSC.token_manager_erc1155_address
            ;
        }
        const isHH = true; // ( strDeploymentNetworkName === "mn" ) ? true : false;
        if( isHH ) {
            await exec_array_of_commands_safe( [
                "yarn install",
                "rm -rf ./build || true",
                "rm -f ./data/TestToken*.abi." + strDeploymentNetworkName + ".json || true",
                //
                "npx hardhat compile",
                "npx hardhat deploy --network " + strDeploymentNetworkName,
                //
                "ls -1 ./data"
            ], g_strFolderTestTokens, joEnv, 1 );
        } else {
            await exec_array_of_commands_safe( [
                "yarn install",
                "rm -rf ./build || true",
                "rm -f ./data/TestToken*.abi." + strDeploymentNetworkName + ".json || true",
                //
                "npx truffle compile",
                "npx truffle migrate --network=" + strDeploymentNetworkName,
                //
                "ls -1 ./data"
            ], g_strFolderTestTokens, joEnv, 1 );
        }
        if( strDeploymentNetworkName == "mn" ) {
            const strAbiPath = path.join( g_strFolderTestTokensData, "TestTokens.abi.mn.json" );
            const joABI = jsonFileLoad( strAbiPath, null, g_bVerbose );
            traverse_json( joABI, fix_ethers_js_abi_errors );
            if( isInit ) {
                if( g_joAbiTestTokensMN == null ) {
                    g_joAbiTestTokensMN = joABI;
                    //
                    if( g_bVerbose )
                        log.write( cc.debug( "Instantiating " ) + cc.info( "ERC20" ) + cc.debug( " smart contract..." ) + "\n" );
                    g_contractERC20MN = new g_w3_main_net.eth.Contract( g_joAbiTestTokensMN.ERC20_abi, g_joAbiTestTokensMN.ERC20_address );
                    if( g_bVerbose )
                        log.write( cc.success( "Done." ) + "\n" );
                    //
                    if( g_bVerbose )
                        log.write( cc.debug( "Instantiating " ) + cc.info( "ERC721" ) + cc.debug( " smart contract..." ) + "\n" );
                    g_contractERC721MN = new g_w3_main_net.eth.Contract( g_joAbiTestTokensMN.ERC721_abi, g_joAbiTestTokensMN.ERC721_address );
                    if( g_bVerbose )
                        log.write( cc.success( "Done." ) + "\n" );
                    //
                    if( g_bVerbose )
                        log.write( cc.debug( "Instantiating " ) + cc.info( "ERC721_with_metadata" ) + cc.debug( " smart contract..." ) + "\n" );
                    g_contractERC721_with_metadata_MN = new g_w3_main_net.eth.Contract( g_joAbiTestTokensMN.ERC721_with_metadata_abi, g_joAbiTestTokensMN.ERC721_with_metadata_address );
                    if( g_bVerbose )
                        log.write( cc.success( "Done." ) + "\n" );
                    //
                    if( g_bVerbose )
                        log.write( cc.debug( "Instantiating " ) + cc.info( "ERC1155" ) + cc.debug( " smart contract..." ) + "\n" );
                    g_contractERC1155MN = new g_w3_main_net.eth.Contract( g_joAbiTestTokensMN.ERC1155_abi, g_joAbiTestTokensMN.ERC1155_address );
                    if( g_bVerbose )
                        log.write( cc.success( "Done." ) + "\n" );
                    //
                    // await mintERC20( g_w3_main_net, cid_main_net, "Main net", g_contractERC20MN, g_strPrivateKeyImaMN, 1000000 );
                    // for( let idx721 = 0; idx721 < g_nCountERC721; ++ idx721 ) {
                    //     await mintERC721( g_w3_main_net, cid_main_net, "Main net", g_contractERC721MN, g_strPrivateKeyImaMN, g_nFirstTokenIdERC721 + idx721, null, false ); // without metadata
                    //     await mintERC721( g_w3_main_net, cid_main_net, "Main net", g_contractERC721_with_metadata_MN, g_strPrivateKeyImaMN, g_nFirstTokenIdERC721 + idx721, null, true ); // with metadata
                    // }
                    // for( let idx1155 = 0; idx1155 < g_nCountERC1155; ++ idx1155 )
                    //     await mintERC1155( g_w3_main_net, cid_main_net, "Main net", g_contractERC1155MN, g_strPrivateKeyImaMN, g_nFirstTokenIdERC1155 + idx1155, 1000000 );
                } // if( g_joAbiTestTokensMN == null )
            } // if( isInit )
            if( optOut ) {
                optOut.strAbiPath = strAbiPath;
                optOut.joABI = joABI;
            } // if( optOut )
        } // if( strDeploymentNetworkName == "mn" )
        if( strDeploymentNetworkName == "sc00" ) {
            const strAbiPath = path.join( g_strFolderTestTokensData, "TestTokens.abi.sc00.json" );
            const joABI = jsonFileLoad( strAbiPath, null, g_bVerbose );
            traverse_json( joABI, fix_ethers_js_abi_errors );
            if( isInit ) {
                if( g_joAbiTestTokensSC == null ) {
                    const nPreferredNodeIndex = 0;
                    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
                    const w3schain = getWeb3FromURL( joNodeDesc.url );
                    g_joAbiTestTokensSC = joABI;
                    //
                    if( g_bVerbose )
                        log.write( cc.debug( "Instantiating " ) + cc.info( "ERC20" ) + cc.debug( " smart contract..." ) + "\n" );
                    g_contractERC20SC = new w3schain.eth.Contract( g_joAbiTestTokensSC.ERC20_abi, g_joAbiTestTokensSC.ERC20_address );
                    if( g_bVerbose )
                        log.write( cc.success( "Done." ) + "\n" );
                    //
                    if( g_bVerbose )
                        log.write( cc.debug( "Instantiating " ) + cc.info( "ERC721" ) + cc.debug( " smart contract..." ) + "\n" );
                    g_contractERC721SC = new w3schain.eth.Contract( g_joAbiTestTokensSC.ERC721_abi, g_joAbiTestTokensSC.ERC721_address );
                    if( g_bVerbose )
                        log.write( cc.success( "Done." ) + "\n" );
                    //
                    if( g_bVerbose )
                        log.write( cc.debug( "Instantiating " ) + cc.info( "ERC721_with_metadata" ) + cc.debug( " smart contract..." ) + "\n" );
                    g_contractERC721_with_metadata_SC = new w3schain.eth.Contract( g_joAbiTestTokensSC.ERC721_with_metadata_abi, g_joAbiTestTokensSC.ERC721_with_metadata_address );
                    if( g_bVerbose )
                        log.write( cc.success( "Done." ) + "\n" );
                    //
                    if( g_bVerbose )
                        log.write( cc.debug( "Instantiating " ) + cc.info( "ERC1155" ) + cc.debug( " smart contract..." ) + "\n" );
                    g_contractERC1155SC = new w3schain.eth.Contract( g_joAbiTestTokensSC.ERC1155_abi, g_joAbiTestTokensSC.ERC1155_address );
                    if( g_bVerbose )
                        log.write( cc.success( "Done." ) + "\n" );
                    //
                    // await mintERC20( g_w3_main_net, cid_main_net, "Main net", g_contractERC20MN, g_strPrivateKeyImaSC, 1000000 );
                    // for( let idx721 = 0; idx721 < g_nCountERC721; ++ idx721 ) {
                    //     await mintERC721( g_w3_main_net, cid_main_net, "Main net", g_contractERC721MN, g_strPrivateKeyImaSC, g_nFirstTokenIdERC721 + idx721, null, false ); // without metadata
                    //     await mintERC721( g_w3_main_net, cid_main_net, "Main net", g_contractERC721_with_metadata_MN, g_strPrivateKeyImaSC, g_nFirstTokenIdERC721 + idx721, null, true ); // with metadata
                    // }
                    // for( let idx1155 = 0; idx1155 < g_nCountERC1155; ++ idx1155 )
                    //     await mintERC1155( g_w3_main_net, cid_main_net, "Main net", g_contractERC1155MN, g_strPrivateKeyImaSC, g_nFirstTokenIdERC1155 + idx1155, 1000000 );
                } // if( g_joAbiTestTokensSC == null )
                if( g_nTimeToSleepBeforeAddTokensByOwnerOnSChainMilliseconds > 0 ) {
                    log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepBeforeAddTokensByOwnerOnSChainMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
                    await sleep( g_nTimeToSleepBeforeAddTokensByOwnerOnSChainMilliseconds );
                    log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepBeforeAddTokensByOwnerOnSChainMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
                }
                const schain_name = g_arrChains[idxChain].name;
                await doAddERC20TokenByOwnerMN(
                    g_strPrivateKeyImaMN,
                    schain_name,
                    g_contractERC20MN.options.address
                );
                await doAddERC721TokenByOwnerMN(
                    g_strPrivateKeyImaMN,
                    schain_name,
                    g_contractERC721MN.options.address,
                    false // isWithMetadata721
                );
                await doAddERC721TokenByOwnerMN(
                    g_strPrivateKeyImaMN,
                    schain_name,
                    g_contractERC721_with_metadata_MN.options.address,
                    true // isWithMetadata721
                );
                await doAddERC1155TokenByOwnerMN(
                    g_strPrivateKeyImaMN,
                    schain_name,
                    g_contractERC1155MN.options.address
                );
                await doAddERC20TokenByOwnerSC(
                    idxChain,
                    g_strPrivateKeyImaSC,
                    g_strMainnetName,
                    g_contractERC20MN.options.address,
                    g_contractERC20SC.options.address
                );
                await doAddERC721TokenByOwnerSC(
                    idxChain,
                    g_strPrivateKeyImaSC,
                    g_strMainnetName,
                    g_contractERC721MN.options.address,
                    g_contractERC721SC.options.address,
                    false // isWithMetadata721
                );
                await doAddERC721TokenByOwnerSC(
                    idxChain,
                    g_strPrivateKeyImaSC,
                    g_strMainnetName,
                    g_contractERC721_with_metadata_MN.options.address,
                    g_contractERC721_with_metadata_SC.options.address,
                    true // isWithMetadata721
                );
                await doAddERC1155TokenByOwnerSC(
                    idxChain,
                    g_strPrivateKeyImaSC,
                    g_strMainnetName,
                    g_contractERC1155MN.options.address,
                    g_contractERC1155SC.options.address
                );
            } // if( isInit )
            if( optOut ) {
                optOut.strAbiPath = strAbiPath;
                optOut.joABI = joABI;
            } // if( optOut )
        } // if( strDeploymentNetworkName == "sc00" )
        if( g_bVerbose )
            log.write( cc.success( "Successful deployment of " ) + cc.sunny( "Test Tokens" ) + cc.success( " to " ) + cc.sunny( strDeploymentNetworkName ) + "\n" );
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) + cc.error( " deploying " ) + cc.info( "Test Tokens" ) + cc.error( " to " ) + cc.sunny( strDeploymentNetworkName ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 65 );
    }
}

async function enableAutomaticDeploy(
    idxChain,
    strTokenSuffix, // example "erc20"
    strPrivateKeyFrom,
    isEnableAutomaticDeploy
) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const strTokenSuffixLC = strTokenSuffix.toLowerCase();
    const strTokenSuffixUC = replaceAll( strTokenSuffix.toUpperCase(), "_WITH_METADATA", "_with_metadata" );
    if( isEnableAutomaticDeploy === null || isEnableAutomaticDeploy === undefined )
        isEnableAutomaticDeploy = true;
    else
        isEnableAutomaticDeploy = isEnableAutomaticDeploy ? true : false;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const nPreferredNodeIndex = 0;
    // const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    //
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    const strNameTokenManagerABI = "token_manager_" + strTokenSuffixLC + "_abi";
    const strNameTokenManagerAddress = "token_manager_" + strTokenSuffixLC + "_address";
    const joTokenManagerABI = joImaAbiSC[strNameTokenManagerABI];
    const strTokenManagerAddress = joImaAbiSC[strNameTokenManagerAddress];
    const contractTokenManager = new w3schain.eth.Contract( joTokenManagerABI, strTokenManagerAddress );
    //
    const strEnabling = isEnableAutomaticDeploy ? "Enabling" : "Disabling";
    log.write(
        cc.bright( strEnabling + " automatic deployment of " ) + cc.info( strTokenSuffixUC ) +
        cc.bright( " contract on S-Chain" ) +
        cc.bright( "..." ) + "\n" );
    const strContractMethodName = isEnableAutomaticDeploy ? "enableAutomaticDeploy" : "disableAutomaticDeploy";
    const methodWithArguments = contractTokenManager.methods[strContractMethodName]();
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( w3schain, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await w3schain.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const cid = g_arrChains[idxChain].cid;
    const rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractTokenManager.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await w3schain.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    const strEnabled = isEnableAutomaticDeploy ? "Enabled" : "Disabled";
    log.write(
        cc.success( "DONE, successfully " + strEnabled + " automatic deployment of " ) + cc.info( strTokenSuffixUC ) +
        cc.success( " contract on S-Chain" ) +
        cc.success( "." ) + "\n" );
}

async function enableWhitelist(
    strSChainName,
    strTokenSuffix, // example "erc20"
    strPrivateKeyFrom,
    isEnableWhitelist
) {
    const strTokenSuffixLC = strTokenSuffix.toLowerCase();
    const strTokenSuffixUC = replaceAll( strTokenSuffix.toUpperCase(), "_WITH_METADATA", "_with_metadata" );
    if( isEnableWhitelist === null || isEnableWhitelist === undefined )
        isEnableWhitelist = true;
    else
        isEnableWhitelist = isEnableWhitelist ? true : false;
    //
    const strNameDepositBoxABI = "deposit_box_" + strTokenSuffixLC + "_abi";
    const strNameDepositBoxAddress = "deposit_box_" + strTokenSuffixLC + "_address";
    const joDepositBoxABI = g_joImaAbiMN[strNameDepositBoxABI];
    const strDepositBoxAddress = g_joImaAbiMN[strNameDepositBoxAddress];
    const contractDepositBox = new g_w3_main_net.eth.Contract( joDepositBoxABI, strDepositBoxAddress );
    //
    const strEnabling = isEnableWhitelist ? "Enabling" : "Disabling";
    log.write(
        cc.bright( strEnabling + " white-listing of " ) + cc.info( strTokenSuffixUC ) +
        cc.bright( " contract on S-Chain" ) +
        cc.bright( "..." ) + "\n" );
    const strContractMethodName = isEnableWhitelist ? "enableWhitelist" : "disableWhitelist";
    const methodWithArguments = contractDepositBox.methods[strContractMethodName](
        strSChainName
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await g_w3_main_net.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const rawTx = {
        chainId: parseIntOrHex( cid_main_net ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractDepositBox.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await g_w3_main_net.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    const strEnabled = isEnableWhitelist ? "enabled" : "disabled";
    log.write(
        cc.success( "DONE, successfully " + strEnabled + " white-listing of " ) + cc.info( strTokenSuffixUC ) +
        cc.success( " contract on S-Chain" ) +
        cc.success( "." ) + "\n" );
}

async function doAddERC20TokenByOwnerMN( strPrivateKeyFrom, strSChainName, strContractAddressOnMainnet ) {
    log.write(
        cc.bright( "Adding/registering " ) + cc.info( "ERC20" ) +
        cc.bright( " contract on Main Net for " ) + cc.info( strSChainName ) +
        cc.bright( ". Main Net token address " ) + cc.warn( strContractAddressOnMainnet ) +
        cc.bright( "..." ) + "\n" );
    const contractDepositBoxErc20MN = new g_w3_main_net.eth.Contract( g_joImaAbiMN.deposit_box_erc20_abi, g_joImaAbiMN.deposit_box_erc20_address );
    const methodWithArguments = contractDepositBoxErc20MN.methods.addERC20TokenByOwner(
        // g_strMainnetName,
        strSChainName, strContractAddressOnMainnet // call params
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await g_w3_main_net.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const rawTx = {
        chainId: parseIntOrHex( cid_main_net ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractDepositBoxErc20MN.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await g_w3_main_net.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, successfully added/registered " ) + cc.info( "ERC20" ) +
        cc.success( " contract on Main Net for " ) + cc.info( strSChainName ) +
        cc.success( "." ) + "\n" );
}

async function doAddERC721TokenByOwnerMN( strPrivateKeyFrom, strSChainName, strContractAddressOnMainnet, isWithMetadata721 ) {
    const strERC721 = isWithMetadata721 ? "ERC721_with_metadata" : "ERC721";
    log.write(
        cc.bright( "Adding/registering " ) + cc.info( strERC721 ) +
        cc.bright( " contract on Main Net for " ) + cc.info( strSChainName ) +
        cc.bright( ". Main Net token address " ) + cc.warn( strContractAddressOnMainnet ) +
        cc.bright( "..." ) + "\n" );
    const contractDepositBoxErc721MN = new g_w3_main_net.eth.Contract(
        isWithMetadata721 ? g_joImaAbiMN.deposit_box_erc721_with_metadata_abi : g_joImaAbiMN.deposit_box_erc721_abi,
        isWithMetadata721 ? g_joImaAbiMN.deposit_box_erc721_with_metadata_address : g_joImaAbiMN.deposit_box_erc721_address
    );
    const methodWithArguments = contractDepositBoxErc721MN.methods.addERC721TokenByOwner(
        // g_strMainnetName,
        strSChainName, strContractAddressOnMainnet // call params
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await g_w3_main_net.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const rawTx = {
        chainId: parseIntOrHex( cid_main_net ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractDepositBoxErc721MN.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await g_w3_main_net.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, successfully added/registered " ) + cc.info( strERC721 ) +
        cc.success( " contract on Main Net for " ) + cc.info( strSChainName ) +
        cc.success( "." ) + "\n" );
}

async function doAddERC1155TokenByOwnerMN( strPrivateKeyFrom, strSChainName, strContractAddressOnMainnet ) {
    log.write(
        cc.bright( "Adding/registering " ) + cc.info( "ERC1155" ) +
        cc.bright( " contract on Main Net for " ) + cc.info( strSChainName ) +
        cc.bright( ". Main Net token address " ) + cc.warn( strContractAddressOnMainnet ) +
        cc.bright( "..." ) + "\n" );
    const contractDepositBoxErc1155MN = new g_w3_main_net.eth.Contract( g_joImaAbiMN.deposit_box_erc1155_abi, g_joImaAbiMN.deposit_box_erc1155_address );
    const methodWithArguments = contractDepositBoxErc1155MN.methods.addERC1155TokenByOwner(
        // g_strMainnetName,
        strSChainName, strContractAddressOnMainnet // call params
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await g_w3_main_net.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const rawTx = {
        chainId: parseIntOrHex( cid_main_net ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractDepositBoxErc1155MN.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await g_w3_main_net.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, successfully added/registered " ) + cc.info( "ERC1155" ) +
        cc.success( " contract on Main Net for " ) + cc.info( strSChainName ) +
        cc.success( "." ) + "\n" );
}

async function doAddERC20TokenByOwnerSC( idxChain, strPrivateKeyFrom, strOppositeChainName, strContractAddressOnMainnet, strContractAddressOnSchain ) {
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const nPreferredNodeIndex = 0;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    const contractTokenManagerErc20SC = new w3schain.eth.Contract( joImaAbiSC.token_manager_erc20_abi, joImaAbiSC.token_manager_erc20_address );
    log.write(
        cc.bright( "Adding/registering " ) + cc.info( "ERC20" ) +
        cc.bright( " contract on S-Chain for " ) + cc.info( strOppositeChainName ) +
        cc.bright( ". Owner chain" ) + cc.debug( "(such as Main Net)" ) + cc.bright( " token address " ) + cc.warn( strContractAddressOnMainnet ) +
        cc.bright( ". Pivot chain" ) + cc.debug( "(such as S-Chain)" ) + cc.bright( " token address " ) + cc.warn( strContractAddressOnSchain ) +
        cc.bright( "..." ) + "\n" );
    const methodWithArguments = contractTokenManagerErc20SC.methods.addERC20TokenByOwner(
        strOppositeChainName,
        strContractAddressOnMainnet, strContractAddressOnSchain // call params
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( w3schain, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await w3schain.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const cid = g_arrChains[idxChain].cid;
    const rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractTokenManagerErc20SC.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await w3schain.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, successfully added/registered " ) + cc.info( "ERC20" ) +
        cc.success( " contract on S-Chain for " ) + cc.info( strOppositeChainName ) +
        cc.success( "." ) + "\n" );
}

async function doAddERC721TokenByOwnerSC( idxChain, strPrivateKeyFrom, strOppositeChainName, strContractAddressOnMainnet, strContractAddressOnSchain, isWithMetadata721 ) {
    const strERC721 = isWithMetadata721 ? "ERC721_with_metadata" : "ERC721";
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const nPreferredNodeIndex = 0;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    const contractTokenManagerErc721SC = new w3schain.eth.Contract(
        isWithMetadata721 ? joImaAbiSC.token_manager_erc721_with_metadata_abi : joImaAbiSC.token_manager_erc721_abi,
        isWithMetadata721 ? joImaAbiSC.token_manager_erc721_with_metadata_address : joImaAbiSC.token_manager_erc721_address
    );
    //
    log.write(
        cc.bright( "Adding/registering " ) + cc.info( strERC721 ) +
        cc.bright( " contract on S-Chain for " ) + cc.info( strOppositeChainName ) +
        cc.bright( ". Main Net token address " ) + cc.warn( strContractAddressOnMainnet ) +
        cc.bright( ". S-Chain token address " ) + cc.warn( strContractAddressOnSchain ) +
        cc.bright( "..." ) + "\n" );
    const methodWithArguments = contractTokenManagerErc721SC.methods.addERC721TokenByOwner(
        strOppositeChainName,
        strContractAddressOnMainnet, strContractAddressOnSchain // call params
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( w3schain, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await w3schain.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const cid = g_arrChains[idxChain].cid;
    const rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractTokenManagerErc721SC.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await w3schain.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, successfully added/registered " ) + cc.info( strERC721 ) +
        cc.success( " contract on S-Chain for " ) + cc.info( strOppositeChainName ) +
        cc.success( "." ) + "\n" );
}

async function doAddERC1155TokenByOwnerSC( idxChain, strPrivateKeyFrom, strOppositeChainName, strContractAddressOnMainnet, strContractAddressOnSchain ) {
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const nPreferredNodeIndex = 0;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    const contractTokenManagerErc1155SC = new w3schain.eth.Contract( joImaAbiSC.token_manager_erc1155_abi, joImaAbiSC.token_manager_erc1155_address );
    //
    log.write(
        cc.bright( "Adding/registering " ) + cc.info( "ERC1155" ) +
        cc.bright( " contract on S-Chain for " ) + cc.info( strOppositeChainName ) +
        cc.bright( ". Main Net token address " ) + cc.warn( strContractAddressOnMainnet ) +
        cc.bright( ". S-Chain token address " ) + cc.warn( strContractAddressOnSchain ) +
        cc.bright( "..." ) + "\n" );
    const methodWithArguments = contractTokenManagerErc1155SC.methods.addERC1155TokenByOwner(
        strOppositeChainName,
        strContractAddressOnMainnet, strContractAddressOnSchain // call params
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    log.write( cc.debug( "Using " ) + cc.info( "private key" ) + " " + cc.warn( strPrivateKeyFrom ) + "\n" );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( w3schain, strPrivateKeyFrom ) );
    log.write( cc.debug( "Using " ) + cc.info( "address" ) + " " + cc.warn( strAddressFrom ) + "\n" );
    const tcnt = await w3schain.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const cid = g_arrChains[idxChain].cid;
    const rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractTokenManagerErc1155SC.options.address,
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await w3schain.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, successfully added/registered " ) + cc.info( "ERC1155" ) +
        cc.success( " contract on S-Chain for " ) + cc.info( strOppositeChainName ) +
        cc.success( "." ) + "\n" );
}

async function mintERC20( w3, cid, chainName, contractERC20, strPrivateKeyFrom, amount, strAddressTo ) {
    amount = ( amount == null || amount == undefined ) ? 100 : parseInt( amount );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( w3, strPrivateKeyFrom ) );
    if( strAddressTo == null || strAddressTo == undefined || ( !strAddressTo ) )
        strAddressTo = "" + strAddressFrom;
    log.write( cc.debug( "Minting " ) + cc.info( "ERC20" ) + cc.debug( " amount " ) + cc.info( amount ) + cc.debug( " to " ) + cc.note( strAddressTo ) + cc.debug( " on chain " ) + cc.sunny( chainName ) + cc.debug( "..." ) + "\n" );
    const methodWithArguments = contractERC20.methods.mint(
        strAddressTo,
        "0x" + w3.utils.toBN( amount ).toString( 16 )
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    const tcnt = await w3.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractERC20.options.address, // contract address
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await w3.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write( cc.success( "DONE, successfully mint " ) + cc.info( "ERC20" ) + cc.success( " amount " ) + cc.info( amount ) + cc.debug( " to " ) + cc.note( strAddressTo ) + cc.debug( " on chain " ) + cc.sunny( chainName ) + cc.success( "." ) + "\n" );
}
//_with_metadata_ // isWithMetadata721
async function mintERC721( w3, cid, chainName, contractERC721, strPrivateKeyFrom, tokenID, strAddressTo, isWithMetadata721 ) {
    const strERC721 = isWithMetadata721 ? "ERC721_with_metadata" : "ERC721";
    tokenID = ( tokenID == null || tokenID == undefined ) ? 1 : parseInt( tokenID );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( w3, strPrivateKeyFrom ) );
    if( strAddressTo == null || strAddressTo == undefined || ( !strAddressTo ) )
        strAddressTo = "" + strAddressFrom;
    log.write( cc.debug( "Minting " ) + cc.info( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenID ) + cc.debug( " to " ) + cc.note( strAddressTo ) + cc.debug( " on chain " ) + cc.sunny( chainName ) + cc.debug( "..." ) + "\n" );
    let methodWithArguments = contractERC721.methods.mint(
        strAddressTo,
        "0x" + w3.utils.toBN( tokenID ).toString( 16 )
    );
    let dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    let gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    let tcnt = await w3.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    let rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractERC721.options.address, // contract address
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    let tx = new ethereumjs_tx( rawTx );
    let key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    let serializedTx = tx.serialize();
    let strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    let joReceipt = await w3.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, successfully mint " ) + cc.info( strERC721 ) + cc.success( " token ID " ) + cc.info( tokenID ) +
        cc.debug( " to " ) + cc.note( strAddressTo ) + cc.debug( " on chain " ) + cc.sunny( chainName ) + cc.success( "." ) +
        "\n" );
    if( ! isWithMetadata721 )
        return;
    const tURI =
        "https://test.token_" + contractERC721.options.address + "_id_" + tokenID +
        "_uri.com/data/images/image_" + tokenID + ".png";
    log.write(
        cc.debug( "Setting token URI " ) + cc.u( tURI ) + cc.debug( " for " ) + cc.info( strERC721 ) +
        cc.debug( " token ID " ) + cc.info( tokenID ) + cc.debug( " on chain " ) + cc.sunny( chainName ) +
        cc.debug( "..." ) + "\n" );
    methodWithArguments = contractERC721.methods.setTokenURI(
        "0x" + w3.utils.toBN( tokenID ).toString( 16 ),
        tURI
    );
    dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    tcnt = await w3.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractERC721.options.address, // contract address
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    tx = new ethereumjs_tx( rawTx );
    key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    serializedTx = tx.serialize();
    strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    joReceipt = await w3.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write(
        cc.success( "DONE, successfully set token URI " ) + cc.u( tURI ) + cc.debug( " for " ) +
        cc.info( strERC721 ) + cc.success( " token ID " ) + cc.info( tokenID ) +
        cc.debug( " on chain " ) + cc.sunny( chainName ) + cc.success( "." ) +
        "\n" );
}

async function mintERC1155( w3, cid, chainName, contractERC1155, strPrivateKeyFrom, tokenID, amount, strAddressTo ) {
    tokenID = ( tokenID == null || tokenID == undefined ) ? 1 : parseInt( tokenID );
    amount = ( amount == null || amount == undefined ) ? 100 : parseInt( amount );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( w3, strPrivateKeyFrom ) );
    if( strAddressTo == null || strAddressTo == undefined || ( !strAddressTo ) )
        strAddressTo = "" + strAddressFrom;
    log.write( cc.debug( "Minting " ) + cc.info( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenID ) + cc.debug( " amount " ) + cc.info( amount ) + cc.debug( " to " ) + cc.note( strAddressTo ) + cc.debug( " on chain " ) + cc.sunny( chainName ) + cc.debug( "..." ) + "\n" );
    const methodWithArguments = contractERC1155.methods.mint(
        strAddressTo,
        "0x" + w3.utils.toBN( tokenID ).toString( 16 ),
        "0x" + w3.utils.toBN( amount ).toString( 16 ),
        [] // data
    );
    const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
    const gasPrice = 10000000000;
    log.write( cc.debug( "Using " ) + cc.info( "gasPrice" ) + cc.debug( "=" ) + cc.notice( gasPrice ) + "\n" );
    const tcnt = await w3.eth.getTransactionCount( strAddressFrom, null );
    log.write( cc.debug( "Got " ) + cc.info( tcnt ) + cc.debug( " as current transaction count" ) + "\n" );
    const rawTx = {
        chainId: parseIntOrHex( cid ),
        nonce: tcnt,
        gasPrice: gasPrice,
        gasLimit: 3000000,
        to: contractERC1155.options.address, // contract address
        data: dataTx
    };
    log.write( cc.debug( "....composed " ) + cc.j( rawTx ) + "\n" );
    const tx = new ethereumjs_tx( rawTx );
    const key = Buffer.from( strPrivateKeyFrom, "hex" );
    tx.sign( key );
    const serializedTx = tx.serialize();
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    log.write( cc.debug( "....signed raw TX is " ) + cc.attention( strTX ) + "\n" );
    const joReceipt = await w3.eth.sendSignedTransaction( "0x" + serializedTx.toString( "hex" ) );
    log.write( cc.success( "Result receipt: " ) + cc.j( joReceipt ) + "\n" );
    log.write( cc.success( "DONE, successfully mint " ) + cc.info( "ERC1155" ) + cc.success( " token ID " ) + cc.info( tokenID ) + cc.debug( " amount " ) + cc.info( amount ) + cc.debug( " to " ) + cc.note( strAddressTo ) + cc.debug( " on chain " ) + cc.sunny( chainName ) + cc.success( "." ) + "\n" );
}

function generate_dynamic_abi(
    strTokenSuffix, // example "erc20", "erc721", "erc721_with_metadata", "erc1155"
    addressDynamicToken
) {
    // const strTokenSuffixLC = strTokenSuffix.toLowerCase();
    const strTokenSuffixUC = replaceAll( strTokenSuffix.toUpperCase(), "_WITH_METADATA", "_with_metadata" );
    const strAbiNamesTokenSuffixUC = replaceAll( strTokenSuffixUC, "_with_metadata", "" );
    const strPathMN = path.join( g_strFolderTestTokensData, "TestToken." + strTokenSuffixUC + ".abi.mn.json" );
    const strPathSC = path.join( g_strFolderTestTokensData, "TestToken." + strTokenSuffixUC + ".abi.sc00.json" );
    const joABI_mn = jsonFileLoad( strPathMN, null, g_bVerbose );
    traverse_json( joABI_mn, fix_ethers_js_abi_errors );
    // quick_spawn( "cp \"" + strPathMN + "\" \"" + strPathSC + "\"" );
    const joABI = {};
    joABI[strAbiNamesTokenSuffixUC + "OnChain_address"] = addressDynamicToken;
    joABI[strAbiNamesTokenSuffixUC + "OnChain_abi"] = joABI_mn[strTokenSuffixUC + "_abi"];
    jsonFileSave( strPathSC, joABI, g_bVerbose );
    return joABI;
}

function capitalizeFirstLetter( s ) {
    return s.charAt( 0 ).toUpperCase() + s.slice( 1 );
}

async function wait_for_cloned_token_to_appear(
    idxChain,
    strTokenSuffix, // example "erc20"
    addressCallFrom,
    cntAttempts,
    nPreferredNodeIndex,
    strOppositeChainName, // g_strMainnetName in case of M->S, source S-Chain name in case of S->S
    strSourceTokenContractAddress // g_joAbiTestTokensMN[strTokenSuffixUC + "_address"] in case of M->S
) {
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const strTokenSuffixLC = strTokenSuffix.toLowerCase();
    const strTokenSuffixUC = replaceAll( strTokenSuffix.toUpperCase(), "_WITH_METADATA", "_with_metadata" );
    const strTokenSuffixCap = replaceAll( capitalizeFirstLetter( strTokenSuffixLC ), "_with_metadata", "" );
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    const contractTokenManager = new w3schain.eth.Contract(
        joImaAbiSC["token_manager_" + strTokenSuffixLC + "_abi"],
        joImaAbiSC["token_manager_" + strTokenSuffixLC + "_address"] );
    for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
        try {
            log.write(
                cc.debug( "Discovering" ) + " " + cc.sunny( "auto instantiated" ) + " " + cc.bright( strTokenSuffixUC ) +
                cc.debug( " on " ) + cc.sunny( "S-Chain" ) + " " + cc.attention( g_arrChains[idxChain].name ) +
                cc.debug( " token, source chain name is " ) + cc.attention( strOppositeChainName ) +
                cc.debug( ", source token contract address is " ) + cc.attention( strSourceTokenContractAddress ) +
                cc.debug( ", destination chain URL is " ) + cc.u( joNodeDesc.url ) +
                cc.debug( ", destination " ) + cc.info( "TokenManager" + strTokenSuffixUC ) +
                cc.debug( " contract address is " ) + cc.attention( contractTokenManager.options.address ) +
                cc.debug( ", step " ) + cc.info( idxAttempt ) + cc.debug( " of " ) + cc.info( cntAttempts ) +
                cc.debug( "..." ) + "\n" );
            if( g_nTimeToSleepStopWaitForClonedTokenToAppearMilliseconds > 0 ) {
                log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepStopWaitForClonedTokenToAppearMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
                await sleep( g_nTimeToSleepStopWaitForClonedTokenToAppearMilliseconds );
                log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepStopWaitForClonedTokenToAppearMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
            }
            const address_on_s_chain = await contractTokenManager.methods["clones" + capitalizeFirstLetter( strTokenSuffixCap )](
                g_w3mod.utils.soliditySha3( strOppositeChainName ), // g_strMainnetName in case of M->S, source S-Chain name in case of S->S
                strSourceTokenContractAddress // g_joAbiTestTokensMN[strTokenSuffixUC + "_address"] in case of M->S
            ).call( { from: addressCallFrom } );
            if( address_on_s_chain != "0x0000000000000000000000000000000000000000" ) {
                log.write(
                    cc.success( "Done, successfully discovered " ) +
                    cc.sunny( "auto instantiated" ) + " " + cc.bright( strTokenSuffixUC ) +
                    cc.success( " token on " ) + cc.sunny( "S-Chain" ) + " " + cc.attention( g_arrChains[idxChain].name ) +
                    cc.success( " at address " ) + cc.info( address_on_s_chain ) +
                    cc.success( ", source chain name is " ) + cc.attention( strOppositeChainName ) +
                    cc.success( ", source token contract address is " ) + cc.attention( strSourceTokenContractAddress ) +
                    cc.success( ", destination chain URL is " ) + cc.u( joNodeDesc.url ) +
                    cc.success( ", destination " ) + cc.info( "TokenManager" + strTokenSuffixUC ) +
                    cc.success( " contract address is " ) + cc.attention( contractTokenManager.options.address ) +
                    cc.success( "." ) + "\n" );
                return address_on_s_chain;
            }
        } catch ( err ) {
            log.write(
                cc.fatal( "FAILED:" ) + cc.error( " attempt " ) + cc.warning( idxAttempt + 1 ) +
                cc.error( " of " ) + cc.warning( cntAttempts ) +
                cc.error( " to discover " ) + cc.sunny( "auto instantiated" ) + " " + cc.bright( strTokenSuffixUC ) +
                cc.error( " token on " ) + cc.sunny( "S-Chain" ) + " " + cc.attention( g_arrChains[idxChain].name ) +
                cc.error( ", source chain name is " ) + cc.attention( strOppositeChainName ) +
                cc.error( ", source token contract address is " ) + cc.attention( strSourceTokenContractAddress ) +
                cc.error( ", destination chain URL is " ) + cc.u( joNodeDesc.url ) +
                cc.error( ", destination " ) + cc.info( "TokenManager" + strTokenSuffixUC ) +
                cc.error( " contract address is " ) + cc.attention( contractTokenManager.options.address ) +
                cc.error( ", error is: " ) + cc.warning( err.toString() ) +
                "\n" );
        }
    }
    log.write(
        cc.fatal( "CRITICAL ERROR:" ) + cc.error( " failed all " ) + cc.warning( cntAttempts ) + cc.error( " attempt(s) to discover " ) +
        cc.sunny( "auto instantiated" ) + " " + cc.bright( strTokenSuffixUC ) + cc.error( " token on " ) +
        cc.sunny( "S-Chain" ) + " " + cc.attention( g_arrChains[idxChain].name ) + cc.error( ", timed out" ) +
        "\n" );
    return null;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_send_erc20_mn2sc( idxChain, strPrivateKeyFrom, strPrivateKeyTo, amount, nPreferredNodeIndex ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const amountToSend = ( amount == null || amount == undefined ) ? 100 : parseInt( amount );
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyTo ) );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Sending " ) + cc.info( amountToSend ) + cc.bright( " of " ) + cc.sunny( "ERC20" ) +
                cc.bright( " from " ) + cc.sunny( "Main Net" ) + cc.bright( " account " ) + cc.info( strAddressFrom ) +
                cc.bright( " to " ) + cc.sunny( "S-Chain" ) + cc.bright( " account " ) + cc.info( strAddressTo ) +
                cc.bright( "..." ) + "\n\n" );
        }
        log.write( cc.debug( "ERC20 token on Main Met:" ) + cc.info( g_contractERC20MN ? g_contractERC20MN.options.address : "<null>" ) + "\n" );
        log.write( cc.debug( "ERC20 token on S-Chain:" ) + cc.info( g_contractERC20SC ? g_contractERC20SC.options.address : "<null>" ) + "\n" );
        //
        log.write( cc.debug( "Using S-Chain URL " ) + cc.u( joNodeDesc.url ) + "\n" );
        const blockNumberSC = await w3schain.eth.getBlockNumber();
        log.write( cc.debug( "Block number on S-Chain is " ) + cc.info( blockNumberSC ) + "\n" );
        const blockNumberMN = await g_w3_main_net.eth.getBlockNumber();
        log.write( cc.debug( "Block number on Main Net is " ) + cc.info( blockNumberMN ) + "\n" );
        //
        const balanceMN_before = await g_contractERC20MN.methods.balanceOf( strAddressFrom ).call( { from: strAddressFrom } );
        log.write( cc.sunny( "ERC20" ) + cc.debug( " balance of " ) + cc.info( strAddressFrom ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " is " ) + cc.bright( balanceMN_before ) + "\n" );
        const balanceSC_before = g_contractERC20SC ? ( await g_contractERC20SC.methods.balanceOf( strAddressTo ).call( { from: strAddressTo } ) ) : 0;
        log.write( cc.sunny( "ERC20" ) + cc.debug( " balance of " ) + cc.info( strAddressTo ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " is " ) + cc.bright( balanceSC_before ) + "\n" );
        //
        // const strPrivateKeyMN = strPrivateKeyFrom;
        // const strPrivateKeySC = strPrivateKeyTo;
        const joEnv = { };
        const nNodeIndex = 0;
        await exec_array_of_commands_safe( [
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --m2s-payment" +
            " --amount=" + amountToSend +
            " --value=60finney" + // additional cost
            " --url-main-net=" + g_strMainNetURL +
            " --url-s-chain=" + joNodeDesc.url +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            // " --key-main-net=" + strPrivateKeyMN +
            // " --key-s-chain=" + strPrivateKeySC +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) + // compose_ima_cli_account_options( idxChain, nNodeIndex ) +
            " --erc20-main-net=" + path.join( g_strFolderTestTokensData, "TestToken.ERC20.abi.mn.json" ) +
            " --erc20-s-chain=" + path.join( g_strFolderTestTokensData, "TestToken.ERC20.abi.sc00.json" )
        ], g_strFolderImaAgent, joEnv, 1 );
        //
        const cntAttempts = 0 + g_nCntAttempts;
        if( g_contractERC20SC == null ) {
            log.write( cc.debug( "Waiting for " ) + cc.sunny( "ERC20" ) + cc.debug( " instantiation on " ) + cc.sunny( "S-Chain" ) + cc.debug( "..." ) + "\n" );
            await wait_for_cloned_token_to_appear( idxChain, "erc20",
                strAddressTo, cntAttempts, nPreferredNodeIndex, g_strMainnetName, g_joAbiTestTokensMN.ERC20_address );
            const contractTokenManagerErc20SC = new w3schain.eth.Contract( joImaAbiSC.token_manager_erc20_abi, joImaAbiSC.token_manager_erc20_address );
            const erc20_address_on_s_chain =
                await contractTokenManagerErc20SC.methods.clonesErc20(
                    g_w3mod.utils.soliditySha3( g_strMainnetName ),
                    g_joAbiTestTokensMN.ERC20_address
                ).call( { from: strAddressTo } );
            log.write( cc.debug( "ERC20_address_on_s_chain is:" ) + cc.info( erc20_address_on_s_chain ) + "\n" );
            log.write( cc.debug( "Found " ) + cc.sunny( "ERC20" ) + cc.debug( " instantiated on " ) + cc.sunny( "S-Chain" ) + cc.debug( " at address " ) + cc.info( erc20_address_on_s_chain ) + "\n" );
            const joABI = generate_dynamic_abi( "erc20", erc20_address_on_s_chain );
            g_contractERC20SC = new w3schain.eth.Contract( joABI.ERC20OnChain_abi, joABI.ERC20OnChain_address );
            if( ! g_contractERC20SC )
                throw new Error( "failed to find instantiated ERC20 token on S-Chain" );
        }
        const fnAsyncGetBallanceFrom = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const balance = await g_contractERC20MN.methods.balanceOf( strAddressFrom ).call( { from: strAddressFrom } );
                    return balance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net ERC20 " ) + cc.info( g_contractERC20MN.options.address ) +
                        cc.error( " balance of " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch Main Net ERC20 balance of \"" + strAddressTo + "\"" );
        };
        const fnAsyncGetBallanceTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const balance = await g_contractERC20SC.methods.balanceOf( strAddressTo ).call( { from: strAddressTo } );
                    return balance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch S-Chain ERC20 " ) + cc.info( g_contractERC20SC.options.address ) +
                        cc.error( " balance of " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch S-Chain ERC20 balance of \"" + strAddressTo + "\"" );
        };
        //
        const balanceMN_after = await fnAsyncGetBallanceFrom();
        log.write( cc.sunny( "ERC20" ) + cc.debug( " balance of " ) + cc.info( strAddressFrom ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " is " ) + cc.bright( balanceMN_after ) + "\n" );
        if( balanceMN_before == balanceMN_after )
            throw new Error( "ERC20 source token balance was not changed" );
        balanceSC_after = await fnAsyncGetBallanceTo();
        log.write( cc.sunny( "ERC20" ) + cc.debug( " balance of " ) + cc.info( strAddressTo ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " is " ) + cc.bright( balanceSC_after ) + "\n" );
        //
        if( balanceSC_before == balanceSC_after ) {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                log.write( cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + "\n" );
                balanceSC_after = await fnAsyncGetBallanceTo();
                if( balanceSC_before != balanceSC_after )
                    break;
                await sleep( 1000 );
            }
            if( balanceSC_before == balanceSC_after )
                throw new Error( "ERC20 destination token balance was not changed on S-Chain" );
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully sent " ) + cc.info( amountToSend ) + cc.success( " of " ) + cc.sunny( "ERC20" ) +
                cc.success( " from " ) + cc.sunny( "Main Net" ) + cc.success( " account " ) + cc.info( strAddressFrom ) +
                cc.success( " to " ) + cc.sunny( "S-Chain" ) + cc.success( " account " ) + cc.info( strAddressTo ) + cc.success( "." ) +
                "\n" );
        }
        log.write( cc.debug( "finally ERC20 token on mainnet:" ) + cc.info( g_contractERC20MN.options.address ) + "\n" );
        log.write( cc.debug( "finally erc20_address_on_s_chain is:" ) + cc.info( g_contractERC20SC ? g_contractERC20SC.options.address : null ) + "\n" );
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) +
            cc.error( " to send " ) + cc.info( amountToSend ) + cc.error( " of " ) + cc.sunny( "ERC20" ) +
            cc.error( " from " ) + cc.sunny( "Main Net" ) + cc.error( " account " ) + cc.info( strAddressFrom ) +
            cc.error( " to " ) + cc.sunny( "S-Chain" ) + cc.error( " account " ) + cc.info( strAddressTo ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        await end_of_test( 66 );
    }
}

async function ima_send_erc20_sc2mn( idxChain, strPrivateKeyFrom, strPrivateKeyTo, amount, nPreferredNodeIndex ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const amountToSend = ( amount == null || amount == undefined ) ? 100 : parseInt( amount );
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyTo ) );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Sending " ) + cc.info( amountToSend ) + cc.bright( " of " ) + cc.sunny( "ERC20" ) +
                cc.bright( " from " ) + cc.sunny( "S-Chain" ) + cc.bright( " account " ) + cc.info( strAddressFrom ) +
                cc.bright( " to " ) + cc.sunny( "Main Net" ) + cc.bright( " account " ) + cc.info( strAddressTo ) +
                cc.bright( "..." ) + "\n\n" );
        }
        if( g_contractERC20SC == null ) {
            const contractTokenManagerErc20SC = new w3schain.eth.Contract( joImaAbiSC.token_manager_erc20_abi, joImaAbiSC.token_manager_erc20_address );
            const erc20_address_on_s_chain =
                await contractTokenManagerErc20SC.methods.clonesErc20(
                    g_w3mod.utils.soliditySha3( g_strMainnetName ),
                    g_joAbiTestTokensMN.ERC20_address
                ).call( { from: strAddressTo } );
            log.write( cc.debug( "ERC20_address_on_s_chain is:" + cc.info( erc20_address_on_s_chain ) ) + "\n" );
            log.write( cc.debug( "Found " ) + cc.sunny( "ERC20" ) + cc.debug( " instantiated on " ) + cc.sunny( "S-Chain" ) + cc.debug( " at address " ) + cc.info( erc20_address_on_s_chain ) + "\n" );
            const joABI = generate_dynamic_abi( "erc20", erc20_address_on_s_chain );
            g_contractERC20SC = new w3schain.eth.Contract( joABI.ERC20OnChain_abi, joABI.ERC20OnChain_address );
            if( ! g_contractERC20SC )
                throw new Error( "failed to find instantiated ERC20 token on S-Chain" );
        } else {
            log.write( cc.debug( "existing ERC20 token on mainnet:" ) + cc.info( g_contractERC20MN.options.address ) + "\n" );
            log.write( cc.debug( "existing erc20_address_on_s_chain is:" ) + cc.info( g_contractERC20SC.options.address ) + "\n" );
        }
        log.write( cc.debug( "ERC20 token on Main Met:" ) + cc.info( g_contractERC20MN ? g_contractERC20MN.options.address : "<null>" ) + "\n" );
        log.write( cc.debug( "ERC20 token on S-Chain:" ) + cc.info( g_contractERC20SC ? g_contractERC20SC.options.address : "<null>" ) + "\n" );
        //
        log.write( cc.debug( "Using S-Chain URL " ) + cc.u( joNodeDesc.url ) + "\n" );
        const blockNumberSC = await w3schain.eth.getBlockNumber();
        log.write( cc.debug( "Block number on S-Chain is " ) + cc.info( blockNumberSC ) + "\n" );
        const blockNumberMN = await g_w3_main_net.eth.getBlockNumber();
        log.write( cc.debug( "Block number on Main Net is " ) + cc.info( blockNumberMN ) + "\n" );
        //
        const balanceMN_before = await g_contractERC20MN.methods.balanceOf( strAddressTo ).call( { from: strAddressTo } );
        log.write( cc.sunny( "ERC20" ) + cc.debug( " balance of " ) + cc.info( strAddressTo ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " is " ) + cc.bright( balanceMN_before ) + "\n" );
        const balanceSC_before = g_contractERC20SC ? ( await g_contractERC20SC.methods.balanceOf( strAddressFrom ).call( { from: strAddressFrom } ) ) : 0;
        log.write( cc.sunny( "ERC20" ) + cc.debug( " balance of " ) + cc.info( strAddressFrom ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " is " ) + cc.bright( balanceSC_before ) + "\n" );
        //
        // const strPrivateKeyMN = strPrivateKeyTo;
        // const strPrivateKeySC = strPrivateKeyFrom;
        const joEnv = { };
        const nNodeIndex = 0;
        await exec_array_of_commands_safe( [
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --s2m-payment" +
            " --amount=" + amountToSend +
            " --value=60finney" + // additional cost
            " --sleep-between-tx=5000" +
            " --url-main-net=" + g_strMainNetURL +
            " --url-s-chain=" + joNodeDesc.url +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            // " --key-main-net=" + strPrivateKeyMN +
            // " --key-s-chain=" + strPrivateKeySC +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) + // compose_ima_cli_account_options( idxChain, nNodeIndex ) +
            " --erc20-main-net=" + path.join( g_strFolderTestTokensData, "TestToken.ERC20.abi.mn.json" ) +
            " --erc20-s-chain=" + path.join( g_strFolderTestTokensData, "TestToken.ERC20.abi.sc00.json" )
        ], g_strFolderImaAgent, joEnv, 1 );
        //
        const cntAttempts = 0 + g_nCntAttempts;
        const fnAsyncGetBallanceFrom = async function() {
            if( ! g_contractERC20SC )
                throw new Error( "Missing S-Chain ERC20 token instantiation" );
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const balance = await g_contractERC20SC.methods.balanceOf( strAddressFrom ).call( { from: strAddressFrom } );
                    return balance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch S-Chain ERC20 " ) + cc.info( g_contractERC20SC.options.address ) +
                        cc.error( " balance of " ) + cc.info( strAddressFrom ) + cc.error( ": " ) +
                        cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch S-Chain ERC20 balance of \"" + strAddressTo + "\"" );
        };
        const fnAsyncGetBallanceTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const balance = await g_contractERC20MN.methods.balanceOf( strAddressTo ).call( { from: strAddressTo } );
                    return balance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net ERC20 " ) + cc.info( g_contractERC20MN.options.address ) +
                        cc.error( " balance of " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch Main Net ERC20 balance of \"" + strAddressTo + "\"" );
        };
        //
        //
        const balanceSC_after = await fnAsyncGetBallanceFrom();
        log.write( cc.sunny( "ERC20" ) + cc.debug( " balance of " ) + cc.info( strAddressFrom ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " is " ) + cc.bright( balanceSC_after ) + "\n" );
        if( balanceSC_before == balanceSC_after )
            throw new Error( "ERC20 source token balance was not changed" );
        let balanceMN_after = await fnAsyncGetBallanceTo();
        log.write( cc.sunny( "ERC20" ) + cc.debug( " balance of " ) + cc.info( strAddressTo ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " is " ) + cc.bright( balanceMN_after ) + "\n" );
        if( balanceMN_before == balanceMN_after ) {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                log.write( cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + "\n" );
                balanceMN_after = await fnAsyncGetBallanceTo();
                if( balanceMN_before != balanceMN_after )
                    break;
                await sleep( 1000 );
            }
            if( balanceMN_before == balanceMN_after )
                throw new Error( "ERC20 destination token balance was not changed on Main Net" );
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully sent " ) + cc.info( amountToSend ) + cc.success( " of " ) + cc.sunny( "ERC20" ) +
                cc.success( " from " ) + cc.sunny( "S-Chain" ) + cc.success( " account " ) + cc.info( strAddressFrom ) +
                cc.success( " to " ) + cc.sunny( "Main Net" ) + cc.success( " account " ) + cc.info( strAddressTo ) + cc.success( "." ) +
                "\n" );
        }
        log.write( cc.debug( "finally ERC20 token on mainnet:" ) + cc.info( g_contractERC20MN.options.address ) + "\n" );
        log.write( cc.debug( "finally erc20_address_on_s_chain is:" ) + cc.info( g_contractERC20SC ? g_contractERC20SC.options.address : 0 ) + "\n" );
    } catch ( err ) {
        log.write( cc.fatal( "ERROR:" ) + " " + cc.j( err ) + "\n" );
        log.write(
            cc.fatal( "FAILED:" ) +
            cc.error( " to send " ) + cc.info( amountToSend ) + cc.error( " of " ) + cc.sunny( "ERC20" ) +
            cc.error( " from " ) + cc.sunny( "S-Chain" ) + cc.error( " account " ) + cc.info( strAddressFrom ) +
            cc.error( " to " ) + cc.sunny( "Main Net" ) + cc.error( " account " ) + cc.info( strAddressTo ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        await end_of_test( 67 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_send_erc721_mn2sc( idxChain, strPrivateKeyFrom, strPrivateKeyTo, tokenID, nPreferredNodeIndex, isWithMetadata721 ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const strERC721 = isWithMetadata721 ? "ERC721_with_metadata" : "ERC721";
    const strerc721 = isWithMetadata721 ? "erc721_with_metadata" : "erc721";
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const tokenIdToSend = ( tokenID == null || tokenID == undefined ) ? 100 : parseInt( tokenID );
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyTo ) );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    const contractERC721MN = isWithMetadata721 ? g_contractERC721_with_metadata_MN : g_contractERC721MN;
    let contractERC721SC = isWithMetadata721 ? g_contractERC721_with_metadata_SC : g_contractERC721SC;
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Sending " ) + cc.info( tokenIdToSend ) + cc.bright( " of " ) + cc.sunny( strERC721 ) +
                cc.bright( " from " ) + cc.sunny( "Main Net" ) + cc.bright( " account " ) + cc.info( strAddressFrom ) +
                cc.bright( " to " ) + cc.sunny( "S-Chain" ) + cc.bright( " account " ) + cc.info( strAddressTo ) +
                cc.bright( "..." ) + "\n\n" );
        }
        log.write( cc.debug( strERC721 + " token on Main Met:" ) + cc.info( contractERC721MN ? contractERC721MN.options.address : "<null>" ) + "\n" );
        log.write( cc.debug( strERC721 + " token on S-Chain:" ) + cc.info( contractERC721SC ? contractERC721SC.options.address : "<null>" ) + "\n" );
        //
        log.write( cc.debug( "Using S-Chain URL " ) + cc.u( joNodeDesc.url ) + "\n" );
        const blockNumberSC = await w3schain.eth.getBlockNumber();
        log.write( cc.debug( "Block number on S-Chain is " ) + cc.info( blockNumberSC ) + "\n" );
        const blockNumberMN = await g_w3_main_net.eth.getBlockNumber();
        log.write( cc.debug( "Block number on Main Net is " ) + cc.info( blockNumberMN ) + "\n" );
        //
        let ownerOfTokenMN_before = null;
        let metadataOfTokenMN_before = null;
        try {
            ownerOfTokenMN_before = await contractERC721MN.methods.ownerOf( tokenIdToSend ).call( { from: strAddressFrom } );
        } catch ( err ) { ownerOfTokenMN_before = "<NULL owner>"; }
        log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenMN_before ) + "\n" );
        if( isWithMetadata721 ) {
            try {
                metadataOfTokenMN_before = await contractERC721MN.methods.tokenURI( tokenIdToSend ).call( { from: strAddressFrom } );
            } catch ( err ) { metadataOfTokenMN_before = "<NULL metadata>"; }
            log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " metadata is " ) + cc.bright( metadataOfTokenMN_before ) + "\n" );
        }
        let ownerOfTokenSC_before = null;
        let metadataOfTokenSC_before = null;
        try {
            ownerOfTokenSC_before = contractERC721SC ? ( await contractERC721SC.methods.ownerOf( tokenIdToSend ).call( { from: strAddressTo } ) ) : "<NULL owner>";
        } catch ( err ) { ownerOfTokenSC_before = "<NULL owner>"; }
        log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenSC_before ) + "\n" );
        if( isWithMetadata721 ) {
            try {
                metadataOfTokenSC_before = contractERC721SC ? ( await contractERC721SC.methods.tokenURI( tokenIdToSend ).call( { from: strAddressTo } ) ) : "<NULL metadata>";
            } catch ( err ) { metadataOfTokenSC_before = "<NULL metadata>"; }
            log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " metadata is " ) + cc.bright( metadataOfTokenSC_before ) + "\n" );
        }
        //
        // const strPrivateKeyMN = strPrivateKeyFrom;
        // const strPrivateKeySC = strPrivateKeyTo;
        const joEnv = { };
        const nNodeIndex = 0;
        await exec_array_of_commands_safe( [
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --m2s-payment" +
            " --tid=" + tokenIdToSend +
            ( isWithMetadata721 ? " --with-metadata" : "" ) +
            " --value=60finney" + // additional cost
            " --url-main-net=" + g_strMainNetURL +
            " --url-s-chain=" + joNodeDesc.url +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            // " --key-main-net=" + strPrivateKeyMN +
            // " --key-s-chain=" + strPrivateKeySC +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) + // compose_ima_cli_account_options( idxChain, nNodeIndex ) +
            " --erc721-main-net=" + path.join( g_strFolderTestTokensData, isWithMetadata721 ? "TestToken.ERC721_with_metadata.abi.mn.json" : "TestToken.ERC721.abi.mn.json" ) +
            " --erc721-s-chain=" + path.join( g_strFolderTestTokensData, isWithMetadata721 ? "TestToken.ERC721_with_metadata.abi.sc00.json" : "TestToken.ERC721.abi.sc00.json" )
        ], g_strFolderImaAgent, joEnv, 1 );
        //
        const cntAttempts = 0 + g_nCntAttempts;
        if( contractERC721SC == null ) {
            log.write( cc.debug( "Waiting for " ) + cc.sunny( strERC721 ) + cc.debug( " instantiation on " ) + cc.sunny( "S-Chain" ) + cc.debug( "..." ) + "\n" );
            await wait_for_cloned_token_to_appear( idxChain, strerc721,
                strAddressTo, cntAttempts, nPreferredNodeIndex, g_strMainnetName,
                isWithMetadata721 ? g_joAbiTestTokensMN.ERC721_with_metadata_address : g_joAbiTestTokensMN.ERC721_address
            );
            const contractTokenManagerErc721SC = new w3schain.eth.Contract(
                isWithMetadata721 ? joImaAbiSC.token_manager_erc721_with_metadata_abi : joImaAbiSC.token_manager_erc721_abi,
                isWithMetadata721 ? joImaAbiSC.token_manager_erc721_with_metadata_address : joImaAbiSC.token_manager_erc721_address
            );
            const erc721_address_on_s_chain =
                await contractTokenManagerErc721SC.methods.clonesErc721(
                    g_w3mod.utils.soliditySha3( g_strMainnetName ),
                    isWithMetadata721 ? g_joAbiTestTokensMN.ERC721_with_metadata_address : g_joAbiTestTokensMN.ERC721_address
                ).call( { from: strAddressTo } );
            log.write( cc.debug( strERC721 + "_address_on_s_chain is:" ) + cc.info( erc721_address_on_s_chain ) + "\n" );
            log.write( cc.debug( "Found " ) + cc.sunny( strERC721 ) + cc.debug( " instantiated on " ) + cc.sunny( "S-Chain" ) + cc.debug( " at address " ) + cc.info( erc721_address_on_s_chain ) + "\n" );
            const joABI = generate_dynamic_abi( strerc721, erc721_address_on_s_chain );
            contractERC721SC = new w3schain.eth.Contract( joABI.ERC721OnChain_abi, joABI.ERC721OnChain_address );
            if( isWithMetadata721 )
                g_contractERC721_with_metadata_SC = contractERC721SC;
            else
                g_contractERC721SC = contractERC721SC;
            if( ! contractERC721SC )
                throw new Error( "failed to find instantiated " + strERC721 + " token on S-Chain" );
        }
        const fnAsyncGetTokenOwnerFrom = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenOwner = await contractERC721MN.methods.ownerOf( tokenIdToSend ).call( { from: strAddressFrom } );
                    return tokenOwner;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net " ) + strERC721 + " " + cc.info( contractERC721MN.options.address ) +
                        cc.error( " token owner " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressFrom ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch Main Net " + strERC721 + " balance of \"" + strAddressTo + "\"" );
        };
        const fnAsyncGetTokenOwnerTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenOwner = await contractERC721SC.methods.ownerOf( tokenIdToSend ).call( { from: strAddressTo } );
                    return tokenOwner;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch S-Chain " ) + strERC721 + " " + cc.info( contractERC721SC.options.address ) +
                        cc.error( " token owner " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch S-Chain " + strERC721 + " balance of \"" + strAddressTo + "\"" );
        };
        const fnAsyncGetTokenMetadataFrom = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenMetadata = await contractERC721MN.methods.tokenURI( tokenIdToSend ).call( { from: strAddressFrom } );
                    return tokenMetadata;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net " ) + strERC721 + " " + cc.info( contractERC721MN.options.address ) +
                        cc.error( " token metadata " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressFrom ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            // throw new Error( "Failed to fetch Main Net " + strERC721 + " owner of \"" + strAddressTo + "\"" );
            return "<NULL or unknown yet owner>";
        };
        const fnAsyncGetTokenMetadataTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenMetadata = await contractERC721SC.methods.tokenURI( tokenIdToSend ).call( { from: strAddressTo } );
                    return tokenMetadata;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch S-Chain " ) + strERC721 + " " + cc.info( contractERC721SC.options.address ) +
                        cc.error( " token metadata " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            // throw new Error( "Failed to fetch S-Chain " + strERC721 + " metadata of \"" + strAddressTo + "\"" );
            return "<NULL or unknown yet metadata>";
        };
        //
        const ownerOfTokenMN_after = await fnAsyncGetTokenOwnerFrom();
        log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenMN_after ) + "\n" );
        if( ownerOfTokenMN_before == ownerOfTokenMN_after )
            throw new Error( strERC721 + " source token owner was not changed" );
        let ownerOfTokenSC_after = await fnAsyncGetTokenOwnerTo();
        log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenSC_after ) + "\n" );
        //
        if( ownerOfTokenSC_before == ownerOfTokenSC_after ) {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                log.write( cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + "\n" );
                ownerOfTokenSC_after = await fnAsyncGetTokenOwnerTo();
                log.write(
                    cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + cc.debug( ", have " ) +
                    cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenSC_after ) +
                    cc.debug( ", old owner is " ) + cc.bright( ownerOfTokenSC_before ) +
                    cc.debug( ", expected owner is " ) + cc.bright( strAddressTo ) +
                    "\n" );
                // if( ownerOfTokenSC_before != ownerOfTokenSC_after )
                //     break;
                if( ownerOfTokenSC_after.toLowerCase() == strAddressTo.toLowerCase() )
                    break;
                await sleep( 1000 );
            }
            // if( ownerOfTokenSC_before == ownerOfTokenSC_after )
            //     throw new Error( strERC721 + " destination token owner was not changed on S-Chain" );
            if( ownerOfTokenSC_after.toLowerCase() != strAddressTo.toLowerCase() )
                throw new Error( strERC721 + " was not delivered on S-Chain" );
        }
        if( isWithMetadata721 ) {
            const metadataOfTokenMN_after = await fnAsyncGetTokenMetadataFrom();
            log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " metadata is " ) + cc.bright( metadataOfTokenMN_after ) + "\n" );
            // if( metadataOfTokenMN_before == metadataOfTokenMN_after )
            //     throw new Error( strERC721 + " source token metadata was not changed on Main Net" );
            const metadataOfTokenSC_after = await fnAsyncGetTokenMetadataTo();
            log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " metadata is " ) + cc.bright( metadataOfTokenSC_after ) + "\n" );
            if( metadataOfTokenSC_before == metadataOfTokenMN_after )
                throw new Error( strERC721 + " destination token metadata was not changed on S-Chain" );
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully sent " ) + cc.info( tokenIdToSend ) + cc.success( " of " ) + cc.sunny( strERC721 ) +
                cc.success( " from " ) + cc.sunny( "Main Net" ) + cc.success( " account " ) + cc.info( strAddressFrom ) +
                cc.success( " to " ) + cc.sunny( "S-Chain" ) + cc.success( " account " ) + cc.info( strAddressTo ) +
                cc.success( "." ) +
                "\n" );
        }
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) +
            cc.error( " to send " ) + cc.info( tokenIdToSend ) + cc.error( " of " ) + cc.sunny( strERC721 ) +
            cc.error( " from " ) + cc.sunny( "Main Net" ) + cc.error( " account " ) + cc.info( strAddressFrom ) +
            cc.error( " to " ) + cc.sunny( "S-Chain" ) + cc.error( " account " ) + cc.info( strAddressTo ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        await end_of_test( 68 );
    }
}

async function ima_send_erc721_sc2mn( idxChain, strPrivateKeyFrom, strPrivateKeyTo, tokenID, nPreferredNodeIndex, isWithMetadata721 ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const strERC721 = isWithMetadata721 ? "ERC721_with_metadata" : "ERC721";
    const strerc721 = isWithMetadata721 ? "erc721_with_metadata" : "erc721";
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const tokenIdToSend = ( tokenID == null || tokenID == undefined ) ? 100 : parseInt( tokenID );
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyTo ) );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    const contractERC721MN = isWithMetadata721 ? g_contractERC721_with_metadata_MN : g_contractERC721MN;
    let contractERC721SC = isWithMetadata721 ? g_contractERC721_with_metadata_SC : g_contractERC721SC;
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Sending " ) + cc.info( tokenIdToSend ) + cc.bright( " of " ) + cc.sunny( strERC721 ) +
                cc.bright( " from " ) + cc.sunny( "S-Chain" ) + cc.bright( " account " ) + cc.info( strAddressFrom ) +
                cc.bright( " to " ) + cc.sunny( "Main Net" ) + cc.bright( " account " ) + cc.info( strAddressTo ) +
                cc.bright( "..." ) + "\n\n" );
        }
        if( contractERC721SC == null ) {
            const contractTokenManagerErc721SC = new w3schain.eth.Contract(
                isWithMetadata721 ? joImaAbiSC.token_manager_erc721_with_metadata_abi : joImaAbiSC.token_manager_erc721_abi,
                isWithMetadata721 ? joImaAbiSC.token_manager_erc721_with_metadata_address : joImaAbiSC.token_manager_erc721_address
            );
            const erc721_address_on_s_chain =
                await contractTokenManagerErc721SC.methods.clonesErc721(
                    g_w3mod.utils.soliditySha3( g_strMainnetName ),
                    isWithMetadata721 ? g_joAbiTestTokensMN.ERC721_with_metadata_address : g_joAbiTestTokensMN.ERC721_address
                ).call( { from: strAddressFrom } );
            log.write( cc.debug( strERC721 + "_address_on_s_chain is:" ) + cc.info( erc721_address_on_s_chain ) + "\n" );
            log.write( cc.debug( "Found " ) + cc.sunny( strERC721 ) + cc.debug( " instantiated on " ) + cc.sunny( "S-Chain" ) + cc.debug( " at address " ) + cc.info( erc721_address_on_s_chain ) + "\n" );
            const joABI = generate_dynamic_abi( strerc721, erc721_address_on_s_chain );
            contractERC721SC = new w3schain.eth.Contract( joABI.ERC721OnChain_abi, joABI.ERC721OnChain_address );
            if( isWithMetadata721 )
                g_contractERC721_with_metadata_SC = contractERC721SC;
            else
                g_contractERC721SC = contractERC721SC;
            if( ! contractERC721SC )
                throw new Error( "failed to find instantiated ERC721 token on S-Chain" );
        }
        log.write( cc.debug( strERC721 + " token on Main Met:" ) + cc.info( contractERC721MN ? contractERC721MN.options.address : "<null>" ) + "\n" );
        log.write( cc.debug( strERC721 + " token on S-Chain:" ) + cc.info( contractERC721SC ? contractERC721SC.options.address : "<null>" ) + "\n" );
        //
        log.write( cc.debug( "Using S-Chain URL " ) + cc.u( joNodeDesc.url ) + "\n" );
        const blockNumberSC = await w3schain.eth.getBlockNumber();
        log.write( cc.debug( "Block number on S-Chain is " ) + cc.info( blockNumberSC ) + "\n" );
        const blockNumberMN = await g_w3_main_net.eth.getBlockNumber();
        log.write( cc.debug( "Block number on Main Net is " ) + cc.info( blockNumberMN ) + "\n" );
        //
        let ownerOfTokenMN_before = null;
        let metadataOfTokenMN_before = null;
        try {
            ownerOfTokenMN_before = await contractERC721MN.methods.ownerOf( tokenIdToSend ).call( { from: strAddressTo } );
        } catch ( err ) { ownerOfTokenMN_before = "<NULL owner>"; }
        log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenMN_before ) + "\n" );
        if( isWithMetadata721 ) {
            try {
                metadataOfTokenMN_before = await contractERC721MN.methods.tokenURI( tokenIdToSend ).call( { from: strAddressTo } );
            } catch ( err ) { metadataOfTokenMN_before = "<NULL metadata>"; }
            log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " metadata is " ) + cc.bright( metadataOfTokenMN_before ) + "\n" );
        }
        let ownerOfTokenSC_before = 0;
        let metadataOfTokenSC_before = null;
        if( contractERC721SC ) {
            ownerOfTokenSC_before = null;
            try {
                ownerOfTokenSC_before = await contractERC721SC.methods.ownerOf( tokenIdToSend ).call( { from: strAddressFrom } );
            } catch ( err ) { ownerOfTokenSC_before = "<NULL owner>"; }
            if( isWithMetadata721 ) {
                try {
                    metadataOfTokenSC_before = await contractERC721SC.methods.tokenURI( tokenIdToSend ).call( { from: strAddressFrom } );
                } catch ( err ) { metadataOfTokenSC_before = "<NULL metadata>"; }
            }
        } else
            throw new Error( strERC721 + " on S-Chain contract should be initialized earlier in this test" );
        log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenSC_before ) + "\n" );
        if( isWithMetadata721 )
            log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " metadata is " ) + cc.bright( metadataOfTokenSC_before ) + "\n" );
        //
        // const strPrivateKeyMN = strPrivateKeyTo;
        // const strPrivateKeySC = strPrivateKeyFrom;
        const joEnv = { };
        const nNodeIndex = 0;
        await exec_array_of_commands_safe( [
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --s2m-payment" +
            " --tid=" + tokenIdToSend +
            ( isWithMetadata721 ? " --with-metadata" : "" ) +
            " --value=60finney" + // additional cost
            " --sleep-between-tx=5000" +
            " --url-main-net=" + g_strMainNetURL +
            " --url-s-chain=" + joNodeDesc.url +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            // " --key-main-net=" + strPrivateKeyMN +
            // " --key-s-chain=" + strPrivateKeySC +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) + // compose_ima_cli_account_options( idxChain, nNodeIndex ) +
            " --erc721-main-net=" + path.join( g_strFolderTestTokensData, isWithMetadata721 ? "TestToken.ERC721_with_metadata.abi.mn.json" : "TestToken.ERC721.abi.mn.json" ) +
            " --erc721-s-chain=" + path.join( g_strFolderTestTokensData, isWithMetadata721 ? "TestToken.ERC721_with_metadata.abi.sc00.json" : "TestToken.ERC721.abi.sc00.json" )
        ], g_strFolderImaAgent, joEnv, 1 );
        //
        const cntAttempts = 0 + g_nCntAttempts;
        const fnAsyncGetTokenOwnerFrom = async function() {
            if( ! contractERC721SC )
                throw new Error( "Missing S-Chain " + strERC721 + " token instantiation" );
            try {
                const tokenOwner = await contractERC721SC.methods.ownerOf( tokenIdToSend ).call( { from: strAddressFrom } );
                return tokenOwner;
            } catch ( err ) {
                return "<NULL owner>";
            }
        };
        const fnAsyncGetTokenMetadataFrom = async function() {
            if( ! contractERC721SC )
                throw new Error( "Missing S-Chain " + strERC721 + " token instantiation" );
            try {
                const tokenMetadata = await contractERC721SC.methods.tokenURI( tokenIdToSend ).call( { from: strAddressFrom } );
                return tokenMetadata;
            } catch ( err ) {
                return "<NULL metadata>";
            }
        };
        const fnAsyncGetTokenOwnerTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenOwner = await contractERC721MN.methods.ownerOf( tokenIdToSend ).call( { from: strAddressTo } );
                    return tokenOwner;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net " + strERC721 + " " ) + cc.info( contractERC721MN.options.address ) +
                        cc.error( " token owner " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            // throw new Error( "Failed to fetch Main Net " + strERC721 + " owner of \"" + strAddressTo + "\"" );
            return "<NULL or unknown yet owner>";
        };
        const fnAsyncGetTokenMetadataTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenMetadata = await contractERC721MN.methods.tokenURI( tokenIdToSend ).call( { from: strAddressTo } );
                    return tokenMetadata;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net " + strERC721 + " " ) + cc.info( contractERC721MN.options.address ) +
                        cc.error( " token metadata " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            // throw new Error( "Failed to fetch Main Net " + strERC721 + " metadata of \"" + strAddressTo + "\"" );
            return "<NULL or unknown yet metadata>";
        };
        //
        const ownerOfTokenSC_after = await fnAsyncGetTokenOwnerFrom();
        log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenSC_after ) + "\n" );
        if( ownerOfTokenSC_before == ownerOfTokenSC_after )
            throw new Error( strERC721 + " source token owner was not changed" );
        let ownerOfTokenMN_after = await fnAsyncGetTokenOwnerTo();
        log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenMN_after ) + "\n" );
        if( ownerOfTokenMN_before == ownerOfTokenMN_after ) {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                ownerOfTokenMN_after = await fnAsyncGetTokenOwnerTo();
                log.write(
                    cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + cc.debug( ", have " ) +
                    cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " owner is " ) + cc.bright( ownerOfTokenMN_after ) +
                    cc.debug( ", old owner is " ) + cc.bright( ownerOfTokenMN_before ) +
                    cc.debug( ", expected owner is " ) + cc.bright( strAddressTo ) +
                    "\n" );
                // if( ownerOfTokenMN_before != ownerOfTokenMN_after )
                //     break;
                if( ownerOfTokenMN_after.toLowerCase() == strAddressTo.toLowerCase() )
                    break;
                await sleep( 1000 );
            }
            // if( ownerOfTokenMN_before == ownerOfTokenMN_after )
            //     throw new Error( strERC721 + " destination token owner was not changed on Main Net" );
            if( ownerOfTokenMN_after.toLowerCase() != strAddressTo.toLowerCase() )
                throw new Error( strERC721 + " was not delivered on S-Chain" );
        }
        if( isWithMetadata721 ) {
            const metadataOfTokenSC_after = await fnAsyncGetTokenMetadataFrom();
            log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " metadata is " ) + cc.bright( metadataOfTokenSC_after ) + "\n" );
            // if( metadataOfTokenSC_before == metadataOfTokenSC_after )
            //     throw new Error( strERC721 + " source token metadata was not changed on S-Chain" );
            const metadataOfTokenMN_after = await fnAsyncGetTokenMetadataTo();
            log.write( cc.sunny( strERC721 ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " metadata is " ) + cc.bright( metadataOfTokenMN_after ) + "\n" );
            if( metadataOfTokenSC_before != metadataOfTokenMN_after )
                throw new Error( strERC721 + " destination token metadata on Main Net(\"" + metadataOfTokenMN_before + "\") must be equal to source token metadata on S-Chain(\"" + metadataOfTokenSC_before + "\") but they are different" );
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully sent " ) + cc.info( tokenIdToSend ) + cc.success( " of " ) + cc.sunny( strERC721 ) +
                cc.success( " from " ) + cc.sunny( "S-Chain" ) + cc.success( " account " ) + cc.info( strAddressFrom ) +
                cc.success( " to " ) + cc.sunny( "Main Net" ) + cc.success( " account " ) + cc.info( strAddressTo ) + cc.success( "." ) +
                "\n" );
        }
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) +
            cc.error( " to send " ) + cc.info( tokenIdToSend ) + cc.error( " of " ) + cc.sunny( strERC721 ) +
            cc.error( " from " ) + cc.sunny( "S-Chain" ) + cc.error( " account " ) + cc.info( strAddressFrom ) +
            cc.error( " to " ) + cc.sunny( "Main Net" ) + cc.error( " account " ) + cc.info( strAddressTo ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        await end_of_test( 69 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function ima_send_erc1155_mn2sc( idxChain, strPrivateKeyFrom, strPrivateKeyTo, tokenID, nAmount, nPreferredNodeIndex ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const tokenIdToSend = ( tokenID == null || tokenID == undefined ) ? 100 : parseInt( tokenID );
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyTo ) );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Sending " ) + cc.info( tokenIdToSend ) + cc.bright( " of " ) + cc.sunny( "ERC1155" ) +
                cc.bright( " from " ) + cc.sunny( "Main Net" ) + cc.bright( " account " ) + cc.info( strAddressFrom ) +
                cc.bright( " to " ) + cc.sunny( "S-Chain" ) + cc.bright( " account " ) + cc.info( strAddressTo ) +
                cc.bright( "..." ) + "\n\n" );
        }
        log.write( cc.debug( "ERC1155 token on Main Met:" ) + cc.info( g_contractERC1155MN ? g_contractERC1155MN.options.address : "<null>" ) + "\n" );
        log.write( cc.debug( "ERC1155 token on S-Chain:" ) + cc.info( g_contractERC1155SC ? g_contractERC1155SC.options.address : "<null>" ) + "\n" );
        //
        log.write( cc.debug( "Using S-Chain URL " ) + cc.u( joNodeDesc.url ) + "\n" );
        const blockNumberSC = await w3schain.eth.getBlockNumber();
        log.write( cc.debug( "Block number on S-Chain is " ) + cc.info( blockNumberSC ) + "\n" );
        const blockNumberMN = await g_w3_main_net.eth.getBlockNumber();
        log.write( cc.debug( "Block number on Main Net is " ) + cc.info( blockNumberMN ) + "\n" );
        //
        let balanceOfTokenMN_before = null;
        try {
            balanceOfTokenMN_before = await g_contractERC1155MN.methods.balanceOf( strAddressFrom, tokenIdToSend ).call( { from: strAddressFrom } );
        } catch ( err ) {
            balanceOfTokenMN_before = "<NULL balance>";
        }
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " balance is " ) + cc.bright( balanceOfTokenMN_before ) + "\n" );
        let balanceOfTokenSC_before = null;
        try {
            balanceOfTokenSC_before = g_contractERC1155SC ? ( await g_contractERC1155SC.methods.balanceOf( strAddressTo, tokenIdToSend ).call( { from: strAddressTo } ) ) : 0;
        } catch ( err ) {
            balanceOfTokenSC_before = "<NULL balance>";
        }
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " balance is " ) + cc.bright( balanceOfTokenSC_before ) + "\n" );
        //
        // const strPrivateKeyMN = strPrivateKeyFrom;
        // const strPrivateKeySC = strPrivateKeyTo;
        const joEnv = { };
        const nNodeIndex = 0;
        await exec_array_of_commands_safe( [
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --m2s-payment" +
            " --tid=" + tokenIdToSend +
            " --amount=" + nAmount +
            " --value=60finney" + // additional cost
            " --url-main-net=" + g_strMainNetURL +
            " --url-s-chain=" + joNodeDesc.url +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            // " --key-main-net=" + strPrivateKeyMN +
            // " --key-s-chain=" + strPrivateKeySC +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) + // compose_ima_cli_account_options( idxChain, nNodeIndex ) +
            " --erc1155-main-net=" + path.join( g_strFolderTestTokensData, "TestToken.ERC1155.abi.mn.json" ) +
            " --erc1155-s-chain=" + path.join( g_strFolderTestTokensData, "TestToken.ERC1155.abi.sc00.json" )
        ], g_strFolderImaAgent, joEnv, 1 );
        //
        const cntAttempts = 0 + g_nCntAttempts;
        if( g_contractERC1155SC == null ) {
            log.write( cc.debug( "Waiting for " ) + cc.sunny( "ERC1155" ) + cc.debug( " instantiation on " ) + cc.sunny( "S-Chain" ) + cc.debug( "..." ) + "\n" );
            await wait_for_cloned_token_to_appear( idxChain, "erc1155",
                strAddressTo, cntAttempts, nPreferredNodeIndex, g_strMainnetName, g_joAbiTestTokensMN.ERC1155_address );
            const contractTokenManagerErc1155SC = new w3schain.eth.Contract( joImaAbiSC.token_manager_erc1155_abi, joImaAbiSC.token_manager_erc1155_address );
            const erc1155_address_on_s_chain =
                await contractTokenManagerErc1155SC.methods.clonesErc1155(
                    g_w3mod.utils.soliditySha3( g_strMainnetName ),
                    g_joAbiTestTokensMN.ERC1155_address
                ).call( { from: strAddressTo } );
            log.write( cc.debug( "ERC1155_address_on_s_chain is:" ) + cc.info( erc1155_address_on_s_chain ) + "\n" );
            log.write( cc.debug( "Found " ) + cc.sunny( "ERC1155" ) + cc.debug( " instantiated on " ) + cc.sunny( "S-Chain" ) + cc.debug( " at address " ) + cc.info( erc1155_address_on_s_chain ) + "\n" );
            const joABI = generate_dynamic_abi( "erc1155", erc1155_address_on_s_chain );
            g_contractERC1155SC = new w3schain.eth.Contract( joABI.ERC1155OnChain_abi, joABI.ERC1155OnChain_address );
            if( ! g_contractERC1155SC )
                throw new Error( "failed to find instantiated ERC1155 token on S-Chain" );
        }
        const fnAsyncGetTokenBalanceFrom = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenBalance = await g_contractERC1155MN.methods.balanceOf( strAddressFrom, tokenIdToSend ).call( { from: strAddressFrom } );
                    return tokenBalance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net ERC1155 " ) + cc.info( g_contractERC1155MN.options.address ) +
                        cc.error( " token balance " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressFrom ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                } await sleep( 1000 );

                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch Main Net ERC1155 balance of \"" + strAddressTo + "\"" );
        };
        const fnAsyncGetTokenBalanceTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenBalance = await g_contractERC1155SC.methods.balanceOf( strAddressTo, tokenIdToSend ).call( { from: strAddressTo } );
                    return tokenBalance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch S-Chain ERC1155 " ) + cc.info( g_contractERC1155SC.options.address ) +
                        cc.error( " token balance " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch S-Chain ERC1155 balance of \"" + strAddressTo + "\"" );
        };
        //
        const balanceOfTokenMN_after = await fnAsyncGetTokenBalanceFrom();
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " balance is " ) + cc.bright( balanceOfTokenMN_after ) + "\n" );
        if( balanceOfTokenMN_before == balanceOfTokenMN_after )
            throw new Error( "ERC1155 source token balance was not changed" );
        balanceOfTokenSC_after = await fnAsyncGetTokenBalanceTo();
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " balance is " ) + cc.bright( balanceOfTokenSC_after ) + "\n" );
        //
        if( balanceOfTokenSC_before == balanceOfTokenSC_after ) {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                log.write( cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + "\n" );
                balanceOfTokenSC_after = await fnAsyncGetTokenBalanceTo();
                if( balanceOfTokenSC_before != balanceOfTokenSC_after )
                    break;
                await sleep( 1000 );
            }
            if( balanceOfTokenSC_before == balanceOfTokenSC_after )
                throw new Error( "ERC1155 destination token balance was not changed on S-Chain" );
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully sent " ) + cc.info( tokenIdToSend ) + cc.success( " of " ) + cc.sunny( "ERC1155" ) +
                cc.success( " from " ) + cc.sunny( "Main Net" ) + cc.success( " account " ) + cc.info( strAddressFrom ) +
                cc.success( " to " ) + cc.sunny( "S-Chain" ) + cc.success( " account " ) + cc.info( strAddressTo ) + cc.success( "." ) +
                "\n" );
        }
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) +
            cc.error( " to send " ) + cc.info( tokenIdToSend ) + cc.error( " of " ) + cc.sunny( "ERC1155" ) +
            cc.error( " from " ) + cc.sunny( "Main Net" ) + cc.error( " account " ) + cc.info( strAddressFrom ) +
            cc.error( " to " ) + cc.sunny( "S-Chain" ) + cc.error( " account " ) + cc.info( strAddressTo ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        await end_of_test( 70 );
    }
}

async function ima_send_erc1155_sc2mn( idxChain, strPrivateKeyFrom, strPrivateKeyTo, tokenID, nAmount, nPreferredNodeIndex ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const tokenIdToSend = ( tokenID == null || tokenID == undefined ) ? 100 : parseInt( tokenID );
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyTo ) );
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Sending " ) + cc.info( tokenIdToSend ) + cc.bright( " of " ) + cc.sunny( "ERC1155" ) +
                cc.bright( " from " ) + cc.sunny( "S-Chain" ) + cc.bright( " account " ) + cc.info( strAddressFrom ) +
                cc.bright( " to " ) + cc.sunny( "Main Net" ) + cc.bright( " account " ) + cc.info( strAddressTo ) +
                cc.bright( "..." ) + "\n\n" );
        }
        if( g_contractERC1155SC == null ) {
            log.write( cc.debug( "Waiting for " ) + cc.sunny( "ERC1155" ) + cc.debug( " instantiation on " ) + cc.sunny( "S-Chain" ) + cc.debug( "..." ) + "\n" );
            const contractTokenManagerErc1155SC = new w3schain.eth.Contract( joImaAbiSC.token_manager_erc1155_abi, joImaAbiSC.token_manager_erc1155_address );
            const erc1155_address_on_s_chain =
                await contractTokenManagerErc1155SC.methods.clonesErc1155(
                    g_w3mod.utils.soliditySha3( g_strMainnetName ),
                    g_joAbiTestTokensMN.ERC1155_address
                ).call( { from: strAddressFrom } );
            log.write( cc.debug( "ERC1155_address_on_s_chain is:" ) + cc.info( erc1155_address_on_s_chain ) + "\n" );
            log.write( cc.debug( "Found " ) + cc.sunny( "ERC1155" ) + cc.debug( " instantiated on " ) + cc.sunny( "S-Chain" ) + cc.debug( " at address " ) + cc.info( erc1155_address_on_s_chain ) + "\n" );
            const joABI = generate_dynamic_abi( "erc1155", erc1155_address_on_s_chain );
            g_contractERC1155SC = new w3schain.eth.Contract( joABI.ERC1155OnChain_abi, joABI.ERC1155OnChain_address );
            if( ! g_contractERC1155SC )
                throw new Error( "failed to find instantiated ERC1155 token on S-Chain" );
        }
        log.write( cc.debug( "ERC1155 token on Main Met:" ) + cc.info( g_contractERC1155MN ? g_contractERC1155MN.options.address : "<null>" ) + "\n" );
        log.write( cc.debug( "ERC1155 token on S-Chain:" ) + cc.info( g_contractERC1155SC ? g_contractERC1155SC.options.address : "<null>" ) + "\n" );
        //
        log.write( cc.debug( "Using S-Chain URL " ) + cc.u( joNodeDesc.url ) + "\n" );
        const blockNumberSC = await w3schain.eth.getBlockNumber();
        log.write( cc.debug( "Block number on S-Chain is " ) + cc.info( blockNumberSC ) + "\n" );
        const blockNumberMN = await g_w3_main_net.eth.getBlockNumber();
        log.write( cc.debug( "Block number on Main Net is " ) + cc.info( blockNumberMN ) + "\n" );
        //
        let balanceOfTokenMN_before = null;
        try {
            balanceOfTokenMN_before = await g_contractERC1155MN.methods.balanceOf( strAddressTo, tokenIdToSend ).call( { from: strAddressTo } );
        } catch ( err ) {
            balanceOfTokenMN_before = "<NULL balance>";
        }
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " balance is " ) + cc.bright( balanceOfTokenMN_before ) + "\n" );
        let balanceOfTokenSC_before = 0;
        if( g_contractERC1155SC ) {
            balanceOfTokenSC_before = null;
            try {
                balanceOfTokenSC_before = await g_contractERC1155SC.methods.balanceOf( strAddressFrom, tokenIdToSend ).call( { from: strAddressFrom } );
            } catch ( err ) {
                balanceOfTokenSC_before = "<NULL balance>";
            }
        } else
            throw new Error( "ERC1155 on S-Chain contract should be initialized earlier in this test" );
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " balance is " ) + cc.bright( balanceOfTokenSC_before ) + "\n" );
        //
        // const strPrivateKeyMN = strPrivateKeyTo;
        // const strPrivateKeySC = strPrivateKeyFrom;
        const joEnv = { };
        const nNodeIndex = 0;
        await exec_array_of_commands_safe( [
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --s2m-payment" +
            " --tid=" + tokenIdToSend +
            " --amount=" + nAmount +
            " --value=60finney" + // additional cost
            " --sleep-between-tx=5000" +
            " --url-main-net=" + g_strMainNetURL +
            " --url-s-chain=" + joNodeDesc.url +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            // " --key-main-net=" + strPrivateKeyMN +
            // " --key-s-chain=" + strPrivateKeySC +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) + // compose_ima_cli_account_options( idxChain, nNodeIndex ) +
            " --erc1155-main-net=" + path.join( g_strFolderTestTokensData, "TestToken.ERC1155.abi.mn.json" ) +
            " --erc1155-s-chain=" + path.join( g_strFolderTestTokensData, "TestToken.ERC1155.abi.sc00.json" )
        ], g_strFolderImaAgent, joEnv, 1 );
        //
        const cntAttempts = 0 + g_nCntAttempts;
        const fnAsyncGetTokenBalanceFrom = async function() {
            if( ! g_contractERC1155SC )
                throw new Error( "Missing S-Chain ERC1155 token instantiation" );
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenBalance = await g_contractERC1155SC.methods.balanceOf( strAddressFrom, tokenIdToSend ).call( { from: strAddressFrom } );
                    return tokenBalance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch S-Chain ERC1155 " ) + cc.info( g_contractERC1155SC.options.address ) +
                        cc.error( " token balance " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressFrom ) + cc.error( ": " ) +
                        cc.warning( err.toString() ) );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch S-Chain ERC1155 balance of \"" + strAddressTo + "\"" );
        };
        const fnAsyncGetTokenBalanceTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenBalance = await g_contractERC1155MN.methods.balanceOf( strAddressTo, tokenIdToSend ).call( { from: strAddressTo } );
                    return tokenBalance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net ERC1155 " ) + cc.info( g_contractERC1155MN.options.address ) +
                        cc.error( " token balance " ) + cc.info( tokenIdToSend ) +
                        cc.error( " called from " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch Main Net ERC1155 balance of \"" + strAddressTo + "\"" );
        };
        //
        const balanceOfTokenSC_after = await fnAsyncGetTokenBalanceFrom();
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " balance is " ) + cc.bright( balanceOfTokenSC_after ) + "\n" );
        if( balanceOfTokenSC_before == balanceOfTokenSC_after )
            throw new Error( "ERC1155 source token balance was not changed" );
        balanceOfTokenMN_after = await fnAsyncGetTokenBalanceTo();
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token ID " ) + cc.info( tokenIdToSend ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " balance is " ) + cc.bright( balanceOfTokenMN_after ) + "\n" );
        //
        if( balanceOfTokenMN_before == balanceOfTokenMN_after && g_contractERC1155SC ) {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                log.write( cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + "\n" );
                balanceOfTokenMN_after = await fnAsyncGetTokenBalanceTo();
                if( balanceOfTokenMN_before != balanceOfTokenMN_after )
                    break;
                await sleep( 1000 );
            }
            if( balanceOfTokenMN_before == balanceOfTokenMN_after )
                throw new Error( "ERC1155 destination token balance was not changed on Main Net" );
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully sent " ) + cc.info( tokenIdToSend ) + cc.success( " of " ) + cc.sunny( "ERC1155" ) +
                cc.success( " from " ) + cc.sunny( "S-Chain" ) + cc.success( " account " ) + cc.info( strAddressFrom ) +
                cc.success( " to " ) + cc.sunny( "Main Net" ) + cc.success( " account " ) + cc.info( strAddressTo ) + cc.success( "." ) +
                "\n" );
        }
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) +
            cc.error( " to send " ) + cc.info( tokenIdToSend ) + cc.error( " of " ) + cc.sunny( "ERC1155" ) +
            cc.error( " from " ) + cc.sunny( "S-Chain" ) + cc.error( " account " ) + cc.info( strAddressFrom ) +
            cc.error( " to " ) + cc.sunny( "Main Net" ) + cc.error( " account " ) + cc.info( strAddressTo ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        await end_of_test( 71 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function is_all_balances_changed( a1, a2, arrAmounts ) {
    for( let i = 0; i < a1.length; ++ i ) {
        if( arrAmounts[i] == 0 )
            continue;
        if( a1[i] == a2[i] )
            return false;
    }
    return true;
}

async function ima_batch_send_erc1155_mn2sc( idxChain, strPrivateKeyFrom, strPrivateKeyTo, arrTokenIDs, arrAmounts, nPreferredNodeIndex ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const arrTokenIDsToSend = ( arrTokenIDs == null || arrTokenIDs == undefined ) ? [ 100 ] : arrTokenIDs;
    const cntTokenIDs = arrTokenIDsToSend.length;
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyTo ) );
    const arrAccountsFrom = [], arrAccountsTo = [], arrNullBalances = [];
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    for( let idx = 0; idx < cntTokenIDs; ++ idx ) {
        arrAccountsFrom.push( strAddressFrom );
        arrAccountsTo.push( strAddressTo );
        arrNullBalances.push( "<NULL balance>" );
    }
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Batch sending " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.bright( " of " ) + cc.sunny( "ERC1155" ) +
                cc.bright( " from " ) + cc.sunny( "Main Net" ) + cc.bright( " account " ) + cc.info( strAddressFrom ) +
                cc.bright( " to " ) + cc.sunny( "S-Chain" ) + cc.bright( " account " ) + cc.info( strAddressTo ) +
                cc.bright( "..." ) + "\n\n" );
        }
        log.write( cc.debug( "ERC1155 token on Main Met:" ) + cc.info( g_contractERC1155MN ? g_contractERC1155MN.options.address : "<null>" ) + "\n" );
        log.write( cc.debug( "ERC1155 token on S-Chain:" ) + cc.info( g_contractERC1155SC ? g_contractERC1155SC.options.address : "<null>" ) + "\n" );
        //
        log.write( cc.debug( "Using S-Chain URL " ) + cc.u( joNodeDesc.url ) + "\n" );
        const blockNumberSC = await w3schain.eth.getBlockNumber();
        log.write( cc.debug( "Block number on S-Chain is " ) + cc.info( blockNumberSC ) + "\n" );
        const blockNumberMN = await g_w3_main_net.eth.getBlockNumber();
        log.write( cc.debug( "Block number on Main Net is " ) + cc.info( blockNumberMN ) + "\n" );
        //
        let balanceOfBatchTokenMN_before = null;
        try {
            balanceOfBatchTokenMN_before = await g_contractERC1155MN.methods.balanceOfBatch( arrAccountsFrom, arrTokenIDsToSend ).call( { from: strAddressFrom } );
        } catch ( err ) {
            balanceOfBatchTokenMN_before = JSON.parse( JSON.stringify( arrNullBalances ) );
        }
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token IDs " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " batch balances are " ) + cc.bright( JSON.stringify( balanceOfBatchTokenMN_before ) ) + "\n" );
        const balanceOfBatchTokenSC_before = g_contractERC1155SC ? ( await g_contractERC1155SC.methods.balanceOfBatch( arrAccountsTo, arrTokenIDsToSend ).call( { from: strAddressTo } ) ) : 0;
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token IDs " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " batch balances are " ) + cc.bright( JSON.stringify( balanceOfBatchTokenSC_before ) ) + "\n" );
        //
        // const strPrivateKeyMN = strPrivateKeyFrom;
        // const strPrivateKeySC = strPrivateKeyTo;
        const joEnv = { };
        const nNodeIndex = 0;
        await exec_array_of_commands_safe( [
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --m2s-payment" +
            " --tids=\"" + replaceAll( JSON.stringify( arrTokenIDsToSend ), " ", "" ) + "\"" +
            " --amounts=\"" + replaceAll( JSON.stringify( arrAmounts ), " ", "" ) + "\"" +
            " --value=60finney" + // additional cost
            " --url-main-net=" + g_strMainNetURL +
            " --url-s-chain=" + joNodeDesc.url +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            // " --key-main-net=" + strPrivateKeyMN +
            // " --key-s-chain=" + strPrivateKeySC +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) + // compose_ima_cli_account_options( idxChain, nNodeIndex ) +
            " --erc1155-main-net=" + path.join( g_strFolderTestTokensData, "TestToken.ERC1155.abi.mn.json" ) +
            " --erc1155-s-chain=" + path.join( g_strFolderTestTokensData, "TestToken.ERC1155.abi.sc00.json" )
        ], g_strFolderImaAgent, joEnv, 1 );
        //
        const cntAttempts = 0 + g_nCntAttempts;
        if( g_contractERC1155SC == null ) {
            log.write( cc.debug( "Waiting for " ) + cc.sunny( "ERC1155" ) + cc.debug( " instantiation on " ) + cc.sunny( "S-Chain" ) + cc.debug( "..." ) + "\n" );
            await wait_for_cloned_token_to_appear( idxChain, "erc1155",
                strAddressTo, cntAttempts, nPreferredNodeIndex, g_strMainnetName, g_joAbiTestTokensMN.ERC1155_address );
            const contractTokenManagerErc1155SC = new w3schain.eth.Contract( joImaAbiSC.token_manager_erc1155_abi, joImaAbiSC.token_manager_erc1155_address );
            const erc1155_address_on_s_chain =
                await contractTokenManagerErc1155SC.methods.clonesErc1155(
                    g_w3mod.utils.soliditySha3( g_strMainnetName ),
                    g_joAbiTestTokensMN.ERC1155_address
                ).call( { from: strAddressTo } );
            log.write( cc.debug( "ERC1155_address_on_s_chain is:" ) + cc.info( erc1155_address_on_s_chain ) + "\n" );
            log.write( cc.debug( "Found " ) + cc.sunny( "ERC1155" ) + cc.debug( " instantiated on " ) + cc.sunny( "S-Chain" ) + cc.debug( " at address " ) + cc.info( erc1155_address_on_s_chain ) + "\n" );
            const joABI = generate_dynamic_abi( "erc1155", erc1155_address_on_s_chain );
            g_contractERC1155SC = new w3schain.eth.Contract( joABI.ERC1155OnChain_abi, joABI.ERC1155OnChain_address );
            if( ! g_contractERC1155SC )
                throw new Error( "failed to find instantiated ERC1155 token on S-Chain" );
        }
        const fnAsyncGetTokenBatchBalanceFrom = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenBatchBalance = await g_contractERC1155MN.methods.balanceOfBatch( arrAccountsFrom, arrTokenIDsToSend ).call( { from: strAddressFrom } );
                    return tokenBatchBalance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net ERC1155 " ) + cc.info( g_contractERC1155MN.options.address ) +
                        cc.error( " token batch balances " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) +
                        cc.error( " called from " ) + cc.info( strAddressFrom ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch Main Net ERC1155 batch balances of \"" + strAddressTo + "\"" );
        };
        const fnAsyncGetTokenBatchBalanceTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenBatchBalance = await g_contractERC1155SC.methods.balanceOfBatch( arrAccountsTo, arrTokenIDsToSend ).call( { from: strAddressTo } );
                    return tokenBatchBalance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch S-Chain ERC1155 " ) + cc.info( g_contractERC1155SC.options.address ) +
                        cc.error( " token batch balances " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) +
                        cc.error( " called from " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch S-Chain ERC1155 batch balances of \"" + strAddressTo + "\"" );
        };
        //
        const balanceOfBatchTokenMN_after = await fnAsyncGetTokenBatchBalanceFrom();
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token IDs " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " batch balances are " ) + cc.bright( JSON.stringify( balanceOfBatchTokenMN_after ) ) + "\n" );
        if( ! is_all_balances_changed( balanceOfBatchTokenMN_before, balanceOfBatchTokenMN_after, arrAmounts ) )
            throw new Error( "ERC1155 source token batch balances were not changed" );
        balanceOfBatchTokenSC_after = await fnAsyncGetTokenBatchBalanceTo();
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token IDs " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " batch balances are " ) + cc.bright( JSON.stringify( balanceOfBatchTokenSC_after ) ) + "\n" );
        //
        if( ! is_all_balances_changed( balanceOfBatchTokenSC_before, balanceOfBatchTokenSC_after, arrAmounts ) ) {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                log.write( cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + "\n" );
                balanceOfBatchTokenSC_after = await fnAsyncGetTokenBatchBalanceTo();
                if( is_all_balances_changed( balanceOfBatchTokenSC_before, balanceOfBatchTokenSC_after, arrAmounts ) )
                    break;
                await sleep( 1000 );
            }
            if( ! is_all_balances_changed( balanceOfBatchTokenSC_before, balanceOfBatchTokenSC_after, arrAmounts ) )
                throw new Error( "ERC1155 destination token batch balances were not changed" );
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully batch sent " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.success( " of " ) + cc.sunny( "ERC1155" ) +
                cc.success( " from " ) + cc.sunny( "Main Net" ) + cc.success( " account " ) + cc.info( strAddressFrom ) +
                cc.success( " to " ) + cc.sunny( "S-Chain" ) + cc.success( " account " ) + cc.info( strAddressTo ) + cc.success( "." ) +
                "\n" );
        }
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) +
            cc.error( " to batch send " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.error( " of " ) + cc.sunny( "ERC1155" ) +
            cc.error( " from " ) + cc.sunny( "Main Net" ) + cc.error( " account " ) + cc.info( strAddressFrom ) +
            cc.error( " to " ) + cc.sunny( "S-Chain" ) + cc.error( " account " ) + cc.info( strAddressTo ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        await end_of_test( 72 );
    }
}

async function ima_batch_send_erc1155_sc2mn( idxChain, strPrivateKeyFrom, strPrivateKeyTo, arrTokenIDs, arrAmounts, nPreferredNodeIndex ) {
    if( ! g_arrChains[idxChain].isStartEnabled )
        return;
    const arrNodeDescriptions = g_arrChains[idxChain].arrNodeDescriptions;
    const arrTokenIDsToSend = ( arrTokenIDs == null || arrTokenIDs == undefined ) ? [ 100 ] : arrTokenIDs;
    const cntTokenIDs = arrTokenIDsToSend.length;
    nPreferredNodeIndex = nPreferredNodeIndex || 0;
    const schain_name = g_arrChains[idxChain].name;
    const cid = g_arrChains[idxChain].cid;
    const joNodeDesc = arrNodeDescriptions[nPreferredNodeIndex];
    const w3schain = getWeb3FromURL( joNodeDesc.url );
    const strAddressFrom = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyFrom ) );
    const strAddressTo = ensure_starts_with_0x( private_key_2_account_address( g_w3_main_net, strPrivateKeyTo ) );
    const arrAccountsFrom = [], arrAccountsTo = [], arrNullBalances = [];
    const joImaAbiSC = g_arrChains[idxChain].joImaAbiSC;
    for( let idx = 0; idx < cntTokenIDs; ++ idx ) {
        arrAccountsFrom.push( strAddressFrom );
        arrAccountsTo.push( strAddressTo );
        arrNullBalances.push( "<NULL balance>" );
    }
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Batch sending " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.bright( " of " ) + cc.sunny( "ERC1155" ) +
                cc.bright( " from " ) + cc.sunny( "S-Chain" ) + cc.bright( " account " ) + cc.info( strAddressFrom ) +
                cc.bright( " to " ) + cc.sunny( "Main Net" ) + cc.bright( " account " ) + cc.info( strAddressTo ) +
                cc.bright( "..." ) + "\n\n" );
        }
        if( g_contractERC1155SC == null ) {
            log.write( cc.debug( "Waiting for " ) + cc.sunny( "ERC1155" ) + cc.debug( " instantiation on " ) + cc.sunny( "S-Chain" ) + cc.debug( "..." ) + "\n" );
            const contractTokenManagerErc1155SC = new w3schain.eth.Contract( joImaAbiSC.token_manager_erc1155_abi, joImaAbiSC.token_manager_erc1155_address );
            const erc1155_address_on_s_chain =
                await contractTokenManagerErc1155SC.methods.clonesErc1155(
                    g_w3mod.utils.soliditySha3( g_strMainnetName ),
                    g_joAbiTestTokensMN.ERC1155_address
                ).call( { from: strAddressFrom } );
            log.write( cc.debug( "ERC1155_address_on_s_chain is:" ) + cc.info( erc1155_address_on_s_chain ) + "\n" );
            log.write( cc.debug( "Found " ) + cc.sunny( "ERC1155" ) + cc.debug( " instantiated on " ) + cc.sunny( "S-Chain" ) + cc.debug( " at address " ) + cc.info( erc1155_address_on_s_chain ) + "\n" );
            const joABI = generate_dynamic_abi( "erc1155", erc1155_address_on_s_chain );
            g_contractERC1155SC = new w3schain.eth.Contract( joABI.ERC1155OnChain_abi, joABI.ERC1155OnChain_address );
            if( ! g_contractERC1155SC )
                throw new Error( "failed to find instantiated ERC1155 token on S-Chain" );
        }
        log.write( cc.debug( "ERC1155 token on Main Met:" ) + cc.info( g_contractERC1155MN ? g_contractERC1155MN.options.address : "<null>" ) + "\n" );
        log.write( cc.debug( "ERC1155 token on S-Chain:" ) + cc.info( g_contractERC1155SC ? g_contractERC1155SC.options.address : "<null>" ) + "\n" );
        //
        log.write( cc.debug( "Using S-Chain URL " ) + cc.u( joNodeDesc.url ) + "\n" );
        const blockNumberSC = await w3schain.eth.getBlockNumber();
        log.write( cc.debug( "Block number on S-Chain is " ) + cc.info( blockNumberSC ) + "\n" );
        const blockNumberMN = await g_w3_main_net.eth.getBlockNumber();
        log.write( cc.debug( "Block number on Main Net is " ) + cc.info( blockNumberMN ) + "\n" );
        //
        let balanceOfBatchTokenMN_before = null;
        try {
            balanceOfBatchTokenMN_before = await g_contractERC1155MN.methods.balanceOfBatch( arrAccountsTo, arrTokenIDsToSend ).call( { from: strAddressTo } );
        } catch ( err ) {
            balanceOfBatchTokenMN_before = JSON.parse( JSON.stringify( arrNullBalances ) );
        }
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token IDs " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " batch balances are " ) + cc.bright( JSON.stringify( balanceOfBatchTokenMN_before ) ) + "\n" );
        let balanceOfBatchTokenSC_before = 0;
        if( g_contractERC1155SC ) {
            balanceOfBatchTokenSC_before = null;
            try {
                balanceOfBatchTokenSC_before = await g_contractERC1155SC.methods.balanceOfBatch( arrAccountsFrom, arrTokenIDsToSend ).call( { from: strAddressFrom } );
            } catch ( err ) {
                balanceOfBatchTokenSC_before = JSON.parse( JSON.stringify( arrNullBalances ) );
            }
        } else
            throw new Error( "ERC1155 on S-Chain contract should be initialized earlier in this test" );
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token IDs " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " batch balances are " ) + cc.bright( JSON.stringify( balanceOfBatchTokenSC_before ) ) + "\n" );
        //
        // const strPrivateKeyMN = strPrivateKeyTo;
        // const strPrivateKeySC = strPrivateKeyFrom;
        const joEnv = { };
        const nNodeIndex = 0;
        await exec_array_of_commands_safe( [
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --s2m-payment" +
            " --tids=\"" + replaceAll( JSON.stringify( arrTokenIDsToSend ), " ", "" ) + "\"" +
            " --amounts=\"" + replaceAll( JSON.stringify( arrAmounts ), " ", "" ) + "\"" +
            " --value=60finney" + // additional cost
            " --sleep-between-tx=5000" +
            " --url-main-net=" + g_strMainNetURL +
            " --url-s-chain=" + joNodeDesc.url +
            " --id-main-net=" + g_strMainnetName +
            " --id-s-chain=" + schain_name +
            " --cid-main-net=" + cid_main_net +
            " --cid-s-chain=" + cid +
            " --abi-skale-manager=" + g_strSkaleManagerAbiJsonPath +
            " --abi-main-net=" + g_strPathImaAbiMN +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChain ) +
            // " --key-main-net=" + strPrivateKeyMN +
            // " --key-s-chain=" + strPrivateKeySC +
            " " + compose_ima_cli_account_options_all_direct( idxChain, nNodeIndex ) + // compose_ima_cli_account_options( idxChain, nNodeIndex ) +
            " --erc1155-main-net=" + path.join( g_strFolderTestTokensData, "TestToken.ERC1155.abi.mn.json" ) +
            " --erc1155-s-chain=" + path.join( g_strFolderTestTokensData, "TestToken.ERC1155.abi.sc00.json" )
        ], g_strFolderImaAgent, joEnv, 1 );
        //
        const cntAttempts = 0 + g_nCntAttempts;
        const fnAsyncGetTokenBatchBalanceFrom = async function() {
            if( ! g_contractERC1155SC )
                throw new Error( "Missing S-Chain ERC1155 token instantiation" );
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenBatchBalance =
                    await g_contractERC1155SC.methods.balanceOfBatch( arrAccountsFrom, arrTokenIDsToSend )
                        .call( { from: strAddressFrom } );
                    return tokenBatchBalance;
                } catch ( err ) {
                    // log.write(
                    //     cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                    //     cc.error( " to fetch S-Chain ERC1155 " ) + cc.info( g_contractERC1155SC.options.address ) +
                    //     cc.error( " token batch balances " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) +
                    //     cc.error( " called from " ) + cc.info( strAddressFrom ) + cc.error( ": " ) +
                    //     cc.warning( err.toString() ) );
                    return JSON.parse( JSON.stringify( arrNullBalances ) );
                }
            }
            // throw new Error( "Failed to fetch S-Chain ERC1155 batch balances of \"" + strAddressTo + "\"" );
        };
        const fnAsyncGetTokenBatchBalanceTo = async function() {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    const tokenBatchBalance = await g_contractERC1155MN.methods.balanceOfBatch( arrAccountsTo, arrTokenIDsToSend ).call( { from: strAddressTo } );
                    return tokenBatchBalance;
                } catch ( err ) {
                    log.write(
                        cc.fatal( "FAILED" ) + cc.error( " attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) +
                        cc.error( " to fetch Main Net ERC1155 " ) + cc.info( g_contractERC1155MN.options.address ) +
                        cc.error( " token batch balances " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) +
                        cc.error( " called from " ) + cc.info( strAddressTo ) + cc.error( ": " ) + cc.warning( err.toString() ) +
                        "\n" );
                }
                await sleep( 1000 );
            }
            throw new Error( "Failed to fetch Main Net ERC1155 batch balances of \"" + strAddressTo + "\"" );
        };
        //
        const balanceOfBatchTokenSC_after = await fnAsyncGetTokenBatchBalanceFrom();
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token IDs " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.debug( "/" ) + cc.sunny( "S-Chain" ) + cc.debug( " batch balances are " ) + cc.bright( JSON.stringify( balanceOfBatchTokenSC_after ) ) + "\n" );
        if( ! is_all_balances_changed( balanceOfBatchTokenSC_before, balanceOfBatchTokenSC_after, arrAmounts ) )
            throw new Error( "ERC1155 source token batch balances were not changed" );
        balanceOfBatchTokenMN_after = await fnAsyncGetTokenBatchBalanceTo();
        log.write( cc.sunny( "ERC1155" ) + cc.debug( " token IDs " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.debug( "/" ) + cc.sunny( "Main Net" ) + cc.debug( " batch balances are " ) + cc.bright( JSON.stringify( balanceOfBatchTokenMN_after ) ) + "\n" );
        //
        if( ! is_all_balances_changed( balanceOfBatchTokenMN_before, balanceOfBatchTokenMN_after, arrAmounts ) ) {
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                log.write( cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + "\n" );
                balanceOfBatchTokenMN_after = await fnAsyncGetTokenBatchBalanceTo();
                if( is_all_balances_changed( balanceOfBatchTokenMN_before, balanceOfBatchTokenMN_after, arrAmounts ) )
                    break;
                await sleep( 1000 );
            }
            if( ! is_all_balances_changed( balanceOfBatchTokenMN_before, balanceOfBatchTokenMN_after, arrAmounts ) )
                throw new Error( "ERC1155 destination token batch balances were not changed" );
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully batch sent " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.success( " of " ) + cc.sunny( "ERC1155" ) +
                cc.success( " from " ) + cc.sunny( "S-Chain" ) + cc.success( " account " ) + cc.info( strAddressFrom ) +
                cc.success( " to " ) + cc.sunny( "Main Net" ) + cc.success( " account " ) + cc.info( strAddressTo ) + cc.success( "." ) +
                "\n" );
        }
    } catch ( err ) {
        log.write(
            cc.fatal( "FAILED:" ) +
            cc.error( " to batch send " ) + cc.info( JSON.stringify( arrTokenIDsToSend ) ) + cc.error( " of " ) + cc.sunny( "ERC1155" ) +
            cc.error( " from " ) + cc.sunny( "S-Chain" ) + cc.error( " account " ) + cc.info( strAddressFrom ) +
            cc.error( " to " ) + cc.sunny( "Main Net" ) + cc.error( " account " ) + cc.info( strAddressTo ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) +
            "\n" );
        await end_of_test( 73 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function s2s_extract_tt_abi_part( strAbiPathSrc, strAbiPathDst, strTokenName ) { // strTokenName is "ERC20", "ERC721", "ERC1155"
    const joABI_src = jsonFileLoad( strAbiPathSrc, null, g_bVerbose );
    traverse_json( joABI_src, fix_ethers_js_abi_errors );
    const joABI_dst = { };
    const strAddressKeyName = strTokenName + "_address";
    const strAbiKeyName = strTokenName + "_abi";
    if( ! ( strAddressKeyName in joABI_src && strAbiKeyName in joABI_src ) )
        throw new Error( "Failed to extract \"" + strTokenName + "\" token ABI, ABI JSON file \"" + strAbiPathSrc + "\" must contain \"" + strAddressKeyName + "\" and \"" + strAbiKeyName + "\" keys." );
    joABI_dst[strAddressKeyName] = JSON.parse( JSON.stringify( joABI_src[strAddressKeyName] ) );
    joABI_dst[strAbiKeyName] = JSON.parse( JSON.stringify( joABI_src[strAbiKeyName] ) );
    jsonFileSave( strAbiPathDst, joABI_dst, g_bVerbose );
}

async function s2s_prepare_chains_for_token_transfers( idxChainSrc, idxChainDst, joTokensAbiSC_src, joTokensAbiSC_dst, isAutomaticDeploy ) {
    if( ! g_arrChains[idxChainSrc].isStartEnabled )
        return;
    if( ! g_arrChains[idxChainDst].isStartEnabled )
        return;
    const joChainSrc = g_arrChains[idxChainSrc];
    const joChainDst = g_arrChains[idxChainDst];
    const schain_name_src = joChainSrc.name;
    const schain_name_dst = joChainDst.name;
    const cid_src = joChainSrc.cid;
    const cid_dst = joChainDst.cid;
    const arrNodeDescriptionsSrc = joChainSrc.arrNodeDescriptions;
    const arrNodeDescriptionsDst = joChainDst.arrNodeDescriptions;
    const nPreferredNodeIndexSrc = 0;
    const nPreferredNodeIndexDst = 0;
    const joNodeDescSrc = arrNodeDescriptionsSrc[nPreferredNodeIndexSrc];
    const joNodeDescDst = arrNodeDescriptionsDst[nPreferredNodeIndexDst];
    const w3schain_src = getWeb3FromURL( joNodeDescSrc.url );
    const w3schain_dst = getWeb3FromURL( joNodeDescDst.url );
    init_account_from_private_key( w3schain_src, g_strPrivateKeyImaSC );
    init_account_from_private_key( w3schain_dst, g_strPrivateKeyImaSC );
    const joImaAbiSC_src = joChainSrc.joImaAbiSC;
    const joImaAbiSC_dst = joChainDst.joImaAbiSC;
    const jo_message_proxy_s_chain_src = new w3schain_src.eth.Contract( joImaAbiSC_src.message_proxy_chain_abi, joImaAbiSC_src.message_proxy_chain_address );
    const jo_message_proxy_s_chain_dst = new w3schain_dst.eth.Contract( joImaAbiSC_dst.message_proxy_chain_abi, joImaAbiSC_dst.message_proxy_chain_address );
    const jo_token_manager_linker_src = new w3schain_src.eth.Contract( joImaAbiSC_src.token_manager_linker_abi, joImaAbiSC_src.token_manager_linker_address );
    const jo_token_manager_linker_dst = new w3schain_dst.eth.Contract( joImaAbiSC_dst.token_manager_linker_abi, joImaAbiSC_dst.token_manager_linker_address );
    const joAccount_src = { privateKey: "" + g_strPrivateKeyImaSC };
    const joAccount_dst = { privateKey: "" + g_strPrivateKeyImaSC };
    const address_src = private_key_2_account_address( w3schain_src, joAccount_src.privateKey );
    const address_dst = private_key_2_account_address( w3schain_dst, joAccount_dst.privateKey );

    await role_check_and_grant( // CHAIN_CONNECTOR_ROLE
        w3schain_src,
        cid_src,
        joAccount_src.privateKey,
        jo_message_proxy_s_chain_src,
        "CHAIN_CONNECTOR_ROLE",
        jo_token_manager_linker_src.options.address // addressTo, who gains role
    );
    await role_check_and_grant( // CHAIN_CONNECTOR_ROLE
        w3schain_dst,
        cid_dst,
        joAccount_dst.privateKey,
        jo_message_proxy_s_chain_dst,
        "CHAIN_CONNECTOR_ROLE",
        jo_token_manager_linker_dst.options.address // addressTo, who gains role
    );

    await role_check_and_grant( // REGISTRAR_ROLE
        w3schain_src,
        cid_src,
        joAccount_src.privateKey,
        jo_token_manager_linker_src,
        "REGISTRAR_ROLE",
        address_src // addressTo, who gains role
    );
    await role_check_and_grant( // REGISTRAR_ROLE
        w3schain_dst,
        cid_dst,
        joAccount_dst.privateKey,
        jo_token_manager_linker_dst,
        "REGISTRAR_ROLE",
        address_dst // addressTo, who gains role
    );

    if( ! isAutomaticDeploy ) {
        await s2s_link_test_tokens_ex(
            idxChainSrc, idxChainDst,
            w3schain_src, w3schain_dst,
            schain_name_src, schain_name_dst,
            cid_src, cid_dst,
            joAccount_src, joAccount_dst,
            joImaAbiSC_src, joImaAbiSC_dst,
            joTokensAbiSC_src, joTokensAbiSC_dst
        );
        // await s2s_link_test_tokens_ex(
        //     idxChainDst, idxChainSrc,
        //     w3schain_dst, w3schain_src,
        //     schain_name_dst, schain_name_src,
        //     cid_dst, cid_src,
        //     joAccount_dst, joAccount_src,
        //     joImaAbiSC_dst, joImaAbiSC_src,
        //     joTokensAbiSC_dst, joTokensAbiSC_src
        // );
    }
}

// async function s2s_link_chains_in_token_manager_linker( w3B, chainName_A, chainName_B, chainID_B, jo_token_manager_linker_B, joAccountDeployerB ) {
//     if( g_bVerbose )
//         log.write( cc.debug( "Will S<->S connect chain " ) + cc.note( chainName_A ) + cc.debug( " to chain " ) + cc.note( chainName_B ) + cc.debug( "..." ) + "\n" );
//     try {
//         const privateKey = joAccountDeployerB.privateKey;
//         const addr = private_key_2_account_address( w3B, joAccountDeployerB.privateKey );
//         const tcnt = parseIntOrHex( await get_web3_transactionCount( 10, w3B, addr, null ) );
//         const methodWithArguments_connect = jo_token_manager_linker_B.methods.connectSchain( chainName_A );
//         const dataTx = methodWithArguments_connect.encodeABI();
//         const rawTx = {
//             chainId: parseIntOrHex( chainID_B ),
//             from: addr,
//             nonce: "0x" + tcnt.toString( 16 ),
//             data: dataTx,
//             to: jo_token_manager_linker_B.options.address,
//             gasPrice: 10000000000,
//             gas: 8000000
//         };
//         const tx = compose_tx_instance( rawTx );
//         if( g_bVerbose )
//             log.write( cc.debug( "    TX is " ) + cc.j( tx ) + "\n" );
//         const key = ethereumjs_util.toBuffer( ensure_starts_with_0x( privateKey ) ); // convert private key to buffer
//         tx.sign( key ); // arg is privateKey as buffer
//         const serializedTx = tx.serialize();
//         const joReceipt = await safe_send_signed_transaction( w3B, serializedTx );
//         if( g_bVerbose ) {
//             log.write( cc.debug( "    Receipt is" ) + cc.j( joReceipt ) + "\n" );
//             log.write( cc.success( "Done, did S<->S connected chain " ) + cc.note( chainName_A ) + cc.success( " to chain " ) + cc.note( chainName_B ) + cc.success( "." ) + "\n" );
//         }
//         return joReceipt;
//     } catch ( err ) {
//         log.write( cc.fatal( "CRITICAL ERROR:" ) + cc.error( " Failed to S<->S connect chain " ) + cc.note( chainName_A ) + cc.error( " to chain " ) + cc.note( chainName_B ) + cc.error( ", error is: " ) + cc.warning( err.toString() ) + "\n" );
//     }
//     return null;
// }

async function s2s_link_test_tokens_ex(
    idxChainA, idxChainB,
    w3A, w3B,
    chainName_A, chainName_B,
    chainID_A, chainID_B,
    joAccountDeployerA, joAccountDeployerB,
    joImaAbiSC_A, joImaAbiSC_B,
    joTokensAbiSC_A, joTokensAbiSC_B
) {
    if( ! g_arrChains[idxChainA].isStartEnabled )
        return;
    if( ! g_arrChains[idxChainB].isStartEnabled )
        return;
    //
    // notice: chains are already connected to each other earlier
    //
    // const jo_token_manager_linker_A = new w3A.eth.Contract( joImaAbiSC_A.token_manager_linker_abi, joImaAbiSC_A.token_manager_linker_address );
    // const jo_token_manager_linker_B = new w3B.eth.Contract( joImaAbiSC_B.token_manager_linker_abi, joImaAbiSC_B.token_manager_linker_address );
    // await s2s_link_chains_in_token_manager_linker( w3B, chainName_A, chainName_B, chainID_B, jo_token_manager_linker_B, joAccountDeployerB );
    // await s2s_link_chains_in_token_manager_linker( w3A, chainName_A, chainName_B, chainID_A, jo_token_manager_linker_A, joAccountDeployerA );
    //
    //
    try {
        if( g_bVerbose ) {
            log.write( cc.debug( "Adding/registering " ) + cc.info( "ERC20" ) + cc.attention( "(S<->S)" ) + cc.debug( " contract on " ) + cc.info( chainName_A ) + cc.debug( " for " ) + cc.info( chainName_A ) + cc.debug( "..." ) + "\n" );
            log.write( "    " + cc.info( chainName_A ) + " " + cc.debug( "ERC20" ) + cc.attention( "(S<->S)" ) + cc.debug( " token address is " ) + cc.attention( joTokensAbiSC_A.ERC20_address ) + "\n" );
            log.write( "    " + cc.info( chainName_B ) + " " + cc.debug( "ERC20" ) + cc.attention( "(S<->S)" ) + cc.debug( " token address is " ) + cc.attention( joTokensAbiSC_B.ERC20_address ) + "\n" );
        }
        await doAddERC20TokenByOwnerSC(
            idxChainB,
            joAccountDeployerB.privateKey,
            chainName_A,
            joTokensAbiSC_A.ERC20_address,
            joTokensAbiSC_B.ERC20_address
        );
        if( g_bVerbose )
            log.write( cc.success( "Done." ) + "\n" );
    } catch ( err ) {
        log.write( cc.fatal( "CRITICAL ERROR: " ) + cc.error( " Got exception: " ) + cc.warning( err.toString() ) + "\n" );
    }
    try {
        if( g_bVerbose ) {
            log.write( cc.debug( "Adding/registering " ) + cc.info( "ERC721" ) + cc.attention( "(S<->S)" ) + cc.debug( " contract on " ) + cc.info( chainName_B ) + cc.debug( " for " ) + cc.info( chainName_A ) + cc.debug( "..." ) + "\n" );
            log.write( "    " + cc.info( chainName_A ) + " " + cc.debug( "ERC721" ) + cc.attention( "(S<->S)" ) + cc.debug( " token address is " ) + cc.attention( joTokensAbiSC_A.ERC721_address ) + "\n" );
            log.write( "    " + cc.info( chainName_B ) + " " + cc.debug( "ERC721" ) + cc.attention( "(S<->S)" ) + cc.debug( " token address is " ) + cc.attention( joTokensAbiSC_B.ERC721_address ) + "\n" );
        }
        await doAddERC721TokenByOwnerSC(
            idxChainB,
            joAccountDeployerB.privateKey,
            chainName_A,
            joTokensAbiSC_A.ERC721_address,
            joTokensAbiSC_B.ERC721_address,
            false // isWithMetadata721
        );
        if( g_bVerbose )
            log.write( cc.success( "Done." ) + "\n" );
    } catch ( err ) {
        log.write( cc.fatal( "CRITICAL ERROR: " ) + cc.error( " Got exception: " ) + cc.warning( err.toString() ) + "\n" );
    }
    try {
        if( g_bVerbose ) {
            log.write( cc.debug( "Adding/registering " ) + cc.info( "ERC721_with_metadata" ) + cc.attention( "(S<->S)" ) + cc.debug( " contract on " ) + cc.info( chainName_B ) + cc.debug( " for " ) + cc.info( chainName_A ) + cc.debug( "..." ) + "\n" );
            log.write( "    " + cc.info( chainName_A ) + " " + cc.debug( "ERC721_with_metadata" ) + cc.attention( "(S<->S)" ) + cc.debug( " token address is " ) + cc.attention( joTokensAbiSC_A.ERC721_with_metadata_address ) + "\n" );
            log.write( "    " + cc.info( chainName_B ) + " " + cc.debug( "ERC721_with_metadata" ) + cc.attention( "(S<->S)" ) + cc.debug( " token address is " ) + cc.attention( joTokensAbiSC_B.ERC721_with_metadata_address ) + "\n" );
        }
        await doAddERC721TokenByOwnerSC(
            idxChainB,
            joAccountDeployerB.privateKey,
            chainName_A,
            joTokensAbiSC_A.ERC721_with_metadata_address,
            joTokensAbiSC_B.ERC721_with_metadata_address,
            true // isWithMetadata721
        );
        if( g_bVerbose )
            log.write( cc.success( "Done." ) + "\n" );
    } catch ( err ) {
        log.write( cc.fatal( "CRITICAL ERROR: " ) + cc.error( " Got exception: " ) + cc.warning( err.toString() ) + "\n" );
    }
    try {
        if( g_bVerbose ) {
            log.write( cc.debug( "Adding/registering " ) + cc.info( "ERC1155" ) + cc.attention( "(S<->S)" ) + cc.debug( " contract on " ) + cc.info( chainName_B ) + cc.debug( " for " ) + cc.info( chainName_A ) + cc.debug( "..." ) + "\n" );
            log.write( "    " + cc.info( chainName_A ) + " " + cc.debug( "ERC1155" ) + cc.attention( "(S<->S)" ) + cc.debug( " token address is " ) + cc.attention( joTokensAbiSC_A.ERC1155_address ) + "\n" );
            log.write( "    " + cc.info( chainName_B ) + " " + cc.debug( "ERC1155" ) + cc.attention( "(S<->S)" ) + cc.debug( " token address is " ) + cc.attention( joTokensAbiSC_B.ERC1155_address ) + "\n" );
        }
        await doAddERC1155TokenByOwnerSC(
            idxChainB,
            joAccountDeployerB.privateKey,
            chainName_A,
            joTokensAbiSC_A.ERC1155_address,
            joTokensAbiSC_B.ERC1155_address
        );
        if( g_bVerbose )
            log.write( cc.success( "Done." ) + "\n" );
    } catch ( err ) {
        log.write( cc.fatal( "CRITICAL ERROR: " ) + cc.error( " Got exception: " ) + cc.warning( err.toString() ) + "\n" );
    }
}

function s2s_generate_dynamic_abi(
    strCoinName, // coin name in ABI: "ERC20", "ERC721", "ERC721_with_metadata", "ERC1155"
    instantiated_address_of_ercXXX,
    joTemplateAbiOnlyToClone,
    strPathSaveTo
) {
    const joABI = {};
    joABI[strCoinName + "_address"] = instantiated_address_of_ercXXX;
    joABI[strCoinName + "_abi"] = JSON.parse( JSON.stringify( joTemplateAbiOnlyToClone ) );
    jsonFileSave( strPathSaveTo, joABI, g_bVerbose );
    return joABI;
}

async function s2s_transfer(
    idxChainSrc,
    idxChainDst,
    joTokensAbiSC_src,
    joTokensAbiSC_dst, // can be null if auto-deploy mode and, usually, isForward = true
    joPerTokenData,
    strCoinName, // coin name in ABI: "ERC20", "ERC721", "ERC1155"
    isForward,
    spec_id, // null, token ID 721,
    spec_amount,
    isBatch,
    privateKeySrc,
    privateKeyDst
) {
    if( ! g_arrChains[idxChainSrc].isStartEnabled )
        return;
    if( ! g_arrChains[idxChainDst].isStartEnabled )
        return;
    const strForwardReverse = isForward ? "forward" : "reverse";
    strCoinName = replaceAll( strCoinName.toUpperCase(), "_WITH_METADATA", "_with_metadata" );
    const strCoinNameLC = strCoinName.toLowerCase();
    const strCoinNameLCshort = replaceAll( strCoinNameLC, "_with_metadata", "" );
    if( strCoinName !== "ERC1155" )
        isBatch = false;
    const joChainSrc = g_arrChains[idxChainSrc];
    const joChainDst = g_arrChains[idxChainDst];
    const arrNodeDescriptionsSrc = joChainSrc.arrNodeDescriptions;
    const arrNodeDescriptionsDst = joChainDst.arrNodeDescriptions;
    const nPreferredNodeIndexSrc = 0;
    const nPreferredNodeIndexDst = 0;
    const joNodeDescSrc = arrNodeDescriptionsSrc[nPreferredNodeIndexSrc];
    const joNodeDescDst = arrNodeDescriptionsDst[nPreferredNodeIndexDst];
    const w3schain_src = getWeb3FromURL( joNodeDescSrc.url );
    const w3schain_dst = getWeb3FromURL( joNodeDescDst.url );
    const contractERC20_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC20_abi, joTokensAbiSC_src.ERC20_address );
    const contractERC721_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC721_abi, joTokensAbiSC_src.ERC721_address );
    const contractERC721_with_metadata_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC721_with_metadata_abi, joTokensAbiSC_src.ERC721_with_metadata_address );
    const contractERC1155_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC1155_abi, joTokensAbiSC_src.ERC1155_address );
    let contractERC20_dst = null;
    let contractERC721_dst = null;
    let contractERC721_with_metadata_dst = null;
    let contractERC1155_dst = null;
    const isAutoInstantiationMode = ( ! joTokensAbiSC_dst ) ? true : false;
    try {
        contractERC20_dst = ( !isAutoInstantiationMode )
            ? new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC20_abi, joTokensAbiSC_dst.ERC20_address )
            : new w3schain_dst.eth.Contract( joPerTokenData.joInstantiatedAbiERC20_dst.ERC20_abi, joPerTokenData.joInstantiatedAbiERC20_dst.ERC20_address )
        ;
    } catch ( err ) { }
    try {
        contractERC721_dst = ( !isAutoInstantiationMode )
            ? new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC721_abi, joTokensAbiSC_dst.ERC721_address )
            : new w3schain_dst.eth.Contract( joPerTokenData.joInstantiatedAbiERC721_dst.ERC721_abi, joPerTokenData.joInstantiatedAbiERC721_dst.ERC721_address )
        ;
    } catch ( err ) { }
    try {
        contractERC721_with_metadata_dst = ( !isAutoInstantiationMode )
            ? new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC721_with_metadata_abi, joTokensAbiSC_dst.ERC721_with_metadata_address )
            : new w3schain_dst.eth.Contract( joPerTokenData.joInstantiatedAbiERC721_with_metadata_dst.ERC721_with_metadata_abi, joPerTokenData.joInstantiatedAbiERC721_with_metadata_dst.ERC721_with_metadata_address )
        ;
    } catch ( err ) { }
    try {
        contractERC1155_dst = ( !isAutoInstantiationMode )
            ? new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC1155_abi, joTokensAbiSC_dst.ERC1155_address )
            : new w3schain_dst.eth.Contract( joPerTokenData.joInstantiatedAbiERC1155_dst.ERC1155_abi, joPerTokenData.joInstantiatedAbiERC1155_dst.ERC1155_address )
        ;
    } catch ( err ) { }
    init_account_from_private_key( w3schain_src, privateKeySrc );
    init_account_from_private_key( w3schain_dst, privateKeyDst );
    const addressSrc = private_key_2_account_address( w3schain_src, privateKeySrc );
    const addressDst = private_key_2_account_address( w3schain_dst, privateKeyDst );
    let spec_before_src = null, spec_before_dst = null, spec_after_src = null, spec_after_dst = null;
    if( g_bVerbose ) {
        log.write( "\n\n" +
            cc.sunny( strCoinName ) + ( isBatch ? ( cc.bright( "/" ) + cc.info( "batch" ) ) : "" ) +
            cc.bright( "/" ) + cc.note( strForwardReverse ) +
            cc.bright( " token transfer between source S-Chain " ) + cc.attention( joChainSrc.name ) +
            cc.bright( " and target S-Chain " ) + cc.attention( joChainDst.name ) +
            ( isAutoInstantiationMode ? cc.debug( "(auto-deploy mode)" ) : "(statically linked mode)" ) +
            cc.bright( "..." ) + "\n\n" );
    }
    try {
        if( ! ( strCoinName === "ERC20" || strCoinName === "ERC721" || strCoinName === "ERC721_with_metadata" || strCoinName === "ERC1155" ) )
            throw new Error( "Unknown coin name \"" + strCoinName + "\" provided in s2s_transfer() parameters" );
        const fn_check_s2s_tokens = async function(
            contractERC20_check,
            contractERC721_check,
            contractERC721_with_metadata_check,
            contractERC1155_check,
            addressCheck
        ) {
            const joSpecResult = {
                spec_owner: null,
                spec_metadata: null,
                spec_ballance: null,
                address_token: null
            };
            switch ( strCoinName ) {
            case "ERC20":
                if( contractERC20_check )
                    joSpecResult.address_token = "" + contractERC20_check.options.address;
                try {
                    if( contractERC20_check )
                        joSpecResult.spec_ballance = await contractERC20_check.methods.balanceOf( addressCheck ).call( { from: addressCheck } );
                } catch ( err ) {
                    joSpecResult.spec_ballance = null;
                }
                break;
            case "ERC721":
                if( contractERC721_check )
                    joSpecResult.address_token = "" + contractERC721_check.options.address;
                try {
                    if( contractERC721_check )
                        joSpecResult.spec_owner = await contractERC721_check.methods.ownerOf( spec_id ).call( { from: addressCheck } );
                } catch ( err ) {
                    joSpecResult.spec_owner = null;
                }
                break;
            case "ERC721_with_metadata":
                if( contractERC721_with_metadata_check )
                    joSpecResult.address_token = "" + contractERC721_with_metadata_check.options.address;
                try {
                    if( contractERC721_with_metadata_check )
                        joSpecResult.spec_owner = await contractERC721_with_metadata_check.methods.ownerOf( spec_id ).call( { from: addressCheck } );
                } catch ( err ) {
                    joSpecResult.spec_owner = null;
                }
                try {
                    if( contractERC721_with_metadata_check )
                        joSpecResult.spec_metadata = await contractERC721_with_metadata_check.methods.tokenURI( spec_id ).call( { from: addressCheck } );
                } catch ( err ) {
                    joSpecResult.spec_metadata = null;
                }
                break;
            case "ERC1155":
                if( contractERC1155_check )
                    joSpecResult.address_token = "" + contractERC1155_check.options.address;
                if( isBatch ) {
                    try {
                        const arrAddressesCheck = [];
                        for( let idx = 0; idx < spec_id.length; ++ idx )
                            arrAddressesCheck.push( addressCheck );
                        if( contractERC1155_check )
                            joSpecResult.spec_ballance = await contractERC1155_check.methods.balanceOfBatch( arrAddressesCheck, spec_id ).call( { from: addressCheck } );
                    } catch ( err ) {
                        const arrNullBalances = []; // ERC1155-batch only needs it
                        for( let idx = 0; idx < spec_id.length; ++ idx )
                            arrNullBalances.push( null );
                        joSpecResult.spec_ballance = JSON.parse( JSON.stringify( arrNullBalances ) );
                    }
                } else {
                    try {
                        if( contractERC1155_check )
                            joSpecResult.spec_ballance = await contractERC1155_check.methods.balanceOf( addressCheck, spec_id ).call( { from: addressCheck } );
                    } catch ( err ) {
                        joSpecResult.spec_ballance = null;
                    }
                }
                break;
            } // switch( strCoinName )
            return joSpecResult;
        };
        spec_before_src = await fn_check_s2s_tokens(
            contractERC20_src, contractERC721_src, contractERC721_with_metadata_src, contractERC1155_src, addressSrc );
        spec_before_dst = await fn_check_s2s_tokens(
            contractERC20_dst, contractERC721_dst, contractERC721_with_metadata_dst, contractERC1155_dst, addressDst );
        let strTransferCommand =
            "node --no-warnings " +
            g_strFolderImaAgent + "/main" + g_strImaJsExt + g_strImaOutputOpts + g_strImaRuntimeOpts +
            " --s2s-payment " + ( isForward ? "--s2s-forward" : "--s2s-reverse" ) +
            " --value=60finney" +
            " --url-s-chain=" + joNodeDescSrc.url +
            " --url-t-chain=" + joNodeDescDst.url +
            " --id-s-chain=" + joChainSrc.name +
            " --id-t-chain=" + joChainDst.name +
            " --cid-s-chain=" + joChainSrc.cid +
            " --cid-t-chain=" + joChainDst.cid +
            " --abi-s-chain=" + get_ima_abi_schain_path( idxChainSrc ) +
            " --abi-t-chain=" + get_ima_abi_schain_path( idxChainDst )
            ;
        if( isForward ) {
            strTransferCommand += " --key-s-chain=" + privateKeySrc;
            strTransferCommand += " --" + strCoinNameLCshort + "-s-chain=" + joPerTokenData["strAbiPathTest" + strCoinName + "_src"];
        } else {
            strTransferCommand += " --key-t-chain=" + privateKeyDst;
            strTransferCommand += " --" + strCoinNameLCshort + "-t-chain=" + joPerTokenData["strAbiPathTest" + strCoinName + "_dst"];
            strTransferCommand += " --addr-" + strCoinNameLCshort + "-s-chain=" + joTokensAbiSC_src["" + strCoinName + "_address"];
        }
        switch ( strCoinName ) {
        case "ERC20":
            strTransferCommand += " --amount=" + spec_amount;
            break;
        case "ERC721":
        case "ERC721_with_metadata":
            strTransferCommand += " --tid=" + spec_id;
            if( strCoinName == "ERC721_with_metadata" )
                strTransferCommand += " --with-metadata";
            break;
        case "ERC1155":
            if( isBatch ) {
                strTransferCommand += " --tids=\"" + replaceAll( JSON.stringify( spec_id ), " ", "" ) + "\"";
                strTransferCommand += " --amounts=\"" + replaceAll( JSON.stringify( spec_amount ), " ", "" ) + "\"";
            } else {
                strTransferCommand += " --tid=" + spec_id;
                strTransferCommand += " --amount=" + spec_amount;
            }
            break;
        } // switch( strCoinName )
        const cntAttempts = 0 + g_nCntAttempts;
        const joEnv = { };
        await exec_array_of_commands_safe( [ strTransferCommand ], g_strFolderImaAgent, joEnv, 1 );
        if( isAutoInstantiationMode ) {
            // if auto-deploy mode
            const strSourceTokenContractAddress = joTokensAbiSC_src[strCoinName + "_address"];
            const instantiated_address_of_ercXXX =
                await wait_for_cloned_token_to_appear(
                    idxChainDst, strCoinNameLC,
                    addressDst, cntAttempts, nPreferredNodeIndexDst,
                    joChainSrc.name, strSourceTokenContractAddress
                );
            // const contractTokenManagerErcXXX = new w3schain_dst.eth.Contract(
            //     joChainDst.joImaAbiSC["token_manager_" + strCoinNameLC + "_abi"],
            //     joChainDst.joImaAbiSC["token_manager_" + strCoinNameLC + "_address"] );
            // const strCoinNameCap = capitalizeFirstLetter( strCoinNameLC );
            // const instantiated_address_of_ercXXX =
            //     await contractTokenManagerErcXXX.methods["clones" + strCoinNameCap](
            //         g_w3mod.utils.soliditySha3( joChainSrc.name ),
            //         strSourceTokenContractAddress
            //     ).call( { from: addressDst } );
            if( ! instantiated_address_of_ercXXX ) {
                throw new Error(
                    "Failed to find \"" + strCoinName +
                    "\" address instantiated on S-Chain \"" + joChainDst.name + "\""
                );
            }
            if( g_bVerbose ) {
                log.write(
                    cc.debug( "Found " ) + cc.sunny( strCoinName ) + cc.debug( " instantiated on " ) +
                    cc.sunny( "S-Chain" ) + " " + cc.info( joChainDst.name ) + cc.debug( " at address " ) +
                    cc.attention( instantiated_address_of_ercXXX ) +
                    "\n" );
            }
            const joABI = s2s_generate_dynamic_abi(
                strCoinName,
                instantiated_address_of_ercXXX,
                joTokensAbiSC_src[strCoinName + "_abi"],
                joPerTokenData["strAbiPathTest" + strCoinName + "_dst"]
            );
            const contractInstantiatedErcXXX_dst = new w3schain_dst.eth.Contract( joABI[strCoinName + "_abi"], joABI[strCoinName + "_address"] );
            joPerTokenData["joInstantiatedAbi" + strCoinName + "_dst"] = joABI;
            joPerTokenData["contractInstantiated" + strCoinName + "_dst"] = contractInstantiatedErcXXX_dst;
            switch ( strCoinName ) {
            case "ERC20": contractERC20_dst = contractInstantiatedErcXXX_dst; break;
            case "ERC721": contractERC721_dst = contractInstantiatedErcXXX_dst; break;
            case "ERC721_with_metadata": contractERC721_with_metadata_dst = contractInstantiatedErcXXX_dst; break;
            case "ERC1155": contractERC1155_dst = contractInstantiatedErcXXX_dst; break;
            } // switch( strCoinName )
            if( ! contractInstantiatedErcXXX_dst )
                throw new Error( "failed to find instantiated " + strCoinName + " token on S-Chain" );
            // if auto-deploy mode
        } // if( isAutoInstantiationMode )
        let isStateChanged = false;
        for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
            await sleep( 1000 );
            if( g_bVerbose )
                log.write( cc.debug( "Wait step " ) + cc.info( idxAttempt + 1 ) + cc.debug( " of " ) + cc.info( cntAttempts ) + "\n" );
            spec_after_src = await fn_check_s2s_tokens(
                contractERC20_src, contractERC721_src, contractERC721_with_metadata_src, contractERC1155_src, addressSrc );
            spec_after_dst = await fn_check_s2s_tokens(
                contractERC20_dst, contractERC721_dst, contractERC721_with_metadata_dst, contractERC1155_dst, addressDst );
            const bChangedSrc = ( JSON.stringify( spec_after_src ) !== JSON.stringify( spec_before_src ) ) ? true : false;
            const bChangedDst = ( JSON.stringify( spec_after_dst ) !== JSON.stringify( spec_before_dst ) ) ? true : false;
            if( g_bVerbose ) {
                log.write( cc.debug( ".........source state before is...." ) + cc.j( spec_before_src ) + "\n" );
                log.write( cc.debug( ".........source state after is....." ) + cc.j( spec_after_src ) + "\n" );
                log.write( cc.debug( "....destination state before is...." ) + cc.j( spec_before_dst ) + "\n" );
                log.write( cc.debug( "....destination state after is....." ) + cc.j( spec_after_dst ) + "\n" );
            }
            if( bChangedSrc ) {
                if( bChangedDst ) {
                    if( g_bVerbose )
                        log.write( cc.success( "SUCCESS: Waiting done, both source and target token owner/balance changed." ) + "\n" );
                    isStateChanged = true;
                    break;
                } else {
                    if( g_bVerbose )
                        log.write( cc.notice( "NOTICE:" ) + cc.warning( " Only source token owner/balance changed." ) + "\n" );
                }

            } else {
                if( bChangedDst ) {
                    if( g_bVerbose )
                        log.write( cc.notice( "NOTICE:" ) + cc.warning( " Only target token owner/balance changed." ) + "\n" );
                } else {
                    if( g_bVerbose )
                        log.write( cc.notice( "NOTICE:" ) + cc.error( " Nothing changed, continue waiting..." ) + "\n" );
                }
            }
        } //  for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt )
        if( ! isStateChanged )
            throw new Error( strCoinName + " owner/balance was not changed" );
        //
        // compare detailed fields for special cases
        switch ( strCoinName ) {
        case "ERC721_with_metadata": {
            //if( spec_after_dst.spec_metadata != spec_before_src.spec_metadata ) {
            const a = isForward ? spec_after_dst.spec_metadata : spec_after_src.spec_metadata; // a - after
            // const b = isForward ? spec_before_dst.spec_metadata : spec_before_src.spec_metadata; // b - before
            // if( a != b )
            //     throw new Error( strCoinName + " metadata transfer fail, expecting \"" + b + "\" but have \"" + a + "\"" );
            if( a.indexOf( "data/images/image_" + spec_id + ".png" ) < 0 )
                throw new Error( strCoinName + " metadata transfer fail" );
        } break;
        }
        //
        if( g_bVerbose ) {
            log.write(
                cc.success( "Done, finished " ) + cc.sunny( strCoinName ) + ( isBatch ? ( cc.success( "/" ) + cc.info( "batch" ) ) : "" ) +
                cc.success( "/" ) + cc.note( strForwardReverse ) +
                cc.success( " token transfer between source S-Chain " ) + cc.attention( joChainSrc.name ) +
                cc.success( " and target S-Chain " ) + cc.attention( joChainDst.name ) +
                ( isAutoInstantiationMode ? cc.debug( "(auto-deploy mode)" ) : "(statically linked mode)" ) +
                cc.success( "." ) + "\n" );
        }
    } catch ( err ) {
        log.write( cc.debug( ".........latest known source state before is...." ) + cc.j( spec_before_src ) + "\n" );
        log.write( cc.debug( ".........latest known source state after is....." ) + cc.j( spec_after_src ) + "\n" );
        log.write( cc.debug( "....latest known destination state before is...." ) + cc.j( spec_before_dst ) + "\n" );
        log.write( cc.debug( "....latest known destination state after is....." ) + cc.j( spec_after_dst ) + "\n" );
        log.write(
            cc.fatal( "ERROR:" ) + cc.error( " Failed " ) +
            cc.sunny( strCoinName ) + ( isBatch ? ( cc.error( "/" ) + cc.info( "batch" ) ) : "" ) +
            cc.error( "/" ) + cc.note( strForwardReverse ) +
            cc.error( " token transfer between source S-Chain " ) + cc.attention( joChainSrc.name ) +
            cc.error( " and target S-Chain " ) + cc.attention( joChainDst.name ) +
            ( isAutoInstantiationMode ? cc.debug( "(auto-deploy mode)" ) : "(statically linked mode)" ) +
            cc.error( ", error is: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 74 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function safe_send_signed_transaction( w3, serializedTx ) {
    const strTX = "0x" + serializedTx.toString( "hex" ); // strTX is string starting from "0x"
    let joReceipt = null;
    let bHaveReceipt = false;
    try {
        joReceipt = await w3.eth.sendSignedTransaction( strTX );
        bHaveReceipt = ( joReceipt != null );
    } catch ( err ) {
    }
    if( !bHaveReceipt ) {
        try {
            joReceipt = await w3.eth.sendSignedTransaction( strTX );
        } catch ( err ) {
            throw err;
        }
    }
    return joReceipt;
}

async function get_web3_transactionCount( attempts, w3, address, param ) {
    let allAttempts = parseIntOrHex( attempts );
    if( allAttempts < 1 )
        allAttempts = 1;
    let txc = "";
    try {
        txc = await w3.eth.getTransactionCount( address, param );
    } catch ( err ) {}
    let attemptIndex = 2;
    while( txc === "" && attemptIndex <= allAttempts ) {
        if( g_nTimeToSleepWeb3TransactionCountStepMilliseconds > 0 )
            await sleep( g_nTimeToSleepWeb3TransactionCountStepMilliseconds );

        try {
            txc = await w3.eth.getTransactionCount( address, param );
        } catch ( err ) {}
        attemptIndex++;
    }
    if( attemptIndex + 1 > allAttempts && txc === "" )
        throw new Error( "Could not not get Transaction Count" );
    return txc;
}

function compose_tx_instance( rawTx ) {
    rawTx = JSON.parse( JSON.stringify( rawTx ) ); // clone
    const joOpts = null;
    // if( "chainId" in rawTx && typeof rawTx.chainId == "number" ) {
    //     switch ( rawTx.chainId ) {
    //     case 1:
    //         delete rawTx.chainId;
    //         joOpts = joOpts || { };
    //         joOpts.chain = "mainnet";
    //         break;
    //     case 3:
    //         delete rawTx.chainId;
    //         joOpts = joOpts || { };
    //         joOpts.chain = "ropsten";
    //         break;
    //     case 4:
    //         delete rawTx.chainId;
    //         joOpts = joOpts || { };
    //         joOpts.chain = "rinkeby";
    //         break;
    //     case 5:
    //         delete rawTx.chainId;
    //         joOpts = joOpts || { };
    //         joOpts.chain = "goerli";
    //         break;
    //     case 2018:
    //         delete rawTx.chainId;
    //         joOpts = joOpts || { };
    //         joOpts.chain = "dev";
    //         break;
    //     // default:
    //     //     joOpts = joOpts || { };
    //     //     joOpts.common = joOpts.common || { };
    //     //     joOpts.common.name = "chain" + rawTx.chainId;
    //     //     // joOpts.common.networkId = 123;
    //     //     joOpts.common.chainId = parseIntOrHex( rawTx.chainId );
    //     //     // joOpts.hardfork = "petersburg";
    //     //     delete rawTx.chainId;
    //     //     break;
    //     } // switch( rawTx.chainId )
    // }
    let tx = null;
    if( joOpts )
        tx = new ethereumjs_tx( rawTx, joOpts );
    else
        tx = new ethereumjs_tx( rawTx );
    return tx;
}

async function execute_send_on_method_with_arguments( w3, cid, privateKey, methodWithArguments, contractAddress, gasPrice, gasLimit, cntAttempts, nSleepTimeBetweenAttempts, isLog, isErr ) {
    cntAttempts = cntAttempts || 10;
    nSleepTimeBetweenAttempts = nSleepTimeBetweenAttempts || g_nSleepTimeBetweenContractMethodInvocationAttemptsMilliseconds;
    if( isLog === null || isLog === undefined )
        isLog = false;
    if( isErr === null || isErr === undefined )
        isErr = true;
    for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
        try {
            const dataTx = methodWithArguments.encodeABI(); // the encoded ABI of the method
            const strAddressFrom = private_key_2_account_address( w3, privateKey );
            const tcnt = await get_web3_transactionCount( 10, w3, strAddressFrom, null );
            const rawTx = {
                chainId: parseIntOrHex( cid ),
                nonce: tcnt,
                gasPrice: gasPrice || 10000000000,
                gasLimit: gasLimit || 8000000,
                to: contractAddress,
                data: dataTx
            };
            const tx = compose_tx_instance( rawTx );
            if( isLog )
                log.write( cc.debug( "    TX is " ) + cc.j( tx ) + "\n" );
            const key = ethereumjs_util.toBuffer( ensure_starts_with_0x( privateKey ) ); // convert private key to buffer
            tx.sign( key ); // arg is privateKey as buffer
            const serializedTx = tx.serialize();
            const joReceipt = await safe_send_signed_transaction( w3, serializedTx );
            if( isLog )
                log.write( cc.debug( "    Receipt is" ) + cc.j( joReceipt ) + "\n" );
            return joReceipt;
        } catch ( err ) {
            if( isErr )
                log.write( cc.fatal( "FAILED" ) + cc.error( " execution attempt " ) + cc.info( idxAttempt + 1 ) + cc.error( "/" ) + cc.info( cntAttempts ) + cc.error( ": " ) + cc.warning( err.toString() ) + "\n" );
        }
        if( idxAttempt < ( cntAttempts - 1 ) && nSleepTimeBetweenAttempts > 0 ) {
            log.write( cc.debug( ".......Sleeping " ) + cc.info( nSleepTimeBetweenAttempts ) + cc.debug( " milliseconds..." ) + "\n" );
            await sleep( nSleepTimeBetweenAttempts );
            log.write( cc.debug( ".......Done, was slept " ) + cc.info( nSleepTimeBetweenAttempts ) + cc.debug( " milliseconds." ) + "\n" );
        }
    }
    return null;
}

async function run_cross_chain_chat_test_m2s( idxChainDst ) {
    if( ! g_arrChains[idxChainDst].isStartEnabled )
        return;
    const arrNodeDescriptionsDst = g_arrChains[idxChainDst].arrNodeDescriptions;
    const nPreferredNodeIndexDst = 0;
    const schain_name_dst = g_arrChains[idxChainDst].name;
    const cid_dst = g_arrChains[idxChainDst].cid;
    const joNodeDescDst = arrNodeDescriptionsDst[nPreferredNodeIndexDst];
    const w3schain_dst = getWeb3FromURL( joNodeDescDst.url );
    init_account_from_private_key( w3schain_dst, g_strPrivateKeyImaSC );
    const joImaAbiSC_dst = g_arrChains[idxChainDst].joImaAbiSC;
    const src = {
        isMainNet: true,
        name: "" + g_strMainnetName,
        chainId: parseIntOrHex( cid_main_net ),
        w3: g_w3_main_net,
        personName: "Alice",
        strPrivateKey: g_strPrivateKeyImaMN,
        joImaAbi: g_joImaAbiMN,
        joAbiTestTokens: g_joAbiTestTokensMN,
        joChatParticipant: null,
        jo_message_proxy: null
    };
    const dst = {
        isMainNet: false,
        name: "" + schain_name_dst,
        chainId: parseIntOrHex( cid_dst ),
        w3: w3schain_dst,
        personName: "Bob",
        strPrivateKey: g_strPrivateKeyImaSC,
        joImaAbi: joImaAbiSC_dst,
        joAbiTestTokens: g_joAbiTestTokensSC,
        joChatParticipant: null,
        jo_message_proxy: null
    };
    return await run_cross_chain_chat_test_impl( "M<->S", src, dst, !g_bIsTestChatM2S );
}

async function run_cross_chain_chat_test_s2s( idxChainSrc, idxChainDst, joAbiTestTokensSrc, joAbiTestTokensDst ) {
    if( ! g_arrChains[idxChainSrc].isStartEnabled )
        return;
    if( ! g_arrChains[idxChainDst].isStartEnabled )
        return;
    const arrNodeDescriptionsSrc = g_arrChains[idxChainSrc].arrNodeDescriptions;
    const arrNodeDescriptionsDst = g_arrChains[idxChainDst].arrNodeDescriptions;
    const nPreferredNodeIndexSrc = 0;
    const nPreferredNodeIndexDst = 0;
    const schain_name_src = g_arrChains[idxChainSrc].name;
    const schain_name_dst = g_arrChains[idxChainDst].name;
    const cid_src = g_arrChains[idxChainSrc].cid;
    const cid_dst = g_arrChains[idxChainDst].cid;
    const joNodeDescSrc = arrNodeDescriptionsSrc[nPreferredNodeIndexSrc];
    const joNodeDescDst = arrNodeDescriptionsDst[nPreferredNodeIndexDst];
    const w3schain_src = getWeb3FromURL( joNodeDescSrc.url );
    const w3schain_dst = getWeb3FromURL( joNodeDescDst.url );
    init_account_from_private_key( w3schain_src, g_strPrivateKeyImaSC );
    init_account_from_private_key( w3schain_dst, g_strPrivateKeyImaSC );
    const joImaAbiSC_src = g_arrChains[idxChainSrc].joImaAbiSC;
    const joImaAbiSC_dst = g_arrChains[idxChainDst].joImaAbiSC;
    const src = {
        isMainNet: false,
        name: "" + schain_name_src,
        chainId: parseIntOrHex( cid_src ),
        w3: w3schain_src,
        personName: "Olivia",
        strPrivateKey: g_strPrivateKeyImaSC,
        joImaAbi: joImaAbiSC_src,
        joAbiTestTokens: joAbiTestTokensSrc,
        joChatParticipant: null,
        jo_message_proxy: null
    };
    const dst = {
        isMainNet: false,
        name: "" + schain_name_dst,
        chainId: parseIntOrHex( cid_dst ),
        w3: w3schain_dst,
        personName: "William",
        strPrivateKey: g_strPrivateKeyImaSC,
        joImaAbi: joImaAbiSC_dst,
        joAbiTestTokens: joAbiTestTokensDst,
        joChatParticipant: null,
        jo_message_proxy: null
    };
    return await run_cross_chain_chat_test_impl( "S<->S", src, dst, !g_bIsTestChatS2S );
}

async function run_cross_chain_chat_test_impl( strChatType, src, dst, isSkipThisCrossChainChatTest ) {
    try {
        if( g_bVerbose ) {
            log.write( "\n\n" +
                cc.bright( "Running " ) + cc.attention( strChatType ) + " " + cc.sunny( "Cross Chain Chat" ) +
                cc.bright( " test between " ) + cc.attention( src.name ) + cc.sunny( " and " ) +
                cc.attention( dst.name ) + cc.bright( "..." ) + "\n\n" );
        }
        if( isSkipThisCrossChainChatTest ) {
            log.write(
                "\n" +
                cc.warning( "WARNING: " ) + cc.attention( strChatType ) + cc.warning( " chat test is disabled and will be skipped" ) +
                "\n\n" );
            return;
        }
        if( g_nTimeToSleepBeforeCrossChainChatTestMilliseconds > 0 ) {
            log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepBeforeCrossChainChatTestMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
            await sleep( g_nTimeToSleepBeforeCrossChainChatTestMilliseconds );
            log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepBeforeCrossChainChatTestMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
        }
        init_account_from_private_key( src.w3, src.strPrivateKey );
        init_account_from_private_key( dst.w3, dst.strPrivateKey );
        //
        if( g_bVerbose )
            log.write( cc.debug( "Initializing " ) + cc.attention( strChatType ) + " " + cc.sunny( "Cross Chain Chat" ) + cc.debug( " test..." ) + "\n" );
        src.joChatParticipant = new src.w3.eth.Contract( src.joAbiTestTokens.ChatParticipant_abi, src.joAbiTestTokens.ChatParticipant_address );
        dst.joChatParticipant = new dst.w3.eth.Contract( dst.joAbiTestTokens.ChatParticipant_abi, dst.joAbiTestTokens.ChatParticipant_address );
        src.jo_message_proxy = new src.w3.eth.Contract(
            src.isMainNet ? src.joImaAbi.message_proxy_mainnet_abi : src.joImaAbi.message_proxy_chain_abi,
            src.isMainNet ? src.joImaAbi.message_proxy_mainnet_address : src.joImaAbi.message_proxy_chain_address
        );
        dst.jo_message_proxy = new dst.w3.eth.Contract(
            dst.isMainNet ? dst.joImaAbi.message_proxy_mainnet_abi : dst.joImaAbi.message_proxy_chain_abi,
            dst.isMainNet ? dst.joImaAbi.message_proxy_mainnet_address : dst.joImaAbi.message_proxy_chain_address
        );
        //
        if( g_bVerbose )
            log.write( cc.debug( "Initializing " ) + cc.attention( src.name ) + cc.debug( " chat participant, chain name..." ) + "\n" );
        const methodWithArguments_setThisChainName_src = src.joChatParticipant.methods.setThisChainName( src.name );
        await execute_send_on_method_with_arguments( src.w3, src.chainId, src.strPrivateKey, methodWithArguments_setThisChainName_src, src.joChatParticipant.options.address );
        if( g_bVerbose )
            log.write( cc.debug( "Initializing " ) + cc.attention( src.name ) + cc.debug( " chat participant, message proxy..." ) + "\n" );
        const methodWithArguments_setMessageProxy_src = src.joChatParticipant.methods.setMessageProxy( src.jo_message_proxy.options.address ); // src.joImaAbi.message_proxy_mainnet_address
        await execute_send_on_method_with_arguments( src.w3, src.chainId, src.strPrivateKey, methodWithArguments_setMessageProxy_src, src.joChatParticipant.options.address );
        if( g_bVerbose )
            log.write( cc.debug( "Initializing " ) + cc.attention( src.name ) + cc.debug( " chat participant, other participant reference..." ) + "\n" );
        const methodWithArguments_setOtherParticipant_src = src.joChatParticipant.methods.setOtherParticipant( dst.joChatParticipant.options.address );
        await execute_send_on_method_with_arguments( src.w3, src.chainId, src.strPrivateKey, methodWithArguments_setOtherParticipant_src, src.joChatParticipant.options.address );
        //
        if( g_bVerbose )
            log.write( cc.debug( "Initializing " ) + cc.attention( dst.name ) + cc.debug( " chat participant, chain name..." ) + "\n" );
        const methodWithArguments_setThisChainName_dst = dst.joChatParticipant.methods.setThisChainName( dst.name );
        await execute_send_on_method_with_arguments( dst.w3, dst.chainId, dst.strPrivateKey, methodWithArguments_setThisChainName_dst, dst.joChatParticipant.options.address );
        if( g_bVerbose )
            log.write( cc.debug( "Initializing " ) + cc.attention( dst.name ) + cc.debug( " chat participant, message proxy..." ) + "\n" );
        const methodWithArguments_setMessageProxy_dst = dst.joChatParticipant.methods.setMessageProxy( dst.jo_message_proxy.options.address ); // dst.joImaAbi.message_proxy_chain_address
        await execute_send_on_method_with_arguments( dst.w3, dst.chainId, dst.strPrivateKey, methodWithArguments_setMessageProxy_dst, dst.joChatParticipant.options.address );
        if( g_bVerbose )
            log.write( cc.debug( "Initializing " ) + cc.attention( dst.name ) + cc.debug( " chat participant, other participant reference..." ) + "\n" );
        const methodWithArguments_setOtherParticipant_dst = dst.joChatParticipant.methods.setOtherParticipant( src.joChatParticipant.options.address );
        await execute_send_on_method_with_arguments( dst.w3, dst.chainId, dst.strPrivateKey, methodWithArguments_setOtherParticipant_dst, dst.joChatParticipant.options.address );
        //
        if( g_bVerbose )
            log.write( cc.debug( "Granting the " ) + cc.notice( "EXTRA_CONTRACT_REGISTRAR_ROLE" ) + cc.debug( " role on " ) + cc.attention( src.name ) + cc.debug( "..." ) + "\n" );
        await role_check_and_grant( // EXTRA_CONTRACT_REGISTRAR_ROLE
            src.w3,
            src.chainId,
            src.strPrivateKey,
            src.jo_message_proxy,
            "EXTRA_CONTRACT_REGISTRAR_ROLE",
            private_key_2_account_address( src.w3, src.strPrivateKey )
        );
        if( g_bVerbose )
            log.write( cc.debug( "Granting the " ) + cc.notice( "EXTRA_CONTRACT_REGISTRAR_ROLE" ) + cc.debug( " role on " ) + cc.attention( dst.name ) + cc.debug( "..." ) + "\n" );
        await role_check_and_grant( // EXTRA_CONTRACT_REGISTRAR_ROLE
            dst.w3,
            dst.chainId,
            dst.strPrivateKey,
            dst.jo_message_proxy,
            "EXTRA_CONTRACT_REGISTRAR_ROLE",
            private_key_2_account_address( dst.w3, dst.strPrivateKey )
        );
        if( g_bVerbose )
            log.write( cc.debug( "Registering " ) + cc.attention( src.name ) + cc.debug( " chat participant..." ) + "\n" );
        const methodWithArguments_registerExtraContract_src = src.jo_message_proxy.methods.registerExtraContract( dst.name, src.joChatParticipant.options.address );
        await execute_send_on_method_with_arguments( src.w3, src.chainId, src.strPrivateKey, methodWithArguments_registerExtraContract_src, src.jo_message_proxy.options.address ); // src.joImaAbi.message_proxy_mainnet_address
        if( g_bVerbose )
            log.write( cc.debug( "Registering " ) + cc.attention( dst.name ) + cc.debug( " chat participant..." ) + "\n" );
        const methodWithArguments_registerExtraContract_dst = dst.jo_message_proxy.methods.registerExtraContract( src.name, dst.joChatParticipant.options.address );
        await execute_send_on_method_with_arguments( dst.w3, dst.chainId, dst.strPrivateKey, methodWithArguments_registerExtraContract_dst, dst.jo_message_proxy.options.address ); // dst.joImaAbi.message_proxy_chain_address
        //
        if( g_nTimeToSleepAfterChartParticipantsInitializedMilliseconds > 0 ) {
            log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepAfterChartParticipantsInitializedMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
            await sleep( g_nTimeToSleepAfterChartParticipantsInitializedMilliseconds );
            log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepAfterChartParticipantsInitializedMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
        }
        //
        const arrChatPlan = [
            { direction: ">>>", text: "Hi " + dst.personName + "!" },
            { direction: "<<<", text: "Hi " + src.personName + "!" },
            { direction: ">>>", text: "How are you, " + dst.personName + "?" },
            { direction: "<<<", text: "I am OKay, " + src.personName + ", and you?" },
            { direction: ">>>", text: "Me is fine!" },
            { direction: "<<<", text: "Nice to meet you!" }
        ];
        for( let idxChatMessage = 0; idxChatMessage < arrChatPlan.length; ++ idxChatMessage ) {
            const joPlannedMessage = arrChatPlan[idxChatMessage];
            const nicknameSrc = ( joPlannedMessage.direction == ">>>" ) ? src.personName : dst.personName;
            const nicknameDst = ( joPlannedMessage.direction == ">>>" ) ? dst.personName : src.personName;
            const joChatParticipantSrc = ( joPlannedMessage.direction == ">>>" ) ? src.joChatParticipant : dst.joChatParticipant;
            const joChatParticipantDst = ( joPlannedMessage.direction == ">>>" ) ? dst.joChatParticipant : src.joChatParticipant;
            const w3Src = ( joPlannedMessage.direction == ">>>" ) ? src.w3 : dst.w3;
            const w3Dst = ( joPlannedMessage.direction == ">>>" ) ? dst.w3 : src.w3;
            const chainNameDst = ( joPlannedMessage.direction == ">>>" ) ? dst.name : src.name;
            const cid_src = ( joPlannedMessage.direction == ">>>" ) ? src.chainId : dst.chainId;
            const privateKeySrc = ( joPlannedMessage.direction == ">>>" ) ? src.strPrivateKey : dst.strPrivateKey;
            const privateKeyDst = ( joPlannedMessage.direction == ">>>" ) ? dst.strPrivateKey : src.strPrivateKey;
            // const strAddressSrc = private_key_2_account_address( w3Src, privateKeySrc );
            const strAddressDst = private_key_2_account_address( w3Dst, privateKeyDst );
            if( g_bVerbose )
                log.write( cc.info( joPlannedMessage.direction ) + cc.debug( ", " ) + cc.attention( nicknameSrc ) + cc.debug( " to " ) + cc.attention( nicknameDst ) + cc.debug( " => " ) + cc.bright( joPlannedMessage.text ) + "\n" );
            const methodWithArguments_sendToOtherChain = joChatParticipantSrc.methods.sendToOtherChain( chainNameDst, nicknameSrc, joPlannedMessage.text );
            if( ! await execute_send_on_method_with_arguments( w3Src, cid_src, privateKeySrc, methodWithArguments_sendToOtherChain, joChatParticipantSrc.options.address ) )
                continue;
            let msg = null, bHaveDelivery = false;
            for( let idxAttempt = 0; idxAttempt < g_nChatMessageDeliveryWaitSteps; ++ idxAttempt ) {
                if( g_nTimeToSleepBeforeWaitChatMessageArrivedMilliseconds > 0 ) {
                    log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepBeforeWaitChatMessageArrivedMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
                    await sleep( g_nTimeToSleepBeforeWaitChatMessageArrivedMilliseconds );
                    log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepBeforeWaitChatMessageArrivedMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
                }
                try {
                    const lastReceivedMessage = await joChatParticipantDst.methods.getLastReceivedMessage().call( { from: strAddressDst } );
                    msg = { nickname: "" + lastReceivedMessage.nickname_, text: "" + lastReceivedMessage.text_ };
                    if( nicknameSrc == msg.nickname && joPlannedMessage.text == msg.text ) {
                        bHaveDelivery = true;
                        break;
                    }
                } catch ( err ) {
                }
            } // for( let idxAttempt = 0; idxAttempt < g_nChatMessageDeliveryWaitSteps; ++ idxAttempt )
            if( ! bHaveDelivery ) {
                if( g_bVerbose )
                    log.write( cc.debug( "<<< lastReceivedMessage:" ) + cc.j( msg ) + "\n" );
                log.write( cc.fatal( " !!! " ) + cc.error( "INTERCHAIN CHAT ERROR: Last delivered message is different then last sent one" ) + "\n" );
                await end_of_test( 75 );
            }
        } // for( let idxChatMessage = 0; idxChatMessage < arrChatPlan.length; ++ idxChatMessage )
        if( g_bVerbose ) {
            log.write(
                cc.success( "Successfully finished " ) + cc.attention( strChatType ) + " " + cc.sunny( "Cross Chain Chat" ) +
                cc.success( " test" ) + cc.success( "." ) + "\n" );
        }
    } catch ( err ) {
        log.write( cc.fatal( "CRITICAL ERROR:" ) + cc.error( " The " ) + cc.attention( strChatType ) + " " +
            cc.sunny( "Cross Chain Chat" ) + cc.error( " test exception: " ) + cc.warning( err.toString() ) + "\n" );
        await end_of_test( 76 );
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if( g_bVerbose ) {
    log.write( cc.normal( "Assuming " ) + cc.sunny( "bls_glue" ) + cc.normal( "   is " ) + cc.info( g_strFolderAppCacheBin + "/bls_glue" ) + "\n" );
    log.write( cc.normal( "Assuming " ) + cc.sunny( "hash_g1" ) + cc.normal( "    is " ) + cc.info( g_strFolderAppCacheBin + "/hash_g1" ) + "\n" );
    log.write( cc.normal( "Assuming " ) + cc.sunny( "verify_bls" ) + cc.normal( " is " ) + cc.info( g_strFolderAppCacheBin + "/verify_bls" ) + "\n" );
}

function init_account_from_private_key( w3, strPrivateKey ) {
    try {
        strPrivateKey = ensure_starts_with_0x( strPrivateKey );
        if( g_bVerbose )
            log.write( cc.notice( "Initializing local account from private key " ) + cc.bright( strPrivateKey ) + "\n" );
        const rv = w3.eth.accounts.privateKeyToAccount( strPrivateKey );
        if( g_bVerbose )
            log.write( cc.success( "Done, initialized local account from private key " ) + cc.bright( strPrivateKey ) + cc.success( ", result is: " ) + cc.j( rv ) + "\n" );
        // w3.eth.personal.unlockAccount( private_key_2_account_address( w3, strPrivateKey ), "" );
        w3.eth.accounts.wallet.add( strPrivateKey );
    } catch ( err ) {
        log.write( cc.fatal( "CRITICAL ERROR:" ) + cc.error( " Failed to initialize local account from private key " ) + cc.bright( strPrivateKey ) + cc.error( ", error is: " ) + cc.warning( err.toString() ) + "\n" );
    }
}

async function run() {
    if( g_bUpdateSkaledToLatestFromGithub ) {
        const joRelease = await skaled_find_latest_release( g_strSkaledReleaseTagCookie );
        // console.log( joRelease );
        await skaled_download_release( joRelease );
    }
    mainnet_prepare();
    await all_skaled_nodes_prepare();
    mainnet_start();
    // // // // //setTimeout( async function() {
    if( g_bVerbose )
        log.write( cc.normal( "Connecting to " ) + cc.success( "MAIN NET" ) + cc.normal( " via " ) + cc.u( g_strMainNetURL ) + "\n" );
    g_w3_main_net = getWeb3FromURL( g_strMainNetURL );
    //
    init_account_from_private_key( g_w3_main_net, g_strPrivateKeySkaleManagerMN );
    init_account_from_private_key( g_w3_main_net, g_strPrivateKeyImaMN );
    init_account_from_private_key( g_w3_main_net, g_strPrivateKeyImaSC );
    init_account_from_private_key( g_w3_main_net, "1016316fe598b437cfd518c02f67467385b018e61fd048325c7e7c9e5e07cd2a" ); // node "Aldo" with nodeAddress "0xa68f946090c600eda6f139783077ee802afeb990"
    init_account_from_private_key( g_w3_main_net, "14e7e34f77749217477a6c36ddff3f5b5f217c67782dd7cc4ec4c0f9997f968b" ); // node "Bear" with nodeAddress "0x88fd5e01078629cc194c933d9631b9448fe10b1d"
    for( let idxNodeKey = 0; idxNodeKey < g_arrEcdsaKeysCache.length; ++ idxNodeKey ) {
        const joCachedKey = g_arrEcdsaKeysCache[idxNodeKey];
        init_account_from_private_key( g_w3_main_net, joCachedKey.privateKey );
    }
    //
    await redeploy_skale_manager( g_w3_main_net );
    await reload_deployed_skale_manager( g_w3_main_net );
    await sm_pre_configure( g_w3_main_net );
    await sm_init_validator( g_w3_main_net );
    await sm_init_node_addresses_all( g_w3_main_net );
    await init_sgx_sm_dkg_all();
    await rebuild_ima();
    await redeploy_ima_to_main_net();
    await reload_ima_abi_for_main_net();
    await generate_predeployed_artifacts_all();
    all_skaled_nodes_fix_config_json();
    await all_skaled_nodes_init_BTRFS_if_needed();
    await all_skaled_nodes_start();
    await redeploy_ima_to_schain_all();
    await reload_ima_abi_for_schain_all();
    g_w3_main_net = getWeb3FromURL( g_strMainNetURL );
    if( ! g_bSkipStartStopSChainOnImaDeploy )
        await all_skaled_nodes_stop();
    await ima_register_sgx_keys();
    await ima_update_skaled_configurations_all();
    if( ! g_bSkipStartStopSChainOnImaDeploy )
        await all_skaled_nodes_start();

    if( g_bAskToContinueBeforeImaInit ) {
        log.write(
            "\n\n" + cc.normal( "Press " ) + cc.attention( "<ENTER>" ) +
            cc.normal( " to continue test with " ) + cc.bright( "IMA initialization" ) +
            cc.normal( "..." ) + "\n" );
        wait_ENTER_key_press_on_console();
        log.write( cc.normal( "Resuming test..." ) + "\n" );
    }

    for( let idxChain = 0; idxChain < g_arrChains.length; ++ idxChain )
        await check_s_chain_public_key( g_arrChains[idxChain].name );
    await all_skaled_nodes_check_addresses();
    //
    ima_register_all();
    ima_check_registration_all();
    await ima_get_docker_image();
    ima_prepare_docker_shares_all();
    await all_tunnels_start();
    await all_ima_agents_start();
    await all_ima_network_browsers_start();
    //
    if( g_bTestImaAgentDiscoveryCommandsAndExit ) {
        await ima_test_browse_skale_networks();
        await ima_test_browse_connected_chains();
        await ima_test_browse_s_chains();
        await ima_test_show_balances();
        await end_of_test( 0 ); // SUCCESS
    }
    //
    await ima_gas_reimbursement_configure_zero_timeout();
    await ima_gas_reimbursement_show();
    await ima_gas_reimbursement_recharge();
    await ima_gas_reimbursement_show();
    if( g_arrChains.length > 1 ) {
        await ima_connect_all_schains_together_each_other( 10 );
        // NOTICE: IMA agents here restarted to re-load connected S-Chains info
        await all_ima_agents_stop();
        await all_tunnels_stop();
        await all_ima_network_browsers_stop();
        //
        // log.write(
        //     "\n\n" + cc.normal( "Press " ) + cc.attention( "<ENTER>" ) +
        //     cc.normal( "  to continue test with " ) + cc.bright( "re-starting IMA agents" ) +
        //     cc.normal( "..." ) + "\n" );
        // wait_ENTER_key_press_on_console();
        // log.write( cc.normal( "Resuming test..." ) + "\n" );
        //
        await all_tunnels_start();
        await all_ima_agents_start();
        await all_ima_network_browsers_start();
        //
        // log.write(
        //     "\n\n" + cc.normal( "Press " ) + cc.attention( "<ENTER>" ) +
        //     cc.normal( "  to continue test with " ) + cc.bright( "re-started IMA agents" ) +
        //     cc.normal( "..." ) + "\n" );
        // wait_ENTER_key_press_on_console();
        // log.write( cc.normal( "Resuming test..." ) + "\n" );
        //
    }
    //
    if( g_nTimeToSleepAfterReimbursementActionsMilliseconds > 0 ) {
        log.write( cc.debug( ".......Sleeping " ) + cc.info( g_nTimeToSleepAfterReimbursementActionsMilliseconds ) + cc.debug( " milliseconds..." ) + "\n" );
        await sleep( g_nTimeToSleepAfterReimbursementActionsMilliseconds );
        log.write( cc.debug( ".......Done, was slept " ) + cc.info( g_nTimeToSleepAfterReimbursementActionsMilliseconds ) + cc.debug( " milliseconds." ) + "\n" );
    }
    if( g_bAskToStartCryptoAssetTransfersTest ) {
        log.write(
            "\n\n" + cc.normal( "Press " ) + cc.attention( "<ENTER>" ) +
            cc.normal( "  to continue test with " ) + cc.bright( "crypto asset transfers" ) +
            cc.normal( "..." ) + "\n" );
        wait_ENTER_key_press_on_console();
        log.write( cc.normal( "Resuming test..." ) + "\n" );
    }
    //
    await ima_enable_pausable_role();
    //
    const nPreferredNodeIndex = 0;
    //
    //
    // ETH transfer tests
    //
    // IMPORTANT NOTICE:
    // first test here is important to supply real ETH to account on S-Chain and
    // allow test further token transfers to pay for transfers in real ETH
    //
    const strMintToAddress = private_key_2_account_address( g_w3_main_net, g_strPrivateKeyImaMN );
    const arrTokenIDs1155 = [ 1, 2, 3 ];
    const arrAmounts1155 = [ 999999, 1000000, 1000001 ];
    //
    if( g_bVerbose )
        log.write( "\n\n" + cc.sunny( "Basic " ) + cc.attention( "M<->S" ) + " " + cc.sunny( "ETH transfer tests start here" ) + "\n\n" );

    /***/
    await ima_send_eth( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, "m2s", "2kether", nPreferredNodeIndex );
    await ima_send_eth( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, "s2m", "1ether", nPreferredNodeIndex );
    /***/

    /***/
    // // // // await ima_send_eth( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, "m2s", "1ether" );
    // // // // await ima_send_eth( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, "s2m", "1ether" );
    //
    //
    // Deploy and transfer test tokens
    if( g_bVerbose )
        log.write( "\n\n" + cc.sunny( "Static " ) + cc.attention( "M<->S" ) + " " + cc.sunny( "token transfer tests start here" ) + "\n\n" );
    await deploy_test_tokens_to( g_idxMostOftenUsedSChain, "mn", strMintToAddress, true, true );
    await deploy_test_tokens_to( g_idxMostOftenUsedSChain, "sc00", strMintToAddress, false, true );

    await run_cross_chain_chat_test_m2s( g_idxMostOftenUsedSChain );

    let schain_name = g_arrChains[g_idxMostOftenUsedSChain].name;
    await enableWhitelist( schain_name, "erc20", g_strPrivateKeyImaMN, false );
    await enableWhitelist( schain_name, "erc721", g_strPrivateKeyImaMN, false ); // without metadata
    await enableWhitelist( schain_name, "erc721_with_metadata", g_strPrivateKeyImaMN, false ); // with metadata
    await enableWhitelist( schain_name, "erc1155", g_strPrivateKeyImaMN, false );

    await ima_send_erc20_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, 1000000, nPreferredNodeIndex );
    await ima_send_erc20_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, 100000, nPreferredNodeIndex );
    await ima_send_erc721_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, 1, nPreferredNodeIndex, false ); // without metadata
    await ima_send_erc721_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, 1, nPreferredNodeIndex, true ); // with metadata
    await ima_send_erc721_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, 1, nPreferredNodeIndex, false ); // without metadata
    await ima_send_erc721_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, 1, nPreferredNodeIndex, true ); // with metadata
    await ima_send_erc1155_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, 1, 1000000, nPreferredNodeIndex );
    await ima_send_erc1155_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, 1, 1000000, nPreferredNodeIndex );
    await ima_batch_send_erc1155_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, arrTokenIDs1155, arrAmounts1155, nPreferredNodeIndex );
    await ima_batch_send_erc1155_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, arrTokenIDs1155, arrAmounts1155, nPreferredNodeIndex );

    if( g_bVerbose )
        log.write( "\n\n" + cc.sunny( "Dynamic " ) + cc.attention( "M<->S" ) + " " + cc.sunny( "token transfer tests start here" ) + "\n\n" );
    clean_test_tokens();
    schain_name = g_arrChains[g_idxMostOftenUsedSChain].name;
    await enableWhitelist( schain_name, "erc20", g_strPrivateKeyImaMN, false );
    await enableWhitelist( schain_name, "erc721", g_strPrivateKeyImaMN, false ); // without metadata
    await enableWhitelist( schain_name, "erc721_with_metadata", g_strPrivateKeyImaMN, false ); // with metadata
    await enableWhitelist( schain_name, "erc1155", g_strPrivateKeyImaMN, false );
    await enableAutomaticDeploy( g_idxMostOftenUsedSChain, "erc20", g_strPrivateKeyImaSC, true );
    await enableAutomaticDeploy( g_idxMostOftenUsedSChain, "erc721", g_strPrivateKeyImaSC, true ); // without metadata
    await enableAutomaticDeploy( g_idxMostOftenUsedSChain, "erc721_with_metadata", g_strPrivateKeyImaSC, true ); // with metadata
    await enableAutomaticDeploy( g_idxMostOftenUsedSChain, "erc1155", g_strPrivateKeyImaSC, true );
    await deploy_test_tokens_to( g_idxMostOftenUsedSChain, "mn", strMintToAddress, true, true );
    await ima_send_erc20_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, 1000000, nPreferredNodeIndex );
    await ima_send_erc20_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, 100000, nPreferredNodeIndex );
    await ima_send_erc721_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, 1, nPreferredNodeIndex, false ); // without metadata
    await ima_send_erc721_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, 1, nPreferredNodeIndex, true ); // with metadata
    await ima_send_erc721_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, 1, nPreferredNodeIndex, false ); // without metadata
    await ima_send_erc721_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, 1, nPreferredNodeIndex, true ); // with metadata
    await ima_send_erc1155_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, 1, 1000000, nPreferredNodeIndex );
    await ima_send_erc1155_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, 1, 1000000, nPreferredNodeIndex );
    await ima_batch_send_erc1155_mn2sc( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, arrTokenIDs1155, arrAmounts1155, nPreferredNodeIndex );
    await ima_batch_send_erc1155_sc2mn( g_idxMostOftenUsedSChain, g_strPrivateKeyImaSC, g_strPrivateKeyImaMN, arrTokenIDs1155, arrAmounts1155, nPreferredNodeIndex );
    /***/
    if( g_arrChains.length >= 2 && g_bIsTestS2S ) {
        /***/
        if( g_bVerbose )
            log.write( "\n\n" + cc.sunny( "Basic " ) + cc.attention( "S<->S" ) + " " + cc.sunny( " chat start here" ) + "\n\n" );
        // S2S chat
        const strMintToAddress = null; // do not mint anything at deploy time anywhere
        const idxChainSrc = 0, idxChainDst = 1;
        let joOutSrc = {};
        let joOutDst = {};
        let idxChain, strAbiPathBase, strAbiPathTestTokensAll, optOut, strDeploymentNetworkName;
        const idxDeploy = 0;
        // deploy tokens to 1st S-Chain
        idxChain = 0 + idxChainSrc;
        optOut = joOutSrc;
        strAbiPathBase = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/ima_abi/tt";
        strAbiPathTestTokensAll = strAbiPathBase + ".json";
        let strAbiPathTestERC20_src = strAbiPathBase + "20.json";
        let strAbiPathTestERC721_src = strAbiPathBase + "721.json";
        let strAbiPathTestERC721_with_metadata_src = strAbiPathBase + "721_with_metadata.json";
        let strAbiPathTestERC1155_src = strAbiPathBase + "1155.json";
        let strAbiPathTestTokensSrc = "" + strAbiPathTestTokensAll; // save it
        strDeploymentNetworkName = "sc" + zeroPad( idxDeploy, 2 ); // using idxDeploy instead of idxChain to get "sc00" deployment network name
        await enableAutomaticDeploy( idxChain, "erc20", g_strPrivateKeyImaSC, false );
        await enableAutomaticDeploy( idxChain, "erc721", g_strPrivateKeyImaSC, false );
        await enableAutomaticDeploy( idxChain, "erc721_with_metadata", g_strPrivateKeyImaSC, false );
        await enableAutomaticDeploy( idxChain, "erc1155", g_strPrivateKeyImaSC, false );
        await deploy_test_tokens_to( idxChain, strDeploymentNetworkName, strMintToAddress, false, false, optOut );
        quick_spawn( "cp \"" + optOut.strAbiPath + "\" \"" + strAbiPathTestTokensAll + "\"" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensSrc, strAbiPathTestERC20_src, "ERC20" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensSrc, strAbiPathTestERC721_src, "ERC721" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensSrc, strAbiPathTestERC721_with_metadata_src, "ERC721_with_metadata" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensSrc, strAbiPathTestERC1155_src, "ERC1155" );
        // deploy tokens to 2nd S-Chain
        idxChain = 0 + idxChainDst;
        optOut = joOutDst;
        strAbiPathBase = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/ima_abi/tt";
        strAbiPathTestTokensAll = strAbiPathBase + ".json";
        let strAbiPathTestERC20_dst = strAbiPathBase + "20.json";
        let strAbiPathTestERC721_dst = strAbiPathBase + "721.json";
        let strAbiPathTestERC721_with_metadata_dst = strAbiPathBase + "721_with_metadata.json";
        let strAbiPathTestERC1155_dst = strAbiPathBase + "1155.json";
        let strAbiPathTestTokensDst = "" + strAbiPathTestTokensAll; // save it
        strDeploymentNetworkName = "sc" + zeroPad( idxDeploy, 2 ); // using idxDeploy instead of idxChain to get "sc00" deployment network name
        await deploy_test_tokens_to( idxChain, strDeploymentNetworkName, strMintToAddress, false, false, optOut );
        quick_spawn( "cp \"" + optOut.strAbiPath + "\" \"" + strAbiPathTestTokensAll + "\"" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensDst, strAbiPathTestERC20_dst, "ERC20" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensDst, strAbiPathTestERC721_dst, "ERC721" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensDst, strAbiPathTestERC721_with_metadata_dst, "ERC721_with_metadata" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensDst, strAbiPathTestERC1155_dst, "ERC1155" );
        // show info and run chat test
        const source_header = cc.sunny( "Source" ) + " " + cc.info( "S-Chain" ) + " ";
        const destination_header = cc.warning( "Destination" ) + " " + cc.info( "S-Chain" ) + " ";
        log.write( source_header + cc.sunny( " index is" ) + cc.debug( "............................................" ) + cc.info( idxChainSrc ) + "\n" );
        log.write( destination_header + cc.warning( " index is" ) + cc.debug( "......................................." ) + cc.info( idxChainDst ) + "\n" );
        log.write( source_header + cc.sunny( " name is" ) + cc.debug( "............................................." ) + cc.info( g_arrChains[idxChainSrc].name ) + "\n" );
        log.write( destination_header + cc.warning( " name is" ) + cc.debug( "........................................" ) + cc.info( g_arrChains[idxChainDst].name ) + "\n" );
        log.write( source_header + cc.sunny( " ID is" ) + cc.debug( "..............................................." ) + cc.info( g_arrChains[idxChainSrc].cid ) + "\n" );
        log.write( destination_header + cc.warning( " ID is" ) + cc.debug( ".........................................." ) + cc.info( g_arrChains[idxChainDst].cid ) + "\n" );
        log.write( source_header + cc.sunny( " ABI/src path for test tokens is" ) + cc.debug( "....................." ) + cc.info( strAbiPathTestTokensSrc ) + "\n" );
        log.write( destination_header + cc.warning( " ABI/dst path for test tokens is" ) + cc.debug( "................" ) + cc.info( strAbiPathTestTokensDst ) + "\n" );
        log.write( source_header + cc.sunny( " ERC20/src only ABI path is" ) + cc.debug( ".........................." ) + cc.info( strAbiPathTestERC20_src ) + "\n" );
        log.write( destination_header + cc.warning( " ERC20/dst only ABI path is" ) + cc.debug( "....................." ) + cc.info( strAbiPathTestERC20_dst ) + "\n" );
        log.write( source_header + cc.sunny( " ERC721/src only ABI path is" ) + cc.debug( "........................." ) + cc.info( strAbiPathTestERC721_src ) + "\n" );
        log.write( destination_header + cc.warning( " ERC721/dst only ABI path is" ) + cc.debug( "...................." ) + cc.info( strAbiPathTestERC721_dst ) + "\n" );
        log.write( source_header + cc.sunny( " ERC721_with_metadata/src only ABI path is" ) + cc.debug( "..........." ) + cc.info( strAbiPathTestERC721_with_metadata_src ) + "\n" );
        log.write( destination_header + cc.warning( " ERC721_with_metadata/dst only ABI path is" ) + cc.debug( "......" ) + cc.info( strAbiPathTestERC721_with_metadata_dst ) + "\n" );
        log.write( source_header + cc.sunny( " ERC1155/src only ABI path is" ) + cc.debug( "........................" ) + cc.info( strAbiPathTestERC1155_src ) + "\n" );
        log.write( destination_header + cc.warning( " ERC1155/dst only ABI path is" ) + cc.debug( "..................." ) + cc.info( strAbiPathTestERC1155_dst ) + "\n" );
        let joPerTokenData = {
            "strAbiPathTestERC20_src": strAbiPathTestERC20_src,
            "strAbiPathTestERC20_dst": strAbiPathTestERC20_dst,
            "strAbiPathTestERC721_src": strAbiPathTestERC721_src,
            "strAbiPathTestERC721_dst": strAbiPathTestERC721_dst,
            "strAbiPathTestERC721_with_metadata_src": strAbiPathTestERC721_with_metadata_src,
            "strAbiPathTestERC721_with_metadata_dst": strAbiPathTestERC721_with_metadata_dst,
            "strAbiPathTestERC1155_src": strAbiPathTestERC1155_src,
            "strAbiPathTestERC1155_dst": strAbiPathTestERC1155_dst
        };
        //
        await run_cross_chain_chat_test_s2s( idxChainSrc, idxChainDst, joOutSrc.joABI, joOutDst.joABI );
        //
        // load test token ABIs
        if( g_bVerbose )
            log.write( "\n\n" + cc.sunny( "Static " ) + cc.attention( "S<->S" ) + " " + cc.sunny( "token transfer tests start here" ) + "\n\n" );
        let joTokensAbiSC_src = jsonFileLoad( strAbiPathTestTokensSrc, null, g_bVerbose );
        let joTokensAbiSC_dst = jsonFileLoad( strAbiPathTestTokensDst, null, g_bVerbose );
        traverse_json( joTokensAbiSC_src, fix_ethers_js_abi_errors );
        traverse_json( joTokensAbiSC_dst, fix_ethers_js_abi_errors );
        // prepare token transfers
        const isAutomaticDeploy = false;
        await s2s_prepare_chains_for_token_transfers( idxChainSrc, idxChainDst, joTokensAbiSC_src, joTokensAbiSC_dst, isAutomaticDeploy );
        // instantiate web3 contract objects, init variables
        const joChainSrc = g_arrChains[idxChainSrc];
        // const joChainDst = g_arrChains[idxChainDst];
        const arrNodeDescriptionsSrc = joChainSrc.arrNodeDescriptions;
        // const arrNodeDescriptionsDst = joChainDst.arrNodeDescriptions;
        const nPreferredNodeIndexSrc = 0;
        // const nPreferredNodeIndexDst = 0;
        const joNodeDescSrc = arrNodeDescriptionsSrc[nPreferredNodeIndexSrc];
        // const joNodeDescDst = arrNodeDescriptionsDst[nPreferredNodeIndexDst];
        let w3schain_src = getWeb3FromURL( joNodeDescSrc.url );
        // let w3schain_dst = getWeb3FromURL( joNodeDescDst.url );
        let contractERC20_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC20_abi, joTokensAbiSC_src.ERC20_address );
        let contractERC721_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC721_abi, joTokensAbiSC_src.ERC721_address );
        let contractERC721_with_metadata_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC721_with_metadata_abi, joTokensAbiSC_src.ERC721_with_metadata_address );
        let contractERC1155_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC1155_abi, joTokensAbiSC_src.ERC1155_address );
        // const contractERC20_dst = new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC20_abi, joTokensAbiSC_dst.ERC20_address );
        // const contractERC721_dst = new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC721_abi, joTokensAbiSC_dst.ERC721_address );
        // const contractERC721_with_metadata_dst = new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC721_with_metadata_abi, joTokensAbiSC_dst.ERC721_with_metadata_address );
        // const contractERC1155_dst = new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC1155_abi, joTokensAbiSC_dst.ERC1155_address );
        // mint tokens on source chain (statically linked)
        await mintERC20( w3schain_src, joChainSrc.cid, joChainSrc.name, contractERC20_src, g_strPrivateKeyImaSC, 1000000 );
        for( let idx721 = 0; idx721 < 3; ++ idx721 ) {
            await mintERC721( w3schain_src, joChainSrc.cid, joChainSrc.name, contractERC721_src, g_strPrivateKeyImaSC, 1 + idx721, null, false ); // without metadata
            await mintERC721( w3schain_src, joChainSrc.cid, joChainSrc.name, contractERC721_with_metadata_src, g_strPrivateKeyImaSC, 1 + idx721, null, true ); // with metadata
        }
        for( let idx1155 = 0; idx1155 < 3; ++ idx1155 )
            await mintERC1155( w3schain_src, joChainSrc.cid, joChainSrc.name, contractERC1155_src, g_strPrivateKeyImaSC, 1 + idx1155, 1000000 );
        // transfer ERC S2S, statically linked tokens
        await s2s_transfer( // forward ERC20
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC20", // coin name
            true, // is forward
            null, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC20
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC20", // coin name
            false, // is forward
            null, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // forward ERC721 without metadata
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC721", // coin name
            true, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC721 without metadata
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC721", // coin name
            false, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // forward ERC721 with metadata
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC721_with_metadata", // coin name
            true, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC721 with metadata
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC721_with_metadata", // coin name
            false, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // forward ERC1155
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC1155", // coin name
            true, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC1155
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC1155", // coin name
            false, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // forward ERC1155-batch
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC1155", // coin name
            true, // is forward
            [ 1,2,3 ], // token ID spec
            [ 999,1000,1001 ], // token amount spec
            true, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC1155-batch
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC1155", // coin name
            false, // is forward
            [ 1,2,3 ], // token ID spec
            [ 999,1000,1001 ], // token amount spec
            true, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        //
        //
        //
        if( g_bVerbose )
            log.write( "\n\n" + cc.sunny( "Dynamic " ) + cc.attention( "S<->S" ) + " " + cc.sunny( "token transfer tests start here" ) + "\n\n" );
        // cleaunup statically linked token transfers
        quick_spawn( "rm -f \"" + strAbiPathTestTokensSrc + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestTokensDst + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestERC20_src + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestERC721_src + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestERC721_with_metadata_src + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestERC1155_src + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestERC20_dst + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestERC721_dst + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestERC721_with_metadata_dst + "\"" );
        quick_spawn( "rm -f \"" + strAbiPathTestERC1155_dst + "\"" );
        joOutSrc = {};
        joOutDst = {};
        // deploy tokens to 1st S-Chain only
        idxChain = 0 + idxChainSrc;
        optOut = joOutSrc;
        strAbiPathBase = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/ima_abi/second_tt";
        strAbiPathTestTokensAll = strAbiPathBase + ".json";
        strAbiPathTestERC20_src = strAbiPathBase + "20.json";
        strAbiPathTestERC721_src = strAbiPathBase + "721.json";
        strAbiPathTestERC721_with_metadata_src = strAbiPathBase + "721_with_metadata.json";
        strAbiPathTestERC1155_src = strAbiPathBase + "1155.json";
        strAbiPathTestTokensSrc = "" + strAbiPathTestTokensAll; // save it
        strDeploymentNetworkName = "sc" + zeroPad( idxDeploy, 2 ); // using idxDeploy instead of idxChain to get "sc00" deployment network name
        await deploy_test_tokens_to( idxChain, strDeploymentNetworkName, strMintToAddress, false, false, optOut );
        // await enableAutomaticDeploy( idxChain, "erc20", g_strPrivateKeyImaSC, true );
        // await enableAutomaticDeploy( idxChain, "erc721", g_strPrivateKeyImaSC, true );
        // await enableAutomaticDeploy( idxChain, "erc721_with_metadata", g_strPrivateKeyImaSC, true );
        // await enableAutomaticDeploy( idxChain, "erc1155", g_strPrivateKeyImaSC, true );
        quick_spawn( "cp \"" + optOut.strAbiPath + "\" \"" + strAbiPathTestTokensAll + "\"" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensSrc, strAbiPathTestERC20_src, "ERC20" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensSrc, strAbiPathTestERC721_src, "ERC721" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensSrc, strAbiPathTestERC721_with_metadata_src, "ERC721_with_metadata" );
        s2s_extract_tt_abi_part( strAbiPathTestTokensSrc, strAbiPathTestERC1155_src, "ERC1155" );
        // prepare path of test tokens on 2nd S-Chain
        idxChain = 0 + idxChainDst;
        optOut = joOutDst;
        strAbiPathBase = g_strFolderMultiNodeDeployment + "/chain_" + zeroPad( idxChain, 2 ) + "/ima_abi/second_dynamic_tt";
        strAbiPathTestTokensAll = strAbiPathBase + ".json";
        strAbiPathTestERC20_dst = strAbiPathBase + "20.json";
        strAbiPathTestERC721_dst = strAbiPathBase + "721.json";
        strAbiPathTestERC721_with_metadata_dst = strAbiPathBase + "721_with_metadata.json";
        strAbiPathTestERC1155_dst = strAbiPathBase + "1155.json";
        strAbiPathTestTokensDst = "" + strAbiPathTestTokensAll; // save it
        strDeploymentNetworkName = "sc" + zeroPad( idxDeploy, 2 ); // using idxDeploy instead of idxChain to get "sc00" deployment network name
        // await deploy_test_tokens_to( idxChain, strDeploymentNetworkName, strMintToAddress, false, false, optOut );
        await enableAutomaticDeploy( idxChain, "erc20", g_strPrivateKeyImaSC, true );
        await enableAutomaticDeploy( idxChain, "erc721", g_strPrivateKeyImaSC, true );
        await enableAutomaticDeploy( idxChain, "erc721_with_metadata", g_strPrivateKeyImaSC, true );
        await enableAutomaticDeploy( idxChain, "erc1155", g_strPrivateKeyImaSC, true );
        // quick_spawn( "cp \"" + optOut.strAbiPath + "\" \"" + strAbiPathTestTokensAll + "\"" );
        // s2s_extract_tt_abi_part( strAbiPathTestTokensDst, strAbiPathTestERC20_dst, "ERC20" );
        // s2s_extract_tt_abi_part( strAbiPathTestTokensDst, strAbiPathTestERC721_dst, "ERC721" );
        // s2s_extract_tt_abi_part( strAbiPathTestTokensDst, strAbiPathTestERC721_with_metadata_dst, "ERC721_with_metadata" );
        // s2s_extract_tt_abi_part( strAbiPathTestTokensDst, strAbiPathTestERC1155_dst, "ERC1155" );
        // show info and run chat test
        log.write( source_header + cc.sunny( " index is" ) + cc.debug( "............................................" ) + cc.info( idxChainSrc ) + "\n" );
        log.write( destination_header + cc.warning( " index is" ) + cc.debug( "......................................." ) + cc.info( idxChainDst ) + "\n" );
        log.write( source_header + cc.sunny( " name is" ) + cc.debug( "............................................." ) + cc.info( g_arrChains[idxChainSrc].name ) + "\n" );
        log.write( destination_header + cc.warning( " name is" ) + cc.debug( "........................................" ) + cc.info( g_arrChains[idxChainDst].name ) + "\n" );
        log.write( source_header + cc.sunny( " ID is" ) + cc.debug( "..............................................." ) + cc.info( g_arrChains[idxChainSrc].cid ) + "\n" );
        log.write( destination_header + cc.warning( " ID is" ) + cc.debug( ".........................................." ) + cc.info( g_arrChains[idxChainDst].cid ) + "\n" );
        log.write( source_header + cc.sunny( " ABI/src path for test tokens is" ) + cc.debug( "....................." ) + cc.info( strAbiPathTestTokensSrc ) + "\n" );
        log.write( destination_header + cc.warning( " ABI/dst path for test tokens is" ) + cc.debug( "................" ) + cc.info( strAbiPathTestTokensDst ) + "\n" );
        log.write( source_header + cc.sunny( " ERC20/src only ABI path is" ) + cc.debug( ".........................." ) + cc.info( strAbiPathTestERC20_src ) + "\n" );
        log.write( destination_header + cc.warning( " ERC20/dst only ABI path is" ) + cc.debug( "....................." ) + cc.info( strAbiPathTestERC20_dst ) + "\n" );
        log.write( source_header + cc.sunny( " ERC721/src only ABI path is" ) + cc.debug( "........................." ) + cc.info( strAbiPathTestERC721_src ) + "\n" );
        log.write( destination_header + cc.warning( " ERC721/dst only ABI path is" ) + cc.debug( "...................." ) + cc.info( strAbiPathTestERC721_dst ) + "\n" );
        log.write( source_header + cc.sunny( " ERC721_with_metadata/src only ABI path is" ) + cc.debug( "..........." ) + cc.info( strAbiPathTestERC721_with_metadata_src ) + "\n" );
        log.write( destination_header + cc.warning( " ERC721_with_metadata/dst only ABI path is" ) + cc.debug( "......" ) + cc.info( strAbiPathTestERC721_with_metadata_dst ) + "\n" );
        log.write( source_header + cc.sunny( " ERC1155/src only ABI path is" ) + cc.debug( "........................" ) + cc.info( strAbiPathTestERC1155_src ) + "\n" );
        log.write( destination_header + cc.warning( " ERC1155/dst only ABI path is" ) + cc.debug( "..................." ) + cc.info( strAbiPathTestERC1155_dst ) + "\n" );
        joPerTokenData = {
            "strAbiPathTestERC20_src": strAbiPathTestERC20_src,
            "strAbiPathTestERC20_dst": strAbiPathTestERC20_dst,
            "strAbiPathTestERC721_src": strAbiPathTestERC721_src,
            "strAbiPathTestERC721_dst": strAbiPathTestERC721_dst,
            "strAbiPathTestERC721_with_metadata_src": strAbiPathTestERC721_with_metadata_src,
            "strAbiPathTestERC721_with_metadata_dst": strAbiPathTestERC721_with_metadata_dst,
            "strAbiPathTestERC1155_src": strAbiPathTestERC1155_src,
            "strAbiPathTestERC1155_dst": strAbiPathTestERC1155_dst
        };
        //
        w3schain_src = getWeb3FromURL( joNodeDescSrc.url );
        // w3schain_dst = getWeb3FromURL( joNodeDescDst.url );
        joTokensAbiSC_src = jsonFileLoad( strAbiPathTestTokensSrc, null, g_bVerbose );
        joTokensAbiSC_dst = null; // jsonFileLoad( strAbiPathTestTokensDst, null, g_bVerbose );
        traverse_json( joTokensAbiSC_src, fix_ethers_js_abi_errors );
        // traverse_json( joTokensAbiSC_dst, fix_ethers_js_abi_errors );
        contractERC20_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC20_abi, joTokensAbiSC_src.ERC20_address );
        contractERC721_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC721_abi, joTokensAbiSC_src.ERC721_address );
        contractERC721_with_metadata_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC721_with_metadata_abi, joTokensAbiSC_src.ERC721_with_metadata_address );
        contractERC1155_src = new w3schain_src.eth.Contract( joTokensAbiSC_src.ERC1155_abi, joTokensAbiSC_src.ERC1155_address );
        // const contractERC20_dst = new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC20_abi, joTokensAbiSC_dst.ERC20_address );
        // const contractERC721_dst = new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC721_abi, joTokensAbiSC_dst.ERC721_address );
        // const contractERC721_with_metadata_dst = new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC721_with_metadata_abi, joTokensAbiSC_dst.ERC721_with_metadata_address );
        // const contractERC1155_dst = new w3schain_dst.eth.Contract( joTokensAbiSC_dst.ERC1155_abi, joTokensAbiSC_dst.ERC1155_address );
        // mint tokens on source chain (source for dynamically linked test)
        await mintERC20( w3schain_src, joChainSrc.cid, joChainSrc.name, contractERC20_src, g_strPrivateKeyImaSC, 1000000 );
        for( let idx721 = 0; idx721 < 3; ++ idx721 ) {
            await mintERC721( w3schain_src, joChainSrc.cid, joChainSrc.name, contractERC721_src, g_strPrivateKeyImaSC, 1 + idx721, null, false ); // without metadata
            await mintERC721( w3schain_src, joChainSrc.cid, joChainSrc.name, contractERC721_with_metadata_src, g_strPrivateKeyImaSC, 1 + idx721, null, true ); // with metadata
        }
        for( let idx1155 = 0; idx1155 < 3; ++ idx1155 )
            await mintERC1155( w3schain_src, joChainSrc.cid, joChainSrc.name, contractERC1155_src, g_strPrivateKeyImaSC, 1 + idx1155, 1000000 );
        //
        joTokensAbiSC_dst = null; // null here indicates dynamic transfer mode
        //
        // transfer ERC S2S, dynamically deployed tokens on target S-Chain
        await s2s_transfer( // forward ERC20
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC20", // coin name
            true, // is forward
            null, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC20
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC20", // coin name
            false, // is forward
            null, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // forward ERC721 without metadata
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC721", // coin name
            true, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC721 without metadata
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC721", // coin name
            false, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // forward ERC721 with metadata
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC721_with_metadata", // coin name
            true, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC721 with metadata
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC721_with_metadata", // coin name
            false, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // forward ERC1155
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC1155", // coin name
            true, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC1155
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC1155", // coin name
            false, // is forward
            1, // token ID spec
            1000, // token amount spec
            false, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // forward ERC1155-batch
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC1155", // coin name
            true, // is forward
            [ 1,2,3 ], // token ID spec
            [ 999,1000,1001 ], // token amount spec
            true, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        await s2s_transfer( // reverse ERC1155-batch
            idxChainSrc,
            idxChainDst,
            joTokensAbiSC_src,
            joTokensAbiSC_dst,
            joPerTokenData,
            "ERC1155", // coin name
            false, // is forward
            [ 1,2,3 ], // token ID spec
            [ 999,1000,1001 ], // token amount spec
            true, // is Batch
            g_strPrivateKeyImaSC,
            g_strPrivateKeyImaSC
        );
        /***/

    } else { // if( g_arrChains.length >= 2 && g_bIsTestS2S )
        if( g_bVerbose )
            log.write( "\n\n" + cc.warning( "Skipped all " ) + cc.attention( "S<->S" ) + " " + cc.sunny( " transfer" ) + "\n\n" );
    }

    { // BLOCK: Finally, do the PoW test
        log.write( "\n\n" + cc.bright( "Will do PoW testing by draining wallet on S-chain..." ) + "\n\n" );
        // first, drain skale-eth on S-chain
        const cid_s_chain = g_arrChains[g_idxMostOftenUsedSChain].cid;
        const w3schain = getWeb3FromURL( g_arrChains[g_idxMostOftenUsedSChain].arrNodeDescriptions[0].url );
        const arr_pks = [
            // g_strPrivateKeyImaSC,
            "fd6d151c4afe5c1c856e5a234950252be7a90210f3aa2bad4e0db037355c1dd6",
            "545ad381cfef8204ee0534119a56c0af32255078103034c6a6a4361fa7e7e4b2",
            "3bf05e0649b6b93063674e17f4c2943e896658116ecda4b745df95e12477f934",
            "5a1e6879d082a4e2d3bd170be9959ebf20fbfd235e0f1faf1667d9031996698e"
        ];
        for( let idxPK = 0; idxPK < arr_pks.length; ++ idxPK ) {
            const pk_drain = arr_pks[idxPK];
            const addr_drain = private_key_2_account_address( g_w3mod, pk_drain );
            init_account_from_private_key( w3schain, pk_drain );
            const maxAwailableOnSChain = await impl_get_ballance_eth( w3schain, addr_drain, "S-chain" );
            const maxAwailableOnSChainHex = g_w3mod.utils.toHex( maxAwailableOnSChain );
            log.write(
                cc.debug( "Max available value to drain account " ) +
                cc.info( addr_drain ) + cc.debug( "/" ) + cc.attention( pk_drain ) + cc.debug( " is " ) +
                cc.j( maxAwailableOnSChain ) + cc.debug( "=" ) + cc.j( maxAwailableOnSChainHex ) + "\n" );
            const nGasPrise = await w3schain.eth.getGasPrice();
            log.write( cc.debug( "Account draining gas price is " ) + cc.j( nGasPrise ) + "\n" );
            const nGas = 21000; // 5000000000;
            log.write( cc.debug( "Account draining will use gas " ) + cc.j( nGas ) + "\n" );
            let nValueDrain = maxAwailableOnSChainHex.toString();
            let bnDrain = w3schain.utils.toBN( nValueDrain );
            const bnGas = w3schain.utils.toBN( nGas );
            const bnGasPrice = w3schain.utils.toBN( nGasPrise );
            const bnSub = bnGas.mul( bnGasPrice );
            bnDrain = bnDrain.sub( bnSub );
            //bnDrain = bnDrain.sub( bnSub );
            nValueDrain = ensure_starts_with_0x( bnDrain.toString( 16 ) );
            log.write( cc.debug( "Account draining computed value is " ) + cc.j( nValueDrain ) + "\n" );
            const tx = {
                chainId: cid_s_chain,
                from: addr_drain,
                to: "0xca8489dB50A548eC85eBD4A0E11a9D61cB508540",
                gas: ensure_starts_with_0x( nGas.toString( 16 ) ),
                value: nValueDrain
            };
            log.write( cc.debug( "Account draining TX is " ) + cc.j( tx ) + "\n" );
            const nEstimated = await w3schain.eth.estimateGas( tx );
            log.write( cc.debug( "Estimated draining gas is " ) + cc.j( nEstimated ) + "\n" );
            const cntAttempts = 1;
            for( let idxAttempt = 0; idxAttempt < cntAttempts; ++ idxAttempt ) {
                try {
                    log.write( cc.debug( "Account draining at attempt " ) + cc.info( idxAttempt + 1 ) + cc.debug( " will use value " ) + cc.j( nValueDrain ) + "\n" );
                    const rv = await w3schain.eth.sendTransaction( tx );
                    log.write( cc.debug( "Account drain is complete with result " ) + cc.j( rv ) + "\n" );
                    break;
                } catch ( err ) {
                    log.write( cc.fatal( "M2S(1) account draining error:" ) + " " + cc.j( err ) + "\n" );
                }
                nValueDrain = ensure_starts_with_0x( w3schain.utils.toBN( nValueDrain.toString() ).sub( w3schain.utils.toBN( nGas ) ).toString( 16 ) );
            }
            const afterDrain = await impl_get_ballance_eth( w3schain, addr_drain, "S-chain" );
            log.write( cc.debug( "Value available after drain is " ) + cc.j( afterDrain ) + "\n" );
        }
        // second, deliver to S-chain where we have no money
        try {
            const isWaitBallanceChanged = true;
            const cntTransfers = 5;
            for( let idxTransfer = 0; idxTransfer < cntTransfers; ++ idxTransfer ) {
                log.write(
                    cc.debug( "\n\nWill do PoW testing M2S money transfer " ) + cc.info( idxTransfer + 1 ) +
                    cc.debug( " of " ) + cc.info( cntTransfers ) + cc.debug( "..." ) + "\n" );
                await ima_send_eth( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, "m2s", "1wei", nPreferredNodeIndex, isWaitBallanceChanged );
                log.write(
                    cc.success( "Did finished PoW testing M2S money transfer " ) + cc.info( idxTransfer + 1 ) +
                    cc.success( " of " ) + cc.info( cntTransfers ) + cc.success( "." ) + "\n\n" );
            }
            // while( true ) {
            //     await ima_send_eth( g_idxMostOftenUsedSChain, g_strPrivateKeyImaMN, g_strPrivateKeyImaSC, "m2s", "1wei", nPreferredNodeIndex, false );
            //     await sleep( 5000 );
            // }
        } catch ( err ) {
            log.write( cc.fatal( "PoW test error:" ) + " " + cc.j( err ) + "\n" );
        }
    } // BLOCK: Finally, do the PoW test

    await end_of_test( 0 ); // SUCCESS
}
run();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
