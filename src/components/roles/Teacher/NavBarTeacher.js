import React from 'react'
import  { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../../actions/auth';

export const NavBarTeacher = () => {
  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch(startLogout())
  }
  return (
    <div className='navbar__teacher-container'>
        <div className='navbar__teacher-left'>
            <i className="fa-solid fa-user"></i>
            <span> { name }</span>
        </div>
        <div className='navbar__teacher-right'>
            
            <span> <i className="fa-solid fa-door-open"></i> Bienvenido a Adapprogram</span>
            <button
              className='btn'
              onClick={handleLogout}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              Logout
            </button>
        </div>
    </div>
  )
}
