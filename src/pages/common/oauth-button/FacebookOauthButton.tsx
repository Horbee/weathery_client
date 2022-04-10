import FacebookLogin from "react-facebook-login";
import { FaFacebook } from "react-icons/fa";


import { useAuthService } from "../../../service/auth/useAuthService";
import { createErrorToast } from "../../../utils/toast/errorToast";

export const FacebookOauthButton: React.FC = () => {
  const { facebookLogin } = useAuthService();

  const appId = import.meta.env.VITE_APP_FACEBOOK_APP_ID || "";

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      textButton="Facebook"
      callback={facebookLogin}
      onFailure={(error) =>
        createErrorToast("Error during signin via Facebook")
      }
      cssClass="btn btn-wide w-full"
      icon={
        <span className="mr-2">
          <FaFacebook />
        </span>
      }
      containerStyle={{ width: "47%" }}
    />
  );
};
