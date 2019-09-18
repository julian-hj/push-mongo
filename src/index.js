var worker = require('./lib/worker');

console.log('Starting up mongo-cf-sidecar');

worker.init(function(err) {
  if (err) {
    console.error('Error trying to initialize mongo-cf-sidecar', err);
    return;
  }

  worker.workloop();
});
