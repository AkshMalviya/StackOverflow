import express from 'express'
import {AskQuestion , getAllQuestions , deleteQuestion ,votequestion} from "../controllers/Question.js"
import auth from '../middlewares/auth.js'
const router = express.Router();

router.post('/Ask', auth , AskQuestion)
router.get('/get', getAllQuestions)
router.delete('/delete/:id' ,auth , deleteQuestion)
router.patch("/vote/:id" ,auth , votequestion)

export default router