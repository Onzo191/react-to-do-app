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
import { NavBar, Input, Button } from "../components/shared";

const TodoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDeadline, setTodoDeadline] = useState(today);

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
      deadline: todoDeadline || today,
      isComplete: false,
    };
    await addTodo(user.uid, newTodo);

    //rs input
    setTodos([...todos, newTodo]);
    setTodoTitle("");
    setTodoDescription("");
    setTodoDeadline(today);
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
      <div className="max-w-screen-xl mx-auto bg-white sm:rounded-lg flex justify-center flex-1 flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-5/12 xl:w-4/12 w-full px-4 py-4 lg:px-8">
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              placeholder="Title"
            />
            <Input
              type="date"
              value={todoDeadline}
              onChange={(e) => setTodoDeadline(e.target.value)}
            />
            <textarea
              className="w-full h-[120px] px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
              placeholder="Description"
            />
            <Button onClick={handleAddTodo}>Add</Button>
          </div>
        </div>
        <div className="flex-grow py-4 px-4 lg:px-0 lg:pr-4">
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
