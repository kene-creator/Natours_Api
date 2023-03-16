//SERVER
// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tours = require('../../models/tourModel');

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//Import data into db
const importData = async () => {
  try {
    await Tours.create(tours);
    console.log('Data loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//delete all data from collection
const deleteData = async () => {
  try {
    await Tours.deleteMany();
    console.log('Data deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
