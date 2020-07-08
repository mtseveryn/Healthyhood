const express = require('express');

const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, (req, res) => {
  if (req.user) return res.status(200).json(req.user);
  return res
    .status(500)
    .json({ message: 'The server shoud have never gotten this far' });
});

module.exports = router;
