import { db } from "../firebase/firebase-config";

export const loadInfoStudent = async (uid) => {
    const studentCurrentInfo = await db.collection(`students/${uid}/information`).get();
    const student = []

    studentCurrentInfo.forEach(snapHijo => {
        student.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })
    
    return student[0]
}
