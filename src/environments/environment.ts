import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const environment = {
  firebase: {
      apiKey: "AIzaSyBeHeNiJaR8st-LLl6sqQHhCa0YooT2tJs",
      authDomain: "learnstage-88b93.firebaseapp.com",
      databaseURL: "https://learnstage-88b93.firebaseio.com",
      projectId: "learnstage-88b93",
      storageBucket: "learnstage-88b93.appspot.com",
      messagingSenderId: "235839424766",
      appId: "1:235839424766:web:d58115cf2aecd74029fdaf",
      measurementId: "G-19XDMKBL81"
  }
};

// Initialize Firebase
const app = initializeApp(environment.firebase);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);