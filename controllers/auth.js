
const express = require("express");

const app = express();

// Rute untuk login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password wajib diisi" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.json({ message: "Login berhasil" });
    } else {
      res.status(401).json({ message: "Email atau password salah" });
    }
  });
});

// Rute untuk registrasi
app.post("/register", (req, res) => {
  const { nama, email, password, konfirmasiPassword } = req.body;

  if (!nama || !email || !password || !konfirmasiPassword) {
    return res.status(400).json({ message: "Semua kolom wajib diisi" });
  }

  if (password !== konfirmasiPassword) {
    return res
      .status(400)
      .json({ message: "Konfirmasi kata sandi tidak sesuai" });
  }

  const query = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";
  db.query(query, [nama, email, password], (err, results) => {
    if (err) throw err;

    res.json({ message: "Registrasi berhasil" });
  });
});
