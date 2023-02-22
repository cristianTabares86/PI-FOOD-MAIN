import Card from "../Card/Card";
import style from "./CardsContanier.module.css"
import { useSelector } from "react-redux"
// const recipes = [
//     {
//         "name": "Cannellini Bean and Asparagus Salad with Mushrooms",
//         "dietTypes": [
//             "gluten free",
//             "dairy free",
//             "lacto ovo vegetarian",
//             "vegan"
//         ],
//         "id": 782585
//     },
//     {
//         "name": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
//         "dietTypes": [
//             "gluten free",
//             "dairy free",
//             "lacto ovo vegetarian",
//             "vegan"
//         ],
//         "id": 716426
//     },
//     {
//         "name": "Berry Banana Breakfast Smoothie",
//         "dietTypes": [
//             "lacto ovo vegetarian"
//         ],
//         "id": 715497
//     },
//     {
//         "name": "Red Lentil Soup with Chicken and Turnips",
//         "dietTypes": [
//             "gluten free",
//             "dairy free"
//         ],
//         "id": 715415
//     }
// ];


const CardsContainer = () => {
    const recipes = useSelector(state=>state.recipes)
    return(
        <div className={style.container}>
            {recipes.map(recipe => {
                return <Card 
                    name = {recipe.name}
                    dietTypes = {recipe.dietTypes}
                    id = {recipe.id}
                />
            })}
        </div>
    );
};


export default CardsContainer;