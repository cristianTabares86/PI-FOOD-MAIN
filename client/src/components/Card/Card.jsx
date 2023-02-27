import style from "./Card.module.css"
import { useHistory }  from 'react-router-dom'
import { useDispatch} from 'react-redux';
import { getRecipeById } from "../../redux/actions"

const Card = (props) => {
    const dispatch = useDispatch();
    let history = useHistory();
    //history.push('/detail')
    //const navegate = useNavigate();

     function handleId(id){
         dispatch(getRecipeById(id));
        history.push('/detail')
        // navegate('/detail');
    }

    return(
        <div className={style.card}>
            <img src={props.image} alt="Imagen Recipe --> No disponible" onClick={()=>handleId(props.id)} />
            <p>Name: {props.name}</p>
            {/* {console.log(props.dietTypes)} */}
            <p>Tipos de dietas: {props.dietTypes.map(diet =>{return <p>  {diet} </p>})}</p>
            <p>Id: {props.id}</p>
        </div>
    );
};


export default Card;