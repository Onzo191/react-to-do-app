import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth.context";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import TodoPage from "./pages/Todo.page";
import MainPage from "./pages/Main.page";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
