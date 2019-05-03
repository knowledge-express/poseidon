"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').load({ silent: true });
const { PORT = '8182', SPARQL_QUERY_ENDPOINT = 'http://localhost:8089/parliament/sparql', SPARQL_UPDATE_ENDPOINT = 'http://localhost:8089/parliament/sparql', } = process.env;
exports.PORT = PORT;
exports.SPARQL_QUERY_ENDPOINT = SPARQL_QUERY_ENDPOINT;
exports.SPARQL_UPDATE_ENDPOINT = SPARQL_UPDATE_ENDPOINT;
