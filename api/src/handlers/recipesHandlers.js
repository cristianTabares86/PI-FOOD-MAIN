const { createRecipe, getRecipeByIdAPI, getRecipeByIdBD, concatAllRecipes } = require('../controllers/recipesController')


const createRecipesHandlers = async (req, res) => {
    //res.send("Estoy haciendo post");
    let { name, summary, healthScore, steps, dietTypes } = req.body;
    try {
        //console.log(name, recipeSummary, healthScore, stepByStep);
        let newRecipe = await createRecipe(
            name,
            summary,
            healthScore,
            steps,
            dietTypes
        );
        res.status(200).send("Creado exitosamente")
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
const getRecipesHandler = async(req, res) => {
    const { name } = req.query;
    try {
        let resultSearch = await concatAllRecipes(name);
        //console.log(resultSearch);
        if (name) {
            let recipeByName = await resultSearch.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
           
            if (recipeByName.length) {
                let recipes = recipeByName.map(e => {
                    return {
                        //image: e.image,
                        name: e.name,
                        dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                        //score: e.score,
                        id: e.id
                    }
                })
                return res.status(200).send(recipes); 
            }  
            return res.status(404).send('Sorry, recipe not found')
        } else {
            let recipes = resultSearch.map(e => {
                return {
                    //image: e.image,
                    name: e.name,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                    //score: e.score,
                    id: e.id
                }
            })
            return res.status(200).send(recipes);
        }
    } catch (error) {
        res.status(400).send("Errooooo " + error);
    }
};



module.exports = {
    createRecipesHandlers, 
    getRecipesHandler,
    getRecipeHandler
};