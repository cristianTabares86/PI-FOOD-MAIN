import {useSelector} from 'react-redux';

const Detail = () => {
    const detail = useSelector((state) => state.detail) 
    //console.log(detail)
    return(
        <>
            <h1>Esta es la vista de Detail</h1>
            <img src={detail.image} alt=" Img.Recipe --> Not fount"></img>
            <p>{detail.name}</p>
            <p>{detail.dishTypes}</p>
            {detail.dietTypes?.map((diet, index)=> <p key={index} >{diet.name ? diet.name : diet}</p>)}
            {detail.diets?.map((diet, index)=> <p key={index} >{diet.name ? diet.name : diet}</p>)}
        </>
    );
};


export default Detail;