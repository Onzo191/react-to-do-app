import { useAuth } from "../contexts/Auth.context";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <h1>Welcome back, {user.email}</h1>
      ) : (
        <div>
          <h1>Welcome to the Todo App</h1>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default MainPage;
