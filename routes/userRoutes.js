const { LoginUser,RegisterUser } = require('../controllers/userControllers');
const userRouter = require('express').Router();



userRouter.post('/login', LoginUser);
userRouter.post('/register' , RegisterUser);
userRouter.get('/logout');


module.exports = userRouter;

