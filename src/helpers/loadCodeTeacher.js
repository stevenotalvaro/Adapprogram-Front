import { db } from "../firebase/firebase-config"


export const loadCodeTeacher = async (codeTeacher) => {
    const rolCurrent = await db.collection(`groups/codeTeacher/${codeTeacher}`).get()
    return rolCurrent.docs[0]?.data().codeTeacher
}
