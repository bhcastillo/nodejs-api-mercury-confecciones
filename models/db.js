const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(process.env.URL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log(`Conexión exitosa al servidor de MongoDB: ${process.env.URL_DB}`);
      })
      .catch((err) => {
        console.log(`Error de conexión a base de datos ${err.message}`);
      });
  }
}

module.exports = new Database();
