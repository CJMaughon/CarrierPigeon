const express = require('express');
const router = express.Router();
const Assigment = require('../../models/Assigment');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

// @route 	POST api/assignments
// @desc	Route to create new assigments
// @access 	Public
router.post(
    '/', auth,
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('detail', 'Detail is required')
            .not()
            .isEmpty(),
        check('instructors', 'Assigned Instructors are required')
            .not()
            .isEmpty(),
        check('dueDate', 'Please include a valid due date')
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, detail, instructors, dueDate } = req.body;
        try {

            assignment = new Assigment({
                name,
                detail,
                instructors,
                dueDate,
            });
            await assignment.save();
            // Return jsonwebtoken
            const payload = {
                assignment: {
                    id: assignment._id
                }
            };
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }
);