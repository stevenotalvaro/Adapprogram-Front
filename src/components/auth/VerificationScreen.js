import React from 'react'
import { sendCheckEmail } from '../../actions/auth'
import { Sidebar } from '../adaptive/Sidebar'
import saludo from '../../images/Saludo.jpg'

export const VerificationScreen = () => {
  const handleReSend = (e) => {
    e.preventDefault()
    sendCheckEmail()
  }

  return (
    <>
      <Sidebar />
      <div className='img__container'>
        <img alt='saludo' src={saludo} />
        <button className='btn btn-primary' onClick={handleReSend}>
          Enviar nuevo correo
        </button>
      </div>
    </>
  )
}
