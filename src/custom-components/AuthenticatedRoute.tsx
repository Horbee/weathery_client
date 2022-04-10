import { FC } from "react";
import { Navigate } from "react-router-dom";


import { useAuthService } from "../service/auth/useAuthService";

interface AuthenticatedRouteProps {
  fallbackUrl: string;
  negate?: boolean;
}

export const AuthenticatedRoute: FC<AuthenticatedRouteProps> = ({
  children,
  fallbackUrl,
  negate = false,
}) => {
  const {
    auth: { isLoggedIn },
  } = useAuthService();

  const condition = negate ? !isLoggedIn : isLoggedIn;

  return <>{condition ? children : <Navigate to={fallbackUrl} />}</>;
};
