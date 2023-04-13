import mongoose from 'mongoose'
import Question from '../models/Question.js'

export const postAnswer = async (req , res ) => {
    const {id: _id} = req.params;
    const {noOfAnswer, answerBody, userAnswered, userId} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return  res.status(404).send('question unavailable.....')
    }
    updateNoOfQuestions(_id, noOfAnswer)
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody, userAnswered, userId}]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const updateNoOfQuestions = async(_id, noOfAnswer) =>{
    try {
        await Question.findByIdAndUpdate(_id, {$set:{'noOfAnswer' :noOfAnswer}})
    } catch (error) {
        console.log(error)
    }
}
export const deleteAnswer = async (req,res)=>{
    const {id:_id} = req.params
    const {answerId, noOfAnswer} = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return  res.status(404).send('question unavailable.....')
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return  res.status(404).send('question unavailable.....')
    }
    updateNoOfQuestions(_id , noOfAnswer)
    try {
        await Question.updateOne(
            {_id},
            {$pull :{'answer': {_id : answerId}}}
        )
        res.status(200).json({message:"Successfully deleted.... "})
    } catch (error) {
        res.status(405).json(error)
    }
}