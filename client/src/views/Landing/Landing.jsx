import { Link } from "react-router-dom";

const Landing = () => {
    return(
        <>
            <h1>Esta es la vista de Landing</h1>
            <Link to="/home">
            <button>INGRESAR</button>
            </Link>
        </>
    );
};


export default Landing;