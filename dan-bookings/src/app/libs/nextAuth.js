import GoogleProvider from "next-auth/providers/google";
import { useUserData } from "../controllers/UserController";
import { useUser } from "../hooks/useUser";
import { US_DB_PROPS } from "../constants/usersDB";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const { createUser, getUser } = useUser()
      await getUser(user) || await createUser(user);
      return true;
    },
    async session({ session, token, user }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      const  { USER_ROLS } = US_DB_PROPS; 
      const {  getUser } = useUser()
      const userDB = await getUser(user) || {};
      if(userDB?.rol) token.role = userDB.rol || USER_ROLS;      
      return token;
    },
  }
};
