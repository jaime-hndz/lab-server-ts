import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");
    if (!token) {
        res.status(401).json({ message: "Acceso denegado" });
    } else {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET!);
            (req as any).user = verified;
            next();
        } catch(e) {
            res.status(400).json({ message: "Token inválido" });
        }
    }

        

}
