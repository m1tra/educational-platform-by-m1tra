import { useAppSession } from "./use-app-session";

export function useUserRole() {
  const session = useAppSession();
  
  return {
    isAdmin: session.data?.user?.role === 'admin',
    isUser: session.data?.user?.role === 'user',
    role: session.data?.user?.role,
  };
} 