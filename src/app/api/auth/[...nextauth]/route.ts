import NextAuth from "next-auth/next";
import nextAuthConfig from "@/src/entities/session/next-auth-config";

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };