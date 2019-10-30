const express = require('express');
const router = express.Router();
const Assignment = require('../../models/Assignment');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route 	POST api/assignments
// @desc	Route to create new assignments
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
        check('assignedInstructors', 'Assigned Instructors are required')
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
        const { name, detail, assignedInstructors, dueDate } = req.body;
        try {
            assignment = new Assignment({
                name,
                detail,
                assignedInstructors,
                dueDate,
            });
            await assignment.save();
            // Return jsonwebtoken
            const payload = {
                assignment: {
                    id: assignment._id
                }
            };
            res.json(payload);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }
);


// @route 	GET api/assignments
// @access 	Public
router.get('/', auth, async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ date: -1 });
        res.json(assignments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route 	GET api/assignments
// @access 	Public
router.get('/', auth, async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ date: -1 });
        res.json(assignments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route 	GET api/assignments
// @access 	Public
router.get('/:id', auth, async (req, res) => {
    const userId = req.params.id;
    try {
        let assignments = await Assignment.find({ assignedInstructors: userId }).sort({ date: -1 });
        assignments.map((assignment) => {
            const today = new Date();
            if (assignment.isSubmitted) {
                assignment.status = "submitted";
            }
            else {
                if (today >= assignment.dueDate) {
                    assignment.status = "overdue";
                }
            }
        });
        res.json(assignments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;

