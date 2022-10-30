import React from 'react'
import { useSelector } from 'react-redux'
import { Sidebar } from '../adaptive/Sidebar'
import { TestScreen } from '../adaptive/TestScreen'
import { StudentCourse } from './Student/StudentCourse'
import { Backdrop, CircularProgress } from '@material-ui/core';

export const StudentScreen = () => {
  const  styleLearning  = useSelector( state => state.auth.styleLearning );
  
  return (
    <>
      <Sidebar />
      { 
        styleLearning ? 
            styleLearning?.learningStyle   ? <StudentCourse /> : <TestScreen />
            : <>
                <Backdrop open={true} >
                  <CircularProgress color="primary" />
                </Backdrop>
              </>
      }
    </>
  )
}
