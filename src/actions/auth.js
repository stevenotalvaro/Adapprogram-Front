import { types } from '../types/types'
import { firebase, db} from '../firebase/firebase-config'
import { finishLoading, startLoading } from './ui'
import Swal from 'sweetalert2'
import { rolLogoutCleaning, setRol } from './rol'
import { loadRol } from '../helpers/loadRol'
import { groupLogout } from './groups'
import { loadCodeTeacher } from '../helpers/loadCodeTeacher'
import { loadInfoStudent } from '../helpers/loadInfoStudent'


export const startLoginEmailPassword = (email, password) => {
    return dispatch => {
        
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async ({user}) => {
                dispatch(login(user.uid, user.displayName, user.email))
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
            await db.collection(`teachers/${user.uid}/information/`).add(newRolUser);
            await db.collection(`teachers/adap/users/`).add(newRolUser);

            dispatch(
                login(user.uid, user.displayName, email, newRolUser)
            )
        })
        .then(() => sendCheckEmail())
        .catch( e => {
            console.log(e)
            Swal.fire('Error', e.message, 'error')
        })  

    }
}
export const startRegisterWithEmailPassword = (email, password, name, codigo, rol, styleLearning) => {
    return (dispatch) => {
        dispatch(startLoading())
        const course = [
            {
                variables: {
                    content: true,
                    requireAnswer: true
                }
            },
            {
                decisionStructures: {
                    content: false,
                    requireAnswer: false
                }
            },
            {
                iterativeStructures: {
                    content: false,
                    requireAnswer: false
                }
            },
            {
                iterativeFunctions: {
                    content: false,
                    requireAnswer: false
                }
            }
        ]
        const newRolUser = {
            rol,
            codigo,
            name,
            email,
            styleLearning,
            course
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {
                const loadCodeTeacherString = await loadCodeTeacher(codigo);
                newRolUser.loadCodeTeacherString = loadCodeTeacherString;

                await user.updateProfile({displayName:name})
                await db.collection(`students/${user.uid}/information/`).add(newRolUser);
                await db.doc(`teachers/${loadCodeTeacherString}/students/${user.uid}/`).set(newRolUser);
                
                dispatch(
                    login(user.uid, user.displayName, email, codigo, loadCodeTeacherString, styleLearning, course)
                )
                dispatch(finishLoading())
            })
            .then(() => sendCheckEmail())
            .catch( e => {
                console.log(e)
                Swal.fire('Error', e.message, 'error')
                dispatch(finishLoading())
            })        
    }
}

export const sendCheckEmail = () => {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification()
    .then(()=> {
        Swal.fire("Enviado", "Verifica tu bandeja de entrada o spam", "success")
    })
    .catch((e)=> {
        Swal.fire("Error", e.message, "error")
    })
}

export const startSendEmailReseat = ( email ) => {
    return firebase.auth().sendPasswordResetEmail(email)
}

export const setUpdateStyleLearning = (name, codigo, email, loadCodeTeacherString, visual, auditivo, kinestesico , learningStyle, id) => {
    return async (dispatch, getState) => {
        const { uid, course } = getState().auth;
        const { rolCurrent:rol } = getState().rol;

        const info = {
            name, 
            codigo, 
            email, 
            loadCodeTeacherString, 
            rol,
            styleLearning : {
                visual,
                auditivo,
                kinestesico,
                learningStyle
            }, 
            id,
            course
        }

        const {styleLearning} = info;

        const studentToFireStore = {...info};
        delete studentToFireStore.id

        await db.doc(`students/${uid}/information/${info.id}`).update(studentToFireStore);
        await db.doc(`teachers/${loadCodeTeacherString}/students/${uid}/`).update(studentToFireStore);
        dispatch(login(uid, name, email, id, codigo, loadCodeTeacherString, styleLearning, course));
        window.location.reload()
    }
}

export const startLoadingInfo = (uid) => {
    return async (dispatch) => {
        const { id, name, email, codigo, loadCodeTeacherString, styleLearning, course} = await loadInfoStudent(uid)
        dispatch(login(uid, name, email, id, codigo, loadCodeTeacherString, styleLearning, course))
    }
}

export const setUpdateCorseContent = (course) => {
    return async (dispatch, getState) => {
        const { uid, name, codigo, email, loadCodeTeacherString, styleLearning, id  } = getState().auth;
        const { rolCurrent:rol } = getState().rol;

        const info = {
            name, 
            codigo, 
            email, 
            loadCodeTeacherString, 
            styleLearning,
            id,
            rol,
            course
        }

        const studentToFireStore = {...info};
        delete studentToFireStore.id

        await db.doc(`students/${uid}/information/${info.id}`).update(studentToFireStore);
        await db.doc(`teachers/${loadCodeTeacherString}/students/${uid}/`).update(studentToFireStore);
        dispatch(login(uid, name, email, id, codigo, loadCodeTeacherString, styleLearning, course));
    }
}

export const login = (uid, displayName, email, id, codigo, loadCodeTeacherString, styleLearning, course) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        email,
        id,
        codigo,
        loadCodeTeacherString,
        styleLearning,
        course
    },
})

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
        dispatch(rolLogoutCleaning())
        dispatch(groupLogout())
    }
}

export const logout = () => ({
    type: types.logout
})
