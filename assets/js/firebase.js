
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7e4V1xeUc-hDiwGLdGynbEiTqpDOeLfU",
  authDomain: "food-ordering-login-50ad9.firebaseapp.com",
  projectId: "food-ordering-login-50ad9",
  appId: "1:819360196876:web:032e131439abdde7294129"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.signupUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

window.signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

window.loginUser = async (email, password) => {
  await setPersistence(auth, browserLocalPersistence);
  return signInWithEmailAndPassword(auth, email, password);
};

window.logoutUser = async () => {
  await signOut(auth);
};


window.authGuard = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
};

