import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { dbClient } from "@/src/shared/lib/db"
import { privateConfig } from "@/src/shared/config/private"
import { compact } from 'lodash-es'
<<<<<<< HEAD

if (!privateConfig.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is not defined')
}
=======
>>>>>>> master

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/new-user',
    verifyRequest: '/auth/verify-request',
  },
  providers: compact([
    privateConfig.GITHUB_ID &&
      privateConfig.GITHUB_SECRET &&
      GithubProvider({
        clientId: privateConfig.GITHUB_ID,
        clientSecret: privateConfig.GITHUB_SECRET,
      }),
  ]),
<<<<<<< HEAD
  secret: privateConfig.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
=======
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const isAdmin = user.email === privateConfig.ADMIN_EMAIL;
        session.user.role = isAdmin ? 'admin' : 'user';
      }
      return session;
    },
>>>>>>> master
  },
}

export default nextAuthConfig