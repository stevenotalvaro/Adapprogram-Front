import { db } from "../firebase/firebase-config"


export const loadRol = async (uid) => {
    const rolCurrentAdmin = await db.collection(`${uid}/adap/users`).get();
    if (typeof(rolCurrentAdmin.docs[0]) != 'undefined') {
        return rolCurrentAdmin.docs[0].data().rol;
    }

    const rolCurrentTeacher = await db.collection(`teachers/${uid}/information`).get();
    if (typeof(rolCurrentTeacher.docs[0]) != 'undefined') {
        return rolCurrentTeacher.docs[0].data().rol;
    }
    
    const rolCurrentStudent = await db.collection(`students/${uid}/information`).get();
    if (typeof(rolCurrentStudent.docs[0]) != 'undefined') {
        return rolCurrentStudent.docs[0].data().rol;
    }
    
}
