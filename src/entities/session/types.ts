import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "user" | "moderator" | "admin";
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role?: "user" | "moderator" | "admin"; 
  }

  interface JWT {
    id: string;
    role: "user" | "moderator" | "admin"; 
  }
}
