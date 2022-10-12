const express = require('express')
const app = express()
const employeeRoute = require('./routes/employeeRoute')
const studentRoute = require('./routes/studentRoute')
const resultRoute = require('./routes/resultsRoute')
const cors = require('cors')

require('dotenv').config()
require('./config/dbConfig')


app.use(cors())
app.use(express.json())


app.use('/api/employee', employeeRoute)
app.use('/api/student', studentRoute)
app.use('/api/result', resultRoute)


const port = process.env.PORT || 5001

app.get('/', (req, res) => res.send('chello wordl'))

app.listen(port, () => console.log(`example app listening on port ${port}`))