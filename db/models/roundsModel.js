const client = require("../client");

module.exports = {
    addRound,
    getPlayerRounds,
};

async function addRound ({userId, roundScore, date, teeLeft, teeRight, teeHit, numPutts, appRight, appLeft, appLong, appShort, appHit}) {
    //we need a bunch of data from the
    const {
        rows: [addRound],
      } = await client.query(
        `
                INSERT INTO rounds("userId", score, putts, date, "approachLong", "approachRight", "approachHit", "approachShort", "approachLeft", "driveLeft", "driveHit", "driveRight")
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                returning *;
            `,
        [userId, roundScore, numPutts, date, appLong, appRight, appHit, appShort, appLeft, teeLeft, teeHit, teeRight]
      );
      return addRound;
}
async function getPlayerRounds(userId) {
    const {
        rows: rounds,
      } = await client.query(
        `   SELECT *
            FROM rounds
            WHERE "userId" = $1;
            `, [userId]
      );
      // console.log('this is rounds inside of db', rounds);
      return rounds;
}