"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const Config = require("./config");
function start() {
    console.log('Starting poseidon...');
    server_1.server.listen(Config.PORT);
    console.log(`poseidon server running at port ${Config.PORT}`);
    return server_1.server;
}
exports.start = start;
if (require.main === module) {
    global["Poseidon"] = module.exports;
    console.log("Running as script.");
    start();
}
