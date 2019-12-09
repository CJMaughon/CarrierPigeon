const express = require('express');
const router = express.Router();
const Submission = require('../../models/Submission');
const appAuth = require('../../middleware/auth');
const Assignment = require('../../models/Assignment');
const User = require('../../models/User');

// @route 	GET api/submissions
// @access 	Public
router.get('/:assignmentId', appAuth, async (req, res) => {
    const assignment_id = req.params.assignmentId;
    const assignment = await Assignment.findById(assignment_id);
    const user = await User.findById(req.user.id);

    if (!assignment) {
        res.status(404).send("Assignment not found.");
    }
    if (!user) {
        res.status(401).send("Unauthorized");
    }
    if ((assignment.assignedInstructor !== req.user.id) && user.isInstructor) {
        return res.status(401).send("Unauthorized");
    }

    try {
        let submissions = await Submission.find({ assignmentID: assignment_id }).sort({ dueDate: 1 });
        res.json(submissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

