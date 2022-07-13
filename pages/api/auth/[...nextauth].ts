import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clinet from "../../../lib/server/client";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "email",
      id: "email",

      credentials: {
        username: { label: "Name", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password }: any = req.body;

        console.log("authorize");
        // console.log(username, password);
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
        const user = await clinet.user.findUnique({
          where: {
            username,
          },
        });
        // console.log(user);
        // return credentials;

        if (user) {
          if (password === user.password) {
            return { username };
            // return credentials;
          } else {
            return null;
          }
          // Any object returned will be saved in `user` property of the JWT
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error("error message") // Redirect to error page
          // throw "/path/to/redirect"        // Redirect to a URL
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     console.log(baseUrl, url);
  //     // Allows relative callback URLs
  //     if (url.startsWith("/")) return `${baseUrl}${url}`;
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) return url;
  //     return url;
  //   },
  // },

  pages: {
    signIn: "/login",
  },
});
