const express = require('express');
const router = express.Router();

/* GET matches listing. */
module.exports = (db) => {
  router.get('/', (req, res,) => {
    const user = req.session.user_id;
    // const user = 1;
    db.query(
      `SELECT users.id, users.first_name, users.last_name, users.phone_number, users.email, users.contact_info, users.user_image, users.bio, users.location, users.gender
      FROM likes l1
      JOIN likes l2 ON l1.liker = l2.likee
      JOIN users on users.id = l1.likee
      WHERE l1.liker = l2.likee
      AND l2.liker = l1.likee
      AND l1.liker = $1;`, [user])
      .then(data => {
        const profile = data.rows;
        res.json({profile});
      })
    .catch((err) => {
      res.status(422).send("something went wrong");// we can make this look pretty
    });
  })
  
  return router
};
