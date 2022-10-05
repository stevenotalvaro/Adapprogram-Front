import {types} from '../types/types'

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                email: action.payload.email,
                id: action.payload.id,
                codigo: action.payload.codigo,
                loadCodeTeacherString: action.payload.loadCodeTeacherString,
                styleLearning: action.payload.styleLearning,
            }

        case types.logout:
            return {}

        default:
            return state
    }
}
