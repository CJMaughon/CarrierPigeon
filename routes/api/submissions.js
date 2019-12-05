const express = require('express');
const router = express.Router();
const Submission = require('../../models/Submission');
const appAuth = require('../../middleware/auth');

// @route 	GET api/submissions
// @access 	Public
router.get('/:assignmentId', appAuth, async (req, res) => {
    const assignment_id = req.params.assignmentId;
    console.log(assignment_id);
    try {
        let submissions = await Submission.find({ assignmentID: assignment_id }).sort({ dueDate: 1 });
        res.json(submissions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

