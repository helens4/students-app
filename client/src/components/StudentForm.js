import React from 'react'
import { Form, Input, Col, Row } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alerts'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const StudentForm = ({ student, type }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {

        try {
            dispatch(showLoading())
            let response = null

            if (type === 'edit') {
                response = await axios.post(`http://localhost:5001/api/student/update-student/${student.rollNo}`, values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            } else {
                response = await axios.post('http://localhost:5001/api/student/add-student', values, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            }

            dispatch(hideLoading())

            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/employee/students')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
            dispatch(hideLoading())
        }


    }

    return (
        <div>
            <Form layout='vertical' onFinish={onFinish} initialValues={student}>
                <Row gutter={[10, 10]}>
                    <Col span={8}>
                        <Form.Item label='First Name' name='firstName'>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Last Name' name='lastName'>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Roll Number' name='rollNo'>
                            <Input type='number' disabled={type === 'edit'} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Email' name='email'>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Phone Number' name='phoneNumber'>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Class' name='class'>
                            <Input type='number' />
                        </Form.Item>
                    </Col>
                </Row>

                <div className='d-flex justify-content-end mt-2'>
                    <button className='primary text-white px-5'>Submit</button>
                </div>
            </Form>
        </div>
    )
}

export default StudentForm