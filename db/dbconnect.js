const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.DB);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to the database');
    // You can perform additional actions here after the connection is established
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = client;