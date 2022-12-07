const client = require("../client");

module.exports = {
  getSomething,
  addShot,
  getRoundData,
  deleteRound,
};

async function getSomething() {
  return "were returning something?";
}

async function addShot({
  id,
  shot,
  hole,
  par,
  shotType,
  club,
  distance,
  oneThought,
  commit,
  result,
}) {
  console.log("inside the addShot func DB");
  const {
    rows: [addShot],
  } = await client.query(
    `
            INSERT INTO round("userId", shot, hole, par, "shotType", club, distance, "oneThought", commit, result)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            returning *;
        `,
    [id, shot, hole, par, shotType, club, distance, oneThought, commit, result]
  );
  return addShot;
}
//we need to get all the data from this most recent round.
//userId score GIR FW% putts
async function getRoundData(id) {
  //userID | score
  //get the userId and score of the round
  console.log("inside getRoundData");
  try {
    console.log('this is the id inside getRoundData', id);
    const {
      rows: score,
    } = await client.query(
      `
            SELECT id
            FROM round
            WHERE "userId" = $1;
        `,
        [id]
    );
  
    console.log('score', score)
    const { rows: fairways } = await client.query(
      `
            SELECT result 
            FROM round
            WHERE "shotType" = $1 AND "userId" = $2;
        `,
      ["Tee Shot", id]
    );
    console.log('score', score)
    const { rows: putts } = await client.query(
      `
            SELECT "shotType" 
            FROM round
            WHERE "shotType" = $1 AND "userId" = $2;
        `,
      ["Putt", id]
    );
    console.log('puts', putts)
    const { rows: approach } = await client.query(
      `
              SELECT result 
              FROM round
              WHERE "shotType" = $1 AND "userId" = $2;
          `,
      ["Approach", id]
    );
    console.log('approach', approach)
    return {
        approach,
        putts,
        fairways,
        score,
    }
  } catch (error) {
    console.log(error);
  }
}
async function deleteRound(id) {
  try {
   await client.query(
      `
            DELETE
            FROM round
            WHERE "userId"=$1
            RETURNING *;
        `, [id]
    );
    
  } catch (error) {
    console.log(error);
  }
}