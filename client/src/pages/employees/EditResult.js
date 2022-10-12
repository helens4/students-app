import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Modal, Table } from 'antd'
import { showLoading, hideLoading } from '../../redux/alerts'
import PageTitle from '../../components/PageTitle'

const EditResult = () => {

    const [obtainedMarks, setObtainedMarks] = useState(null)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [showStudentModal, setShowStudentModal] = useState(false)
    const [result, setResult] = useState(null)
    const [students, setStudents] = useState([])
    const params = useParams()
    const dispatch = useDispatch()

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
    ]

    const getStudents = async (values) => {

        try {

            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/student/get-all-students', { class: result.class }, {
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

    const getResult = async (values) => {
        try {
            dispatch(showLoading())

            const response = await axios.post(`http://localhost:5001/api/result/get-result/${params.resultId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(hideLoading())

            if (response.data.success) {
                setResult(response.data.data)
                const tempObtainedMarks = {}
                response.data.data.subjects.forEach(subject => {
                    tempObtainedMarks[subject.subjectName] = 0
                })
                setObtainedMarks(tempObtainedMarks)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.message)
        }
    }

    const saveStudentResult = async (values) => {
        try {
            dispatch(showLoading())
            console.log('selectedStudent', selectedStudent)
            const response = await axios.post('http://localhost:5001/api/result/add-student-result',
                {
                    resultId: params.resultId,
                    studentId: selectedStudent._id,
                    examination: result.examination,
                    obtainedMarks
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

            dispatch(hideLoading())

            if (response.data.success) {
                toast.success(response.data.message)
                setSelectedStudent(null)
                setObtainedMarks(null)
            } else {
                toast.error(response.data.message)
            }


        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (!result) {
            getResult()
        }
    }, [])

    useEffect(() => {
        if (result) {
            getStudents()
        }

    }, [result])

    return (
        <div>
            <PageTitle title='Result Info' />
            {result && (
                <div>
                    <div className='mt-3'>
                        <h1 className='text-medium'>Name: {result.examination}</h1>
                        <h1 className='text-medium'>Class: {result.class}</h1>
                        <h1 className='text-medium'>Date: {result.date}</h1>
                    </div>
                    <hr />
                    {!selectedStudent ? (
                        <h1 className='underline cursor-pointer text-medium' onClick={() => {
                            setShowStudentModal(true)
                        }}>Add Student</h1>) : (
                        <div>
                            <div className='d-flex justify-content-between align-items-center p-2 card flex-row'>
                                <h1 className='text-small'>
                                    Student name: {selectedStudent.firstName} {selectedStudent.lastName}
                                </h1>
                                <i class='ri-close-line' onClick={() => {
                                    setSelectedStudent(null)
                                    const tempObtainedMarks = {}
                                    result.subjects.forEach(subject => {
                                        tempObtainedMarks[subject.name] = 0
                                    })
                                    setObtainedMarks(tempObtainedMarks)
                                }}></i>
                            </div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Total Marks</th>
                                        <th>Obtained Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.subjects.map((subject, index) => (
                                        <tr>
                                            <td>{subject.subjectName}</td>
                                            <td>{subject.totalMarks}</td>
                                            <td>
                                                <input type='text' value={obtainedMarks[subject.subjectName]} onChange={e => {
                                                    const tempObtainedMarks = { ...obtainedMarks }
                                                    tempObtainedMarks[subject.subjectName] = e.target.value
                                                    setObtainedMarks(tempObtainedMarks)
                                                }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button onClick={saveStudentResult}>Save</button>

                        </div>
                    )}
                </div>
            )}

            <Modal
                title='Select Student'
                visible={showStudentModal}
                onCancel={() => {
                    setShowStudentModal(false)
                }}>

                <Table columns={columns} dataSource={students} onRow={(record) => {
                    return {
                        onClick: () => {
                            setSelectedStudent(record)
                            const resultExists = record.results.find(result => result.resultId === params.resultId)
                            if (resultExists) {
                                setObtainedMarks(resultExists.obtainedMarks)
                            }
                            setShowStudentModal(false)
                        }
                    }
                }}
                />

            </Modal>

            {/* {student && <StudentForm student={student} type='edit' />} */}
        </div>
    )
}

export default EditResult