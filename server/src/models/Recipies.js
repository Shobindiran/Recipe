import mongoose from "mongoose";

const RecipiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: [{
        type: String,
        required:true 
    }],
    instructions: [{
        type: String,
        required:true
    }],
    imageURL:{
        type: String,
        required:true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    recipeOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }

});

export const RecipeModel = mongoose.model("recipies",RecipiesSchema);