const net = require( "net" );

const cc = require( "../s_chain_gen/cc.js" );
const g_bPlainColorMode = s2b( process.env.NO_ANSI_COLORS );
cc.enable( g_bPlainColorMode ? false : true );

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

function isNumericString( s ) {
    if( typeof s != "string" )
        return false; // s is not string
    return ( !isNaN( s ) ) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           ( !isNaN( parseFloat( s ) ) ); // ...and ensure strings of whitespace fail
}

function parseIntOrHex( s ) {
    if( typeof s != "string" )
        return parseInt( s );
    s = s.trim();
    if( s.length > 2 && s[0] == "0" && ( s[1] == "x" || s[1] == "X" ) )
        return parseInt( s, 16 );
    return parseInt( s, 10 );
}

function n2s( n, sz ) {
    let s = "" + n;
    while( s.length < sz )
        s = "0" + s;
    return s;
}

function generateTimestamp() {
    const ts = new Date();
    const s =
	"" + cc.date( n2s( ts.getUTCFullYear(), 4 ) ) +
	cc.bright( "-" ) + cc.date( n2s( ts.getUTCMonth() + 1, 2 ) ) +
	cc.bright( "-" ) + cc.date( n2s( ts.getUTCDate(), 2 ) ) +
	" " + cc.time( n2s( ts.getUTCHours(), 2 ) ) +
	cc.bright( ":" ) + cc.time( n2s( ts.getUTCMinutes(), 2 ) ) +
	cc.bright( ":" ) + cc.time( n2s( ts.getUTCSeconds(), 2 ) ) +
	cc.bright( "." ) + cc.frac_time( n2s( ts.getUTCMilliseconds(), 3 ) )
	;
    return s;
}

function generateTimestampPrefix() {
    return generateTimestamp() + cc.bright( ":" ) + " ";
}

const nPortListenOn = process.env.PORT_LISTEN ? parseIntOrHex( process.env.PORT_LISTEN ) : 1337;
const strRemoteIP = process.env.IP_REMOTE || "127.0.0.1";
const nRemotePort = process.env.PORT_REMOTE ? parseIntOrHex( process.env.PORT_REMOTE ) : 8545;
console.log( generateTimestampPrefix() + cc.debug( "Proxy will listen on port " ) + cc.info( nPortListenOn ) +
    cc.debug( " and connect to " ) + cc.notice( strRemoteIP ) + cc.debug( ":" ) + cc.info( nRemotePort ) );
const nIdxChain = process.env.IDX_CHAIN ? parseIntOrHex( process.env.IDX_CHAIN ) : 0;
const nIdxNode = process.env.IDX_NODE ? parseIntOrHex( process.env.IDX_NODE ) : 0;
const nCntNodes = process.env.IDX_CHAIN ? parseIntOrHex( process.env.CNT_NODES ) : 0;
console.log( generateTimestampPrefix() + cc.debug( "Chain index is " ) + cc.info( nIdxChain ) );
console.log( generateTimestampPrefix() + cc.debug( "Node index is " ) + cc.info( nIdxNode ) );
console.log( generateTimestampPrefix() + cc.debug( "Count of nodes in chain is " ) + cc.info( nCntNodes ) );
const nTimeFrameSecondsIMA = process.env.IMA_TIME_FRAME ? parseIntOrHex( process.env.IMA_TIME_FRAME ) : 0;
const nTimeGapSecondsIMA = process.env.IMA_TIME_GAP ? parseIntOrHex( process.env.IMA_TIME_GAP ) : 0;
const nScanMessagePeriodSecondsIMA = process.env.IMA_SCAN_MESSAGES_PERIOD ? parseIntOrHex( process.env.IMA_SCAN_MESSAGES_PERIOD ) : 0;
console.log( generateTimestampPrefix() + cc.debug( "IMA time frame(in seconds) is " ) + cc.info( nTimeFrameSecondsIMA ) );
console.log( generateTimestampPrefix() + cc.debug( "IMA time gap(in seconds) is " ) + cc.info( nTimeGapSecondsIMA ) );
console.log( generateTimestampPrefix() + cc.debug( "IMA messages scan period(in seconds) is " ) + cc.info( nScanMessagePeriodSecondsIMA ) );
let bImaMainNetConnectionProblemEmulationMode = ( !! ( process.env.IMA_MAIN_NET_CONNECTION_PROBLEM_EMULATION ? parseIntOrHex( process.env.IMA_MAIN_NET_CONNECTION_PROBLEM_EMULATION ) : 0 ) );
console.log( generateTimestampPrefix() + cc.debug( "IMA to Main Net connection problem emulation mode(initially specified) is " ) + cc.yn( bImaMainNetConnectionProblemEmulationMode ) );
if( nTimeFrameSecondsIMA <= 0 ||
    nIdxNode < 0 ||
    nCntNodes <= 0
)
    bImaMainNetConnectionProblemEmulationMode = false;
