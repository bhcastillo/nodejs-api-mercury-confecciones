process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'dev') {
  process.env.URL_DB = 'mongodb://127.0.0.1:27017/products';
} else {
  process.env.URL_DB =
    'mongodb+srv://brayan_admin:asddF23DAaabpdox0i9@api-mercury-confecciones-2020-iekhe.mongodb.net/api-mercury-confecciones-2020?retryWrites=true&w=majority';
}
