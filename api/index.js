const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
    res.send({
        message: "this is the API",
    });
});
// ROUTER: /api/round
const roundRouter = require('./round');
apiRouter.use('/round', roundRouter);

module.exports = apiRouter;
