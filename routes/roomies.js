const express = require('express');
const router = express.Router();

/* GET matches listing. */
module.exports = (db) => {
  router.get('/', (req, res,) => {
    console.log("FETCH ME!!!!")
    // const user = req.session.user_id;
    const user = 1;
    db.query(`
      SELECT user_id, users.user_name, male, female, other, pet_friendly
      FROM preferences
      JOIN users ON users.id = user_id
      WHERE user_id = $1;`, [user])
    .then( data => {
      const {male, female, other, pet_friendly} = data.rows[0];
      console.log('this is the user -->', user)
      console.log('We are on the second promise');
      return db.query(`
      SELECT user_id, users.user_name, users.bio, male, female, other, pet_friendly
      FROM preferences
      JOIN users ON users.id = user_id
      WHERE pet_friendly = $5 
      AND ((users.gender = TRUE AND male = $2)
      OR (users.gender = FALSE AND female = $3)
      OR (users.gender = NULL AND other = $4))
      AND users.id != $1
      ORDER BY user_id;`, [user, male, female, other, pet_friendly]) 
    })
    .then( data => {
      const roomiePreferences = data.rows;
      console.log('We are on the Third promise');
      const userGender = false; // MUST FIND AWAY TO GET THIS DYNAMICALLY!!!!!
      
      
      // const findGender = (person) => {
      //   db.query(`
      //     SELECT gender
      //     FROM users
      //     WHERE id = $1`, [person]);
      // }    
      // console.log(findGender(2))
      
      
      const filteredPreferences = (gender) => {
        if(gender === false) {
          console.log('female')
          return roomiePreferences.filter((user) => { return user.female});
        } else if(gender === true) {
          console.log('female')
          return roomiePreferences.filter((user) => { return user.male});
        } else if(gender === null) {
          return roomiePreferences.filter((user) => { return user.other});
        }}
      
      res.json(filteredPreferences(userGender));
    })    
    .catch((err) => {
      res.send("something went wrong");// we can make this look pretty
    });
  })
  
  
  // REMEMBER TO MAKE POST REQUEST FOR YES SWIPE
  
  return router
};

