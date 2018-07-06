import fetch from 'node-fetch';
import test from 'ava';
import supertest from 'supertest';

import { createServer } from './support';

test('/status: it returns the status', async t => {
  const app = createServer();

  const response = await supertest(app)
    .get('/status')
    .expect(200);

  t.deepEqual(response.type, 'application/json');

  const result = JSON.parse(response.text);
  // console.log('Result JSON:', JSON.stringify(result));

  return t.deepEqual(result, {
    status: 'healthy'
  });
});
