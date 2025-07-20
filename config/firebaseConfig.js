// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqI3tGucc0BFpPQIdJqFkClHWh4m1u6lc",
  authDomain: "react-native-app-05.firebaseapp.com",
  projectId: "react-native-app-05",
  storageBucket: "react-native-app-05.firebasestorage.app",
  messagingSenderId: "572462987638",
  appId: "1:572462987638:web:f2904a7fbf785de202a257",
  measurementId: "G-VKM7YSD657"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
const analytics = getAnalytics(app);