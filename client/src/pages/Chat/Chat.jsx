import React, {useState, useEffect , useRef} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import axios from 'axios'
import emailjs from 'emailjs-com'
import './Chat.css'

const Chat = () => {

    const User = useSelector((state)=> (state.currentUserReducer))
    const [allMsg, setAllMsg] = useState(['Hii what can i do for you?','I am here for you to solve all programming doubts'])
    const [inputValue, setInputValue] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputValue === ''){
        alert('Please Enter message')
    }
    if (inputValue) {
        const newMessage = {
        message: inputValue,
        timestamp: new Date(),
        };
        setAllMsg(prevAllMsg => [...prevAllMsg, newMessage]);
        setInputValue('');
        axios.get(`https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&accepted=True&title=${encodeURI(newMessage.message)}&site=stackoverflow`)
        .then(res => {
            if (res.data.items.length === 0){
            setAllMsg(prevAllMsg => [...prevAllMsg, 'Cannot find your error', 'Please be specific or copy and paste for best result']);
            } else {
            const links = res.data.items.map(item => item.link);
            setAllMsg(prevAllMsg => [...prevAllMsg, ...links]);
            }
        }) 
        .catch(res => console.log(res))
        }
    };

    useEffect(() => {
      if (inputValue) {
        const newMessage = {
          message: inputValue,
          timestamp: new Date(),
        };
        allMsg.push(newMessage)
        setInputValue('');
        axios.get(`https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=activity&accepted=True&title=${encodeURI(newMessage.message)}&site=stackoverflow`)
          .then(res => {
            if (res.data.items.length === 0){
              allMsg.push('Cannot find your error')
              allMsg.push('Please be specific or copy and paste for best result')
            }
            res.data.items.forEach((item) => allMsg.push(item.link)) ;
            console.log(allMsg)
          }) 
          .catch(res => console.log(res))
        }
  }, [allMsg , setInputValue, setAllMsg]);
function generateOTP() { 
    var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    var len = string.length;
    for (let i = 0; i < 6; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
}
const generatedOtp = generateOTP()
const sendMail = ()=>{
  const userMail = document.querySelector("#email").value
  console.log(userMail)
  document.querySelector("#email").value = ''
    emailjs.send("service_rdpc1hh","template_c1dbaig", {
      message: `${generatedOtp}`,
      userEmail: `${userMail}`,
      }, "2RVMzQrERWL5cG_Me")
      .then((e) => alert('OTP sent sucessfully'))
      .catch((err) => {console.log(err)});
  return generatedOtp
  }
  const handleAuthentication = (e) =>{
    e.preventDefault()
    const userOtp = document.querySelector('#otp').value
    console.log(userOtp)
    console.log(generatedOtp)
    if (generatedOtp === userOtp){
      console.log('Correct Otp')
      setIsAuthenticated(true)
    }
    else{
      console.log('Wrong Otp')
    }
  }
  
  return (
    <div className='chat-container'>
      { isAuthenticated ?
        <div class="chatbox">
            { 
              allMsg.map((item)=> (
                 item.timestamp  ? 
                <div class="message right message-container">
                    <span class="sender">Me</span>
                    <span class="text overflow-auto">{item.message}</span>
                    <span class="time">{item.timestamp.getHours()}:{item.timestamp.getMinutes()}</span>
                </div> :
                <div class="message">
                    <span class="sender">Stackers</span>
                    <span class="text overflow-auto">
                       {item}
                    </span>
                </div>
              ))
            }
            <form onSubmit={(e) => handleSendMessage(e)} className=''>
                <div class="input-msg-form">
                    <input type="text" class="input-msg" placeholder="Type your question here" aria-label="message" aria-describedby="button-addon2" onChange={e => setInputValue(e.target.value)} value={inputValue}/>
                    <button type="submit" class="send-msg" id="button-addon2">send</button>
                </div>  
            </form>
          </div>
          :
          <div class="container">
            <h1>Authentication Page</h1>
            <form onSubmit={(e) => handleAuthentication(e)}>
              <label for="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" />
              <button onClick={sendMail} id='sendemail'>Send OTP</button>
              <label for="otp">OTP</label>
              <input type="text" id="otp" name="otp" placeholder="Enter OTP" />
              <input type="submit" value="Submit" className='authenticate'/>
            </form>
          </div>
      }
    </div>
  )
}

export default Chat