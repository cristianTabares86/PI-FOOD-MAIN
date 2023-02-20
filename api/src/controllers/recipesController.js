const { Diet, Recipe } = require('../db');
const axios = require('axios');
const { apiKey } = process.env;




const createRecipe = async(name, recipeSummary, healthScore, stepByStep, dietTypes) => {
    let myRecipe= await Recipe.create({
        name,
        recipeSummary,
        healthScore,
        stepByStep,
    });
    let dietTypesRecipeDb = await Diet.findAll({
        where: {name: dietTypes}
    })
    myRecipe.addDiet(dietTypesRecipeDb)
    return myRecipe;
};

const getRecipeByIdAPI = async(id) => {
    return await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
};

const getRecipeByIdBD = async(id) => {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};


module.exports = {createRecipe, getRecipeByIdAPI, getRecipeByIdBD};