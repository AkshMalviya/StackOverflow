import React,{useState} from 'react'
import {useDispatch ,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './AskQuestion.css'
import {askQuestion} from '../../actions/question'

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state) => (state.currentUserReducer))
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log({questionTitle,questionBody, questionTags })
        dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted : User.result.name , userId:User?.result?._id}, navigate ))
    }
    const handleEnter = (e)=>{
        if(e.key === "Enter"){
            setQuestionBody(questionBody + "\n")
        }
    }
  return (
    <div className="ask-question">
        <div className="ask-ques-container">
            <h1>Ask a public Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Be specific and imagine you'are asking a question to another person</p>
                        <input type="text" name="questionTitle" id="ask-ques-title" placeholder='e.g. Is there an R function for finding the index of an element in a vector' onChange={(e) => setQuestionTitle(e.target.value)}/>
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <textarea name="body" id="ask-ques-body" cols="30" rows="10" onKeyPress={handleEnter} onChange={(e) => setQuestionBody(e.target.value)}></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Title</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type="text" name="questionTags" id="ask-ques-tags" placeholder='e.g.(xms typescript wordpress)' onChange={(e) => setQuestionTags(e.target.value.split(" "))}/>
                    </label>
                </div>
                <button type="submit" className='review-btn'>Review your question</button>
            </form>
        </div>
    </div>
  )
}

export default AskQuestion