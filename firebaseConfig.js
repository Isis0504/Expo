import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (usa tus credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyD0D7rNIlS6btlECw0-Voo0ZwOrvUibjRI",
  authDomain: "tiroblancobd.firebaseapp.com",
  projectId: "tiroblancobd",
  storageBucket: "tiroblancobd.appspot.com",
  messagingSenderId: "689643409130",
  appId: "1:689643409130:web:3380bce7b867a9785f5193",
  measurementId: "G-MLV2Z77MBV",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
