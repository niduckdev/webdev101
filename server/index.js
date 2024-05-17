const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// ใช้ users array เป็นตัวหลักในการเก็บข้อมูล
let users = []
let counter = 1

//1. GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', (req, res) => {
    res.json(users)
})

//2. POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/users', (req, res) => {
    let data = req.body

    const newUser = {
        id: counter,
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age
    }

    counter += 1

    users.push(newUser)

    res.status(201).json({ message: 'User created successfully', user: newUser })
})

//3. GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', (req, res) => {
    const id = req.params.id

    //user.id === id จะไม่ได้ (user.id เป็น number) (req.params.id เป็น string)

    const user = users.find((user) => user.id == id)

    // console.log(`typeof req.params.id: ${typeof id}`);
    // console.log(`typeof user.id: ${typeof users[0].id}`);

    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ error: 'User not found' })
    }

})

//4. PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id', (req, res) => {

    const id = req.params.id
    const user = users.find((user) => user.id == id)
    let data = req.body

    console.log(user)

    if (user) {
        user.firstname = data.firstname || user.firstname
        user.lastname = data.lastname || user.lastname
        user.age = data.age || user.age

        res.json({ message: 'User updated successfully', user: user })
    } else {
        res.status(404).json({ error: 'User not found' })
    }

})

//5. DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id', (req, res) => {
    const id = req.params.id // แปลง id เป็น number
    const userIndex = users.findIndex((user) => user.id == id);

    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1); // splice คืนค่าเป็น array ของ element ที่ถูกลบ
        res.json({
            message: 'delete done',
            user_id: deletedUser[0].id
        }); 
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


app.listen(8000, () => {
    console.log('Server started on port 8000')
})