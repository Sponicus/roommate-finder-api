const { response } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      cookieUser: null
    };
    res.render("register", templateVars); //placeholder
  })

  router.post("/", (req,res) => {
    const {firstName, lastName, userName, phoneNumber, email, password, contactInfo, userImage, bio, location, gender} = req.body;
    
    // remove when testing is over
    //console.log({firstName, lastName, userName, phoneNumber, email, password, contactInfo, userImage, bio, location, gender})
    ///////////////////////////////
    let userObj = {}
    db.query(`INSERT INTO users (first_name, last_name, user_name, phone_number, email, password, contact_info, user_image, bio, location, gender) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
    RETURNING *;`, [firstName, lastName, userName, phoneNumber, email, password, contactInfo, userImage, bio, location, gender])
    .then(userRes => {
      userObj = userRes.rows[0]
      console.log("USER oBJECT", userObj)
      user_id = userRes.rows[0].id;
      req.session.user_id = user_id;
      db.query(`INSERT INTO preferences (user_id) 
      VALUES ($1);`, [user_id])
      .then(response => res.json(userObj))
    })
    .catch((err) => {
      console.log(err)
      if (err.detail.includes("already exists") && err.detail.includes("email")) {
        return res.status(400).send("this email already exists")
      }
      if (err.detail.includes("already exists") && err.detail.includes("user_name")) {
        return res.status(400).send("this username already exists")
      }
      return res.status(400).send("something went wrong");// we can make this look pretty
    })
  })

  return router;
};

// INSERT INTO users (first_name, last_name, user_name, email, password) VALUES ('Andrew', 'Spon', 'Sponicus', 'sponicus@gmail.com', 'password') RETURNING id;
// INSERT INTO preferences (user_id) VALUES (13);