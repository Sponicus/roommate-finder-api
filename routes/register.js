const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      cookieUser: null
    };
    res.render("register", templateVars);
  })

  router.post("/", (req,res) => {
    const {firstName, lastName, userName, phoneNumber, email, password, contactInfo, userImage, bio, location, gender} = req.body;
    console.log({firstName, lastName, userName, phoneNumber, email, password, contactInfo, userImage, bio, location, gender})
    db.query(`INSERT INTO users (first_name, last_name, user_name, phone_number, email, password, contact_info, user_image, bio, location, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [firstName, lastName, userName, phoneNumber, email, password, contactInfo, userImage, bio, location, gender])
    .then(userRes => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send("something went wrong");
    })
  })

  return router;
};