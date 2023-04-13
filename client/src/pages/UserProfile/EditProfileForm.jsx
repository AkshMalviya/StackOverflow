import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import './UserProfile.css'
import { updateProfile } from '../../actions/users'
const EditProfileForm = ({currentUser , setSwitch}) => {
    const [name, setname] = useState(currentUser?.result?.name)
    const [about, setabout] = useState(currentUser?.result?.about)
    const [tags, settags] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(tags.length === 0){
            dispatch(updateProfile(currentUser?.result?._id , { name ,about , tags : currentUser?.result?.tags}))
        }else{
            dispatch(updateProfile(currentUser?.result?._id , {name,about,tags}))
        }
        setSwitch(false)
    }
  return (
    <div>
        <h1 className='edit-profile-title'>
            Edit Your Profile
        </h1>
        <h2 className='edit-profile-title-2'>
            Public information
        </h2>
        <form className="edit-profile-form" onSubmit={handleSubmit}>
            <label htmlFor="name">
                <h3>Display name</h3>
                <input type="text" id="name" value={name} onChange={(e) => setname(e.target.value)}/>
            </label>
            <label htmlFor="about">
                <h3>About</h3>
                <textarea id="about" value={about} onChange={(e) => setabout(e.target.value)} cols="30" rows="10"></textarea>
            </label>
            <label htmlFor="tag">
                <h3>Watched Tags</h3>
                <p>Add tags seperated by 1 space</p>
                <input type="text" id="tag"  onChange={(e) => settags(e.target.value.split(' '))}/>
            </label><br />
            <input type="submit" value="Save Profile" className='user-submit-btn' />
            <button type='button' className='user-cancel-btn' onClick={() => setSwitch(false)}>Cancel</button>
        </form>
    </div>
  )
}

export default EditProfileForm