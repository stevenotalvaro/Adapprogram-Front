import { db } from "../firebase/firebase-config";

export const startSaveStudent = (info) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const studentToFireStore = {...info};
        delete studentToFireStore.id

        await db.doc(`/teachers/r3aeOgkkmYcXv12FpqLAzlcvCBr2/students/${info.id}`)
    }
}