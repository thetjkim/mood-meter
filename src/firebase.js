import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8Yk2pFwMkzdo7bIAKbs9Pun0hoV0CqaY",
    authDomain: "moodmeter-53a7b.firebaseapp.com",
    projectId: "moodmeter-53a7b",
    storageBucket: "moodmeter-53a7b.firebasestorage.app",
    messagingSenderId: "293439094766",
    appId: "1:293439094766:web:76885ee0d6557a10dd58ff",
    measurementId: "G-3VB1LCQ2CB"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);