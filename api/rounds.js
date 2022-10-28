const express = require("express");

const roundsRouter = express.Router();
// const { addRound } = require("../db/models/roundsModel")
const {getSomething, addShot, getRoundData} = require("../db/models/roundModel")
// require in db functions
roundsRouter.use(express.json());
//1. we need to getRoundData
//2. use the data pass in db rounds function to put the data into roundS table
//

roundsRouter.post('/round', async (req, res, next) => {
    console.log('were in post ROUNDSSS api');
    const {date} = req.body;
    const addedRound = await addRound(date);
    res.send({
        message: "you added a round to rounds table",
      });
})

// roundsRouter.get()
roundsRouter.get('/', async (req, res, next) => {
  try {
    const data = await getRoundData();
    // console.log('this is data', data.id);
    res.send({
          message: "message",
      })
  } catch (error) {
      console.log(error);
  }
});

module.exports = roundsRouter;