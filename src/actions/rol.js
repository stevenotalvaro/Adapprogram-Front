import { loadRol } from "../helpers/loadRol";
import { types } from "../types/types";

export const startLoadingRol = (uid) => {
    return async (dispatch) => {
        const rol = await loadRol(uid)
        dispatch(setRol(rol))
    }
}

export const setRol = (rolCurrent) => ({
    type: types.rolLoad,
    payload: rolCurrent
})

export const rolLogoutCleaning = () => ({
    type: types.rolLogoutCleaning
})
