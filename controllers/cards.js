const mongoose = require('mongoose')
const express = require('express')

const postCard = require('../models/postCard.js');
const user = require('../models/user.js');

const router=express.Router();

const getCards = async(req,res)=>{
    try {
        const post= await user.findOne({_id: req.user.id}).populate("saved").exec((err,result)=>{
            res.status(201).json(result)
        });
     
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getCard = async(req,res)=>{

    const {id: cardID} = req.params;

    try {
        const post= await user.findOne({_id: req.userId})
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const createCard = async(req,res)=>{

    const khojo = await postCard.findOne({name:req.body.name});
    if(!khojo){
        const newd = await postCard(req.body);
        await newd.save().then(async(da)=>{
            console.log(da)
            await user.findByIdAndUpdate(req.user.id,{
                $push:{
                    saved:da._id
                }
            },{new:true}).then((sd)=>{
                res.status(201).json(sd)
            })
        })
    }else{
        await user.findByIdAndUpdate(req.user.id,{
            $push:{
                saved:khojo._id
            }
        },{new:true}).then((ab)=>{
            res.status(201).json(ab)
        })
        // console.log("Already Exists")

    }

   
}

const deleteCard = async(req,res) => {
    
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No card with id: ${id}`); }

    // await postCard.findByIdAndDelete(id);
    // res.json({message: "Card deleted successfully."});
    await user.findByIdAndUpdate(req.user.id,{
        $pull:{
            saved:id
        }
    },{new:true}).then((d)=>{
        res.status(201).json(d)
    })
}

module.exports = {createCard,getCard,getCards,deleteCard};