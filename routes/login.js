const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = {
      cookieUser: null
    };
    res.render("login", templateVars); //placeholder
  })

  router.post("/", (req,res) => {
    const {email, password} = req.body;
    
    // remove when testing is over
    console.log({email, password})
    ///////////////////////////////
    
    db.query(`SELECT id, email, password FROM users WHERE username = $1 AND password = $2`,[email, password])
    .then(userRes => {
      if (userRes.rows[0].id) {
        req.session.user_id = userRes.rows[0].id
      }
      res.redirect("/");
    })
    .catch((err) => {
      res.status(400).send("something went wrong");// we can make this look pretty
    })
  })

  return router;
};