const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Mongoose = require('mongoose');
const ObjectId = Mongoose.Types.ObjectId;
// Create Schema
const AssignmentSchema = new Schema({
    assignmentAdminID: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    isSubmitted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "upcoming"
    },
    dueDate: {
        type: Date,
        required: true
    },
    assignedInstructor: {
        type: String,
        required: true
    },
});

module.exports = Assignment = mongoose.model('assignment', AssignmentSchema);
