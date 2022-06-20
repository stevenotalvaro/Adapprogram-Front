import { types } from '../types/types'
import { firebase, db} from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui'
import Swal from 'sweetalert2'
import { rolLogoutCleaning, setRol } from './rol'
import { loadRol } from '../helpers/loadRol'
import { useSelector } from 'react-redux'


export const startLoginEmailPassword = (email, password) => {
    return dispatch => {
        
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async ({user}) => {
                dispatch(login(user.uid, user.displayName))
                const rol = await loadRol(user.uid)
                dispatch(setRol(rol))
                dispatch(finishLoading())
            })
            .catch( e => {
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error')
            })
    }
}

export const startRegisterTeacher = (email, password, name, codigo, rol) => {
    return (dispatch) => {
        const newRolUser = {
            rol,
            codigo,
            name,
            email
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async({user}) => {
            await user.updateProfile({displayName:name})
            await db.collection(`${user.uid}/adap/users/`).add(newRolUser);
            await db.collection(`teachers/adap/users/`).add(newRolUser);
            dispatch(
                login(user.uid, user.displayName, newRolUser)
            )
        })
        .catch( e => {
            console.log(e)
            Swal.fire('Error', e.message, 'error')
        })  

    }
}
export const startRegisterWithEmailPassword = (email, password, name, codigo, rol) => {
    return (dispatch) => {
        const newRolUser = {
            rol,
            codigo,
            name,
            email
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {
                await user.updateProfile({displayName:name})
                await db.collection(`${user.uid}/adap/users/`).add(newRolUser);
                dispatch(
                    login(user.uid, user.displayName, newRolUser)
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
        dispatch(rolLogoutCleaning())
    }
}

export const logout = () => ({
    type: types.logout
})
