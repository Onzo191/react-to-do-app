import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
    });

    await setDoc(doc(db, "todos", user.uid), {
      email: user.email,
      todos: [],
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.log("Error register: ", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    //get user data
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return { ...user, ...userData };
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.log("Error login: ", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Error logout: ", error);
    throw error;
  }
};
