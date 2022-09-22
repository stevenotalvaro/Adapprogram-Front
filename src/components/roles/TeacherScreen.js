import React, { useEffect } from 'react'
import { NavBarTeacher } from './Teacher/NavBarTeacher'
import { NothingSelected } from './Teacher/NothingSelected'
import { SessionsScreen } from './Teacher/SessionsScreen'
import { SessionsScreenUpdate } from './Teacher/SessionsScreenUpdate'
import { Sidebar } from './Teacher/Sidebar'
import { useSelector, useDispatch } from 'react-redux'
import { activeGroup, cleanStudents, setActiveChange } from '../../actions/groups'
import { removeError } from '../../actions/ui'

export const TeacherScreen = () => {
    const dispatch = useDispatch();
    const { screenActive } = useSelector( state => state.groups );

    useEffect(() => {
        dispatch(cleanStudents())
    }, [])
    

    const handleActiveGroup = () =>{
        dispatch(activeGroup())
        dispatch(setActiveChange('new'))
        dispatch(removeError())
    }

    return (
        <>
            <NavBarTeacher />
            <div className='teacher__main-content'>
                <Sidebar />
                <main>
                    {
                        ( screenActive === "new" )
                            ? ( <SessionsScreen /> )
                            : ( screenActive === "update" ) 
                                ? (<SessionsScreenUpdate />)
                                : (<NothingSelected />)
                    }

                    <button 
                        onClick={handleActiveGroup}
                        className='teacher__main-button'
                    >
                        <i className="fa-solid fa-circle-plus teacher__main-add"></i>
                    </button>
                    
                </main>
            </div>
        </>
    )
}
