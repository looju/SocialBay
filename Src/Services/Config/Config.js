import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig = {
  apiKey: "AIzaSyAXs2NhSI13hhBT6VvSmoKSx6jEWD_Usf4",
  authDomain: "socialbay-e301a.firebaseapp.com",
  projectId: "socialbay-e301a",
  storageBucket: "socialbay-e301a.appspot.com",
  messagingSenderId: "292333384057",
  appId: "1:292333384057:web:0fd6e62437ae311eb03fa8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore()
