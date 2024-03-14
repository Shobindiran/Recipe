import React from 'react'

const CreateRecipies = () => {
  return (
    <section className="create-recipies">
      <div className="container">
        <div className="create-recipies-wrapper">
          <h2>Create Recipe</h2>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name"/>
            <label htmlFor="ingredients">Ingredients</label>
            <label htmlFor="instructions">Instructions</label>
            <textarea name="instructions" id="instructions"></textarea>
            <label htmlFor="imageURL">Image URL</label>
            <input type="text" id="imageURL" name="imageURL"/>
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input type="number" id="cookingTime" name="cookingTime" />
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateRecipies