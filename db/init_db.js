const { client } = require("./");

async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS "round";
        DROP TABLE IF EXISTS "rounds";
        DROP TABLE IF EXISTS "users";
        `);
    } catch (error) {
        console.log(error);
    }
}

async function createTables() {
    try {
    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            "userName" VARCHAR(255) NOT NULL,
            "hashedPassword" VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
        );
        CREATE TABLE round (
            id SERIAL PRIMARY KEY,
            userid INTEGER REFERENCES users(id),
            shot INTEGER NOT NULL,
            hole INTEGER NOT NULL,
            par INTEGER NOT NULL,
            "shotType" VARCHAR(255) NOT NULL,
            club VARCHAR(255) NOT NULL,
            distance INTEGER,
            "oneThought" VARCHAR(255) NOT NULL,
            commit BOOLEAN,
            result VARCHAR(255) NOT NULL
        );
        CREATE TABLE rounds (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "roundId" INTEGER REFERENCES users(id),
            score INTEGER NOT NULL,
            "GIR" INTEGER NOT NULL,
            "FW%" FLOAT,
            putts INTEGER NOT NULL,
            date VARCHAR(255) NOT NULL,
            "approach_%_Long" INTEGER,
            "approach_%_Right" INTEGER,
            "approach_%_Hit" INTEGER,
            "approach_%_Short" INTEGER,
            "approach_%_Left" INTEGER,
            "drive_%_Left" INTEGER,
            "drive_%_Hit" INTEGER,
            "drive_%_Right" INTEGER
        );
    `);
    } catch (error) {
        console.log(error);
    }
}

async function buildTables() {
    try {
        client.connect();

        dropTables();
        console.log('tablesDropped');

        createTables();
        console.log('tables created');
    } catch (error) {
        throw error;
    }
}

buildTables() 
    .catch(console.error)

