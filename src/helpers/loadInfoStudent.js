import { db } from "../firebase/firebase-config";

export const loadInfoStudent = async (uid) => {
    const studentCurrentInfo = await db.collection(`students/${uid}/information`).get();
    console.log(uid, studentCurrentInfo)

    const student = []

    studentCurrentInfo.forEach(snapHijo => {
        student.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    console.log(student)
    
    return student[0]
}
