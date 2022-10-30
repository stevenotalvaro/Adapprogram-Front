import { db } from "../firebase/firebase-config"

export const  loadTeachers = async () => {
    const teacherSnap = await db.collection("teachers/adap/users").get()
    const teachers = []
    teacherSnap.forEach(snapHijo => {
        teachers.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })
    return teachers

}
