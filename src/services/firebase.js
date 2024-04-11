import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA-L1mmS1Mmzt-quZXs16ni-wgwLllHNTM",
    authDomain: "movie-viewer-151f1.firebaseapp.com",
    projectId: "movie-viewer-151f1",
    storageBucket: "movie-viewer-151f1.appspot.com",
    messagingSenderId: "1036705341480",
    appId: "1:1036705341480:web:0ae2d91ef1d99b4c3cd51d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
