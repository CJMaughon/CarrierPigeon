const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AssignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    assignedInstructors: [{
        type: [String],
        required: true
    }],
    isSubmitted: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        required: true
    },
});

module.exports = Assignment = mongoose.model('assignments', AssignmentSchema);
