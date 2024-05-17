const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')

app.use(bodyParser.json())


let conn = null

const connectMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdev101'
    })
  }


//1. GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', async (req, res) => {
    try {
      let results = await conn.query('SELECT * FROM users')
      res.json(results[0])
    } catch (error) {
      console.error('Error fetching users:', error.message)
      res.status(500).json({ error: 'Error fetching users' })
    }
})

//2. POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', async (req, res) => {
    let user = req.body

    try {
        let results = await conn.query('INSERT INTO users SET ?', user)
        res.json({
            message : 'insert ok',
            data : results[0]
        })
      } catch (error) {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
      }
})

//3. GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      let [results] = await conn.query('SELECT * FROM users WHERE id = ?', [id])
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.json(results[0])
    } catch (error) {
      console.error('Error fetching user:', error.message)
      res.status(500).json({ error: 'Error fetching user' })
    }
})

//4. PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
  
    try {
      const result = await conn.query('UPDATE users SET ? WHERE id = ?', [data, id])
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.json({ message: 'User updated successfully', userId: id })
    } catch (error) {
      console.error('Error updating user:', error.message)
      res.status(500).json({ error: 'Error updating user' })
    }
  })

//5. DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const result = await conn.query('DELETE FROM users WHERE id = ?', [id])
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.json({ message: 'User deleted successfully', userId: id })
    } catch (error) {
      console.error('Error deleting user:', error.message)
      res.status(500).json({ error: 'Error deleting user' })
    }
})

app.listen(8000, async() => {
    await connectMySQL()
    console.log('Server started on port 8000')
})