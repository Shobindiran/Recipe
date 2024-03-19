import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';

const Home = () => {
  const [recipies,setRecipies] = useState([]);
  const [savedRecipies,setSavedRecipies] = useState([])
  const userID = useGetUserID();

  useEffect(()=>{
    const fetchRecipe = async()=>{
      try{
        const response = await axios.get("http://localhost:8000/recipies");
        setRecipies(response.data);
      }catch(err){
        console.log(err);
      }
    }

    const fetchSavedRecipe = async()=>{
      try{
        const response = await axios.get(`http://localhost:8000/recipies/savedRecipies/ids/${userID}`);
        setSavedRecipies(response.data.savedRecipies);
      }catch(err){
        console.log(err);
      }
    }

    fetchRecipe();
    fetchSavedRecipe();
  },[]);

  const saveRecipe = async (recipeID)=>{
    try{
      const response = await axios.put("http://localhost:8000/recipies",{recipeID,userID});
      console.log(recipeID,userID,response)
    }catch(err){
      console.log(err);
    }
  }

  const isRecipeSaved = (id)=> savedRecipies.includes(id)

  return (
    <div className='recipies-wrapper'>
      <h1>Recipies</h1>
      <ul>
        {recipies.map((recipe)=>(
          <li key={recipe._id}> 
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={()=>saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id) ? "Saved" : "save"}
              </button>
            </div>

            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageURL} alt={recipe.name}></img>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;