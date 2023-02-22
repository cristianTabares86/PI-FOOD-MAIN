import CardsContainer from "../../components/CardsContainer/CardsContanier";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRecipes } from "../../redux/actions";

const Home = () => {
    
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getRecipes())
    },[dispatch])

    return(
        <>
            <h1>Esta es la vista de home</h1>
            <CardsContainer/>
        </>
    );
};


export default Home;