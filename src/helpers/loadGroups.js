import { db } from "../firebase/firebase-config"

export const loadGroups = async(uid) => {
    const groupsSnap = await db.collection(`teachers/${uid}/groups`).get()

    const groups = []

    groupsSnap.forEach(snapHijo => {
        groups.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        })
    })

    return groups; 
}