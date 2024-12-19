

import { DefaultSession, DefaultUser } from "next-auth";

// Extend the NextAuth User type
declare module "next-auth" {
  interface User extends DefaultUser {
    address?: string;
    signature?: string;
    nonce?: string;
    message?: string;
  }

  interface Session extends DefaultSession {
    user: User & {
      address?: string;
      signature?: string;
      nonce?: string;
      message?: string;
    };
  }
}
