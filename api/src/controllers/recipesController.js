const { Diet, Recipe } = require('../db');
const axios = require('axios');
const { apiKey } = process.env;




const createRecipe = async (name, summary, healthScore, steps, dietTypes) => {
    let myRecipe = await Recipe.create({
        name,
        summary,
        healthScore,
        steps,
    });
    let dietTypesRecipeDb = await Diet.findAll({
        where: { name: dietTypes }
    })
    myRecipe.addDiet(dietTypesRecipeDb)
    return myRecipe;
};

const getRecipeByIdAPI = async (id) => {
    return await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
};

const getRecipeByIdBD = async (id) => {
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

const getAllRecipesAPI = async () => {
    const resultApiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=4`);
    const dataRecipes = await resultApiUrl.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            name: e.title,
            dietTypes: e.diets,
            summary: e.summary,
            score: e.spoonacularScore,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })
    //console.log(dataRecipes)
    return dataRecipes;
};

const getAllRecipesBD = async () => {
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const concatAllRecipes = async (name) => {
    const dataApi = await getAllRecipesAPI();
    const dataBD = await getAllRecipesBD();
    //const allData = dataBD;
    const allData = dataApi.concat(dataBD); //!solo para verificar activar una vez termine
    console.log(dataBD)

    return allData;
    // if (name) {

    //     //console.log("aqui entreeeeee")
    //     let recipeByName = await allData.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));

    //     if (recipeByName.length) {
    //         let recipes = recipeByName.map(e => {
    //             return {
    //                 image: e.image,
    //                 name: e.name,
    //                 dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
    //                 score: e.score,
    //                 id: e.id
    //             }
    //         })
    //         return recipes;
    //     }
    //     throw new Error('No se encontró la receta por nombre');
    // }else{
    //     console.log("aqui entreeeeee 2")
    //     let recipes = allData.map(e => {
    //         return {
    //             image: e.image,
    //             name: e.name,
    //             dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
    //             score: e.score,
    //             id: e.id
    //         }
    //     })
    //     return recipes;
    // }
};

module.exports = { createRecipe, getRecipeByIdAPI, getRecipeByIdBD, concatAllRecipes };