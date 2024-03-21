import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../hooks/useGetUserID';

const SavedRecipies = () => {
  const [SavedRecipies,setSavedRecipies] = useState([]);
  const userID = useGetUserID();

  useEffect(()=>{

    const fetchSavedRecipe = async()=>{
      try{
        const response = await axios.get(`http://localhost:8000/recipies/savedRecipies/${userID}`);
        setSavedRecipies(response.data.savedRecipies);
      }catch(err){
        console.log(err);
      }
    }
    fetchSavedRecipe();
  },[]);
  
  return (
    <div className="recipies">
      <div className="container">
        <div className='recipies-wrapper'>
          <h1>Saved Recipies</h1>
          <ul className='recipe-list'>
            {SavedRecipies.map((recipe)=>(
              <li key={recipe._id} className='recipe'> 
                <div className='recipe-box'>
                  <div className='recipe-header'>
                    <h2>{recipe.name}</h2>
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

export default SavedRecipies;