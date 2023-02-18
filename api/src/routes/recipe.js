const { Router } = require("express");
const { Recipe, Diet } = require('../db')

const router = Router();

router.post("/", async (req, res) => {
    //res.send("Estoy haciendo post");
    let {
        name,
        recipeSummary,
        healthScore,
        stepByStep,
        dietTypes 
    } = req.body;
    console.log(name, recipeSummary, healthScore, stepByStep);
    try {
        let recipeNew = await Recipe.create({
            name,
            recipeSummary,
            healthScore,
            stepByStep,
        });
        let dietTypesRecipeDb = await Diet.findAll({
            where: {name: dietTypes}
        })
        recipeNew.addDiet(dietTypesRecipeDb)
        res.status(200).send(recipeNew)  
    } catch (error) {
        res.status(400).send("Errooooo " + error);
    }

});

// recipe.get("/:id", (req, res) => {
//     res.send('Estoy haciendo GET con id de receta')
// });

// recipe.get("/", (req, res) => {
//     const { name } = req.query;
//     res.send('Esto fue por query ' + name);
// });

module.exports = router;