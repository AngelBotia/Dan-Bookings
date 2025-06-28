import GoogleProvider from "next-auth/providers/google";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { getUser,createUser } from '../server/userActions.js'


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  jwt: {
    maxAge: 24 * 60 * 60
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      const hasUser = await getUser(user) || await createUser(user);
      return !!hasUser;
    },
    async session({ session, token, user }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user, account, profile }) {
      const userDB = await getUser(user) || {};
      if(userDB?.rol) token.role = userDB.rol;      
      return token;
    },
  }
};
export const hasPermission = async (request) =>{
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const session = await getServerSession(authOptions);
    const isAdmin = token?.role && token.role == process.env.NEXT_PUBLIC_MAIN_ROL;
    return !!(session && isAdmin)
}
