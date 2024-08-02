import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy: "jwt",
    },
    pages:{
        signIn: "/sign-in",
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith@g.com" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) 
          {
            if(!credentials?.email  || !credentials?.password){
                return null;
            }
            const existingUser = await db.user.findUnique({
                where: { email: credentials?.email }
            });
            if(!existingUser){
                return null;
            }
            const passwordMatch = await compare(credentials.password, existingUser.password);
            if(!passwordMatch){
                return null;
            }
            return { 
                id: existingUser.id.toString(), //must be a string or else it will throw an error at authorize
                email: existingUser.email, 
                username: existingUser.username};
        }
        })
      ],
      callbacks:{
        async jwt({token, user})
        {
            if(user)
                {
                    return {...token, username: user.username};
                }
            return token;
      },
      async session({session, user, token})
      {
        return{
            ...session,
            user: {...session.user, username: token.username}
        }
      },  
}
}
