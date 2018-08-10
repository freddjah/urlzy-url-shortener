const ENVIRONMENT = process.env.NODE_ENV

if (ENVIRONMENT === 'test' || ENVIRONMENT === 'development') {

  const config = require('./config.json')

  for (key in config[ENVIRONMENT]) {
    process.env[key] = config[ENVIRONMENT][key]
  }
}