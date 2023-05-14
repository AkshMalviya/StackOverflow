import React,{useState} from 'react'
import {useDispatch ,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import './AskQuestion.css'
import {askQuestion} from '../../actions/question'

const AskQuestion = () => {
    const User = useSelector((state) => (state.currentUserReducer))
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log({questionTitle,questionBody, questionTags })
        dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted : User.result.name , userId:User?.result?._id}, navigate ))
    }
    const [isAllowedToAsk, setisAllowedToAsk] = useState(false) 
    const questionList = useSelector((state) => (state.questionsReducer))
    const preventer = () =>{
        let noOfQuestion = 0
        let timeAsked = ''
        questionList.data.forEach(element => {
            if(element.userId === User.result._id){
                noOfQuestion = noOfQuestion + 1
                timeAsked = element.askedOn.substr(8,2)
            }
        });
        console.log(noOfQuestion)
        console.log(timeAsked)
        const currentDate = new Date()
        const newCurrentDate = `${currentDate.getDate()}`
        console.log(newCurrentDate)
        if(noOfQuestion === 0 || timeAsked < newCurrentDate){
            setisAllowedToAsk(true)
        }
        else{
            alert('you have already asked question of a day')
        }
    }    
  return (
    <div className="ask-question">
        {isAllowedToAsk ? 
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
                        <textarea name="body" id="ask-ques-body" cols="30" rows="10"  onChange={(e) => setQuestionBody(e.target.value)}></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Title</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type="text" name="questionTags" id="ask-ques-tags" placeholder='e.g.(xms typescript wordpress)' onChange={(e) => setQuestionTags(e.target.value.split(" "))}/>
                    </label>
                </div>
                <button type="submit" className='review-btn'>Review your question</button>
            </form>
        </div>:
        <div class="card-container">
            <div class="card">
                <div class="payment">
                    <stripe-buy-button buy-button-id="buy_btn_1N42OiSH9jLmeq25kFJ2LwW0" 
                    publishable-key="pk_live_51N3g3dSH9jLmeq2574N9gNgxQFInxds8zEYt8G8CbWkaHguMPyoQWUMMn3d96K2X3YxV3Wkqwvq1Uo2riN0KW6h8009DPWRRId">
                    </stripe-buy-button>
                </div>
                <div class="card-content">
                    <h2>Gold Plan Benefits</h2>
                    <li>&#x2714; Unlimited question</li>
                    <li>&#x2714; No Adds</li>
                    <li>&#x2714; Premium offers</li>
                </div>
            </div>
            <div class="card">
                <div class="payment">
                    <stripe-buy-button buy-button-id="buy_btn_1N3gXISH9jLmeq25q5v5TMhs"
                        publishable-key="pk_live_51N3g3dSH9jLmeq2574N9gNgxQFInxds8zEYt8G8CbWkaHguMPyoQWUMMn3d96K2X3YxV3Wkqwvq1Uo2riN0KW6h8009DPWRRId">
                    </stripe-buy-button>
                </div>
                <div class="card-content">
                    <h2>Silver Plan Benefits</h2>
                    <li>&#x2714; 10 question a day</li>
                    <li>&#x2714; No Adds</li>
                    <li>&#x2718; Premium offers</li>
                </div>
            </div>
            <div class="card">
                <div class="payment free-plan">
                    <h4>Free Plan</h4>
                    <h2>&#8377; 0.00</h2>
                    <button onClick={preventer}>Continue</button>
                </div>
                <div class="card-content">
                    <h2>Free Plan</h2>
                    <li>&#x2714; 1 question a day</li>
                    <li>&#x2718; No Adds</li>
                    <li>&#x2718; Premium offers</li>
                </div>
            </div>
            <p>Note: After doing payment please click on continue button to continue asking the question</p>
        </div>
        }
    </div>
  )
}

export default AskQuestion