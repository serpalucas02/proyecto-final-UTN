const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User.model");
const session = require("express-session");

const router = express.Router();

router.use(
  session({
    secret: "KsHL3$xOm!n&1HTA!i2N",
    resave: false,
    saveUninitialized: false,
    sameSite: "strict",
  })
);

// Obtiene el rol del usuario
router.get("/get-role", async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);

      if (user) {
        res.status(200).json({ role: user.roles });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  } else {
    res.status(401).json({ message: "No se ha iniciado sesión" });
  }
});

// Chequea si el usuario inicio sesion
router.get("/check-authentication", (req, res) => {
  if (req.session.userId) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Endpoint de Registro
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.exists({ username });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      roles: ["user"],
    });

    await newUser.save();
    res.status(200).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Endpoint de Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    req.session.userId = user._id;
    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Endpoint de Logout
router.post("/logout", (req, res) => {
  try {
    req.session.destroy();
    res.json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
