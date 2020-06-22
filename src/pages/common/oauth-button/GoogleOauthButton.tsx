import React, { useContext } from "react";
import { Button } from "react-bootstrap";
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
      onFailure={(error) => {
        console.log(error);
        createErrorToast("Error during signin via Google");
      }}
      render={(props) => (
        <Button
          className="btn-wide"
          variant="danger"
          size="lg"
          onClick={props.onClick}
        >
          <span className="mr-2">
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          <span>Google</span>
        </Button>
      )}
    />
  );
};
