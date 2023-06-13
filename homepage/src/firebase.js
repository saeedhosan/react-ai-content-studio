import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBkjdpBhrfOg22Z8wXDsj3E4sqyW6OLh68",
  authDomain: "open-base-5bf7d.firebaseapp.com",
  projectId: "open-base-5bf7d",
  storageBucket: "open-base-5bf7d.appspot.com",
  messagingSenderId: "165925703823",
  appId: "1:165925703823:web:f0e1c8790ee5edfe8820fa",
  databaseURL: "https://open-base-5bf7d-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
