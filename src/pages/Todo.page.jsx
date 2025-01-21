import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../services/todo.service";
import TodoList from "../components/Todo/TodoList.component";
import NavBar from "../components/shared/NavBar.component";

const TodoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDeadline, setTodoDeadline] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchTodos();
    }
  }, [user, navigate]);

  const fetchTodos = async () => {
    const fetchedTodos = await getTodos(user.uid);

    setTodos(fetchedTodos);
  };

  const handleAddTodo = async () => {
    const newTodo = {
      title: todoTitle || "Task",
      description: todoDescription || "Description",
      deadline: todoDeadline || new Date().toISOString().split("T")[0],
      isComplete: false,
    };
    await addTodo(user.uid, newTodo);

    //rs input
    setTodos([...todos, newTodo]);
    setTodoTitle("");
    setTodoDescription("");
    setTodoDeadline("");
  };

  const handleUpdateTodo = async (updatedIndex, updatedTodo) => {
    await updateTodo(user.uid, updatedIndex, updatedTodo);
    const updatedTodos = [...todos];
    updatedTodos[updatedIndex] = updatedTodo;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = async (todoId) => {
    await deleteTodo(user.uid, todoId);
    const updatedTodos = [...todos];
    updatedTodos.splice(todoId, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="max-w-screen-xl mx-auto bg-white sm:rounded-lg flex justify-center flex-1 overflow-hidden">
        <div>
          <p>Welcome, {user?.uid}</p>
          <p>Welcome, {user?.email}</p>
          <input
            type="text"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="date"
            value={todoDeadline}
            onChange={(e) => setTodoDeadline(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add</button>
          <TodoList
            todos={todos}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
