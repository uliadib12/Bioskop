require('dotenv').config();

// memanggil library mysql
const pg = require('pg');
const { Client } = require('pg');

async function initDB() {
    const client = new Client({
        connectionString: process.env.POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    await client.connect();
    return client;
}

module.exports = async function () {
    const client = await initDB();
    return client;
};