import { FaFacebook } from "react-icons/fa";


import { backendURL } from "../../../constants/endpoints";

export const FacebookOauthButton: React.FC = () => {
  const handleClick = () =>
    (window.location.href = backendURL("/auth/facebook"));

  return (
    <button
      className="btn btn-wide w-full"
      style={{ width: "47%" }}
      onClick={handleClick}
    >
      <span className="mr-2">
        <FaFacebook />
      </span>
      Facebook
    </button>
  );
};
