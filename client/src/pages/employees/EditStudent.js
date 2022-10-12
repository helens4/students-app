import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { showLoading, hideLoading } from '../../redux/alerts'
import PageTitle from '../../components/PageTitle'
import StudentForm from '../../components/StudentForm'

const EditStudent = () => {

    const [student, setStudent] = useState(null)
    const params = useParams()
    const dispatch = useDispatch()

    const getStudent = async (values) => {
        try {
            dispatch(showLoading())

            const response = await axios.post(`http://localhost:5001/api/student/get-student/${params.rollNo}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            console.log(response)

            dispatch(hideLoading())

            if (response.data.success) {
                setStudent(response.data.data)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getStudent()
    }, [])

    return (
        <div>
            <PageTitle title='Edit Student' />
            {student && <StudentForm student={student} type='edit' />}
        </div>
    )
}

export default EditStudent