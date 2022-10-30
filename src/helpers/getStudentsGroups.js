import { db } from "../firebase/firebase-config"

export const getStudentsGroups = async (uid, code) => {
    const allStudents = await db.collection(`teachers/${uid}/students/`).get()

    const students = []

    allStudents.forEach(studentHijo => {
        if(studentHijo.data().codigo === code) {
            students.push({
                id: studentHijo.id,
                ...studentHijo.data()
            })
        }
    })

    return students
}
