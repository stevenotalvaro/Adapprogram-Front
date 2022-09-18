import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Sidebar } from '../adaptive/Sidebar'
import { TestScreen } from '../adaptive/TestScreen'
import { StudentCourse } from './Student/StudentCourse'

export const StudentScreen = () => {
  const [checking, setChecking] = useState(true)
  const  styleLearning  = useSelector( state => state.auth.styleLearning );
  const  { uid }  = useSelector( state => state.auth );
  
  return (
    <>
      <Sidebar />
      { 
        uid ? 
            styleLearning?.learningStyle   ? <StudentCourse /> : <TestScreen />
            : ''
      }
    </>
  )
}
