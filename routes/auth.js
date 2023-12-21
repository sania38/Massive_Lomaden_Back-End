import express from "express";
import mysql from "mysql2";
import argon2 from "argon2";
import multer from "multer";
import path from "path";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "380747",
  database: "massive",
});

const router = express.Router();

// Route to add kost
router.post("/kost", async (req, res) => {
  const {
    title,
    jenis,
    sisa,
    detail,
    lokasi,
    fasilitas,
    harga,
    sk1,
    sk2,
    sk3,
    fk1,
    fk2,
    fk3,
    fk4,
    fk5,
    fk6,
    fk7,
    fkm1,
    fkm2,
    fkm3,
    fkm4,
    fkm5,
    fu1,
    fu2,
    fu3,
    fu4,
    fu5,
    pk1,
    pk2,
    pk3,
    pk4,
    detlok,
    no,
    delay,
    peta,
  } = req.body;

  try {
    await connection.promise().query(
      `INSERT INTO kost 
    (title, jenis, sisa, detail, 
    lokasi, fasilitas, harga, sk1, sk2, sk3, fk1, fk2, fk3, fk4, fk5, fk6, fk7, 
    fkm1, fkm2, fkm3, fkm4, fkm5, fu1, fu2, fu3, fu4, fu5, pk1, pk2, pk3, pk4, detlok, no, delay, peta) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        jenis,
        sisa,
        detail,
        lokasi,
        fasilitas,
        harga,
        sk1,
        sk2,
        sk3,
        fk1,
        fk2,
        fk3,
        fk4,
        fk5,
        fk6,
        fk7,
        fkm1,
        fkm2,
        fkm3,
        fkm4,
        fkm5,
        fu1,
        fu2,
        fu3,
        fu4,
        fu5,
        pk1,
        pk2,
        pk3,
        pk4,
        detlok,
        no,
        delay,
        peta,
      ]
    );

    return res.status(201).json({ message: "kost added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// get all kost
router.get("/kost", async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT * FROM kost");
    return res.status(200).json({ kost: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// get a specific kost by ID
router.get("/kost/:id", async (req, res) => {
  const kostId = parseInt(req.params.id, 10); 

  if (isNaN(kostId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM kost WHERE id = ?", [kostId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Kost not found" });
    }

    const kost = rows[0];
    return res.status(200).json({ kost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "kost/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// add gambar kost
router.post(
  "/gambarkos",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "imb", maxCount: 1 },
  ]),
  async (req, res) => {
    const { image, image1, image2, image3, image4, imb } = req.files;


    try {
      await connection
        .promise()
        .query(
          `INSERT INTO gambarkost (image, image1, image2, image3, image4, imb) VALUES (?, ?, ?, ?, ?, ?)`,
          [
            image[0].filename,
            image1[0].filename,
            image2[0].filename,
            image3[0].filename,
            image4[0].filename,
            imb[0].filename,
          ]
        );

      return res
        .status(201)
        .json({ message: "Gambar Kost added successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }
);

// get all gambar kost
router.get("/gambarkos", async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT * FROM gambarkost");

    return res.status(200).json({ gambarkos: rows });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// delete gambar kost by ID
router.delete("/gambarkos/:id", async (req, res) => {
  const gambarkosId = req.params.id;

  try {
    await connection
      .promise()
      .query("DELETE FROM gambarkost WHERE id = ?", gambarkosId);

    return res
      .status(200)
      .json({ message: "Gambar Kost deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});


router.post("/kendaraan", async (req, res) => {
  const {
    title,
    jenis,
    detail,
    lokasi,
    fasilitas,
    harga,
    sk1,
    sk2,
    sk3,
    sk4,
    sk5,
    ketharga1,
    ketharga2,
    ketharga3,
    ketharga4,
    ketharga5,
    ketharga6,
    psewa1,
    psewa2,
    psewa3,
    ssewa1,
    ssewa2,
    ssewa3,
    ssewa4,
    peta,
    delay,
  } = req.body;

  try {
    await connection.promise().query(
      `INSERT INTO kendaraan 
      (title, jenis, detail, 
      lokasi, fasilitas, harga, sk1, sk2, sk3, sk4, sk5,
      ketharga1, ketharga2, ketharga3, ketharga4, ketharga5, ketharga6,
      psewa1, psewa2, psewa3, ssewa1, ssewa2, ssewa3, ssewa4, peta, delay) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        jenis,
        detail,
        lokasi,
        fasilitas,
        harga,
        sk1,
        sk2,
        sk3,
        sk4,
        sk5,
        ketharga1,
        ketharga2,
        ketharga3,
        ketharga4,
        ketharga5,
        ketharga6,
        psewa1,
        psewa2,
        psewa3,
        ssewa1,
        ssewa2,
        ssewa3,
        ssewa4,
        peta,
        delay,
      ]
    );

    return res.status(201).json({ message: "kendaraan added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//get all kendaraan
router.get("/kendaraan", async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT * FROM kendaraan");
    return res.status(200).json({ kendaraan: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//specific kendaraan by ID
router.get("/kendaraan/:id", async (req, res) => {
  const kendaraanId = req.params.id;

  try {
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM kendaraan WHERE id = ?", [kendaraanId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Kendaraan not found" });
    }

    const kendaraan = rows[0];
    return res.status(200).json({ kendaraan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Konfigurasi multer untuk menyimpan file di folder 
const storageKendaraan = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "kendaraan/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadKendaraan = multer({ storage: storageKendaraan });

// add gambar kendaraan
router.post(
  "/gambarkendaraan",
  uploadKendaraan.fields([
    { name: "image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  async (req, res) => {
    const { image, image1, image2, image3 } = req.files;

    try {
      await connection
        .promise()
        .query(
          `INSERT INTO gambarkendaraan (image, image1, image2, image3) VALUES (?, ?, ?, ?)`,
          [
            image[0].filename,
            image1[0].filename,
            image2[0].filename,
            image3[0].filename,
          ]
        );

      return res
        .status(201)
        .json({ message: "Gambar Kendaraan added successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  }
);

// get all gambarkendaraan
router.get("/gambarkendaraan", async (req, res) => {
  try {
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM gambarkendaraan");

    return res.status(200).json({ gambarkendaraan: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// specific gambarkendaraan by ID
router.get("/gambarkendaraan/:id", async (req, res) => {
  const gambarkendaraanId = parseInt(req.params.id, 10); 

  if (isNaN(gambarkendaraanId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM gambarkendaraan WHERE id = ?", [gambarkendaraanId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Gambar Kendaraan not found" });
    }

    const gambarkendaraan = rows[0];
    return res.status(200).json({ gambarkendaraan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//user registration
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);

  if (!password || password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const hashedPassword = await argon2.hash(password);
    console.log("Hashed Password:", hashedPassword);

    await connection
      .promise()
      .query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
        name,
        email,
        hashedPassword,
      ]);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];
    console.log("User Password from Database:", user.password);


    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all users
router.get("/users", async (req, res) => {
  try {
    const [rows] = await connection.promise().query("SELECT * FROM users");
    return res.status(200).json({ users: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// get specific user by ID
router.get("/users/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM users WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    const user = rows[0];
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
