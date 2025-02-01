import { Schema, model } from "mongoose";

export interface IProduct {
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
}

const productSchema = new Schema<IProduct>({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 }
});

export const Product = model<IProduct>("Product", productSchema);
