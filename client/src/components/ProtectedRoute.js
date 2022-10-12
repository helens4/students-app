import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alerts'
import axios from 'axios'
import { setEmployee } from '../redux/employees'
import DefaultLayout from './DefaultLayout'

const ProtectedRoute = ({ children }) => {

    const [ready, setReady] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getEmployeeData = async () => {

        try {

            dispatch(showLoading())
            const token = localStorage.getItem('token')

            const response = await axios.post('http://localhost:5001/api/employee/get-employee-by-id',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            dispatch(hideLoading())
            if (response.data.success) {
                dispatch(setEmployee(response.data.data))
                setReady(true)
            }

        } catch (error) {
            dispatch(hideLoading())
            navigate('/login')
        }

    }

    useEffect(() => {
        getEmployeeData()
    }, [])

    return (
        ready && <DefaultLayout>{children}</DefaultLayout>
    )
}

export default ProtectedRoute