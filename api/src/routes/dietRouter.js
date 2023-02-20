const { Router } = require('express');
const { getDietsHandlers } = require('../handlers/dietsHandlers')
const { Diet } = require('../db')


const dietRouter = Router();

dietRouter.get("/", getDietsHandlers); 


module.exports = dietRouter;