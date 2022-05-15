import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Link} from 'react-router-dom'
import {startLoginEmailPassword} from '../../actions/auth'
import {useForm} from '../../hooks/useForm'

export const LoginScreen = () => {
    const dispatch = useDispatch()
    const {loading} = useSelector( state => state.ui );

    const [formValues, handleInputChange] = useForm({
        email: 'nando@gmail.com',
        password: '1234567',
    })

    const {email, password} = formValues

    const handleLogin = e => {
        e.preventDefault()
        dispatch(startLoginEmailPassword(email, password))
    }

    return (
        <>
            <h2 className='auth__title'>Iniciar Sesión</h2>

            <form onSubmit={handleLogin}>
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

                <button type='submit' className='btn btn-primary btn-block' disabled={loading}>
                    Login
                </button>
            </form>

            <Link className='link' to='/auth/register'>
                Crear nueva cuenta
            </Link>
        </>
    )
}
