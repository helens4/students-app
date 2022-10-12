import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alerts'
import toast from 'react-hot-toast'

const Register = () => {

    const dispatch = useDispatch()


    const onFinish = async (values) => {

        try {
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/employee/register', values)
            dispatch(hideLoading())

            if (response.data.success) {
                toast.success(response.data.message)

            } else {
                toast.error(response.data.error)
            }

        } catch (error) {
            toast.error(error.message)
            dispatch(hideLoading())
        }


    }

    return (
        <div className='primary d-flex align-items-center justify-content-center h-screen'>
            <Form layout='vertical w-400 white p-3' onFinish={onFinish}>
                <h1 className="text-medium">Employee Registration</h1>
                <hr />

                <Form.Item name='name' label='Name'>
                    <Input />
                </Form.Item>

                <Form.Item name='employeeId' label='Employee Id'>
                    <Input />
                </Form.Item>

                <Form.Item name='password' label='Password'>
                    <Input type='password' />
                </Form.Item>

                <Form.Item name='confirmPassword' label='Confirm Password'>
                    <Input type='password' />
                </Form.Item>

                <button className='primary text-white px-5 my-2 w-100'>Register</button>
                <Link to='/login' className='text-small text-black'>Already registered? Click Here to login</Link>

            </Form>
        </div>
    )
}

export default Register