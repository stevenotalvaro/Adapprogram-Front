import React from 'react'
import { useSelector } from 'react-redux';
import { TeacherEntry } from './TeacherEntry'

export const TeacherEntries = () => {

  const {teachers} = useSelector( state => state.teachers );

  return (
    <div>
      <h2 class="auth__title auth__title-entries">Maestros Registrados</h2>
      <div className='teacher__entries'>
          {
              teachers.map(teacher  => (
                  <TeacherEntry 
                    key={teacher.id}
                    {...teacher}
                  />
              ))
          }
      </div>
    </div>
  )
}
