import { db } from "./database/Database"; 

const express = require("express");
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");
const cors = require("cors");
const { authRouter } = require("./routes/auth");
const { userRouter } = require("./routes/users");
const { productRouter } = require("./routes/products");

require("reflect-metadata"); 

const app = express();

// Seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());

db; 

// Rutas
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);


// Configurar HTTPS
const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.crt"),
};

app.get("/", (req:Request, res:any) => {
    res.send("API Segura con Express y MongoDB 🚀");
  });



https.createServer(options, app).listen(443, () => {
    console.log("🔒 Servidor HTTPS corriendo en https://localhost");
});
