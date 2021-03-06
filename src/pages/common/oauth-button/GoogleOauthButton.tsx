import React, { useContext } from "react";
import GoogleLogin from "react-google-login";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthServiceContext } from "../../../service/auth/AuthServiceContext";
import { createErrorToast } from "../../../utils/toast/errorToast";

export const GoogleOauthButton: React.FC = () => {
  const { googleLogin } = useContext(AuthServiceContext);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleLogin
      autoLoad={false}
      clientId={clientId}
      buttonText="Google"
      onSuccess={googleLogin}
      onFailure={(error) => createErrorToast("Error during signin via Google")}
      render={(props) => (
        <button
          className="btn btn-wide bg-red-600 hover:bg-red-700"
          onClick={props.onClick}
        >
          <span className="mr-2">
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          <span>Google</span>
        </button>
      )}
    />
  );
};
