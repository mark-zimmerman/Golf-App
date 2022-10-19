const { client } = require("./");

async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS "round";
        `);
    } catch (error) {
        console.log(error);
    }
}

async function createTables() {
    try {
    await client.query(`
        CREATE TABLE round (
            id SERIAL PRIMARY KEY,
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

