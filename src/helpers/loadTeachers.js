import { db } from "../firebase/firebase-config"

export const  loadTeachers = async () => {
    const teacherSnap = await db.collection("teachers/adap/users").get()
    const teachers = []
    // console.log(teacherSnap)
    teacherSnap.forEach(snapHijo => {
        teachers.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })
    console.log(teachers)
    return teachers

}
