import prisma from "../../../../index";
import bcrypt from "bcrypt";

const saltRounds = 10;
export const createUser = async (data: {
    email: string;
    password: string;
    name: string;
    role_id: number;
}) => {
    const existingUser = await prisma.users.findUnique({
        where: { email: data.email }
    })
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const user = await prisma.users.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            role_id: data.role_id
        },
        select : {
            email: true,
            name: true,
        }
    });
    return user;
}
export const getUsers = async () => {
    const users = await prisma.users.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            created_at: true,
        }
    });
    return users;
}
