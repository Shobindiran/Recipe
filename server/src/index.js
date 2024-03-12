import  express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import {userRouter} from "./routes/users.js";
import { recipiesRouter } from "./routes/recipies.js";

dotenv.config();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipies", recipiesRouter);


mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log("db connected")});

app.listen(port,()=>{
    console.log(`listening on port  ${port}`);
});