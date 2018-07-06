import { server } from './server';
import * as Config from './config';

export function start() {
  console.log('Starting poseidon...');

  // Start server
  server.listen(Config.PORT);

  console.log(`poseidon server running at port ${Config.PORT}`);

  return server;
}

// Start the server when executed directly
if (require.main === module) {
  // Export globally
  // tslint:disable-next-line no-string-literal
  global["Poseidon"] = module.exports;

  console.log("Running as script.");

  start();
}
