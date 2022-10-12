import { Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'

const EmployeeHome = () => {

    const navigate = useNavigate()

    return (

        <div className="h-100 d-flex justify-content-center align-items-center">
            <Row gutter={[20, 20]}>
                <Col span={12}>
                    <div className='p-5 secondary-border card w-300 cursor-pointer' onClick={() => navigate('/employee/students')}>
                        <h1>Students</h1>
                    </div>
                </Col>
                <Col span={12}>
                    <div className='p-5 secondary-border card w-300 cursor-pointer' onClick={() => navigate('/employee/results')}>
                        <h1>Results</h1>
                    </div>
                </Col>
            </Row>
        </div>

    )
}

export default EmployeeHome