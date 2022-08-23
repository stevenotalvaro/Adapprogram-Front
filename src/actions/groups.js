import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import { loadGroups } from "../helpers/loadGroups";
import { types } from '../types/types'

export const startNewGroup = (carrera, periodo, grupo, jornada, codigo, descripcion) => {
    return async(dispatch, getState) =>{
        const { uid } = getState().auth;
        const newGroup = {
            carrera,
            periodo,
            grupo,
            jornada,
            codigo,
            date: new Date().getTime(),
            descripcion,
        }
        const newCodeTeacher = {
            codeTeacher: uid
        }
        console.log(newGroup)

        const doc = await db.collection(`teachers/${uid}/groups`).add(newGroup)
        await db.collection(`groups/codeTeacher/${codigo}`).add(newCodeTeacher)

        // await dispatch(activeGroup(doc.id, newGroup))
        Swal.fire('Registrado', carrera + " " + periodo + " ha sido registrada correctamente", 'success')

       dispatch(addGroupNew(doc.id, newGroup))
    }
}

export const addGroupNew = (id, group) => ({
    type: types.groupsAddNew,
    payload: {
        id, ...group
    }
})

export const activeGroup = (id, group) => ({
    type: types.groupsActive,
    payload: {
        id,
        ...group
    }
})

export const startLoadingGroups = ( uid ) => {
    return async ( dispatch ) => {
        const groups = await loadGroups(uid)
        dispatch(setGroups(groups))
    }
}

export const setGroups = (group) => ({
    type: types.groupsLoad,
    payload: group
})

export const setActiveChange = (screen) => ({
    type: types.groupsScreenChange,
    payload: screen
})

export const setUpdateGroup = (group) => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        
        const groupToFirestore = { ...group };
        delete groupToFirestore.id 

        await db.doc(`/teachers/${uid}/groups/${group.id}`).update(groupToFirestore)

        dispatch(refreshGroup(group.id, groupToFirestore))
        Swal.fire('Actualizado', group.carrera + " " + group.periodo + "ha sido actualizada correctamente.", 'success')
    }
}

export const refreshGroup = (id, group) => ({
    type: types.groupsUpdated,
    payload: {
        id,
        group: {
            id,
            ...group
        }
    }
})

export const groupLogout = () => ({
    type: types.groupsLoadoutCleaning
})