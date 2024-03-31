import { auth } from '../../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

export const signIn = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const signUp = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const subscribeAuth = callback => {
  return onAuthStateChanged(auth, async user => {
    callback(user)
  })
}

export const signOutt = () => {
  return signOut(auth)
}
