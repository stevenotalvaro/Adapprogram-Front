import React from 'react'

export const TeacherEntry = ({email, name}) => {
  return (
    <div className='teacher__entry admin__box-container'>
        <div className='teacher__entry-body'> 
            <label className='teacher__entry-title admin__box-label'>Nombre del maestro</label>
            <p>{name}</p>
            <label className='teacher__entry-email admin__box-label'>Correo</label>
            <p>{email}</p>
        </div>
    </div>
  )
}
