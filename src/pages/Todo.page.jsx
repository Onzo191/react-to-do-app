import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../services/auth.service";

const TodoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    await navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else console.log(user);
  }, [user, navigate]);

  return (
    <div>
      <h1>Todo App</h1>
      <p>Welcome, {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TodoPage;
