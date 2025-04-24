import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import YandexProvider from "next-auth/providers/yandex"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { dbClient } from "@/src/shared/lib/db"
import { privateConfig } from "@/src/shared/config/private"

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/verify-request',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    ...(privateConfig.GITHUB_ID && privateConfig.GITHUB_SECRET
      ? [GithubProvider({
          clientId: privateConfig.GITHUB_ID,
          clientSecret: privateConfig.GITHUB_SECRET,
        })]
      : []),
    ...(privateConfig.YANDEX_ID && privateConfig.YANDEX_SECRET
      ? [YandexProvider({
          clientId: privateConfig.YANDEX_ID,
          clientSecret: privateConfig.YANDEX_SECRET,
        })]
      : []),
    ...(privateConfig.GOOGLE_ID && privateConfig.GOOGLE_SECRET
      ? [GoogleProvider({
          clientId: privateConfig.GOOGLE_ID,
          clientSecret: privateConfig.GOOGLE_SECRET,
        })]
      : [])
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
  
        if (user.email === privateConfig.ADMIN_EMAIL) {
          token.role = 'admin'; 
        } else {
          const dbUser = await dbClient.user.findUnique({
            where: { id: user.id },
            select: { role: true }
          });
          token.role = dbUser?.role.toLowerCase() as 'user' | 'moderator' | 'admin';
        }
      }
      return token;
    },
  
    async session({ session, token }) {

      if (session.user) {
        session.user.id = token.id as string; 
        session.user.role = token.role  as "user" | "moderator" | "admin";
      }

      return session;
    },
  

    async signIn() {
      if (!process.env.NEXTAUTH_SECRET) {
        return false;
      }
      return true;
    },
  },
}

export default nextAuthConfig