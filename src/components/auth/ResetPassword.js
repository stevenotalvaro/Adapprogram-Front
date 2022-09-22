import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import validator from 'validator'
import { startSendEmailReseat } from '../../actions/auth'
import { removeError, setError } from '../../actions/ui'
import { useForm } from '../../hooks/useForm'

export const ResetPassword = () => {
    const dispatch = useDispatch()
    const {msgError} = useSelector(state => state.ui)
    const [formValues, handleInputChange] = useForm({
        email: 'estiven12mira@gmail.com',
    })

    const { email } = formValues;

    const handleReset = e => {
        e.preventDefault()

        if (isFormValid()) {
            Swal.fire("Enviado", "Si el correo " + email + " existe, se enviara uno a tu bandeja de entrada o Spam, por favor revisala para resetear tu contraseña", 'success')
            dispatch(startSendEmailReseat(email))
        }
    }
    
    const isFormValid =  () => {
        if (!validator.isEmail(email.trim())) {
            dispatch(setError('El email no es valido'))
            return false
        }

        dispatch(removeError())
        return true
    }
 

  return (
    <>
        <h2 className='auth__title'>Restablecer Contraseña</h2>

        {
            msgError && 
            (
                <div className='auth__alert-error'>{msgError}</div>
            )
        }
        <form onSubmit={handleReset}>

            <input
                type='text'
                placeholder='Email'
                name='email'
                className='auth__input'
                autoComplete='off'
                value={email}
                onChange={handleInputChange}
            />
            <button type='submit' className='btn btn-primary btn-block'>
                Recuperar contraseña
            </button>
        </form>

        <Link className='link' to='/auth/register'>
            Crear nueva cuenta
        </Link>

        <Link className='link mt-1' to='/auth/login'>
            ¿Ya tienes una cuenta? Inicia Sesión.
        </Link>
    </>
  )
}
