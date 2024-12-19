import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SiweMessage } from 'siwe';

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		CredentialsProvider({
			name: 'Ethereum',
			credentials: {
				message: {
					label: 'Message',
					type: 'text',
					placeholder: '0x0',
				},
				signature: {
					label: 'Signature',
					type: 'text',
					placeholder: '0x0',
				},
			},
			async authorize(credentials) {
				console.log("🚀 ~ authorize ~ credentials:", credentials)
				try {
					const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'))
					console.log('🚀 ~ authorize ~ siwe:', siwe);
					const fields = await siwe.verify({
						signature: credentials?.signature || '',
					});
					console.log('🚀 ~ authorize ~ fields:', fields);
					console.log('🚀 ~ authorize ~ fields:', fields.data.address);

					return {
						id: fields.data.address,
						address: fields.data.address,
						signature: credentials?.signature || '',
						nonce: fields.data.nonce,
						message: credentials?.message || '',
					};
				} catch (error) {
					console.log('siwe ', error);
					return null;
				}
			},
		}),
	],

	callbacks: {
		async signIn({ account, profile }) {
			console.log('This signIn part ran');

			// Custom sign-in logic
			if (account?.provider === 'google') {
				// Additional verification can be done here
				// @ts-ignore
				return profile?.email_verified === true;
			}

			if (account?.provider === 'credentials') {
				return true; // Allow sign-in for credentials provider
			}

			return false;
		},
		async jwt({ token, account, profile, user }) {
			console.log("🚀 ~ jwt ~ user:", user)
			console.log('This jwt part ran');

			// Add Ethereum address if SIWE (credentials provider) is used
			if (user?.address) {
				token.address = user.address;
				token.signature = user.signature;
				token.nonce = user.nonce;
				token.message = user.message;
			}

			// Add Google access token to the JWT
			if (account) {
				token.accessToken = account.access_token;
				token.id = profile?.sub;
			}
			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			console.log("🚀 ~ session ~ session:", session)
			console.log("🚀 ~ session ~ token:", token)
			console.log("🚀 ~ session ~ token:", token.address)
			console.log('This sesssion part ran');

			// Add Ethereum  to the session if present
			if (token.address) {
				session.user.address = token.address;
				session.user.signature = token.signature;
				session.user.nonce = token.nonce;
				session.user.message = token.message;
			}

			// Add Google access token to the session
			if (token.accessToken) {
				session.accessToken = token.accessToken;
				session.userId = token.id;
			}

			return session;
		},
	},
	pages: {
		signIn: '/auth/signup',
	},
});

export { handler as GET, handler as POST };
