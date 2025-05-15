import { prisma } from "@repo/db/client";
import { encryptPassword } from "../utils/auth.utils";

export type CreateAccountParams = {
  username: string;
  email: string;
  password?: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  try {
    // verify existing user doesn't exist
    const { username, email, password, userAgent } = data;

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userExists) {
      throw new Error("User already exists!");
      //   res
      //     .status(BAD_REQUEST)
      //     .json({ error: "User with this email/username already exists" });
      //   return;
    }

    if (typeof password !== "string"){
        throw new Error("Password needs to string")
    }

    if(userAgent !== null){

    }

    const hashedPassword = await encryptPassword(password, 10);

    // create user
    const user = await prisma.user.create({
        data:{
            username: username,
            email: email,
            password: hashedPassword,
        }
    })

    // create verfication code
    // const verificationode = await prisma.code


    // send email
    // create session in the db
    // sign access and refresh token
    // return user and token


  } catch (error) {}
};

