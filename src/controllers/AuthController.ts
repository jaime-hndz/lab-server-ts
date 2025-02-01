import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Logger } from "../decorators/Logger";

export class AuthController {
  // Método para registrar un nuevo usuario, encriptando la contraseña y guardando en la base de datos.
  @Logger
  static async register(req: express.Request, res: express.Response) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado" });
  }

  // Método para autenticar un usuario, verificando el nombre de usuario y la contraseña.
  @Logger
  static async login(req: express.Request, res: express.Response) {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json({ message: "Usuario no encontrado" });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Contraseña incorrecta" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });
        res.json({ token });
      }
    }
  }
}
