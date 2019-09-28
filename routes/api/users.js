const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
// @route 	POST api/users
// @desc	Route to create new users
// @access 	Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('mobile', 'Mobile Number is required')
      .not()
      .isEmpty(),
    check('location', 'Location is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, mobile, location } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      const isInstructor = true;
      const isUserApproved = true;
      user = new User({
        name,
        email,
        password,
        mobile,
        location,
        isInstructor,
        isUserApproved

      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      // Return jsonwebtoken
      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route 	GET api/users/approved
// @desc	Test route
// @access 	Public
router.get('/approved', auth, async (req, res) => {
  try {
    const users = await User.find({ isInstructor: { $eq: true }, isUserApproved: { $eq: true } }).sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route 	GET api/users/unapproved
// @desc	Test route
// @access 	Public
router.get('/unapproved', auth, async (req, res) => {
  try {
    const users = await User.find({ isInstructor: { $eq: true }, isUserApproved: { $eq: false } }).sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route 	POST api/users/approve_user
// @desc	Test route
// @access 	Public
router.post('/approve_user', auth, async (req, res) => {
  try {

    const users = await User.updateMany({ _id: { $in: req.body.selectedUsers } }, { $set: { isUserApproved: true } });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
