import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

const DefaultLayout = (props) => {

    const { employee } = useSelector(state => state.employee)
    const navigate = useNavigate()

    return (
        <div className='layout'>
            <div className='header d-flex justify-content-between align-items-center'>
                <h1 className='text-white'>Wyniki egzaminów</h1>
                <div>
                    <h1 className='text-white text-medium'>{employee?.name}</h1>
                    <h1 className='text-white text-small cursor-pointer' onClick={() => {
                        localStorage.removeItem('token')
                        navigate('/login')
                    }}>Logout</h1>
                </div>
            </div>
            <div className='content'>
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout