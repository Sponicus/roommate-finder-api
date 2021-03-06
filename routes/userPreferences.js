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

    router.post('/', (req, res) => {
        const user = req.session.user_id; 
        const {male, female, other, pet_friendly} = req.body;
        db.query(`UPDATE preferences
        SET male = $1, female = $2, other = $3, pet_friendly = $4
        WHERE user_id = $5;`, [male, female, other, pet_friendly, user])
        .then(preferencesRes => {
            res.json(preferencesRes);
        })
        .catch((err) => {res.status(400).send("something went wrong")}) //update error later/ 
    }) 
  });
  
  return router
}
