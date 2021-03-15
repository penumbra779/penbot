const http = require("http");
const host = 'localhost';
const port= 8080;
const fs = require('fs').promises;
let indexFile = "templates/base.html"
const requestListener = function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
};
const server = http.createServer(requestListener);

fs.readFile("templates" + "/base.html")
    .then(contents => {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read base.html file: ${err}`);
        process.exit(1);
    });
