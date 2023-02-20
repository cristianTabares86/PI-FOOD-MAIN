const { createRecipe, getRecipeByIdAPI, getRecipeByIdBD } = require('../controllers/recipesController')


const createRecipesHandlers = async (req, res) => {
    //res.send("Estoy haciendo post");
    let { name, recipeSummary, healthScore, stepByStep, dietTypes } = req.body;
    try {
        //console.log(name, recipeSummary, healthScore, stepByStep);
        let newRecipe = await createRecipe(
            name,
            recipeSummary,
            healthScore,
            stepByStep,
            dietTypes
        );
        res.status(200).send(newRecipe)
    } catch (error) {
        res.status(400).send("Errooooo " + error);
    }
};

//get fot :id
const getRecipeHandler = async(req, res) => {
    const { id } = req.params;
    try {
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            let resultBD = await getRecipeByIdBD(id);            
            return res.status(200).json(resultBD)
        }else{
            //console.log("yooo entre aqui")
            let resultApiRecipe = await getRecipeByIdAPI(id)
            if (resultApiRecipe.data.id) {
                let recipeDetails =  {                    
                    image: resultApiRecipe.data.image,
                    name: resultApiRecipe.data.title,
                    dishTypes: resultApiRecipe.data.dishTypes,
                    dietTypes: resultApiRecipe.data.diets,
                    summary: resultApiRecipe.data.summary,
                    score: resultApiRecipe.data.spoonacularScore,
                    healthScore: resultApiRecipe.data.healthScore,
                    steps: resultApiRecipe.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                return res.status(200).send(recipeDetails); 
            }
        }
        // let resultAPI = await getRecipeByIdAPI(id);
        // if(resultAPI) res.send("Encontre algon en la API");
        // let resultBD = await getRecipeByIdBD(id);
        // res.send("Encontre algo en la BD")

        // console.log(resultBD);
        // res.send(`Estoy enviando  por params el id  ${id} `);
    } catch (error) {
        res.status(400).send("Errooooo " + error);
    }
};

//Get for name
const getRecipesHandler = (req, res) => {
    const { name } = req.query;
    try {
        res.send(`Estoy enviando  por query ${name} `);
    } catch (error) {
        res.status(400).send("Errooooo " + error);
    }
};



module.exports = {
    createRecipesHandlers, 
    getRecipesHandler,
    getRecipeHandler
};