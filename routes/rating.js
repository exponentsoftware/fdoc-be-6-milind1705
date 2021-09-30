const express = require('express');
const router = express.Router();
const rating = require("../controller/ratingController");

router.post('/:todoid', rating.createRating);
module.exports = router;