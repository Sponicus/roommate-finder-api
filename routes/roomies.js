const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

/* GET matches listing. */
module.exports = (db) => {
  router.get('/', (req, res,) => {
    // const user = req.session.user_id;
    const user = 1;
    // set a default value so it can be changed AND called at the end of the async function 
    let userGender = null;
    // Get user's preferences
    db.query(`
      SELECT user_id, users.user_name, users.gender, male, female, other, pet_friendly
      FROM preferences
      JOIN users ON users.id = user_id
      WHERE user_id = $1;`, [user])
      //get the info for potential roomies
    .then( data => {
      const {male, female, other, pet_friendly, gender} = data.rows[0];
      console.log(gender)
      //set user's gender to what they have stored in their profile.
      userGender = gender;
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
    // filter out roomies who the user isn't within their preferences
    .then( data => {
      const roomiePreferences = data.rows;
      
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
      res.status(422).send("something went wrong");// we can make this look pretty
    });
  })
  
  router.post('/', (req,res) => {
    // const user = req.session.user_id;
    const user = 1;
    // const likeeId = req.body.id //could be wrong and needs confirmation
    const likeeId = 12
    console.log(likeeId);
    
    db.query(`INSERT INTO likes (liker, likee)
    VALUES ($1, $2)` [user, likeeId])
    .catch((err) => {
      res.status(400).send("Your request cannot be completed at this time"); //
    })
  })
  
  // REMEMBER TO MAKE POST REQUEST FOR YES SWIPE
  
  return router
};

