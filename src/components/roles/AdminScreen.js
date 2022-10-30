import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { startRegisterTeacher} from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'

import { useForm } from '../../hooks/useForm'
import { Sidebar } from '../adaptive/Sidebar'
import { TeacherEntries } from '../adaptive/TeacherEntries'

export const AdminScreen = () => {
    const dispatch = useDispatch()
    const {msgError} = useSelector(state => state.ui)
    
    

    const [formValues, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
        rol: 'teacher'
    })
    
    const {name, email, password, password2, rol} = formValues

    
    const handleRegister = e => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(startRegisterTeacher(email, password, name, '', rol))
        }
    }

    const isFormValid = () => {
        if (name.trim().length <= 5) {
            dispatch(setError('El nombre es requerido'))
            return false
        } else if (!validator.isEmail(email.trim())) {
            dispatch(setError('El email no es valido'))
            return false
        } else if (password.length < 5) {
            dispatch(setError('La contraseña debe ser mayor a 6 caracteres'))
            return false
        } else if (password !== password2) {
            dispatch(setError('Contraseña no son iguales'))
            return false
        }

        dispatch(removeError())
        return true
    }

   

    return (
        <>
            <Sidebar />
            <div className='admin__main'>
                <div> 

                    <h2 className='auth__title'>Registrar Maestro</h2>
                    <div className='admin__box-container'>


                        {
                            msgError && 
                            (
                                <div className='auth__alert-error'>{msgError}</div>
                            )
                        }

                        <form onSubmit={handleRegister}>
                            <label 
                                htmlFor="nombre" 
                                className="admin__box-label"
                            >
                                Nombre del Maestro:
                            </label>

                            <input
                                id="nombre"
                                type='text'
                                placeholder='Ingrese el nombre del maestro'
                                name='name'
                                className='auth__input-admin'
                                autoComplete='off'
                                value={name}
                                onChange={handleInputChange}
                            />

                            <label 
                                htmlFor="email" 
                                className="admin__box-label"
                            >
                                Email del Maestro:
                            </label>

                            <input
                                id='email'
                                type='text'
                                placeholder='Ingrese el email del maestro'
                                name='email'
                                className='auth__input-admin'
                                autoComplete='off'
                                value={email}
                                onChange={handleInputChange}
                            />
                            <label 
                                htmlFor="password" 
                                className="admin__box-label"
                            >
                                Password del Maestro:
                            </label>

                            <input
                                id='password'
                                type='password'
                                placeholder='Ingrese el password del maestro'
                                name='password'
                                className='auth__input-admin'
                                value={password}
                                onChange={handleInputChange}
                            />

                            <label 
                                htmlFor="password2" 
                                className="admin__box-label"
                            >
                                Confirma el password:
                            </label>

                            <input
                                type='password'
                                placeholder='Confirmar Password'
                                name='password2'
                                className='auth__input-admin'
                                value={password2}
                                onChange={handleInputChange}
                            />

                            <button type='submit' className='btn btn-primary btn-block'>
                                Registrar
                            </button>
                        </form>
                    </div>
                </div>
            <TeacherEntries />
            </div>

        </>
    )
}
