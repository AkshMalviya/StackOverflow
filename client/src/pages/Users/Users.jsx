import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'

import UserList from './UserList'

const Users = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className="home-container-2" style={{marginTop:'25px'}}>
            <h1 style={{fontWeight:"400"}}>Users</h1>
            <UserList/>
      </div>
    </div>
  )
}

export default Users