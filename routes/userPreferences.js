const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req,res) => {
    const user = req.session.user_id;
      // const user = 11;
      db.query(`SELECT male, female, other, pet_friendly FROM preferences WHERE user_id = $1`, [user])
      .then(data => {
          const preferences = data.rows;
          res.json({preferences});
      })
      .catch((err) => {res.send(err)})     

    router.put('/', (req, res) => {
        const user = 7; 
        const {male, female, other, pet_friendly} = req.body;
        db.query(`UPDATE preferences
        SET male = $1
        SET female = $2
        SET other = $3
        SET pet_friendly = $4
        WHERE user_id = $5;`, [male, female, other, pet_friendly, user])
        .then(preferencesRes => {
            res.redirect('/');
        })
        .catch((err) => {res.status(400).send("something went wrong")}) //update error later/ 
    }) 
  });
  
  return router
}
