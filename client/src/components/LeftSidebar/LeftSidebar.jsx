import React , { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
import './LeftSidebar.css'
const LeftSidebar = () => {
    const [active, setActive] = useState(false)
    const handleDropMenu = ()=>{
		setActive(!active)
	}
  return (
    <div className='left-sidebar'>
        <button>
        <img className='menuIcon' src="https://img.icons8.com/3d-fluency/30/null/menu.png" onClick={handleDropMenu}/>
        </button>
        <nav className={`side-nav ${active ? 'drop-menu' : ''}`}>
            <NavLink to='/' className='side-nav-links' activeClassName='acitve'>
                <p>Home</p>
            </NavLink>
            <div className='side-nav-div'>
                <div>
                    <p>PUBLIC</p>
                </div>
                <NavLink to='/Question' className='side-nav-links' activeClassName='active'>
                    <img src={Globe} alt="globe" />
                    <p style={{paddingLeft:'12px'}}>Questions</p>
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