import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/shared/NavBar.component";

const TodoPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else console.log(user);
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="max-w-screen-xl mx-auto bg-white sm:rounded-lg flex justify-center flex-1 overflow-hidden">
        <p>Welcome, {user?.email}</p>
      </div>
    </div>
  );
};

export default TodoPage;
