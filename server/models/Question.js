import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
    questionTitle:{
        type:String,
        required:'question must have title'
    },
    questionBody:{
        type:String,
        required:'question must have body'
    },
    questionTags:{
        type:[String],
        required:'question must have tags'
    },
    noOfAnswer:{
        type:Number,
        default :0
    },
    upVote:{
        type:[String],
        default :[]
    },
    downVote:{
        type:[String],
        default :[]
    },
    userPosted:{
        type:String,
        required:"Question must have an author"
    },
    userId:{
        type:String
    },
    askedOn :{
        type:Date,
        default:Date.now
    },
    answer:[{
        answerBody:String,
        userAnswered:String,
        userId:String,
        answeredOn: {type:Date,default:Date.now}
    }]
})
export default mongoose.model("Question" , QuestionSchema)