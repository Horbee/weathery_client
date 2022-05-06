import { FaGoogle } from "react-icons/fa";


import { backendURL } from "../../../constants/endpoints";

export const GoogleOauthButton: React.FC = () => {
  const handleClick = () => (window.location.href = backendURL("/auth/google"));

  return (
    <button
      className="btn btn-wide bg-red-600 hover:bg-red-700"
      onClick={handleClick}
    >
      <span className="mr-2">
        <FaGoogle />
      </span>
      Google
    </button>
  );
};
