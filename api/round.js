const express = require("express");

const roundRouter = express.Router();
const {addShot, deleteRound} = require("../db/models/roundModel")
const { getUser } = require("../db/models/usersModel")
//require in db functions

roundRouter.use(express.json());

//GET api/round
roundRouter.post('/shot', async (req, res, next) => {
    console.log('were in the .post api');
    const {id, shot, hole, par, shotType, club, distance, oneThought, commit, result} = req.body;
    const addedShot = await addShot({id, shot, hole, par, shotType, club, distance, oneThought, commit, result});
    res.send({
        message: "here's your added shot",
        addedShot,
      });
})
//DELETE api/round
roundRouter.delete('/', async (req, res, next) => {
  const {username} = req.body;
  console.log('this is the req', username);
  try {
    const user = await getUser(username);
    console.log("username", username);
    console.log("user.id", user.id)
    const userId = user.id;
    const deleted = await deleteRound(userId);

  } catch (error) {
    console.log(error);
  }

});




module.exports = roundRouter;