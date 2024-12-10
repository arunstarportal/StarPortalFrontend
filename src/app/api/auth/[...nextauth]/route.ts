import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      // Custom sign-in logic
      if (account?.provider === "google") {
        // Additional verification can be done here
        return profile?.email_verified === true;
      }
      return false;
    },
    async jwt({ token, account, profile }) {
      // Add Google access token to the JWT
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      // Add Google access token and user ID to session
      session.accessToken = token.accessToken as string;
      session.userId = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signup",
  },
});

export { handler as GET, handler as POST };
