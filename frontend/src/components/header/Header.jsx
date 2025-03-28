import React from 'react'
import './Header.css'
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const signInClicked = () => {
    console.log('Sign in clicked')
    navigate('/login')
  }
  
  return (
    <div className='header-div'>
      <input type='text' placeholder='Search for news' className='search-bar' />
      <div className='header-title'>
        <span>Latest global news</span>
      </div>
      <div className="header-btns">
        <button onClick={()=>signInClicked()}>Sign in</button>
        <button >Subscribe</button>
      </div>
    </div>
  )
}

export default Header