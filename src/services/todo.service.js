import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const addTodo = async (uid, todo) => {
  const userDoc = doc(db, "todos", uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    userData.todos.push(todo);
    await setDoc(userDoc, userData);
  } else {
    await setDoc(userDoc, {
      createdDate: new Date(),
      email: auth.currentUser.email,
      todos: [todo],
    });
  }
};

export const updateTodo = async (uid, todoIndex, updatedTodo) => {
  const userDoc = doc(db, "todos", uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    userData.todos[todoIndex] = updatedTodo;
    await setDoc(userDoc, userData);
  }
};

export const deleteTodo = async (uid, todoIndex) => {
  const userDoc = doc(db, "todos", uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    userData.todos.splice(todoIndex, 1);
    await setDoc(userDoc, userData);
  }
};

export const deleteAllTodos = async (uid) => {
  const userDoc = doc(db, "todos", uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    await setDoc(userDoc, {
      createdDate: userSnapshot.data().createdDate,
      email: userSnapshot.data().email,
      todos: [],
    });
  }
};

export const getTodos = async (uid) => {
  const userDoc = doc(db, "todos", uid);
  const userSnapshot = await getDoc(userDoc);

  if (userSnapshot.exists()) {
    return userSnapshot.data().todos;
  } else {
    return [];
  }
};
