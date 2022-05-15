import { types } from '../types/types'
import { firebase } from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui'
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password) => {
    return dispatch => {
        
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch(login(user.uid, user.displayName))
                dispatch(finishLoading())
            })
            .catch( e => {
                console.log(e)
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startRegisterWithEmailPassword = (email, password, name, codigo) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {
                await user.updateProfile({displayName:name})

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch( e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const login = (uid, displayName, typeUser) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        typeUser,
    },
})

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
    }
}

export const logout = () => ({
    type: types.logout
})