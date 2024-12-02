import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "@firebase/storage";


// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyBq_T99zXu48Aw_nQpJt76B3Or3RsBtpAk",
  authDomain: "stup-7d1f6.firebaseapp.com",
  projectId: "stup-7d1f6",
  storageBucket: "stup-7d1f6.firebasestorage.app",
  messagingSenderId: "1045442649867",
  appId: "1:1045442649867:web:a6c640191258c43f830c0e"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
// export const storage = getStorage(app);