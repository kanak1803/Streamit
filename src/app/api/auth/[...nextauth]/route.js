import { dbConnect } from "@/dbConfig/dbconnect";
import User from "@/models/UserModel";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentails",
      credentials: {},
      async authorize(credentials) {
        const { username, email, password } = credentials;

        try {
          await dbConnect();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) {
            return null;
          }
          return user;
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // Handle database errors
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      // if (trigger === "update" && session?.username) {
      //   token.username = session.username;
      // }
      // //updating name in mongodb
      // if (user) {
      //   try {
      //     await User.findByIdAndUpdate(user._id, {
      //       username: session?.username,
      //     });
      //   } catch (error) {
      //     console.error("falied to update username in mongodb database");
      //   }
      // }
      // console.log("jwt callback", token, user);
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
        token.username = user.username;
        token.avatar = user.avatar;
      }

      return token;
    },

    async session({ session, token }) {
      // console.log("session callback", token, session);
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
        session.user.username = token.username;
        session.user.avatar = token.avatar;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
