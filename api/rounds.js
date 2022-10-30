const express = require("express");

const roundsRouter = express.Router();
const { addRound } = require("../db/models/roundsModel")
const {getSomething, addShot, getRoundData} = require("../db/models/roundModel");
const { getUser } = require("../db/models/usersModel");
// require in db functions
roundsRouter.use(express.json());
//1. we need to getRoundData
//2. use the data pass in db rounds function to put the data into roundS table
//



// roundsRouter.get()
roundsRouter.post('/', async (req, res, next) => {
  const {username} = req.body;
  console.log(username);
  try {
    const data = await getRoundData();
    const user = await getUser(username);
    // console.log('this is data', data.id);
    const {approach, putts, fairways, score} = data;
    //Approach
    let appRight = 0;
    let appLeft = 0;
    let appShort = 0;
    let appLong = 0;
    let appHit = 0;
    approach.forEach(item => {
      for (let key in item) {
        let curItem = (item[key]);
        if (curItem === "short") {
          appShort++;
        } else if (curItem === "short left") {
          appShort++;
          appLeft++;
        } else if (curItem === "left") {
          appLeft++;
        } else if (curItem === "long left") {
          appLeft++;
          appLong++; 
        } else if (curItem === "long") {
          appLong++;
        } else if (curItem === "long right") {
          appLong++;
          appRight++;
        } else if (curItem === "right") {
          appRight++;
        } else if (curItem === "short right") {
          appShort++;
          appRight++;
        } else if (curItem === "hit") {
          appHit++;
        }
      }
    })
    
    let appRightPer = appRight / approach.length * 100;
    let appLeftPer = appLeft / approach.length * 100;
    let appLongPer = appLong / approach.length * 100;
    let appShortPer = appShort / approach.length * 100;
    let appHitPer = appHit / approach.length * 100;

    //Tee shot
    let teeRight = 0;
    let teeLeft = 0;
    let teeHit = 0;
    
    fairways.forEach(item => {
      for (let key in item) {
        let curItem = (item[key]);
        if (curItem === "right") {
          teeRight++;
        } else if (curItem === "left") {
          teeLeft++;
        } else if (curItem === "right") {
          teeRight++;
        } else if (curItem === "Hit") {
          teeHit++;
        }
      }
    })
    let teeRightPer = teeRight / fairways.length * 100;
    let teeLeftPer = teeLeft / fairways.length * 100;
    let teeHitPer = teeHit / fairways.length * 100;
    let date = new Date().toLocaleDateString()
    //create putt stats
    let numPutts = putts.length;
    let roundScore = score.id;
    let userId = user.id
    console.log(approach);
    console.log('user IIDDDDD', userId, roundScore, date, teeLeftPer, teeRightPer, teeHitPer, numPutts, appRightPer, appLeftPer, appLongPer, appShortPer, appHitPer);
    const round = await addRound({userId, roundScore, date, teeLeftPer, teeRightPer, teeHitPer, numPutts, appRightPer, appLeftPer, appLongPer, appShortPer, appHitPer});
    
    res.send({
          round
      })
  } catch (error) {
      console.log(error);
  }
});

module.exports = roundsRouter;