const express = require('express');
const router  = express.Router();

// module.exports = (db) => {
//   router.get("/", (req,res) => {});
  
//   return router
// }

module.exports = (db) => {
    router.get("/", (req,res) => {
      // const user = req.session.user_id;
      const user = 5; // for testing purposes
      db.query(`SELECT first_name, last_name, phone_number, email, contact_info, user_image, bio, location, gender FROM users WHERE id = $1`, [user])
      .then(data => {
        const profile = data.rows;
        res.json({profile});
      })
      .catch((err) => {res.send(err)})//we can update the error later

    });

    router.post("/", (req,res) => {
      // const user = req.session.user_id;
      const user = 5; // for testing purposes
      const {first_name, last_name, phone_number, email, contact_info, user_image, bio, location, gender} = req.body;
      db.query(`INSERT INTO users (id, first_name, last_name, phone_number, email, contact_info, user_image, bio, location, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [id, first_name, last_name, phone_number, email, contact_info, user_image, bio, location, gender])
      .then(profileRes => {
        res.redirect("/");
      })
      .catch((err) => {res.send(err)})//we can update the error later

    });
    
    return router
  }