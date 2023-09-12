const ExpressError = require('./utilities/expresserr');
const { campschema, reviewschema } = require('./schema.js');
const Campground = require('./models/campground');
const Review = require('./models/review')

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;

        req.flash('error', 'You must login first');
        return res.redirect('/login');
    }
    next();
}
module.exports.validateCampground = (req, res, next) => {
    const { error } = campschema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.validatereview = (req, res, next) => {
    const { error } = reviewschema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }

}
module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const camp = await Campground.findById(id);
    if (!camp.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that');
        return res.redirect(`/campgrounds/${id}`)
    }
    next();
}