import { auth } from '../../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'

export const SignIn = async ({ email, password }) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const SignUp = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

export const SubscribeAuth = callback => {
  return onAuthStateChanged(auth, async user => {
    callback(user)
  })
}

export const SignOut = () => {
  return signOut(auth)
}
