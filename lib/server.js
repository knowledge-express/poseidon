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
const express = require("express");
const bodyParser = require("body-parser");
const Parliament = require("./parliament");
const express_sparql_1 = require("express-sparql");
exports.server = express();
function status(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.json({ status: 'healthy' });
        }
        catch (e) {
            return next(e);
        }
    });
}
exports.server.get('/status', status);
exports.server.all('/sparql', bodyParser.urlencoded({ extended: true }), bodyParser.text({ type: ['application/sparql-query', 'application/sparql-update'] }), express_sparql_1.default({
    queryFn: (query) => __awaiter(this, void 0, void 0, function* () {
        const json = yield Parliament.query(query);
        return json;
    }),
    updateFn: (update) => __awaiter(this, void 0, void 0, function* () {
        const json = yield Parliament.update(update);
        return json;
    }),
    encodeFn: (result, encoding) => __awaiter(this, void 0, void 0, function* () { return JSON.stringify(result); }),
}));
exports.server.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        throw err;
    }
    next();
});
