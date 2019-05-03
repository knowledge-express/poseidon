require('dotenv').load({ silent: true });

const {
  PORT = '8182',
  SPARQL_QUERY_ENDPOINT = 'http://localhost:8089/parliament/sparql',
  SPARQL_UPDATE_ENDPOINT = 'http://localhost:8089/parliament/sparql',
} = process.env;

export {
  PORT,

  SPARQL_QUERY_ENDPOINT,
  SPARQL_UPDATE_ENDPOINT,
}
