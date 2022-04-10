import queryString from "query-string";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { loginWithGoogle } from "../../api/auth-controller";
import { AppRoutes } from "../../constants/routes";
import { useAuthService } from "../../service/auth/useAuthService";

export const GoogleAuthCallback = () => {
  const { setupAuth } = useAuthService();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const params = queryString.parse(window.location.search);
      const {
        data: { token },
      } = await loginWithGoogle(params);
      setupAuth(token);
      navigate(AppRoutes.Home);
    };

    handleCallback();
  }, []);

  return <div>GoogleAuthCallback</div>;
};
