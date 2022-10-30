const client = require("../client");

module.exports = {
  getSomething,
  addShot,
  getRoundData,
};

async function getSomething() {
  return "were returning something?";
}

async function addShot({
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
            INSERT INTO round(shot, hole, par, "shotType", club, distance, "oneThought", commit, result)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
            returning *;
        `,
    [shot, hole, par, shotType, club, distance, oneThought, commit, result]
  );
  return addShot;
}
//we need to get all the data from this most recent round.
//userId score GIR FW% putts
async function getRoundData() {
  //userID | score
  //get the userId and score of the round
  try {
    console.log("yoooooo");
    const {
      rows: [score],
    } = await client.query(
      `
            SELECT "id"
            FROM "round"
            ORDER BY "id" DESC
            LIMIT 1;
        `
    );
    
    const { rows: fairways } = await client.query(
      `
            SELECT result 
            FROM round
            WHERE "shotType" = $1;
        `,
      ["Tee Shot"]
    );

    const { rows: putts } = await client.query(
      `
            SELECT "shotType" 
            FROM round
            WHERE "shotType" = $1;
        `,
      ["Putt"]
    );

    const { rows: approach } = await client.query(
      `
              SELECT result 
              FROM round
              WHERE "shotType" = $1;
          `,
      ["Approach"]
    );

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
