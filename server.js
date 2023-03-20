//SERVER
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection established'));

const app = require('./app');

const port = process.env.PORT || 3002;
const server = app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  //unhandledRejection is an event
  console.log('UNHANDLED REJECTION! Shutting down...'); //that is emitted when a promise is rejected and there is no error handler
  console.log(err.name, err.message); //attached to it.
  server.close(() => {
    process.exit(1);
  });
});
