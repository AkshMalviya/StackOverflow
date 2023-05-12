import React from 'react'
import './HomeMainbar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
import { useNavigate, useLocation } from 'react-router-dom'
import QuestionList from './QuestionList'
import { useSelector } from 'react-redux'


const HomeMainbar = () => {
    const questionList = useSelector((state) => (state.questionsReducer))
    console.log(questionList)


    // var questionList = [{
    //     _id:1,
    //     upVotes:3,
    //     downVotes:3,
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
    //         userId : 2
    //     }]
    // },{
    //     _id:2,
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
    //         userId : 2
    //     }]
    // },{
    //     _id:3,
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
    //         userId : 2
    //     }]
    // }]
    const user = useSelector((state) => (state.currentUserReducer));
    const navigate = useNavigate()
    const location = useLocation()
    const checkAuth = ()=>{
        if (user === null) {
            alert("login or signup to ask a question");
            navigate('/Auth')
        }else{
            navigate('/AskQuestion')
        }
    }
  return (
    <div className='main-bar'>
        <div className='nav-links'>
            <NavLink to='/' className='side-nav-links' activeClassName='active'>
                <p>Home</p>
            </NavLink>
            <NavLink to='/Question' className='side-nav-links' activeClassName='active'>
                    <img src={Globe} alt="globe" />
                    <p style={{paddingLeft:'12px'}}>Questions</p>
            </NavLink>
            <NavLink to='/Tags' className='side-nav-links' activeClassName='active' style={{paddingLeft:'10px'}}>
                    <p>Tags</p> 
            </NavLink>
            <NavLink to='/Users' className='side-nav-links' activeClassName='active' style={{paddingLeft:'10px'}}>
                    <p>User</p>
            </NavLink>
        </div>
        <div className="main-bar-header">
            {
            location.pathname === '/' ? <h1>Top Question</h1>: <h1>All Questions</h1>
            }
            <button className='ask-btn' onClick={checkAuth}>Ask Question</button>
        </div>
        <div>
            {
                questionList.data === null ? <h1>Loading..</h1>:
                <>
                <p>
                    {questionList.data.length} Questions
                </p>
                  <QuestionList questionList={questionList.data}/>
                </>
            }
        </div>
    </div>
  )
}

export default HomeMainbar