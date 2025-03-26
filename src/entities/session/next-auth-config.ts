import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { dbClient } from "@/src/shared/lib/db"
import { privateConfig } from "@/src/shared/config/private"
import { compact } from 'lodash-es'

export const nextAuthConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  providers: compact([
    privateConfig.GITHUB_ID &&
      privateConfig.GITHUB_SECRET &&
      GithubProvider({
        clientId: privateConfig.GITHUB_ID,
        clientSecret: privateConfig.GITHUB_SECRET,
      }),
  ]),
  secret: privateConfig.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
  },
}

export default nextAuthConfig