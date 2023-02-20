const { Router } = require("express");
const { Recipe, Diet } = require('../db')
const { createRecipesHandlers, getRecipesHandler, getRecipeHandler } = require('../handlers/recipesHandlers')

const recipeRouter = Router();

recipeRouter.post("/", createRecipesHandlers); 

recipeRouter.get("/", getRecipesHandler); //get for name

recipeRouter.get("/:id", getRecipeHandler);//get for :id



module.exports = recipeRouter;