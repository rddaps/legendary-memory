const router = require('express').Router();
const {
  createUser,
  getSingleProperty,
  saveReview,
  deleteReview,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveReview);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleProperty);

router.route('/property/:reviewId').delete(authMiddleware, deleteReview);

module.exports = router;
