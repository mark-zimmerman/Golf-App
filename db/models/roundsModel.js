const client = require("../client");

module.exports = {
    addRound
};

async function addRound ({userId, roundScore, date, teeLeftPer, teeRightPer, teeHitPer, numPutts, appRightPer, appLeftPer, appLongPer, appShortPer, appHitPer}) {
    //we need a bunch of data from the
    const {
        rows: [addRound],
      } = await client.query(
        `
                INSERT INTO rounds("userId", score, putts, date, "approach_%_Long", "approach_%_Right", "approach_%_Hit", "approach_%_Short", "approach_%_Left", "drive_%_Left", "drive_%_Hit", "drive_%_Right")
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                returning *;
            `,
        [userId, roundScore, numPutts, date, appLongPer, appRightPer, appHitPer, appShortPer, appLeftPer, teeLeftPer, teeHitPer, teeRightPer]
      );
      return addRound;
}