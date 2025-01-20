import { useState } from "react";

const Input = ({ type, placeholder, value, onChange, className = "" }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
        type={showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};

export default Input;
