const mongoose = require("mongoose");
const dotenv = require("dotenv");

//se conecta a la db y devuelve una instacio cuando se solicite
class Database {
    private static instance: Database;

    private constructor() {
        dotenv.config();
        mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => console.log("✅ Conectado a MongoDB"))
          .catch((err:any) => console.error("❌ Error de conexión:", err.message));
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export const db = Database.getInstance();
