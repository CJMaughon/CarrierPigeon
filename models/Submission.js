const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId;
// Create Schema
const SubmissionSchema = new Schema({
    assignmentID: {
        type: ObjectId,
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
