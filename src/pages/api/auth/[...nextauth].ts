import { has } from "lodash";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import API from "../../../api/API";
import { environment } from "../../../environments/environment";
import http from "../../../utils/http";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "exampl@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const payload = {
                        email: credentials?.email,
                        password: credentials?.password
                    }
                    const request = await http.post(environment.api_url + API.AUTH_LOGIN_EXTERNAL_URL, payload);
                    if (request.data) {
                        return request.data;
                    }
                } catch (error) {
                }

                return null;

            }

        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 1,
    },
    jwt: {
        secret: '7Myh9rN0y9PCrFYMVeuZCiGDLsISWkezBMI7adliGR8=',
        maxAge: 60 * 60 * 24 * 1,
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (user) {
                return true;
            }
            return false
        },
        async redirect({ url, baseUrl }) {
            return url;
        },
        async session({ session, token }: any) {
            if (has(token, 'accessToken')) {
                return {
                    ...session,
                    user: {
                        ...token.user,
                        full_name: token.user.first_name + ' ' + token.user.last_name
                    },
                    accessToken: token.accessToken,
                }
            }
            return session;
        },
        async jwt({ token, user }: any) {
            if (user) {
                if (has(user, 'accessToken')) {
                    return {
                        ...token,
                        accessToken: user.accessToken,
                        user: user.user,
                    }
                }
            }
            return token
        }
    },
    secret: "7Myh9rN0y9PCrFYMVeuZCiGDLsISWkezBMI7adliGR8="
})