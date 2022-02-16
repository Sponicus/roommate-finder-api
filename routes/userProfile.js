const express = require('express');
const router  = express.Router();

module.exports = (db) => {
    router.get("/", (req,res) => {
      const user = req.session.user_id;
      // const user = 5; // for testing purposes
      db.query(`SELECT first_name, last_name, user_name, phone_number, email, contact_info, user_image, bio, location, gender FROM users WHERE id = $1`, [user])
      .then(data => {
        const profile = data.rows;
        res.json({profile});
      })
      .catch((err) => {
        res.status(422).send("something went wrong");// we can make this look pretty
      });

    });

    router.post("/", (req,res) => {
      const user = req.session.user_id;
      // const user = 5; // for testing purposes
      const {first_name, last_name, phone_number, email, contact_info, user_image, bio, location, gender} = req.body;
      db.query(`UPDATE users 
      SET first_name = $1, last_name = $2, phone_number = $3, email = $4, contact_info = $5, user_image = $6, bio = $7, location = $8, gender = $9
      WHERE id = $10;`, [first_name, last_name, phone_number, email, contact_info, user_image, bio, location, gender, user])
      .then(profileRes => {
        res.redirect("/");
      })
      .catch((err) => {res.status(400).send("something went wrong")})//we can update the error later

    });
    
    return router
  }