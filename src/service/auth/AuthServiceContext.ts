import { createContext } from 'react'

import { useAuthService } from './useAuthService'

export const AuthServiceContext = createContext<
  ReturnType<typeof useAuthService>
>(undefined as any);
