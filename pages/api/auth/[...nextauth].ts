import { NextApiRequest } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clinet from "../../../lib/server/client";

// export const authOptions: NextAuthOptions = {
//   // your configs
// };

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "username",
      id: "username",

      credentials: {
        username: { label: "Name", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password }: any = req.body;
        const user = await clinet.user.findUnique({
          where: {
            username,
          },
        });
        console.log("user");
        console.log(user);
        // console.log(credentials);

        if (user) {
          if (password === user.password) {
            return { name: user.username };
          }
          throw new Error("아이디 혹은 패스워드가 틀립니다.");
        } else {
          throw new Error("아이디 혹은 패스워드가 틀립니다.");
        }
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null;

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
  },
});
