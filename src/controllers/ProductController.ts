import { Request, Response } from "express";
import { Product } from "../models/Product";

interface ProductRequestBody {
  name: string;
  price: number;
}

function isValidProductData(data: any): data is ProductRequestBody {
  return (
    typeof data.nombre === "string" &&
    data.nombre.trim() !== "" &&
    typeof data.precio === "number" &&
    data.precio >= 0
  );
}

export class ProductController {
  
// Método para obtener todos los productos con paginación.
  static async getAllProducts(req: Request, res: Response) {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const productos = await Product.find().skip(skip).limit(Number(limit));
    res.json(productos);
  }

  // Método para crear un nuevo producto validando los datos recibidos en el cuerpo de la solicitud.
  static async createProduct(req: Request, res: Response) {
    try {
      const requestBody = req.body;
      if (!isValidProductData(requestBody)) {
        res.status(400).json({ error: "Datos del producto inválidos" });
      }

      const nuevoProducto = new Product(requestBody);
      await nuevoProducto.save();
      res.status(201).json(nuevoProducto);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  // Método para actualizar un producto existente después de validar los datos y buscar el producto por ID.
  static async updateProduct(req: Request, res: Response) {
    try {
      const requestBody = req.body;
      if (!isValidProductData(requestBody)) {
        res.status(400).json({ error: "Datos del producto inválidos" });
      }

      const producto = await Product.findByIdAndUpdate(
        req.params.id,
        requestBody,
        { new: true }
      );
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json(producto);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  // Método para eliminar un producto por ID y devolver una respuesta con el resultado.
  static async deleteProduct(req: Request, res: Response) {
    try {
      const producto = await Product.findByIdAndDelete(req.params.id);
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
      }
      res.json({ message: "Producto eliminado" });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }
}
