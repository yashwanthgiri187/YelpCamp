const express = require('express');
const router = express.Router()

const Campground = require('../models/campground');
const Review = require('../models/review')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const catchAsync = require('../utilities/catchAsync.js');
const campgrounds = require('../controllers/campgrounds');
const { campschema, reviewschema } = require('../schema.js');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    // .post(upload.array('image'), (req, res) => {

//     res.send('It Worked!!')
// })
router.get('/new', isLoggedIn, campgrounds.renderNewForm)
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))



router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;