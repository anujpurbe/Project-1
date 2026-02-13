import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7e4V1xeUc-hDiwGLdGynbEiTqpDOeLfU",
  authDomain: "food-ordering-login-50ad9.firebaseapp.com",
  projectId: "food-ordering-login-50ad9",
  appId: "1:819360196876:web:032e131439abdde7294129"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.loginUser = async (email, password) => {
  await setPersistence(auth, browserLocalPersistence);
  return signInWithEmailAndPassword(auth, email, password);
};

window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};

window.authGuard = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
};
