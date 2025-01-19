import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TodoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log(user);
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Todo App</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
};

export default TodoPage;
