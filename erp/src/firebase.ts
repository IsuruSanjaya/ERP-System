
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyBDlWrvh9wE91Ga55oqI9nedOgjcHYjbrY",

   authDomain: "classroom-b8abe.firebaseapp.com",

   projectId: "classroom-b8abe",

   storageBucket: "classroom-b8abe.appspot.com",

   messagingSenderId: "394057566347",

   appId: "1:394057566347:web:5a376baab668e30044ac8e",

   measurementId: "G-BXQ6HBZVF1"

};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);