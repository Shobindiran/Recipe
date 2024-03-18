import axios from 'axios';
import React, { useState } from 'react'
import { useGetUserID } from "../hooks/useGetUserID"
import { useNavigate } from 'react-router-dom';

const CreateRecipies = () => {
  const userID = useGetUserID();
  const [recipe,setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    recipeOwner: userID
  });
  const navigate = useNavigate();

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setRecipe({...recipe,[name]:value})
  };

  const handleIngredientChange = (e,index)=>{
    const {value} = e.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({...recipe,ingredients:ingredients});
  }

  const addIngredient = ()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
  };
  
  const onSubmit = async (e)=>{
    e.preventDefault();

    try{
      axios.post("http://localhost:8000/recipies",recipe);
      alert("recipe created");
      navigate("/")
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <section className="create-recipies">
      <div className="container">
        <div className="create-recipies-wrapper">
          <h2 className='display-5 pb-2' >Create Recipe</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" name="name" className="form-control" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">Ingredients</label>
              <button onClick={addIngredient} type="button">Add ingredients</button>
              {recipe.ingredients.map((ingredient,index)=>{
                return (
                  <input key={index} type="text" name="ingredients" className="form-control my-2" value={ingredient} onChange={(e)=>handleIngredientChange(e,index)}/>
                )
              })}
            </div>
            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">Instructions</label>
              <textarea name="instructions" id="instructions" className="form-control" onChange={handleChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="imageURL" className="form-label">Image URL</label>
              <input type="text" id="imageURL" name="imageURL" className="form-control" onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="cookingTime" className="form-label">Cooking Time (minutes)</label>
              <input type="number" id="cookingTime" name="cookingTime" className="form-control" onChange={handleChange}/>
            </div>

            <button type="submit" >Create Recipe</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateRecipies