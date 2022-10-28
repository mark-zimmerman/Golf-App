const apiRouter = require('express').Router();

apiRouter.get('/', (req, res, next) => {
    res.send({
        message: "this is the API",
    });
});
// ROUTER: /api/round
const roundRouter = require('./round');
apiRouter.use('/round', roundRouter);
//ROUTER: /api/users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);
//ROUTER: /api/rounds
const roundsRouter = require('./rounds');
apiRouter.use('/rounds', roundsRouter);

module.exports = apiRouter;
