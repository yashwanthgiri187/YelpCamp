const express = require('express');
const router = express.Router({ mergeParams: true })

const Campground = require('../models/campground');
const Review = require('../models/review')
const catchAsync = require('../utilities/catchAsync.js');
const ExpressError = require('../utilities/expresserr');
const reviews = require('../controllers/reviews');

const { reviewschema } = require('../schema.js');
const { validatereview, isLoggedIn } = require('../middleware');


router.post('/', isLoggedIn, validatereview, isLoggedIn, catchAsync(reviews.createReview));
router.delete('/:reviewId', isLoggedIn, catchAsync(reviews.deleteReview));
module.exports = router;