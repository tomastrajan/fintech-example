var connect = require('connect');
var serveStatic = require('serve-static');


connect()
    .use("/fintech-example", serveStatic("./prod"))
    .listen(8080);

console.log("Created server test http server, port 8080");