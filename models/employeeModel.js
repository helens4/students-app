const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
})

const Employee = mongoose.model('employees', employeeSchema)

module.exports = Employee