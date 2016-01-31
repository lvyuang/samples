var fs = require('fs');
var net = require('net');

var server = net.createServer((socket) => {
    console.log('client connected');

    socket.on('end', () => {
        console.log('client disconnected.');
    });

    var ws = fs.createWriteStream('456.txt');
    socket.pipe(ws);
});

server.listen(8124, () => {
    console.log('server bound.');
});