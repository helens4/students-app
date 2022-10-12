const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const Result = require('../models/resultsModel')
const Student = require('../models/studentModel')
const router = express.Router()

router.post('/add-result', authMiddleware, async (req, res) => {
    try {
        const resultExists = await Result.findOne({
            examination: req.body.examination
        })

        if (resultExists) {
            return res.status(200).send({
                message: 'result already exists',
                success: false
            })
        }

        const newResult = new Result(req.body)
        await newResult.save()

        res.status(200).send({
            message: 'result addedd successfully',
            success: true
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

router.post('/get-all-results', authMiddleware, async (req, res) => {

    try {
        const results = await Result.find()

        res.status(200).send({
            message: 'results retrieved successfully',
            success: true,
            data: results
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }

})

router.post('/get-result/:resultId', authMiddleware, async (req, res) => {

    try {
        const result = await Result.findById(req.params.resultId)

        res.status(200).send({
            message: 'result retrieved successfully',
            success: true,
            data: result
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

router.post('/add-student-result', authMiddleware, async (req, res) => {


    try {

        const student = await Student.findById(req.body.studentId)
        if (!student) {
            return res.status(200).send({
                message: 'student not found',
                success: false
            })
        }
        const existingResults = student.results
        const resultExists = existingResults.find(result => result.resultId === req.body.resultId)
        const newResults = [
            ...existingResults,
            {
                obtainedMarks: req.body.obtainedMarks,
                resultId: req.body.resultId,
                examination: req.body.examination
            }
        ]

        const updatedStudent = await Student.findByIdAndUpdate(
            req.body.studentId,
            {
                results: newResults
            },
            {
                new: true
            }
        )
        res.status(200).send({
            message: 'result added successfully',
            success: true,
            data: updatedStudent
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })

    }
})

module.exports = router