import PropTypes from "prop-types";

const Button = (props) => {
  const {
    onClick,
    children = "Button",
    className = "mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none",
    disabled = false,
    ...restProps
  } = props;

  return (
    <button
      onClick={onClick}
      className={`${className}`}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
