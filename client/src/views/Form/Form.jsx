import axios from "axios";
import { useState } from "react";

const Form = () => {

    const [form, setForm] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        dietTypes: ""
    });

    const [errors,setErrors] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        dietTypes: ""
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({...form,[property]:value})
        setForm({...form,[property]:value});
        
    };

    const validate = (form) => {
        if(/^[-+]?[0-9]+\.[0-9]+$/.test(form.healthScore)){
            setErrors({...errors,healthScore:""})
        }else{
            setErrors({...errors,healthScore:"Hay un error en el formato float"})
        }
        if(form.healthScore === "") setErrors({...errors, healthScore:"Debe introducir un número"})
    };

    const sumitHandler = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:3001/recipes", form)
        .then(res=>alert(res))
        .catch(err=>alert(err))
    };

    return (
        <form onSubmit={sumitHandler}>
            <div>
                <label>Name: </label>
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
    );
};


export default Form;