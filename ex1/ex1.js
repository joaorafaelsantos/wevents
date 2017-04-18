var fs = require("fs");
// leitura assíncrona
fs.readFile('input.txt',
    function (
        err, data) {
        if (
            err
        ) {
            return
            console.error(
                err
            );
        }
        console.log("Asynchronous read: " + data.toString());
    });
// leitura síncrona
var port = process.env.PORT || 3000;
var data = fs.readFileSync('input.txt');
var dataVar = data.toString();
console.log("Synchronous read: " + data.toString());
console.log("Program Ended ");

// Carrega a biblioteca HTTP do Node.js
var http = require('http');
// Cria uma instância do servidor web
var server = http.createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    // request.url -> retorna uma string sobre o que foi digitado no endereço URL
    if (request.url == "/") {
        response.write("<html><body><h1>" + dataVar  + "</h1>");
        response.write("</body></html>");
    }
    response.end(); // envia uma resposta para o cliente
});
server.listen(port, function () {
    console.log('Servidor Node.js em execucao');
});

