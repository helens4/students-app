import { useNavigate } from "react-router-dom"

const PageTitle = ({ title }) => {

    const navigate = useNavigate()

    return (
        <div className='px-3 d-flex gap-4 my-2 align-items-center'>
            <i className="ri-arrow-left-line" onClick={() => navigate(-1)}></i>
            <h1 className='text-large'>{title}</h1>
            <hr />
        </div>
    )
}

export default PageTitle