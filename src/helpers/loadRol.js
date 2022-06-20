import { db } from "../firebase/firebase-config"


export const loadRol = async (uid) => {
    const rolCurrent = await db.collection(`${uid}/adap/users`).get()
    return rolCurrent.docs[0].data().rol
}
