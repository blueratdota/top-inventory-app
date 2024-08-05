import express from "express";
import pool from "../config/db.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const query = await pool.query("SELECT * FROM myinventory");
    res.status(200).json(query.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/categories", async (req, res, next) => {
  try {
    const query = await pool.query("SELECT * FROM mycategories");
    res.status(200).json(query.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/categories/:id", async (req, res, next) => {
  try {
    const id = req.params.id; // returns value of "id"
    console.log(id);
    const queryCategory = await pool.query(
      "SELECT category FROM mycategories WHERE category=$1",
      [id]
    );
    console.log(queryCategory.rows[0].category); // use this to check if the category exists

    const query = await pool.query(
      "SELECT * FROM myinventory WHERE item_category=$1",
      [queryCategory.rows[0].category]
    );
    console.log(query.rows);

    res.status(200).json(query.rows);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/new-category", async (req, res, next) => {
  try {
    const body = req.body;
    const newMessage = await pool.query(
      "INSERT INTO mssg_board (content,author,post_time) VALUES ($1,$2,$3) RETURNING *",
      [content, author, new Date()]
    );
    res.status(201).json(newMessage.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
