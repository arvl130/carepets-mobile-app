// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
  collectionGroup,
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export type PartialPet = {
  breed: string
  name: string
  type: "CAT" | "DOG"
}

export type Pet = PartialPet & {
  id: string
}

export async function getPets(userId: string) {
  const db = getFirestore()
  const pets: Pet[] = []

  const querySnapshot = await getDocs(collection(db, `users/${userId}/pets`))
  querySnapshot.forEach((doc) => {
    pets.push({
      id: doc.id,
      ...(doc.data() as PartialPet),
    })
  })

  return pets
}

export async function getDogs(userId: string) {
  const db = getFirestore()
  const pets: Pet[] = []

  const querySnapshot = await getDocs(
    query(collection(db, `users/${userId}/pets`), where("type", "==", "DOG"))
  )
  querySnapshot.forEach((doc) => {
    pets.push({
      id: doc.id,
      ...(doc.data() as PartialPet),
    })
  })

  return pets
}

export async function getCats(userId: string) {
  const db = getFirestore()
  const pets: Pet[] = []

  const querySnapshot = await getDocs(
    query(collection(db, `users/${userId}/pets`), where("type", "==", "CAT"))
  )
  querySnapshot.forEach((doc) => {
    pets.push({
      id: doc.id,
      ...(doc.data() as PartialPet),
    })
  })

  return pets
}

export async function getPet(userId: string, petId: string) {
  const db = getFirestore()
  const docSnap = await getDoc(doc(db, `users/${userId}/pets/${petId}`))

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as Pet
}

export async function addPet(userId: string, petDetails: PartialPet) {
  const db = getFirestore()
  await addDoc(collection(db, `users/${userId}/pets`), petDetails)
}

export async function editPet(
  userId: string,
  petId: string,
  petDetails: PartialPet
) {
  const db = getFirestore()
  await setDoc(doc(db, `users/${userId}/pets/${petId}`), petDetails)
}

export async function deletePet(userId: string, petId: string) {
  const db = getFirestore()
  await deleteDoc(doc(db, `users/${userId}/pets/${petId}`))
}

export type Appointment = {
  id: string
  actualDate: string
  userId: string
  slot: "MORNING" | "AFTERNOON"
  pets: {
    petId: string
    serviceCodes: string[]
  }[]
}

export async function getAppointmentsByUser(userId: string) {
  const db = getFirestore()
  const appointments: Appointment[] = []

  const querySnapshot = await getDocs(
    query(collectionGroup(db, "appointments"), where("userId", "==", userId))
  )

  querySnapshot.forEach((doc) => {
    appointments.push({
      id: doc.id,
      ...doc.data(),
    } as Appointment)
  })

  return appointments
}

export async function createAppointment(
  userId: string,
  scheduleDetails: {
    selectedDate: string
    selectedSlot: "MORNING" | "AFTERNOON"
    pets: { petId: string; serviceCodes: string[] }[]
  }
) {
  const db = getFirestore()
  const actualDate = scheduleDetails.selectedDate.split("T")[0]

  await addDoc(collection(db, `users/${userId}/appointments`), {
    actualDate,
    userId,
    slot: scheduleDetails.selectedSlot,
    pets: scheduleDetails.pets,
  })
}

export async function deleteAppointment(userId: string, appointmentId: string) {
  const db = getFirestore()
  try {
    await deleteDoc(doc(db, `users/${userId}/appointments/${appointmentId}`))
    console.log("deleted appointment", appointmentId)
  } catch (e) {
    console.log("deleted appointment error", e)
  }
}
