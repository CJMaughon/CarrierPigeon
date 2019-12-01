const express = require('express');
const router = express.Router();
const Assignment = require('../../models/Assignment');
const Submission = require('../../models/Submission');
const { check, validationResult } = require('express-validator');
const appAuth = require('../../middleware/auth');
const uuid = require('uuid/v1');
var multer = require('multer');

const { google } = require('googleapis');
const scopes = [
  'https://www.googleapis.com/auth/drive'
];
// const for drive api
const credentials = require('../../credentials.json');
const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);
const drive = google.drive({ version: 'v3', auth });
// @route 	POST api/assignments
// @desc	Route to create new assignments
// @access 	Public
router.post(
    '/', appAuth,
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
        const assignmentId = uuid();
        const promises = assignedInstructors.map(async instructor => {
            assignment = new Assignment({
                name,
                detail,
                dueDate,
            });
            assignment.assignmentAdminID = assignmentId
            assignment.assignedInstructor = instructor
            await assignment.save();
        });

        try {
            await Promise.all(promises);
            res.json({ message: 'Assignment successfully created.' });
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route 	GET api/assignments
// @access 	Public
router.get('/', appAuth, async (req, res) => {
    try {
        const assignments = await Assignment.aggregate([
            {
                $project: {
                    assignmentAdminID: 1,
                    name: 1,
                    detail: 1,
                    dueDate: 1,
                    hasSubmitted: {  // Set to 1 if isSubmitted = True
                        $cond: [{ $eq: ["$isSubmitted", true] }, 1, 0]
                    },
                }
            },
            {
                $group: {
                    _id: {
                        assignmentAdminID: "$assignmentAdminID",
                        name: "$name",
                        detail: "$detail",
                        dueDate: "$dueDate",
                    },
                    total_submissions: { $sum: 1 },
                    countSubmitted: { $sum: "$hasSubmitted" },
                }
            },
            { $sort: { date: -1 } }
        ])
        res.json(assignments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route 	GET api/assignments/:id
// @access 	Public
router.get('/:id', appAuth, async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({ msg: 'Assignment not found' });
        }
        res.json(assignment);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Assignment not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route 	GET api/assignments/assigned
// @access 	Public
router.get('/assigned/:id', appAuth, async (req, res) => {
    const userId = req.params.id;
    try {
        let assignments = await Assignment.find({ assignedInstructor: userId }).sort({ dueDate: 1 });
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'downloads')
    },
    filename: function (req, file, cb) {
        cb(null, 'Test_User-Test_Date' + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage }).array('file');

router.post('/submit_assignment/:user_id/:assignment_id/:comment', appAuth, async (req, res) => {
    try {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log('get here')
                return res.status(500).json(err)
            } else if (err) {
                console.log('get here')
                return res.status(500).json(err)
            }
        });
        // user id here 
        const user_id = req.params.user_id;
        const user = await User.findById(user_id);

        findUserFolder(user.name).then((response) => {
            response.data.files.map(file => {
                console.log("Id: " + file.id + "\nName: " + file.name);
            });
        });
        // array to stored google file urls after uploaded
        const google_file_urls = [];

        // TODO: post files to google and add url to google_file_urls array

        const assignment_id = req.params.assignment_id;
        const comment = req.params.comment;
        const submission = new Submission({
            assignmentID: assignment_id,
            comment: comment,
            files_url: google_file_urls,
        });
        await submission.save();

        const assignment = await Assignment.findById(req.params.assignment_id).updateOne({}, { isSubmitted: true, status: 'submitted' });
        console.log("Files have been added to downloads folder!")
        res.json({ message: 'submitted' });
    } catch (err) {
        console.log("get here ?")
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


function findUserFolder(username) {
    const folderId = '1bq0bYcdBjNPHAuowyTd_YGDXmEtiga-9'
    return drive.files.list({
        q: "mimeType = 'application/vnd.google-apps.folder' and name = '" + username + "'",
        parents: [folderId]   
    });
}
module.exports = router;

