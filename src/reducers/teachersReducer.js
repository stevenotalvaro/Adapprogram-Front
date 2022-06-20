import { types } from "../types/types";

const initialState = {
    teachers: []
}

export const teachersReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case types.teachersLoad: 
            return {
                ...state,
                teachers: [...action.payload]
            }
    
        default:
            return state;
    }
}