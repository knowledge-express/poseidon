import fetch from 'node-fetch';
import * as Config from './config';
import * as FormData from 'form-data';

export async function query(query: string) {
  const response = await fetch(Config.SPARQL_QUERY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `query=${encodeURIComponent(query)}&output=json`
  });

  const text = await response.text();
  console.log('SPARQL Query response:', text);

  const json = JSON.parse(text);
  return json;
}

export async function update(update: string) {
  const response = await fetch(Config.SPARQL_UPDATE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `update=${encodeURIComponent(update)}&output=json`
  });

  // TODO: Return Neptune-like JSON response
  if (response.status === 200) return true;
  return false;
}
