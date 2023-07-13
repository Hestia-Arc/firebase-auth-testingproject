// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuecztJRXjwT0M5TGOI8To-s1nm5HdgEA",
  authDomain: "login-testing-8c816.firebaseapp.com",
  projectId: "login-testing-8c816",
  storageBucket: "login-testing-8c816.appspot.com",
  messagingSenderId: "508516212462",
  appId: "1:508516212462:web:952dfb2c99198da0685dff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

// ------------------------------
// GOOGLE PROVIDER
// -------------------------------
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const user = await signInWithPopup(auth, provider);
  return user;
};

// ------------------------
// DATABASE
// --------------------------
const db = getFirestore(app);

// --------------------------
// LOGIN WITH EMAIL&PASSWORD
// -----------------------------
export const loginWithEmailAndPassword = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);

  return user;
};

// --------------------------
// SIGNUP WITH EMAIL&PASSWORD
// --------------------------
export const signUpWithEmailAndPassword = async (email, password) => {
  const user = await createUserWithEmailAndPassword(auth, email, password);

  return user;
};

// ----------------------------------
// CREATE NEW USER IN DATABASE
// -------------------------------
export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const usersRef = collection(db, "users");
  const docRef = doc(db, "users", userAuth.uid);
  const user = await getDoc(docRef);

  if (!user.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(doc(usersRef, userAuth.uid), {
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user" + error.message);
    }
  }

  return docRef;
};
