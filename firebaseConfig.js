// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAH5i5dZ7wk8hkimtkwnnswxZceSiaZFiw',
  authDomain: 'clipproject-d17e9.firebaseapp.com',
  projectId: 'clipproject-d17e9',
  storageBucket: 'clipproject-d17e9.appspot.com',
  messagingSenderId: '1041307608043',
  appId: '1:1041307608043:web:b9c27a0890dfeb22d06fae',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
