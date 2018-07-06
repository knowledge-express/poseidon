"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const Config = require("./config");
function query(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(Config.SPARQL_QUERY_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `query=${encodeURIComponent(query)}&output=json`
        });
        const text = yield response.text();
        console.log('SPARQL Query response:', text);
        const json = JSON.parse(text);
        return json;
    });
}
exports.query = query;
function update(update) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(Config.SPARQL_UPDATE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `update=${encodeURIComponent(update)}&output=json`
        });
        if (response.status === 200)
            return true;
        return false;
    });
}
exports.update = update;
