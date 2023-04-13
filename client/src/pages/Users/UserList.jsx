import React from 'react'
import { useSelector } from 'react-redux'
import User from './User.jsx'
import './User.css'
const UserList = () => { 
  const users = useSelector(state => (state.usersReducer));
  return (
    <div className='userList-container'>
        {
            users.map(user =>(
                <User user={user} key={user?._id}/>
            ))
        }
    </div>
  )
}

export default UserList