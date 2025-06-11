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

export const updateUser = async (id: number, data: {
    name?: string;
}) => {
    const existingUser = await prisma.users.findUnique({
        where: { id }
    })
    if (!existingUser) {
        throw new Error("User not found");
    }
    const updateData = {
        name: data.name, 
    };
    const user = await prisma.users.update({
        where: { id },
        data: updateData,
    });
    return {
        id: user.id,
        name: user.name,
    };
}

export const deleteUser = async (id: number) => {
    const user = await prisma.users.findUnique({
        where: { id },
    });
    if (!user) {
        throw new Error("User not found");
    }
    await prisma.users.delete({
        where: { id },
    });
    return user;
}
