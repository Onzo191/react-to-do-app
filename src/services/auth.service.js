import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

const createUserDocument = async (user) => {
  const userDocRef = doc(db, "users", user.uid);
  const todosDocRef = doc(db, "todos", user.uid);

  await setDoc(userDocRef, {
    email: user.email,
    createdAt: new Date(),
  });

  await setDoc(todosDocRef, {
    email: user.email,
    todos: [],
    createdAt: new Date(),
  });
};

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await createUserDocument(user);
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

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      return { ...user, ...userDoc.data() };
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (error) {
    console.log("Error login: ", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await createUserDocument(user);
    }

    return user;
  } catch (error) {
    console.log("Error login with Google: ", error);
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
