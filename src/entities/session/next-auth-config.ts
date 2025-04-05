import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { dbClient } from "@/src/shared/lib/db"
import { privateConfig } from "@/src/shared/config/private"

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/verify-request',
  },
  providers: [
    ...(privateConfig.GITHUB_ID && privateConfig.GITHUB_SECRET
      ? [GithubProvider({
          clientId: privateConfig.GITHUB_ID,
          clientSecret: privateConfig.GITHUB_SECRET,
        })]
      : [])
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        if (user.email === privateConfig.ADMIN_EMAIL) {
          session.user.role = 'admin';
        }
        else {
          const dbUser = await dbClient.user.findUnique({
            where: { id: user.id },
            select: { role: true }
          });
          session.user.role = dbUser?.role.toLowerCase() as 'user' | 'moderator' | 'admin';
        }
  
      }
      return session;
    },
    async signIn() {
      if (!process.env.NEXTAUTH_SECRET) {
        console.error("NEXTAUTH_SECRET is not defined")
        return false
      }
      return true
    },
  },
}

export default nextAuthConfig