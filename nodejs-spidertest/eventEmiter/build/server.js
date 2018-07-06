"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
//====================
var server = http.createServer(function (request, response) {
    console.log("create a server...");
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello world,we use typescript to develop.');
    response.end();
});
server.listen(3000, function () {
    console.log("Server listening on port 3000");
    console.log("test...");
});
