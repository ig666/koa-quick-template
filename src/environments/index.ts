import * as dev from './env.dev';
import * as prop from './env.prod';

const env = process.env.NODE_ENV;

let environment = dev;

if (env !== 'development') {
  environment = prop;
}

export {environment};
