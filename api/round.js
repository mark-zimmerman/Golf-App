const express = require("express");

const roundRouter = express.Router();
const {getSomething} = require("../db/models/roundModel")
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

module.exports = roundRouter;