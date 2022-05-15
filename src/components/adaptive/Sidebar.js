import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const {name} = useSelector( state => state.auth);

    const handleLogout = () => {
        dispatch(startLogout())
    }

  return (
    <div className='adaptive__sidebar'>
        <h3>Welcome {name}</h3>

        <button 
            className='btn'
            onClick={handleLogout}
        >
            Logout
        </button>
    </div>
  )
}
