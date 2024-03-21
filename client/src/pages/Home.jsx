import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import {useCookies} from "react-cookie";

const Home = () => {
  const [recipies,setRecipies] = useState([]);
  const [savedRecipies,setSavedRecipies] = useState([])
  const [cookies,_] = useCookies(["access_token"])

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
    if(cookies.access_token) fetchSavedRecipe();
  },[]);

  const saveRecipe = async (recipeID)=>{
    try{
      const response = await axios.put("http://localhost:8000/recipies",
      {
        recipeID,
        userID,
        // authorization:cookies.access_token //here
      },
      {headers:{ authorization: cookies.access_token }}
      );
      setSavedRecipies(response.data.savedRecipies)
    }catch(err){
      console.log(err);
    }
  }

  const isRecipeSaved = (id)=> savedRecipies.includes(id)
  
  return (
    <div className="recipies">
      <div className="container">
        <div className='recipies-wrapper'>
          <h1>Recipies</h1>
          <ul className='recipe-list'>
            {recipies.map((recipe)=>(
              <li key={recipe._id} className='recipe'> 
                <div className='recipe-box'>
                  <div className='recipe-header'>
                    <h2>{recipe.name}</h2>
                    <button className='mybtn' onClick={()=>saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                      {isRecipeSaved(recipe._id) ? "Saved" : "save"}
                    </button>
                  </div>

                  <div className="instructions">
                    <p>{recipe.instructions}</p>
                  </div>
                  <img className="recipe-img" src={recipe.imageURL} alt={recipe.name}></img>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;