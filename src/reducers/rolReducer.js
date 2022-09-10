import { types } from "../types/types"

const initialState = {
    rolCurrent: '',
}
export const rolReducer  = (state = initialState , action ) =>{
    switch (action.type) {

        case types.rolLoad:
            return {
                ...state,
                rolCurrent: action.payload
            }

        case types.rolTest:
            return {
                ...state,
                rolTestRelized: action.payload
            }

        case types.rolLogoutCleaning:
            return initialState
    
        default:
            return state
    }
}