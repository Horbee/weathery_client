import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";


import { AuthServiceContext } from "../service/auth/AuthServiceContext";

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
  } = useContext(AuthServiceContext);

  const condition = negate ? !isLoggedIn : isLoggedIn;

  return <>{condition ? children : <Navigate to={fallbackUrl} />}</>;
};
