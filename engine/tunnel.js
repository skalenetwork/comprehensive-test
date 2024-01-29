var net = require( "net" );

function parseIntOrHex( s ) {
    if( typeof s != "string" )
        return parseInt( s );
    s = s.trim();
    if( s.length > 2 && s[0] == "0" && ( s[1] == "x" || s[1] == "X" ) )
        return parseInt( s, 16 );
    return parseInt( s, 10 );
}

const nPortListenOn = process.env.PORT_LISTEN ? parseIntOrHex( process.env.PORT_LISTEN ) : 1337;
const strRemoteIP = process.env.IP_REMOTE || "127.0.0.1";
const nRemotePort = process.env.PORT_REMOTE ? parseIntOrHex( process.env.PORT_REMOTE ) : 8545;
console.log( `Proxy will listen on port ${nPortListenOn} and connect to ${strRemoteIP}:${nRemotePort}` );

net.createServer( function( socket ) {
    console.log( `New connection from ${JSON.stringify(socket.address())}` );
    socket.on( "end", function() {
        console.log( `Disconnected ${JSON.stringify(socket.address())}` );
    } );
    let upstream = net.connect( nRemotePort, strRemoteIP );
    socket.pipe( upstream ).pipe( socket );
} ).listen( nPortListenOn );
