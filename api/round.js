const express = require("express");

const roundRouter = express.Router();
const {getSomething, addShot} = require("../db/models/roundModel")
//require in db functions

roundRouter.use(express.json());

//GET api/round
roundRouter.get('/', async (req, res, next) => {
    try {
        const something = await getSomething();
        res.send({
            something,
        })
    } catch (error) {
        console.log(error);
    }
});

roundRouter.post('/shot', async (req, res, next) => {
    console.log('were in the .post api');
    const {shot, hole, par, shotType, club, distance, oneThought, commit, result} = req.body;
    const addedShot = await addShot({shot, hole, par, shotType, club, distance, oneThought, commit, result});
    res.send({
        message: "here's your added shot",
        addedShot,
      });
})



module.exports = roundRouter;