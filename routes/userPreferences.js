const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req,res) => {
    // const user = req.session.user_id;
      const user = 7;
      db.query(`SELECT male, female, other, pet_friendly FROM preferences WHERE user_id = $1`, [])
      .then(data => {
          const preferences = data.rows;
          res.json({preferences});
      })
      .catch((err) => {res.send(err)})     

    router.post('/', (req, res) => {
        const user = 7; 
        const {male, female, other, pet_friendly} = req.body;
        db.query(`INSERT INTO users (male, female, other, pet_friendly) VALUES ($1, $2, $3, $4)`, [male, female, other, pet_friendly])
        .then(preferencesRes => {
            res.redirect('/');
        })
        .catch((err) => {res.send(err)}) //update error later/ 
    }) 
  });
  
  return router
}