import { Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { hideLoading, showLoading } from '../../redux/alerts'
import toast from 'react-hot-toast'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {

    try {
      dispatch(showLoading())
      const response = await axios.post('http://localhost:5001/api/employee/login', values)
      dispatch(hideLoading())

      if (response.data.success) {
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.data)
        navigate('/employee')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.message)
    }

  }

  return (
    <div className='primary d-flex align-items-center justify-content-center h-screen'>
      <Form layout='vertical w-400 white p-3' onFinish={onFinish}>
        <h1 className="text-medium">Employee Login</h1>
        <hr />
        <Form.Item name='employeeId' label='Employee Id'>
          <Input />
        </Form.Item>

        <Form.Item name='password' label='Password'>
          <Input type='password' />
        </Form.Item>


        <button className='primary text-white px-5 my-2 w-100'>Register</button>
        <Link to='/register' className='text-small text-black'>Not yet registered? Click Here to register</Link>

      </Form>
    </div>
  )
}

export default Login