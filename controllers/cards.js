import express from 'express';
import mongoose from 'mongoose';

import postCard from '../models/postCard.js';
import user from '../models/user.js';

const router=express.Router();

export const getCards = async(req,res)=>{
    // try {
    //     const postCards= await postCard.find({});
    //     res.status(200).json(postCards);
    // } catch (error) {
    //     res.status(404).json({message: error.message});
    // }

    try {
        const post= await user.findOne({_id: req.user.id}).populate("saved").exec((err,result)=>{
            res.status(201).json(result)
        });
     
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getCard = async(req,res)=>{

    const {id: cardID} = req.params;

    try {
        const post= await user.findOne({_id: req.userId})
        res.status(201).json(post)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createCard = async(req,res)=>{

    // postCard.find({ name: req.body.name }, function (err, docs) {
    //     if (!docs.length){
    //         try {
    //             const newCard = postCard.create(req.body);
    //             res.json({newCard});

    //             res.status(201).send({
    //                 statusCode: 201
    //             });   
    //         } catch (error) {
    //             res.status(409).json({message: error.message});
    //         }
    //     }else{           
    //         res.status(201).send({
    //             statusCode: 422
    //          });    
    //     }
    // });

    console.log(req.body);
    console.log(req.user)
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

export const deleteCard = async(req,res) => {
    
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

export default router;