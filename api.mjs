import mysql from "mysql2/promise";
//import fs from "fs";

const connection = mysql.createPool({
  host: "localhost",
  user: "notebook",
  password: "pwd12345",
  database: "notebook"
});

import express from "express";
let api = express.Router();

/* Your API endpoints here */
api.use(express.json());

// get all
api.get("/notebooks/", async (req, res) => {
  const q = "SELECT * FROM `notebook`";
  try{
    const [results, fields] = await connection.execute(q);
    if (results) {
      return res.status(200).json(results);
    }
  } catch(err) {
      return res.status(500).json(err.message);
  }
  //   try {
  //     const result = await db.all(q);
  //     res.json(result);
  //   } catch (err) {
  //     res.status(500).json(err.message);
  //   }
});

api.get("/notebooks/:id", async (req, res) => {
  //console.log(req.params.id);
  let id = req.params.id;
  const q = "SELECT * FROM `notebook` WHERE `title` = ? LIMIT 1"

  // return fs.readFile("./data/" + req.params.id + ".md", "utf8", (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   res.json({ title: req.params.id, contents: data });
  // });
  try {
    let [result,field] = await connection.execute(q,[id.toString()]);
    if (result) {
      let jsonResult = {
        title: result[0].title,
        contents: result[0].contents,
      };
      return res.status(200).json(jsonResult);
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});
// add item
api.post("/add", async (req, res) => {
  if (req.body.title == undefined || req.body.contents == undefined) {
    return res.sendStatus(400);
  }
  let reqFormTitle = req.body.title;
  let reqFormContents = req.body.contents;
  fs.writeFile(`./data/${reqFormTitle}.md`,reqFormContents, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  const q =
    "INSERT INTO notebook (title, contents) VALUES (?, ?);";
  try {
    return await connection.execute(q, [reqFormTitle, reqFormContents], function (err, result, fields){
      if (result) {
        return res.status(200).json({
          message: "Added",
        })
      }
    })
    
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

// update items
api.put("/update/:id", async (req, res) => {
  if (req.body.title == undefined || req.body.contents == undefined) {
    return res.sendStatus(400);
  }
  let reqFormTitle = req.body.title;
  let reqFormContents = req.body.contents;
  fs.writeFile(`./data/${reqFormTitle}.md`, reqFormContents, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });

  const q =
    "UPDATE notebook SET contents = ? WHERE title = ?";
  try{
    let [result,field] = await connection.execute(q,[reqFormContents , reqFormTitle]);
    if (result) {
      return res.status(200).json({
        message: "Success",
      })
    }
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

// delete items
api.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;

  fs.unlink(`./data/${id}.md`, (err) => {
    if (err){
      console.error(err);
      return;
    }
  });

  const q1 = "DELETE FROM notebook WHERE title = ?";
  try {
    let result = await connection.query(q1, [id]);
    if (result) return res.status(200).json({ message: "Notebook deleted" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

export default api;
