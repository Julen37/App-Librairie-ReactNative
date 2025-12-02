import express from "express";

const router = express.Router();

// Route pour l'inscription d'un user 
// methode POST 
// URL : /register
router.post("/register", async (req, res) => {
    // fonction sera appelée quand la route /register est appelée en methode POST
    res.send("register");
    // elle renvoie simplement la chaine de caractere "register"
});

router.post("/login", async (req, res) => {
    res.send("login");
});

export default router;