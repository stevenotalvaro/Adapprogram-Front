import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { startGetGroupsStudents } from '../../../actions/groups'
import { StudentsEntry } from './group-student/StudentsEntry'

export const GroupScreen = () => {
    const { groupId } = useParams()
    const dispatch = useDispatch();  
    useEffect(() => {
        dispatch(startGetGroupsStudents(groupId))
    }, [])
    
    console.log("groups")

    const { groupsStudents } = useSelector( state => state.groups );

    console.log(groupsStudents)
    return (
        <>
            {
                groupsStudents &&
                <>
                    <div className="number-students">
                        <img src="https://cdn-icons-png.flaticon.com/512/599/599928.png" alt='People icons created by Freepik - Flaticon' width={52} height={52} />
                        <span >Cantidad de estudiantes registrados</span>
                        <span>{ groupsStudents.length }</span>
                    </div>

                    <div className='student-entries'>
                    {
                        groupsStudents.map(group => (
                            <StudentsEntry 
                                key={group.id}
                                {...group}
                            />
                        ))
                    }
                    </div>

                </>
            }
        </>
    )
}
