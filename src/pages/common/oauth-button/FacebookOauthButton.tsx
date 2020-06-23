import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";

import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AuthServiceContext } from "../../../service/auth/AuthServiceContext";
import { createErrorToast } from "../../../utils/toast/errorToast";

export const FacebookOauthButton: React.FC = () => {
  const { facebookLogin } = useContext(AuthServiceContext);

  const appId = process.env.REACT_APP_FACEBOOK_APP_ID || "";

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      textButton="Facebook"
      callback={facebookLogin}
      onFailure={(error) => {
        console.log(error);
        createErrorToast("Error during signin via Facebook");
      }}
      cssClass="btn btn-wide w-full"
      icon={
        <span className="mr-2">
          <FontAwesomeIcon icon={faFacebook} />
        </span>
      }
      containerStyle={{ width: "47%" }}
    />
  );
};
