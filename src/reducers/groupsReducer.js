import { types } from "../types/types";

const initalState = {
    groups: [],
    active: null,
    screenActive: null,
    groupsStudents: null
}

export const grupsReducer = (state=initalState, action ) =>{
    switch (action.type) {
        
        case types.groupsActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.groupsAddNew:
            return {
                ...state,
                groups: [action.payload, ...state.groups]
            }

        case types.groupsLoad:
            return {
                ...state,
                groups: [...action.payload]
            }

        case types.groupsScreenChange:
            return {
                ...state,
                screenActive: action.payload
            }

        case types.groupsUpdated:
            return {
                ...state,
                groups: state.groups.map(
                    group => group.id === action.payload.id
                        ? action.payload.group
                        : group
                )
            }
            
        case types.goupsStudents:
            return {
                ...state,
                groupsStudents: action.payload 
            }

        case types.goupsCleanStudents:
            return {
                ...state,
                groupsStudents: null
            }
                
        case types.groupsLoadoutCleaning:
            return {
                ...state,
                groups: [],
                active: null,
                screenActive: null,
                groupsStudents: null

            }

        default:
            return state;
    }
}