const BASE_URL = 'http://localhost:8000'

let mode = 'CREATE'
let selectedId = ''

window.onload = async () => {
    // นำ parameter ทั้งหมดมาใส่ตัวแปร urlParams
    const urlParams = new URLSearchParams(window.location.search)
    // ดึง id ออกมาจาก parameter
    const id = urlParams.get('id')
    if (id) {
        mode = 'EDIT'
        selectedId = id

        try {
            const response = await axios.get(`${BASE_URL}/users/${id}`)
            const user = response.data
            let firstnameDOM = document.querySelector('input[name=firstname]')
            let lastnameDOM = document.querySelector('input[name=lastname]')
            let ageDOM = document.querySelector('input[name=age]')
            let genderDOM = document.querySelectorAll('input[name=gender]')
            let emailDOM = document.querySelector('input[name=email]')
            let phonenumberDOM = document.querySelector('input[name=phonenumber]')
            let descriptionDOM = document.querySelector('input[name=description]')

            firstnameDOM.value = user.firstname
            lastnameDOM.value = user.lastname
            ageDOM.value = user.age
            emailDOM.value = user.email
            phonenumberDOM.value = user.phonenumber
            descriptionDOM.value = user.description

            for (let i = 0; i < genderDOM.length; i++){
                if (genderDOM[i].value == user.gender) {
                    genderDOM[i].checked = true
                }
            }

        } catch (error) {
            console.log('error', error)
        }
    }
}

const validateData = (userData) => {
    let errors = []

    //validate frontend อาจจะเพิ่มเช็คพวกจำนวนตัวอักษรและอื่นๆ 
    //หรืออาจจะใ้ช้ boostrap มาช่วย validate
    if (!userData.firstname) {
        errors.push('กรุณาใส่ชื่อจริง')
    }
    if (!userData.lastname) {
        errors.push('กรุณาใส่นามสกุล')
    }
    if (!userData.age) {
        errors.push('กรุณาใส่อายุ')
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ')
    }
    if (!userData.email) {
        errors.push('กรุณากรอก email')
    }
    if (!userData.phonenumber) {
        errors.push('กรุณากรอกเบอร์โทร')
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย')
    }
    return errors
}

const submitData = async () => {
    let firstnameDOM = document.querySelector('input[name=firstname]')
    let lastnameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOM = document.querySelector('input[name=gender]:checked') || {}
    let emailDOM = document.querySelector('input[name=email]')
    let phonenumberDOM = document.querySelector('input[name=phonenumber]')
    let descriptionDOM = document.querySelector('input[name=description]')

    try {
        let userData = {
            firstname: firstnameDOM.value,
            lastname: lastnameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            email: emailDOM.value,
            phonenumber: phonenumberDOM.value,
            description: descriptionDOM.value
        }



        // console.log('already submit', userData)

        const errors = validateData(userData)

        if (errors.length > 0) {
            alert(`กรุณากรอกข้อมูลให้ครบทุกช่อง: ${errors.join(', ')}`);
            throw {
                message: 'กรอกข้อมูลไม่ครบ',
                errors: errors
            }
        }

        if (mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/users`, userData)
            alert('เพิ่มข้อมูลสำเร็จ')
        } else {
            const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData)
            alert('อัพเดทข้อมูลสำเร็จ')
        }
        // console.log('response', response.data)
    } catch (error) {
        // console.log('error message', error.message)
        // alert('error because', error.errors)
        alert('เพิ่มข้อมูลไม่สำเร็จ!!')
    }

}