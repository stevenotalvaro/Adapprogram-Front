import { db } from "../firebase/firebase-config"


export const loadCodeTeacher = async (codeTeacher) => {
    const rolCurrent = await db.collection(`groups/code/${codeTeacher}`).get()
    console.log(rolCurrent.docs[0]?.data().code)
    return rolCurrent.docs[0]?.data().code
}
