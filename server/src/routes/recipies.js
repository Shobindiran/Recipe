import express from "express"
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipies.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async(req,res)=>{
    try{
        const response = await RecipeModel.find({});
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});

router.post("/", verifyToken, async(req,res)=>{

    const recipe = new RecipeModel(req.body);

    try{
        const response = await recipe.save();
        res.json(response);
    }
    catch(err){
        res.json(err);
    }
});

router.put("/", verifyToken, async(req,res)=>{
    
    try{
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipies.push(recipe);
        await user.save();
        res.json({savedRecipies: user.savedRecipies})
    }
    catch(err){
        res.json(err);
    }
});

router.get("/savedRecipies/ids/:userID", async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({savedRecipies:user.savedRecipies});
    }
    catch(err){
        res.json(err);
    }
});

router.get("/savedRecipies/:userID", async(req,res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedRecipies = await RecipeModel.find({
            _id:{$in: user.savedRecipies}
        });
        res.json({savedRecipies});
    }
    catch(err){
        res.json(err);
    }
});





export {router as recipiesRouter};
