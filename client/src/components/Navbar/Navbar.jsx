import React,{useEffect ,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import decode from 'jwt-decode'

import './Navbar.css'
import logo from '../../assets/logo.svg'
import Avatar from '../../components/Avatar/Avatar'
import { setCurrentUser } from '../../actions/currentUser'


const Navbar = () => {
	const User = useSelector((state)=> (state.currentUserReducer))
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleLogout = () =>{
		dispatch({type:"LOGOUT"})
		navigate('/')
		dispatch(setCurrentUser(null))
	}
	useEffect(()=>{
		const token = User?.token
		if(token){
			const decodedToken = decode(token)
			if (decodedToken.exp * 1000 < new Date().getTime()){
				handleLogout()
			}
		}
		dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
	}, [dispatch])
	const [isActive, setActive] = useState(false);
	const handleDropMenu = ()=>{
		setActive(!isActive)
	}
  return (
	<nav className='main-nav'>
		<div className='Nav' >
		
		<Link to="/">
			<img src={logo} alt="logo" id='mainIco'/>
		</Link>
		<Link to="/About" className={isActive ? 'drop-menu' : 'navlink'}>About</Link>
		<Link to="/Product" className={isActive ? 'drop-menu' : 'navlink'}>Product</Link>
		<Link to="/Chat" className={isActive ? 'drop-menu' : 'navlink'}>Having issue? chat with us</Link>
		<form className={isActive ? 'drop-menu' : ''}>
			<div className='form-container'>
			<input id="searchbox" type="text" placeholder="Search…"  />
			<svg  width="18" height="18"  viewBox="0 0 18 18"><path  d="m18 16.5-5.14-5.18h-.35a7 7 0 1 0-1.19 1.19v.35L16.5 18l1.5-1.5ZM12 7A5 5 0 1 1 2 7a5 5 	0 0 1 10 0Z"/></svg>
			</div>
		</form>
		{ User === null ? 
		<Link to='/Auth' className='navlink login-btn'>Log in</Link>:
			<>
			<Link to={`/Users/${User?.result?._id}`} style={{textDecoration:"none"}}> <Avatar backgroundColor="blue" px="10px" py='7px' borderRadius="50%" color='white'>{User.result.name.charAt(0).toUpperCase()}</Avatar> </Link>
			<button className='navlink login-btn' onClick={handleLogout}>Log out</button>
			</>
			}
		<button className='fa-bar' onClick={handleDropMenu}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={'23px'}><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>	
		</button>
		</div>
	</nav>
  )
}

export default Navbar