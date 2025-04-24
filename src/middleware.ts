import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/auth/sign-in', 
  },
  callbacks: {
    authorized({ token }) {
      if (!token || token?.role !== "admin") {
        return false;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/api/users"], 
};

