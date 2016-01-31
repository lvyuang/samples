var fs = require('fs');
var net = require('net');

var client = net.connect({
    host: '127.0.0.1',
    port: 8124
}, () => {
    console.log('connected to server!');

    var rs = fs.createReadStream('123.txt');
    rs.pipe(client);
});

client.on('end', () => {
    console.log('disconnected from server');
});