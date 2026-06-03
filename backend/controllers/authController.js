const db = require("../database/db");

// REGISTER
const register = (req, res) => {
  const { name, email, password } = req.body;

  db.run(
    `
    INSERT INTO users(name,email,password,role)
    VALUES(?,?,?,?)
    `,
    [name, email, password, "customer"],
    function (err) {

      if (err) {
        return res.status(400).json({
          error: "Email already exists"
        });
      }

      res.status(201).json({
        success: true,
        message: "User Registered"
      });
    }
  );
};

// LOGIN
const login = (req, res) => {
  const { email, password } = req.body;

  db.get(
    `
    SELECT * FROM users
    WHERE email = ? AND password = ?
    `,
    [email, password],
    (err, user) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      if (!user) {
        return res.status(401).json({
          error: "Invalid Credentials"
        });
      }

      res.json({
        success: true,
        user
      });
    }
  );
};
const updateProfile = (req, res) => {
  const { id } = req.params;

  const { name, password } =
    req.body;

  if (password) {
    db.run(
      `
      UPDATE users
      SET name = ?,
          password = ?
      WHERE id = ?
      `,
      [name, password, id],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({
              error: err.message,
            });
        }

        db.get(
          `
          SELECT *
          FROM users
          WHERE id = ?
          `,
          [id],
          (err, user) => {
            res.json({
              success: true,
              user,
            });
          }
        );
      }
    );
  } else {
    db.run(
      `
      UPDATE users
      SET name = ?
      WHERE id = ?
      `,
      [name, id],
      function (err) {
        if (err) {
          return res
            .status(500)
            .json({
              error: err.message,
            });
        }

        db.get(
          `
          SELECT *
          FROM users
          WHERE id = ?
          `,
          [id],
          (err, user) => {
            res.json({
              success: true,
              user,
            });
          }
        );
      }
    );
  }
};
module.exports = {
  register,
  login,
  updateProfile,
};