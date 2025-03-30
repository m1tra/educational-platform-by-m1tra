import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { dbClient } from "@/src/shared/lib/db"
import { privateConfig } from "@/src/shared/config/private"
// import { compact } from 'lodash-es'

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
        const isAdmin = user.email === privateConfig.ADMIN_EMAIL;
        session.user.role = isAdmin ? 'admin' : 'user';
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