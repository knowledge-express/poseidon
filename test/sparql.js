import fetch from 'node-fetch';
import test from 'ava';
import supertest from 'supertest';

import { createServer } from './support';

// import * as poseidon from '../lib';

// const poseidonHost = "http://localhost:8082"
const expectedQueryResult = {
  "head": {
    "vars": [
      "subject",
      "predicate",
      "object"
    ]
  },
  "results": {
    "bindings": []
  }
};

test('/sparql: it responds to GET requests with a query in the query parameters', async t => {
  const app = createServer();

  const query = `
    SELECT *
    WHERE {
      ?subject ?predicate ?object
    }`;

  // const url = `${poseidonHost}/sparql?query=${encodeURIComponent(query)}`;
  // const response = await fetch(url)
  // const result = await response.json();

  const response = await supertest(app)
    .get('/sparql')
    .query({ query: query })
    .expect(200);

  t.deepEqual(response.type, 'application/sparql-results+json');

  const result = JSON.parse(response.text);
  // console.log('Result JSON:', JSON.stringify(result));

  return t.deepEqual(result, expectedQueryResult);
});

test('/sparql: it responds to POST requests with a query in the body encoded with application/x-www-form-urlencoded', async t => {
  const app = createServer();

  const query = `
    SELECT *
    WHERE {
      ?subject ?predicate ?object
    }`;

  // const url = `${poseidonHost}/sparql`;
  // const response = await fetch(url, {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   body: `query=${encodeURIComponent(query)}`
  // });

  const response = await supertest(app)
    .post('/sparql')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(`query=${encodeURIComponent(query)}`)
    .expect(200);

  t.deepEqual(response.type, 'application/sparql-results+json');

  const result = JSON.parse(response.text);
  // console.log('Result JSON:', JSON.stringify(result));

  return t.deepEqual(result, expectedQueryResult);
});

test('/sparql: it responds to POST requests with a query in the body encoded with application/sparql-query', async t => {
  const app = createServer();

  const query = `
    SELECT *
    WHERE {
      ?subject ?predicate ?object
    }`;

  // const url = `${poseidonHost}/sparql`;
  // const response = await fetch(url, {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/sparql-query'
  //   },
  //   body: query
  // });

  const response = await supertest(app)
    .post('/sparql')
    .set('Content-Type', 'application/sparql-query')
    .send(query)
    .expect(200);

  t.deepEqual(response.type, 'application/sparql-results+json');

  const result = JSON.parse(response.text);
  // console.log('Result JSON:', JSON.stringify(result));

  return t.deepEqual(result, expectedQueryResult);
});

test('/sparql: it responds to POST requests with an update in the body encoded with application/x-www-form-urlencoded', async t => {
  const app = createServer();

  const update = `
      INSERT DATA {
      GRAPH <http://poseidon.graph/test> {
        <http://poseidon.graph/testSubject> <http://poseidon.graph/testPredicate> <http://poseidon.graph/testObject> .
      }
    }`;

  // const url = `${poseidonHost}/sparql`;
  // const response = await fetch(url, {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   },
  //   body: `update=${encodeURIComponent(update)}`
  // });
  // const result = response.status;

  const response = await supertest(app)
    .post('/sparql')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(`update=${encodeURIComponent(update)}`)
    .expect(204);

  // t.deepEqual(response.type, 'application/sparql-results+json');

  const result = response.status;
  // console.log('Result JSON:', JSON.stringify(result));

  return t.deepEqual(result, 204);
});

test('/sparql: it responds to POST requests with an update in the body encoded with application/sparql-update', async t => {
  const app = createServer();

  const update = `
      INSERT DATA {
      GRAPH <http://poseidon.graph/test> {
        <http://poseidon.graph/testSubject> <http://poseidon.graph/testPredicate> <http://poseidon.graph/testObject> .
      }
    }`;

  // const url = `${poseidonHost}/sparql`;
  // const response = await fetch(url, {
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'application/sparql-update'
  //   },
  //   body: update
  // });
  // const result = response.status;

  const response = await supertest(app)
    .post('/sparql')
    .set('Content-Type', 'application/sparql-update')
    .send(update)
    .expect(204);

  // t.deepEqual(response.type, 'application/sparql-results+json');

  const result = response.status;
  // console.log('Result JSON:', JSON.stringify(result));

  return t.deepEqual(result, 204);
});
