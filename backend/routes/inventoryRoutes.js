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
    const { category } = req.body;
    const newCategory = await pool.query(
      "INSERT INTO mycategories (category) VALUES ($1) RETURNING *",
      [category]
    );
    res.status(201).json(newCategory.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/new-item", async (req, res, next) => {
  try {
    const { itemId, itemName, itemCategory, itemQty } = req.body;

    //check if category exists
    const queryCategory = await pool.query(
      "SELECT category FROM mycategories WHERE category=$1",
      [itemCategory]
    );
    console.log(queryCategory.rows[0]);
    if (queryCategory.rows[0] !== undefined) {
      const newItem = await pool.query(
        "INSERT INTO myinventory (item_id,item_name,item_category,item_qty) VALUES ($1,$2,$3,$4) RETURNING *",
        [itemId, itemName, itemCategory, itemQty]
      );
      res.status(201).json(newItem.rows[0]);
      console.log(newItem.rows[0]);
    } else {
      const error = new Error(`Category "${itemCategory}" does not exist`);
      error.status = 400;
      return next(error);
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
