import React, {useState, useEffect , useRef} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import axios from 'axios'
import cors from 'cors'
import './Chat.css'

const Chat = () => {
    const User = useSelector((state)=> (state.currentUserReducer))
    const [botMsg, setbotMsg] = useState(['Hii what can i do for you?', 'I am here for you to solve all programming doubts']) 
    const [userMessage, setUserMessage] = useState([])
    const [inputValue, setInputValue] = useState('');
    const handleSendMessage = (e) => {
      e.preventDefault()
      if (userMessage) {
        const newMessage = {
          message: inputValue,
          timestamp: new Date(),
        };
        axios.get("https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&accepted=True&title=Error:%20Cannot%20find%20module%20%27ejs%27&site=stackoverflow")
          .then(res => {
            console.log(res.data)
            const validanswer = res.data.items.forEach((item) => botMsg.push(item.link) )
            console.log(botMsg)
          }) 
          .catch(res => console.log(res))
        userMessage.push(newMessage)
        setInputValue('');
        
      }
    };
    useEffect(() => {
    
  }, [userMessage , botMsg]);
  
  return (
    <>
        <div class="chatbox">
            {   
                botMsg.map((botMsg) => (
                    <div class="message">
                        <span class="sender">Stackers</span>
                        <span class="text">{botMsg}</span>
                    </div>
                ))
            }
            {  
                userMessage.map((userMessage) => (
                    <div class="message right message-container">
                        <span class="sender">Me</span>
                        <span class="text">{userMessage.message}</span>
                        <span class="time">{userMessage.timestamp.getHours()} {userMessage.timestamp.getMinutes()}</span>
                    </div>
                ))
            }
        </div>
        <form onSubmit={(e) => handleSendMessage(e)} className='input-msg-form'>
            <input type="text" placeholder="Type your message here"  className='input-msg' onChange={e => setInputValue(e.target.value)} value={inputValue}/>
            <button type="submit" className='send-msg'>
                <img src="https://img.icons8.com/fluency/48/000000/sent.png" className='send-img'/>
            </button>
        </form>
    </>
  )
}

export default Chat