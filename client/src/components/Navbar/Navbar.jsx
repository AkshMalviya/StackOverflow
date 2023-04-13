import React,{useEffect} from 'react'
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
  return (
	<nav className='main-nav'>
		<div className='Nav'>
		<Link to="/">
			<img src={logo} alt="logo" id='mainIco'/>
		</Link>
		<Link to="/About" className='navlink'>About</Link>
		<Link to="/Product" className='navlink'>Product</Link>
		<Link to="/Team" className='navlink'>For Teams</Link>
		<form action="">
			<div>
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
		</div>
	</nav>
  )
}

export default Navbar