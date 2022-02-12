const express = require('express');
const router = express.Router();

/* GET matches listing. */
router.get('/', function(req, res, next) {
  res.render('match', { title: 'Matches' });
});

module.exports = router;
