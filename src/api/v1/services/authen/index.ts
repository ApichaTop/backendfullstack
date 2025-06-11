import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../../../index";

const jwtSecret = process.env.JWT_SECRET;

export const login = async (email: string, password: string) => {
    const user = await prisma.users.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    console.log(jwtSecret);
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role_id: user.role_id,
        },
        jwtSecret as string,
        {
            expiresIn: "1h",
        }
    );
    return token;
}