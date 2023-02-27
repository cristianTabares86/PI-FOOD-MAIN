import { GET_RECIPES, GET_RECIPEDETAIL, GET_DIETTYPES } from "./actions";

const initialState = {
    recipes: [],
    detail:[],
    dietTypes:[],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return { ...state, recipes: action.payload };
        case GET_RECIPEDETAIL:
            return {...state, detail: action.payload}
        case GET_DIETTYPES:
            return {...state, dietTypes: action.payload}
        default: 
        return { ...state};
    }
};

export default rootReducer;