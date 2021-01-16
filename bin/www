const env = process.env.NODE_ENV;

let App = null;
if (env === 'development') {
  App = require('../src/app/app').App;
} else {
  App = require('../dist/app/app').App;
}

const app = new App();

app.start(8080);
