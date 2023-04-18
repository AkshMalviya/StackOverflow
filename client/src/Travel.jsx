import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Question from './pages/Question/Question'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Question/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import User from './pages/UserProfile/UserProfile'
import Chat from './pages/Chat/Chat'

const Travel = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Auth' element={<Auth/>} />
      <Route path='/Question' element={<Question/>} />
      <Route path='/AskQuestion' element={<AskQuestion/>}/>
      <Route path='/Question/:id' element={<DisplayQuestion/>}/>
      <Route path='/Tags' element={<Tags/>}/>
      <Route path='/Users' element={<Users/>}/>
      <Route path={`/Users/:id`} element={<User/>}/>
      <Route path='/Chat' element={<Chat/>}/>


    </Routes>
  )
}

export default Travel