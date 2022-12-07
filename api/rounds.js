const express = require("express");

const roundsRouter = express.Router();
const { addRound, getPlayerRounds} = require("../db/models/roundsModel")
const {getSomething, addShot, getRoundData, deleteRound} = require("../db/models/roundModel");
const { getUser } = require("../db/models/usersModel");
const { getStaticContextFromError } = require("@remix-run/router");
// require in db functions
roundsRouter.use(express.json());
//1. we need to getRoundData
//2. use the data pass in db rounds function to put the data into roundS table
//

// roundsRouter.get()
roundsRouter.post('/', async (req, res, next) => {
  const {username, id} = req.body;
 
  try {
    
    const data = await getRoundData(id);
    const user = await getUser(username);
  
    // console.log(user)
    // console.log('this is data', data);
    const {approach, putts, fairways, score} = data;
    console.log('this is score', score);
    console.log('this is score.id', score.id);
    console.log('this is score.length', score.length);
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
    
    // let appRightPer = Math.round(appRight / approach.length * 100);
    // let appLeftPer = Math.round(appLeft / approach.length * 100);
    // let appLongPer = Math.round(appLong / approach.length * 100);
    // let appShortPer = Math.round(appShort / approach.length * 100);
    // let appHitPer = Math.round(appHit / approach.length * 100);

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
    // let teeRightPer = Math.round(teeRight / fairways.length * 100);
    // let teeLeftPer = Math.round(teeLeft / fairways.length * 100);
    // let teeHitPer = Math.round(teeHit / fairways.length * 100);
    let date = new Date().toLocaleDateString()
    //create putt stats
    // console.log('teeRPer', teeRightPer);
    // console.log('user IIDDDDD', date, teeLeft, teeRight, teeHit, appRightPer, appLeftPer, appLongPer, appShortPer, appHitPer);
    let numPutts = putts.length;
    // console.log('numputts', numPutts);
    let roundScore = score.length;
    // console.log('roundScore', roundScore)
    let userId = user.id

    
    const round = await addRound({userId, roundScore, date, teeLeft, teeRight, teeHit, numPutts, appRight, appLeft, appLong, appShort, appHit});
    const removedRound = await deleteRound(id);
    res.send({
          round
      })
  } catch (error) {
      console.log(error);
  }
});

// roundsRouter.post('/scores', async (req, res, next) => {
//   const {username} = req.body;
//   console.log('we in scores api', username)
//   try { 
//     const user = await getUser(username);
//     const userId = user.id;
//     console.log(user)
//     const response = await getScores(userId);
    
//     console.log(response);
//     res.send({
//       score: response,
//     })

//   } catch (error) {
//     console.log(error);
//   }
// });
roundsRouter.post('/player-rounds', async (req, res, next) => {
  // console.log('we made it to player-rounds api route')
  const {username} = req.body;
  // console.log('we in scores api', username)
  try { 
    const user = await getUser(username);
    const userId = user.id;
    // console.log(user)
    //good to this point
    const response = await getPlayerRounds(userId);
    
    // console.log(response);
    res.send({
      rounds: response,
    })

  } catch (error) {
    console.log(error);
  }
});
module.exports = roundsRouter;