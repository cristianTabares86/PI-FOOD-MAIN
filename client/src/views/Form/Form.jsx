import axios from "axios";
import { useState, useEffect  } from "react";
import { useSelector } from "react-redux"
import { useDispatch} from 'react-redux';
import { getDietTypes } from "../../redux/actions"


const Form = () => {

    
    const dispatch = useDispatch();
    // dispatch(getDietTypes());
    useEffect(() => {
        dispatch(getDietTypes());
    }, [dispatch]);
     
    const dietTypes = useSelector(state => state.dietTypes);

     console.log(dietTypes)

    const [form, setForm] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        dietTypes: []
    });

    const [errors, setErrors] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        dietTypes: []
    });

  

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({ ...form, [property]: value })
        setForm({ ...form, [property]: value });

    };

    const validate = (form) => {
        if (/^[-+]?[0-9]+\.[0-9]+$/.test(form.healthScore)) {
            setErrors({ ...errors, healthScore: "" })
        } else {
            setErrors({ ...errors, healthScore: "Hay un error en el formato float" })
        }
        if (form.healthScore === "") setErrors({ ...errors, healthScore: "Debe introducir un número" })
    };

    const sumitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/recipes", form)
            .then(res => alert(res))
            .catch(err => alert(err))
    };

    return (
        <div>
        <h3>Create a new recipe</h3>
            <form onSubmit={sumitHandler}>
                <div>
                    <label>Recipe name: </label>
                    <input type="text" value={form.name} onChange={changeHandler} name="name" />
                </div>

                <div>
                    <label>Summary: </label>
                    <input type="text" value={form.summary} onChange={changeHandler} name="summary" />
                </div>

                <div>
                    <label>HealthScore: </label>
                    <input type="text" value={form.healthScore} onChange={changeHandler} name="healthScore" />
                    {errors.healthScore && <span>{errors.healthScore}</span>}
                </div>

                <div>
                    <label>Steps: </label>
                    <input type="text" value={form.steps} onChange={changeHandler} name="steps" />
                </div>

                <div>
                    <label>DietTypes: </label>
                    <input type="text" value={form.dietTypes} onChange={changeHandler} name="dietTypes" />
                </div>
                <button type="submit">CREAR RECETA</button>
            </form>
        </div>
    );
};


export default Form;