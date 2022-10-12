import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../redux/alerts'
import axios from 'axios'
import { setEmployee } from '../redux/employees'
import DefaultLayout from './DefaultLayout'

const PublicRoute = ({ children }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/employee')
        }
    }, [])

    return (
        <div>{children}</div>
    )
}

export default PublicRoute