const express = require('express');
const router = express.Router();

/* GET profiles listing. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Profiles' });
  
});

module.exports = router;