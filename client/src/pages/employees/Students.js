import { Table } from 'antd'
import PageTitle from '../../components/PageTitle'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { showLoading, hideLoading } from '../../redux/alerts'

const Students = () => {

    const [students, setStudents] = useState([])

    const columns = [
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class'
        },
        {
            title: 'Roll No',
            dataIndex: 'rollNo',
            key: 'rollNo'
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div className='d-flex gap-3'>
                    <i className="ri-edit-line" onClick={() => navigate(`/employee/students/edit/${record.rollNo}`)}></i>
                    <i className="ri-delete-bin-5-line" onClick={() => deleteStudent(record.rollNo)}></i>
                </div>
            )
        }
    ]

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const deleteStudent = async (rollNo) => {

        dispatch(showLoading())
        const response = await axios.post(`http://localhost:5001/api/student/delete-student/${rollNo}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        dispatch(hideLoading())
        if (response.data.success) {
            getStudents()
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }

    }

    const getStudents = async () => {

        try {

            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/student/get-all-students', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(hideLoading())
            if (response.data.success) {
                setStudents(response.data.data)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getStudents()
    }, [])

    return (
        <div>
            <PageTitle title='Students' />
            <div className='d-flex justify-content-between align-items-center'>
                <input type='text' className='w-300 px-3' placeholder='search students' />
                <button className='primary text-white px-4' onClick={() => navigate('/employee/students/add')}>Add Student</button>
            </div>
            <Table columns={columns} dataSource={students} />
        </div>
    )
}

export default Students