var dns = require('dns');

var getMongoDnsName = function() {
  return process.env.MONGO_DNS_NAME || "localhost";
};

/**
 * @returns mongoPort this is the port on which the mongo instances run. Default is 27017.
 */
var getMongoDbPort = function() {
  var mongoPort = process.env.MONGO_PORT || 27017;
  console.log("Using mongo port: %s", mongoPort);
  return mongoPort;
};

/**
 *  @returns boolean to define the RS as a configsvr or not. Default is false
 */
var isConfigRS = function() {
  var configSvr = (process.env.CONFIG_SVR || '').trim().toLowerCase();
  var configSvrBool = /^(?:y|yes|true|1)$/i.test(configSvr);
  if (configSvrBool) {
    console.log("ReplicaSet is configured as a configsvr");
  }

  return configSvrBool;
};

/**
 * @returns boolean
 */
var stringToBool = function(boolStr) {
  var isTrue = ( boolStr === 'true' ) || false;

  return isTrue;
};

module.exports = {
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  database: process.env.MONGODB_DATABASE || 'local',
  loopSleepSeconds: process.env.MONGO_SIDECAR_SLEEP_SECONDS || 5,
  unhealthySeconds: process.env.MONGO_SIDECAR_UNHEALTHY_SECONDS || 15,
  mongoSSLEnabled: stringToBool(process.env.MONGO_SSL_ENABLED),
  mongoSSLAllowInvalidCertificates: stringToBool(process.env.MONGO_SSL_ALLOW_INVALID_CERTIFICATES),
  mongoSSLAllowInvalidHostnames: stringToBool(process.env.MONGO_SSL_ALLOW_INVALID_HOSTNAMES),
  env: process.env.NODE_ENV || 'local',
  mongoDnsName: getMongoDnsName(),
  mongoPort: getMongoDbPort(),
  isConfigRS: isConfigRS(),
};
