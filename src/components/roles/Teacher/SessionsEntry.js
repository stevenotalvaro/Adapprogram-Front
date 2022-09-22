import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { activeGroup, setActiveChange } from '../../../actions/groups'
import { removeError } from '../../../actions/ui'
import { Link } from 'react-router-dom'

export const SessionsEntry = ({id, carrera, periodo, grupo, jornada, codigo, date, descripcion }) => {
    const groupDate = moment(date)
    const dispatch = useDispatch();

    const handleEntryClick = () => {
        dispatch(activeGroup(id, {
            carrera, periodo, grupo, jornada, codigo, date, descripcion
        } ))
        
        dispatch(setActiveChange('update'))
        dispatch(removeError())
    }

    return (
        <div className='sessions__entry'>
            <div className='sessions__entry-icon'>
                <i className="fa-solid fa-laptop-code"></i>
            </div>
            <div className="sessions__entry-body">
                <p><span>Carrera</span> {carrera}</p>
                <p><span>Periodo</span> { periodo }</p>
                <p><span>Grupo</span> {grupo}</p>
                <p><span>Fecha de creacion:</span> {groupDate.format('D/MMMM/YYYY')}</p>
            </div>
            <div>
            <div onClick={handleEntryClick} className='edit pointer'>
                <i className="fa-solid fa-pen-to-square"></i>
                <p className='mt-1'>Editar</p>
            </div>
            <Link style={{textDecoration: 'none'}} to={`./teacher/${codigo}`}>
                <div className='see mt-1 pointer'>
                <i className="fa-solid fa-eye"></i>
                <p>Ver</p>
                </div>
            </Link>
            </div>
        </div>
    )
}
