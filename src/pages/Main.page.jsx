import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button.component";

const MainPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white sm:rounded-lg flex justify-center flex-1 overflow-hidden">
        <div className="max-w-6xl px-4 mx-auto md:max-w-4xl sm:max-w-2xl sm:px-6 py-12">
          <div className="text-center">
            <h1 className="max-w-md mx-auto text-3xl font-extrabold tracking-normal text-gray-900 sm:text-3xl md:text-5xl lg:text-5xl md:leading-none sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
              <span className="block">Onzo todo app</span>
            </h1>
            <h2 className="max-w-md px-12 mx-auto mt-3 font-normal text-gray-500 text-md sm:mt-5 sm:text-md md:mt-5 md:text-xl sm:max-w-xl md:max-w-xl">
              Simple and easy to use todo app, built with React, Firebase and
              Tailwind CSS.
            </h2>
            <div className="max-w-md mx-auto mt-8 sm:flex sm:justify-center sm:space-x-2 md:mt-8">
              {!user ? (
                <>
                  <Button
                    onClick={() => navigate("/login")}
                    className="flex items-center justify-center m-2 w-full px-4 py-2 text-base font-normal text-white bg-indigo-500 border border-transparent rounded-full text-md hover:bg-indigo-600 md:py-4 md:px-10 md:py-2 transition"
                  >
                    Login
                  </Button>

                  <Button
                    onClick={() => navigate("/register")}
                    className="flex items-center justify-center m-2 w-full px-4 py-2 text-base font-normal text-indigo-500 border border-indigo-500 rounded-full text-md hover:bg-indigo-300 md:py-4 md:px-10 md:py-2 transition"
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => navigate("/todo")}
                  className="flex items-center justify-center m-2 w-full px-4 py-2 text-base font-normal text-white bg-indigo-500 border border-transparent rounded-full text-md hover:bg-indigo-600 md:py-4 md:px-10 md:py-2 transition"
                >
                  Use now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
