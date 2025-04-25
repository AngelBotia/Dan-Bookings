import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const googleCredential = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
}
const handler = NextAuth({
    providers:[GoogleProvider(googleCredential)]
})

export { handler as GET, handler as POST };