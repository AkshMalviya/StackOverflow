import React from 'react'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
import './LeftSidebar.css'
const LeftSidebar = () => {
  return (
    <div className='left-sidebar'>
        <nav className='side-nav'>
            <NavLink to='/' className='side-nav-links' activeClassName='acitve'>
                <p>Home</p>
            </NavLink>
            <div className='side-nav-div'>
                <div>
                    <p>PUBLIC</p>
                </div>
                <NavLink to='/Question' className='side-nav-links' activeClassName='active'>
                    <img src={Globe} alt="globe" />
                    <p style={{paddingLeft:'10px'}}>Questions</p>
                </NavLink>
                <NavLink to='/Tags' className='side-nav-links' activeClassName='active' style={{paddingLeft:'10px'}}>
                    <p>Tags</p> 
                </NavLink>
                <NavLink to='/Users' className='side-nav-links' activeClassName='active' style={{paddingLeft:'10px'}}>
                    <p>User</p>
                </NavLink>
            </div>
        </nav>
    </div>
  )
}

export default LeftSidebar