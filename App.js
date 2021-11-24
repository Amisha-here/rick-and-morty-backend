import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv' ;

import userRouter from "./routes/user.js";
import cards  from './routes/cards.js';

const app=express();
dotenv.config();

app.use(express.json({limit:"30mb",extended: true}));
app.use(express.urlencoded({limit:"30mb",extended: true}));

app.use(cors());

app.use('/cards',cards);
app.use('/user', userRouter);

app.get('/',(req,res)=> {
    res.send('Hello to Rick and Morty API');
})

const CONNECTION_URL='mongodb+srv://amisha:1234@cluster0.ys6ss.mongodb.net/RICK&MORTY?retryWrites=true&w=majority';
const PORT= process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT,()=> console.log(`Server running on port: ${PORT}`)) )
    .catch((error)=>console.log(error.message));

mongoose.set(`useFindAndModify`, false);

