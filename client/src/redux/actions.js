import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPEDETAIL = "GET_RECIPEDETAIL";
export const GET_DIETTYPES = "GET_DIETTYPES"

export const getRecipes = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            "http://localhost:3001/recipes"
        );
        const recipes = apiData.data;
        dispatch({ type: GET_RECIPES, payload: recipes });
    };
};


export const getRecipeById = (id) => {
    return async function (dispatch) {
        const apiData = await axios.get(
            `http://localhost:3001/recipes/${id}`
        );
        const recipe = apiData.data;
        dispatch({ type: "GET_RECIPEDETAIL", payload: recipe});
    };
};


export const getDietTypes = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            `http://localhost:3001/diets`
        );
        const dietTypes = apiData.data;
        dispatch({ type: "GET_DIETTYPES", payload: dietTypes});
    };
};