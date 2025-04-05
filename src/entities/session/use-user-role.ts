import { useAppSession } from "./use-app-session";

export function useUserRole() {
  const session = useAppSession();
  const role = session.data?.user?.role;

  const isAdmin = role === 'admin';
  const isModerator = role === 'moderator' || isAdmin;
  const isUser = role === 'user';

  return {
    isAdmin,
    isModerator,
    isUser,
    role,
  };
}
