import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
const Questions = ({question}) => {
  return (
    <div className='display-question-container'>
        <div className='display-votes-ans'>
            <p>{question.upVote.length - question.downVote.length}</p>
            <p>Votes</p>
        </div>
        <div className="display-votes-ans">
            <p>{question.noOfAnswer}</p>
            <p>answers</p>
        </div>
        <div className='display-question-details'>
            <Link to={`/Question/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
            <div className="display-tags-time">
                <div className="display-tags">
                    {
                        question.questionTags.map((tag)=>(
                            <p key={tag}>{tag}</p>
                        ))
                    }
                </div>
                <p className="display-time">aksed {moment(question.askedOn).fromNow()} {question.userPosted}</p>
            </div>
        </div>
    </div>
  )
}

export default Questions