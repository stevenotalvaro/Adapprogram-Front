import { db } from "../firebase/firebase-config"


export const loadCodeTeacher = async (codeTeacher) => {
    const rolCurrent = await db.collection(`groups/codeTeacher/${codeTeacher}`).get()
    console.log(rolCurrent.docs[0]?.data().codeTeacher)
    return rolCurrent.docs[0]?.data().codeTeacher
}
