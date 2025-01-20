import { useState } from "react";
import { register, loginWithGoogle } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/Auth.layout";
import GoogleButton from "../components/Auth/GoogleButton.component";
import Button from "../components/shared/Button.component";
import Input from "../components/shared/Input.component";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const user = await loginWithGoogle();
    if (user) await navigate("/todo");
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const user = await register(email, password);
      if (user) await navigate("/todo");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout>
      <div className="mt-12 flex flex-col items-center">
        <div className="w-full h-0">
          <button
            className="text-indigo-500 py-2"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
        <h1 className="text-2xl xl:text-3xl font-extrabold">Register</h1>

        <div className="w-full flex-1 mt-8">
          <div className="flex flex-col items-center">
            <GoogleButton onClick={handleGoogleLogin} />
          </div>

          <div className="my-8 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Or register with e-mail
            </div>
          </div>

          <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="mt-5"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              className="mt-5"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" onClick={handleSubmit}>
              Register
            </Button>
          </form>

          {error ? (
            <p className="mt-6 text-xs text-red-600 text-center">{error}</p>
          ) : (
            <p className="mt-6 text-xs text-gray-600 text-center">
              Template by templatana&#39;s
              <a
                href="https://codepen.io/owaiswiz/pen/jOPvEPB"
                className="border-b border-gray-500 border-dotted ml-1"
              >
                Source Code
              </a>
            </p>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
