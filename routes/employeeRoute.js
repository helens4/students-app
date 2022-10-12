const express = require('express')
const router = express.Router()
const Employee = require('../models/employeeModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', async (req, res) => {
    try {
        const employeeExists = await Employee.findOne({ employeeId: req.body.employeeId })

        if (employeeExists) {
            return res.status(200).send({
                error: "employee already exists",
                success: false
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const newEmployee = new Employee(req.body)
        await newEmployee.save()

        res.status(200).send({
            message: "registration successfull, please wait for admin approval",
            success: true
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const employee = await Employee.findOne({
            employeeId: req.body.employeeId
        })

        if (!employee) {
            return res.status(200).send({
                message: 'employee not found',
                success: false
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, employee.password)

        if (!isMatch) {
            return res.status(200).send({
                message: 'invalid password',
                success: false
            })
        }

        if (employee.isApproved === false) {
            return res.status(200).send({
                message: 'please wait for admin approval',
                success: false
            })
        }
        //jwt action:

        const token = jwt.sign({ employeeId: employee._id }, process.env.TOKEN_SECRET, { expiresIn: '24h' })

        res.status(200).send({
            message: 'login successfull',
            success: true,
            data: token
        })

    } catch (error) {

        res.status(500).send({
            message: error.message,
            success: false
        })
    }

})

router.post('/get-employee-by-id', authMiddleware, async (req, res) => {

    try {
        const employee = await Employee.findOne({
            _id: req.body.employeeId,
        })

        if (!employee) {
            return res.status(200).send({
                message: 'employee not found',
                success: false
            })
        }

        console.log('employee')

        employee.password = undefined

        res.status(200).send({
            message: 'employee found',
            success: true,
            data: employee
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router