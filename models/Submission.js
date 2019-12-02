const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mongoose = require('mongoose');
// Create Schema
const SubmissionSchema = new Schema({
    assignmentID: {
        type: String,
        required: true
    },
    instructorName: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    files_url: {
        type: [String],
        default: []
    }
});

module.exports = Submission = mongoose.model('submission', SubmissionSchema);
