const express = require('express');
const router = express.Router();
const Assignment = require('../../models/Assignment');
const Submission = require('../../models/Submission');
const { check, validationResult } = require('express-validator');
const appAuth = require('../../middleware/auth');
const uuid = require('uuid/v1');
var multer = require('multer');

const fs = require('fs');
const path = require('path');
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
            assignment.assignmentAdminID = assignmentId;
            assignment.assignedInstructor = instructor;
            await assignment.save();
        });

        let assignmentDueDate = JSON.stringify(dueDate);
        assignmentDueDate = assignmentDueDate.substr(1, dueDate.indexOf('T'));

        assignedInstructors.forEach(async instructor => {
            let user = await User.findById(instructor);
            findUserFolder(user.email).then(response => {

                let userFolderId = response.data.files[0].id;

                createAssignmentFolder(userFolderId, assignmentDueDate, user.email).catch(err => {
                    console.error(err);
                });
            }).catch(err => {
                console.error(err);
            });
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
        cb(null, file.originalname)
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
        const assignmentToSubmit = await Assignment.findById(req.params.assignment_id);
        let dueDate = JSON.stringify(assignmentToSubmit.dueDate);
        dueDate = dueDate.substr(1, dueDate.indexOf('T') - 1);

        // array to stored google file urls after uploaded
        const google_file_urls = [];
        console.log(req.files);
        for (let i = 0; i < req.files.length; i++) {
            console.log(req.files[i])
            google_file_urls.push(req.files[i].originalname)
        }


        findUserFolder(user.email).then((response) => {
            const userFolderId = response.data.files[0].id;

            findAssignmentFolder(userFolderId, dueDate, user.email).then(async (file) => {
                const assignmentFolderId = file.data.files[0].id;

                uploadFiles(assignmentFolderId);


                const comment = req.params.comment;
                const submission = new Submission({
                    assignmentID: assignmentToSubmit.assignmentAdminID,
                    comment: comment,
                    files_url: google_file_urls,
                    instructorName: user.name,
                });
                await submission.save();

                await Assignment.findById(req.params.assignment_id).updateOne({}, { isSubmitted: true, status: 'submitted' });
                res.json({ message: 'submitted' });
            }).catch(err => {
                console.error(err);
                res.status(500).send('Server Error');
            });
        }).catch(err => {
            console.error(err);
            res.status(500).send('Server Error');
        });
    } catch (err) {
        console.log("get here ?")
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


function findUserFolder(userEmail) {
    const folderId = '1bq0bYcdBjNPHAuowyTd_YGDXmEtiga-9'
    return drive.files.list({
        q: "mimeType = 'application/vnd.google-apps.folder' and name = '" + userEmail + "'",
        parents: [folderId]
    });
}

function findAssignmentFolder(userFolderId, assignmentDate, userEmail) {
    return drive.files.list({
        q: "mimeType = 'application/vnd.google-apps.folder' and name = '" + assignmentDate + " (" + userEmail + ")'",
        parents: [userFolderId]
    });
}

function createAssignmentFolder(userFolderId, assignmentDate, userEmail) {
    let fileMetadata = {
        'name': assignmentDate + ' (' + userEmail + ')',
        'mimeType': 'application/vnd.google-apps.folder',
        parents: [userFolderId]
    };
    return drive.files.create({
        resource: fileMetadata,
        fields: 'id'
    });
}

function uploadFiles(folderId) {
    fs.readdir(path.join(__dirname, '../../downloads'), function (err, files) {
        if (err) {
            return console.log(err);
        }

        files.forEach(currentFile => {
            const fileMetadata = {
                'name': currentFile,
                parents: [folderId]
            };

            const media = {
                body: fs.createReadStream(path.join(__dirname, '../../downloads/' + currentFile))
            };

            drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            }, function (err, file) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(file.data.id);
                    fs.unlinkSync(path.join(__dirname, '../../downloads/' + currentFile));
                }
            });
        });
    })
}
module.exports = router;