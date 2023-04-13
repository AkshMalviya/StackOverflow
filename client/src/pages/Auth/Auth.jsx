import React,{useState} from 'react'
import './Auth.css'
import stack from '../../assets/stack.png'
import {useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import About from './About'
import { signup,login } from '../../actions/auth'

const Auth = () => {
	 const [isSignup, setIsSignup] = useState(false)
	 const [name, setName] = useState('')
	 const [email, setEmail] = useState('')
	 const [password, setPassword] = useState('')
	 const dispatch = useDispatch()
	 const navigate = useNavigate()

	 const handleSwitch = ()=>{
		setIsSignup(!isSignup)
	 }
	 const handleSubmit=(e)=>{
		e.preventDefault();
		console.log({name,email,password})
		if(!email && !password){
			alert("Enter email and password")
		}
		if (isSignup){
			if(!name){
				alert('enter a name to contine')
			}
			dispatch(signup ({name, email, password} , navigate))
		}else{
			dispatch(login({email,password} , navigate ))
		}
	 }
  return (
	<section className='auth-section'>
		{isSignup && <About/>}
		<div className="auth-container">
			{ !isSignup && <img src={stack} alt="stackOverflow Icon" className='login-logo'/>}
				<form onSubmit={handleSubmit}>
					{ 
					isSignup && (
					<label htmlFor="displayName">
						<h4>Display Name</h4>
						<input type="text" name="displayName" id="displayName" onChange={(e)=>{setName(e.target.value)}}/>
					</label> )
					}
					<label htmlFor="email">
						<h4>Email</h4>
						<input type="email" name="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
					</label>
					<label htmlFor="password">
						<div style={{display:"flex" , justifyContent:'space-between'}}>
							<h4>Password</h4>
							{!isSignup && <p style={{color:"#007ac6", fontSize:'13px'}}>Forget Passowrd?</p>}
						</div>
						
						<input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
					</label>
					
					{isSignup && 
					<p>Password must contain be eight <br/>character, including atleast 1 letter and 1 <br/> number</p>
					}
					{isSignup && (<label htmlFor="check" className='checker'>
					<input type="checkbox" name="check" id="check" />
					<p style={{fontSize:'13px'}}>
						Opt-in to receive occasional <br />
						product updates, user research invitations, <br />
						company announcements, and digests.
					</p>
					</label>)
					}
					<button type="submit" className='auth-btn'>
						{isSignup ? 'Sign up' : "Login"}
					</button>
				</form>
				{isSignup && <p style={{color:"#666767", fontSize:'13px'}}>By clicking “Sign up”, you agree to our <span style={{color:"#007ac6"}}>terms of <br />
				service, privacy policy</span>  and <span style={{color:"#007ac6"}}>cookie policy</span> </p>
					}			
			<p>
				{isSignup ? 'Already have an account?' : "Don't have account?"}
				<button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? "Login" : "Sign up"}</button>
			</p>
		</div>
	</section>
  )
}

export default Auth