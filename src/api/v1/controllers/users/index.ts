import { Request, Response } from "express";
import * as userService from "../../services/users/index";


export const createUser = async (req:any, res: Response) => {
    try {
        const { email, password, name, role_id } = req.body;
        const user = await userService.createUser({
            email,
            password,
            name,
            role_id
        });
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "An unknown error occurred." });
        }
    }
};
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "An unknown error occurred." });
        }
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id  = Number(req.params.id);
        const { name } = req.body;
        const user = await userService.updateUser(id, {
            name,
        });
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "An unknown error occurred." });
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user = await userService.deleteUser(id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "An unknown error occurred." });
        }
    }
}