const {Client} = require('pg');

const DB_NAME = 'Golf_App_DB';

const DB_URL = `postgres://localhost:5432/${DB_NAME}`;

let client; 

client = new Client(DB_URL);

module.exports = client;