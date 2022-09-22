import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { startRegisterWithEmailPassword } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { loadCodeTeacher } from '../../helpers/loadCodeTeacher'

import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {
    
    const dispatch = useDispatch()
    const {msgError} = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: 'Nando fernando',
        email: 'nando@gmail.com',
        password: '1234567',
        password2: '1234567',
        codigo: 1234,
        rol: 'student',
        styleLearning: {
            visual: null,
            autitivo: null,
            kinestesico: null,
            learningStyle: ''
        }
    })

    const {name, email, password, password2, codigo, rol, styleLearning} = formValues

    const handleRegister = async e => {
        e.preventDefault()

        if (await isFormValid()) {
            dispatch(startRegisterWithEmailPassword(email, password, name, codigo, rol, styleLearning))
        }
    }

    const isFormValid = async () => {
        const loadCodeTeacher2 = await loadCodeTeacher(codigo)
        console.log(loadCodeTeacher2)
        if (name.trim().length < 5) {
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
            console.log('Password should be at least 6 characters and match each other')
            return false
        } else if (!loadCodeTeacher2) {
            dispatch(setError('EL codigo no existe'))
            console.log("codigo no existe")
            return false
        }
        console.log("1")
        dispatch(removeError())
        return true
    }

    return (
        <>
            <h2 className='auth__title'>Crear Cuenta</h2>

            {
                msgError && 
                (
                    <div className='auth__alert-error'>{msgError}</div>
                )
            }

            <form onSubmit={handleRegister}>
                <input
                    type='text'
                    placeholder='Nombre'
                    name='name'
                    className='auth__input'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='auth__input'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='auth__input'
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    type='password'
                    placeholder='Confirmar Password'
                    name='password2'
                    className='auth__input'
                    value={password2}
                    onChange={handleInputChange}
                />
                <input
                    type='text'
                    placeholder='Codigo de Maestro'
                    name='codigo'
                    className='auth__input'
                    value={codigo}
                    onChange={handleInputChange}
                />

                <button type='submit' className='btn btn-primary btn-block'>
                    Registrarse
                </button>
            </form>

            <Link className='link' to='/auth/login'>
                ¿Olvidaste tu contraseña?.
            </Link>
            
            <Link className='link mt-1' to='/auth/login'>
                ¿Ya tienes una cuenta? Inicia Sesión.
            </Link>
        </>
    )
}
