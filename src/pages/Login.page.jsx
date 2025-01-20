import { useState } from "react";
import { login, loginWithGoogle } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/Auth.layout";
import GoogleButton from "../components/Auth/GoogleButton.component";
import Button from "../components/shared/Button.component";
import Input from "../components/shared/Input.component";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const user = await loginWithGoogle();
    if (user) await navigate("/todo");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(email, password);
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
        <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>

        <div className="w-full flex-1 mt-8">
          <div className="flex flex-col items-center">
            <GoogleButton onClick={handleGoogleLogin} />
          </div>

          <div className="my-8 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Or login with e-mail
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

            <Button type="submit" onClick={handleSubmit}>
              Login
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

export default LoginPage;
