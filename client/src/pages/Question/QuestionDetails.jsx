import React , { useState} from 'react'
import { useParams , Link ,useNavigate ,useLocation} from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import copy from 'copy-to-clipboard'

import upVotes from '../../assets/sort-up-solid.svg'
import downVotes from '../../assets/sort-down-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import "./Question.css"
import DisplayAnswer from './DisplayAnswer'
import {postAnswer , deleteQuestion , voteQuestion} from '../../actions/question'


const QuestionDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch() 
    const location = useLocation()
    const [Answer, setAnswer] = useState("")
    const User = useSelector((state) => (state.currentUserReducer));
    const questionList = useSelector(state => state.questionsReducer)
    const handlePostAns = (e , answerLength)=>{
        e.preventDefault();
        if(User === null){
            alert("Login or signup to answer")
            navigate('/Auth')
        }else{
            if(Answer === " "){
                alert("Can't post empty answer")
            }
            else{
                dispatch(postAnswer({id, noOfAnswer:answerLength+1, answerBody:Answer, userAnswered:User.result.name, userId:User.result._id}))
            }
        }
    }
    const handleShare = ()=>{
        const url = 'http://localhost:3000'+ location.pathname
        copy(url)
    }
    const handleDelete= ()=>{
        dispatch(deleteQuestion(id, navigate))
    }
    const handleUpVote = ()=>{
        dispatch(voteQuestion(id, 'upVote',User.result._id))
    }
    const handleDownVote = ()=>{
        dispatch(voteQuestion(id, 'downVote',User.result._id))
    }
    // var questionList = [{
    //     _id:"1",
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswer:2,
    //     questionTitle:'What is a function?',
    //     questionBody:'It meant to be',
    //     questionTags:["java" , 'node js', "React js", 'mongo db'],
    //     userPosted:'mano',
    //     userId: 1,
    //     askedOn:"jan 1",
    //     answer:[{
    //         answerBody : "Answer",
    //         userAnswered:'kumar',
    //         answeredOn:'jan 2',
    //         userId : "2"
    //     }]
    // },{
    //     _id:"2",
    //     upVotes:3,
    //     downVotes:3,
    //     noOfAnswer:0,
    //     questionTitle:'What is a function?',
    //     questionBody:'It meant to be',
    //     questionTags:["javascript" , 'R', "Python"],
    //     userPosted:'mano',
    //     userId: 1,
    //     askedOn:"jan 1",
    //     answer:[{
    //         answerBody : "Answer",
    //         userAnswered:'kumar',
    //         answeredOn:'jan 2',
    //         userId : "2"
    //     }]
    // },{
    //     _id:"3",
    //     upVotes:3,
    //     downVotes:3,
    //     noOfAnswer:0,
    //     questionTitle:'What is a function?',
    //     questionBody:'It meant to be',
    //     questionTags:["javascript" , 'R', "Python"],
    //     userPosted:'mano',
    //     userId: 1,
    //     askedOn:"jan 1",
    //     answer:[{
    //         answerBody : "Answer",
    //         userAnswered:'kumar',
    //         answeredOn:'jan 2',
    //         userId : "2"
    //     }]
    // }]

  return (
    <div className='question-details-page'>
        {
            questionList.data === null ? 
            <h1>Loading...</h1>:
            <>
                {
                    questionList.data.filter(question => question._id === id).map(question => (
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className='question-details-container-2'>
                                    <div className="question-votes">
                                        <img src={upVotes} alt="" width='18' onClick={handleUpVote}/>
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downVotes} alt="" width='18' onClick={handleDownVote}/>
                                    </div> 
                                    <div style={{width:'100%'}}>
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {
                                                question.questionTags.map((tag=> <p key={tag}>{tag}</p>))
                                            }
                                        </div>
                                        <div className="question-action-user">
                                            <div>
                                                <button type='button' onClick={handleShare}>share</button>
                                                {
                                                    User?.result?._id === question?.userId && (
                                                        <button type='button' onClick={handleDelete} >Delete</button>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p>asked {moment(question.askedOn).fromNow()}</p>
                                                <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                                    <Avatar backgroundColor='orange' px='8px' py='5px'>{" "}
                              {question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>      
                                </div>
                            </section>
                            {
                                question.noOfAnswer !== 0 && (
                                    <section>
                                        <h3>{question.noOfAnswer} Answer</h3>
                                        <DisplayAnswer key={question._id} question={question}/>
                                    </section>
                                )
                            }
                            <section className='post-ans-container'>
                                <h3>Your Answer</h3>
                                <form onSubmit={ (e) => handlePostAns(e, question.answer.length)}>
                                    <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br />
                                    <input type="submit" value="Post Your Answer" className='post-ans-btn' />
                                </form>
                                <p>
                                    Browse other Question tagged
                                    {
                                        question.questionTags.map((tag)=>(
                                            <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                        ))
                                    } or 
                                    <Link to='/AskQuestion' style={{textDecoration:'none' , color:'#009dff'}}>ask your question.</Link>
                                </p>
                            </section>
                        </div>
                    ))
                }
            </>
        }
    </div>
  )
}

export default QuestionDetails