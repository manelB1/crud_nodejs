const http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (req.url === "/produto") {
        res.end(JSON.stringify({
            message: "rotas de produto"
        }));
    }

    if (req.url === "/usuarios") {
        res.end(JSON.stringify({
            message: "Rotas de usuario"
        })

        );
    }
    res.end(JSON.stringify({
        message: "Minha primeira aplicação com node"
    }));

    res.end(JSON.stringify({
        message: "qualquer coisa"
    }))
}).listen(4001);