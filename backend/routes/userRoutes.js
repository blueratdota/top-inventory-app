import express from "express";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import { genToken } from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// ###register user
router.post("/", async (req, res, next) => {
  const { username, password, user_type } = req.body;
  try {
    const { rows } = await pool.query(
      "SELECT username FROM user_db WHERE username = $1 ",
      [username]
    );
    if (rows[0]) {
      const error = new Error(`User "${username}" already exists`);
      error.status = 400;
      return next(error);
    } else {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return next("Error in hashing password");
        }
        genToken(res, username);
        await pool.query(
          "INSERT INTO user_db (username,password,user_type,timestamp) VALUES ($1,$2,$3,$4)",
          [username, hashedPassword, user_type, new Date()]
        );

        res.status(201).json(req.body);
      });
    }
  } catch (error) {
    return next(error);
  }
});

// ###login user
router.post("/login", async (req, res, next) => {
  // res.json({ message: "auth user" });
  const { username, password } = req.body;
  //   console.log("req.user: ", req.user);
  try {
    const user = await pool.query("SELECT * FROM user_db WHERE username = $1", [
      username
    ]);
    if (!user.rows[0]) {
      const error = new Error("User does not exist");
      error.status = 401;
      return next(error);
    }
    // check password if passwowrd entry is correct
    const userObj = user.rows[0]; // return object {user_id:xxx,username:"zzz"}
    // console.log(userObj);
    const match = await bcrypt.compare(password, userObj.password);
    if (!match) {
      const error = new Error("Password is incorrect");
      error.status = 401;
      return next(error);
    }
    genToken(res, username);
    res.json(user.rows);
  } catch (error) {
    return next(error);
  }
});

// ###logout user
router.post("/logout", async (req, res) => {
  //   console.log(req.user);
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: `User: logged-out` });
});

// ###get user details
router.get("/profile", protect, async (req, res, next) => {
  console.log("run next after protect");
  try {
    const user = await pool.query("SELECT * FROM user_db WHERE username=$1 ", [
      req.user.username
    ]);
    res.status(200).json(user.rows[0]);
  } catch (error) {}
});

// ###update user details
router.put("/profile", protect, async (req, res, next) => {
  // refactor - find req.user first then if unable to find 404 user not found
  const { password } = req.body;
  const { username, email } = req.user;
  try {
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        return next("Error in hashing password");
      }
      await pool.query(
        "UPDATE user_db SET password=$1,timestamp=$3 WHERE username=$2",
        [hashedPassword, username, new Date()]
      );

      res.status(201).json(req.body);
    });
  } catch (error) {
    const err = new Error("Unable to update password");
    err.status = 400;
    return next(err);
  }
});

export default router;
