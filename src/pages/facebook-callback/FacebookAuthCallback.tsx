import queryString from "query-string";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { loginWithFacebook } from "../../api/auth-controller";
import { AppRoutes } from "../../constants/routes";
import { useAuthService } from "../../service/auth/useAuthService";

export const FacebookAuthCallback = () => {
  const { setupAuth } = useAuthService();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = queryString.parse(window.location.search);
      const {
        data: { token },
      } = await loginWithFacebook(params);
      setupAuth(token);
      navigate(AppRoutes.Home);
    };

    handleCallback();
  }, []);

  return <div>FacebookAuthCallback</div>;
};
