import React from "react";

import { useAuthService } from "./useAuthService";

export const AuthServiceContext = React.createContext<
  ReturnType<typeof useAuthService>
>(undefined as any);
