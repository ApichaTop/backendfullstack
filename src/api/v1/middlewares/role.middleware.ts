import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export const RoleGuard = (roles: number[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            res.status(403).json({ error: "Access denied. No user role found." });
            return;
        }
        if (!roles.includes(req.user.role_id)) {
            res.status(403).json({ error: "Access denied. Insufficient permissions." });
            return;
        }
        next();
    };
}