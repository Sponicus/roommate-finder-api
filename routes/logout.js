const express = require('express');
const router  = express.Router();


module.exports = () => {
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/")
    .catch((err) => {
      res.status(400).send("something went wrong");// we can make this look pretty
    })
  });
return router;

};