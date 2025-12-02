// importation du framework Express
import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js"

// creation d'une instance de l'appli Express
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);

// definition du port d'ecoute du serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`) // message de confirmation lorsque le serveur est en cours d'excecution
});