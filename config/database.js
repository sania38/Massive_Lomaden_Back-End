const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "380747",
  database: "massive_mysql",
});

db.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal: " + err.stack);
    return;
  }
  console.log("Terhubung ke database dengan ID " + db.threadId);
});
