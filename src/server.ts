import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as Parliament from './parliament';
import handleSPARQL from 'express-sparql';

export const server = express();

async function status(req, res, next) {
  try {
    return res.json({ status: 'healthy' });
  } catch(e) {
    return next(e);
  }
}

server.get('/status', status);

server.all('/sparql',
  bodyParser.urlencoded({ extended: true }),
  bodyParser.text({ type: [ 'application/sparql-query', 'application/sparql-update' ]}),
  handleSPARQL({
    queryFn: async (query) => {
      const json = await Parliament.query(query);
      return json;
    },
    updateFn: async (update) => {
      const json = await Parliament.update(update);
      return json;
    },
    encodeFn: async (result, encoding) => JSON.stringify(result),
  })
);

server.use((err, req, res, next) => {
  if(err) {
    console.error(err);
    throw err;
  }
  next();
})
