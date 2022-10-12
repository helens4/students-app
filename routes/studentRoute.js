const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')

const Student = require('../models/studentModel')

router.post('/add-student', authMiddleware, async (req, res) => {
    try {

        const studentExists = await Student.findOne({
            rollNo: req.body.rollNo
        })

        if (studentExists) {
            return res.status(200).send({
                message: 'student already exists',
                success: false
            })
        }

        const newStudent = new Student(req.body)
        await newStudent.save()

        res.status(200).send({
            message: 'student added successfully',
            success: true
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })

    }
})

router.post('/get-all-students', authMiddleware, async (req, res) => {

    try {
        const students = await Student.find(req?.body ? req.body : {})

        res.status(200).send({
            message: 'students fetched successfully',
            success: true,
            data: students
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

router.post('/get-student/:rollNo', authMiddleware, async (req, res) => {
    try {
        const student = await Student.findOne({
            rollNo: req.params.rollNo
        })

        console.log(student)

        if (!student) {
            return res.send({
                message: 'student not found',
                success: false
            })
        }

        res.status(200).send({
            message: 'student fetched successfully',
            success: true,
            data: student
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

router.post('/update-student/:rollNo', authMiddleware, async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate({ rollNo: req.params.rollNo }, req.body, { new: true })

        if (!student) {
            return res.send({
                message: 'student not found',
                success: false
            })
        }

        res.status(200).send({
            message: 'student updated successfully',
            success: true,
            data: student
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

router.post('/delete-student/:rollNo', authMiddleware, async (req, res) => {


    try {
        const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo })

        if (!student) {
            return res.send({
                message: 'student not found',
                success: false
            })
        }

        res.status(200).send({
            message: 'student deleted successfully',
            success: true,
            data: student
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }

})

module.exports = router