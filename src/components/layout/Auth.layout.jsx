import PropTypes from "prop-types";

const AuthLayout = (props) => {
  const { children, imageUrl } = props;

  const defaultPhoto =
    "https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 overflow-hidden">
        {/* Left Section */}
        <div className="lg:w-1/2 xl:w-5/12 w-full p-6 sm:p-12">{children}</div>

        {/* Right Section */}
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imageUrl ? imageUrl : defaultPhoto})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for validation
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  imageUrl: PropTypes.string,
};

export default AuthLayout;
