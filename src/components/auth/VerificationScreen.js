import React from 'react'
import { useSelector } from 'react-redux';
import { sendCheckEmail } from '../../actions/auth'
import { Sidebar } from '../adaptive/Sidebar'

export const VerificationScreen = () => {
  const handleReSend = (e) => {
    e.preventDefault()
    sendCheckEmail()
    console.log('enviado')
  }

  return (
    <>
      <Sidebar />
      <div className='img__container'>
        <img /> 
      </div>
      <button onClick={handleReSend}>
        enviar nuevo correo
      </button>
    </>
  )
}
