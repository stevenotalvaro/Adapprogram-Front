import { types } from "../types/types";

export const setTeachers = (teachers) => ({
    type: types.teachersLoad,
    payload: teachers
})