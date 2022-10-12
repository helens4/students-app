import { Form, Col, Row, Input, Space } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { showLoading, hideLoading } from '../redux/alerts'

const ResultForm = () => {

    const dispatch = useDispatch()
    const { employee } = useSelector((state) => state.employee)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            values.createdBy = employee._id
            dispatch(showLoading())
            const response = await axios.post('http://localhost:5001/api/result/add-result', values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                navigate(-1)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            dispatch(hideLoading())
            toast.error(error.message)
        }
    }

    return (
        <div>
            <Form layout='vertical' onFinish={onFinish} initialValues={null}>
                <Row gutter={[10, 10]}>
                    <Col span={16}>
                        <Form.Item label='Examination' name='examination'>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col span={8} />
                    <Col span={8}>
                        <Form.Item label='Date' name='date'>
                            <Input type='date' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Class' name='class'>
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                </Row>
                <hr />
                <Form.List name="subjects">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'subjectName']}
                                    >
                                        <Input placeholder="Subject Name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'totalMarks']}
                                    >
                                        <Input placeholder="Total Marks" />
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'passMarks']}
                                    >
                                        <Input placeholder="Pass Marks" />
                                    </Form.Item>

                                    <i className='ri-delete-bin-line' onClick={() => remove(name)}></i>

                                </Space>
                            ))}
                            <Form.Item>
                                <h3 type="dashed" className="underline" onClick={() => add()}>
                                    Add Subject
                                </h3>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <div className='d-flex justify-content-end mt-2'>
                    <button className='primary text-white px-5'>Submit</button>
                </div>
            </Form>
        </div >
    )
}

export default ResultForm