import { Table } from 'antd'
import PageTitle from '../../components/PageTitle'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { showLoading, hideLoading } from '../../redux/alerts'

const Results = () => {

    const [results, setResults] = useState([])

    const columns = [
        {
            title: 'Examination',
            dataIndex: 'examination',
            key: 'examination'
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class'
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date"
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div className='d-flex gap-3'>
                    <i className="ri-edit-line" onClick={() => navigate(`/employee/results/edit/${record._id}`)}></i>
                    <i className="ri-delete-bin-5-line" onClick={() => deleteStudent(record._id)}></i>
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
            getResults()
            toast.success(response.data.message)
        } else {
            toast.error(response.data.message)
        }

    }

    const getResults = async () => {

        try {

            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/result/get-all-results', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch(hideLoading())
            if (response.data.success) {
                setResults(response.data.data)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getResults()
    }, [])

    return (
        <div>
            <PageTitle title='Results' />
            <div className='d-flex justify-content-between align-items-center'>
                <input type='text' className='w-300 px-3' placeholder='search students' />
                <button className='primary text-white px-4' onClick={() => navigate('/employee/results/add')}>Add Result</button>
            </div>
            <Table columns={columns} dataSource={results} />
        </div>
    )
}

export default Results