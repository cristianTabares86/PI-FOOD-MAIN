import style from "./Card.module.css"

const Card = (props) => {
    return(
        <div className={style.card}>
            <p>Name: {props.name}</p>
            {console.log(props.dietTypes)}
            <p>Tipos de dietas: {props.dietTypes.map(diet =>{return diet+" - "})}</p>
            <p>Id: {props.id}</p>
        </div>
    );
};


export default Card;