console.log( generateTimestampPrefix() + cc.debug( "IMA to Main Net connection problem emulation mode(finally, effective) is " ) + cc.yn( bImaMainNetConnectionProblemEmulationMode ) );

function checkTimeFraming( aDateTime ) {
    try {
        if( nTimeFrameSecondsIMA <= 0 || nCntNodes <= 1 )
            return true; // time framing is disabled
        if( aDateTime == null || aDateTime == undefined )
            aDateTime = new Date();
        const nFrameShift = 0;
        const nUtcUnixTimeStamp = Math.floor( ( aDateTime ).getTime() / 1000 );

        const nSecondsRangeForAllSChains = nTimeFrameSecondsIMA * nCntNodes;
        const nMod = Math.floor( nUtcUnixTimeStamp % nSecondsRangeForAllSChains );
        let nActiveNodeFrameIndex = Math.floor( nMod / nTimeFrameSecondsIMA );
        if( nFrameShift > 0 ) {
            nActiveNodeFrameIndex += nFrameShift;
            nActiveNodeFrameIndex %= nCntNodes; // for safety only
        }
        let bSkip = ( nActiveNodeFrameIndex != nIdxNode );
        //let bInsideGap = false;

        const nRangeStart =
            nUtcUnixTimeStamp -
            Math.floor( nUtcUnixTimeStamp % nSecondsRangeForAllSChains );
        const nFrameStart = nRangeStart + nIdxNode * nTimeFrameSecondsIMA;
        const nGapStart = nFrameStart + nTimeFrameSecondsIMA - nTimeGapSecondsIMA;
        if( !bSkip ) {
            if( nUtcUnixTimeStamp >= nGapStart )
                bSkip = true;
                //bInsideGap = true;

        }
        if( bSkip )
            return false;
    } catch ( err ) {
        console.log( generateTimestampPrefix() + cc.error( "Exception in time framing check: " ) + cc.j( err ) );
    }
    return true;
}

function createServer() {
    const server = net.createServer( function( socket ) {
        console.log( generateTimestampPrefix() + cc.success( "+" ) + " " + cc.debug( "New connection from " ) + cc.j( socket.address() ) );
        socket.on( "end", function() {
            console.log( generateTimestampPrefix() + cc.error( "-" ) + " " + cc.debug( "Disconnected " ) + cc.j( socket.address() ) );
        } );
        const upstream = net.connect( nRemotePort, strRemoteIP );
        socket.pipe( upstream ).pipe( socket );
    } ).listen( nPortListenOn );
    return server;
}

let server = createServer();
if( bImaMainNetConnectionProblemEmulationMode ) {
    setInterval( function() {
        let isNeedStart = false, isNeedStop = false; ;
        if( nIdxNode != 0 && checkTimeFraming() ) {
            const aDateTime = new Date();
            const nUtcUnixTimeStamp = Math.floor( ( aDateTime ).getTime() / 1000 );
            const nMinute = ( nUtcUnixTimeStamp / 60 ) % 60;
            const isOddMinute = ( ( nMinute & 1 ) != 0 ) ? true : false;
            if( ! server ) {
                if( isOddMinute )
                    isNeedStart = true;
            } else {
                if( ! isOddMinute )
                    isNeedStop = true;
            }
        } else {
            if( ! server )
                isNeedStart = true;
        }
        if( isNeedStart ) {
            console.log( generateTimestampPrefix() + cc.notice( "Server will (re)start..." ) );
            server = createServer();
        }
        if( isNeedStop ) {
            console.log( generateTimestampPrefix() + cc.notice( "Server will be closed..." ) );
            server.close();
            server = null;
        }
    }, 20 * 1000 );
}
