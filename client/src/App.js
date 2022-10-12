import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Spinner from './components/Spinner'
import Login from './pages/employees/Login'
import Register from './pages/employees/Register'
import './styles/layout.css'
import './styles/theme.css'
import EmployeeHome from './pages/employees/EmployeeHome'
import ProtectedRoute from './components/ProtectedRoute'
import Students from './pages/employees/Students'
import AddStudent from './pages/employees/AddStudent'
import EditStudent from './pages/employees/EditStudent'
import PublicRoute from './components/PublicRoute'
import Results from './pages/employees/Results'
import AddResult from './pages/employees/AddResult'
import ResultInfo from './pages/employees/EditResult'
import EditResult from './pages/employees/EditResult'

function App() {

  const { loading } = useSelector(state => state.alert)


  return (
    <div className="App">
      {loading && <Spinner />}
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />

          <Route path='/employee' element={
            <ProtectedRoute>
              <EmployeeHome />
            </ProtectedRoute>} />

          <Route path='/employee/students' element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>} />

          <Route path='/employee/students/add' element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>} />

          <Route path='/employee/students/edit/:rollNo' element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>} />

          <Route path='/employee/results' element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>} />

          <Route path='/employee/results/add' element={
            <ProtectedRoute>
              <AddResult />
            </ProtectedRoute>} />

          <Route path='/employee/results/edit/:resultId' element={
            <ProtectedRoute>
              <EditResult />
            </ProtectedRoute>} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
