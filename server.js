if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./src/app'),
  db = require('./src/models/db');

async function init() {
  app.listen(app.get('port'), () => {
    console.log(`Iniciando API en el puerto ${app.get('port')}`);
  });
  console.log(
    '***** VARIABLES DE ENTORNO *****\n',
    process.env.NODE_ENV,
    '\n',
    process.env.url_DB,
    '\n',
    process.env.PORT,
    '\n***** VARIABLES DE ENTORNO *****'
  );
}
init();
