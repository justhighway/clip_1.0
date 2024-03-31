// server/index.js

const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
})

connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL database: ', error)
    return
  }
  console.log('Connected to MySQL database')
})

// POST 요청을 처리하는 엔드포인트
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body

  // MySQL에 사용자 정보 삽입
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)'
  connection.query(query, [email, password], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query: ', error)
      res.status(500).json({ error: 'An error occurred while signing up' })
      return
    }
    console.log('User signed up successfully')
    res.status(200).json({ message: 'User signed up successfully' })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
