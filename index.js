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

        const response = await axios.post('http://localhost:8000/users', userData)
        // console.log('response', response.data)
        alert('เพิ่มข้อมูลสำเร็จ')
    } catch (error) {
        // console.log('error message', error.message)
        // alert('error because', error.errors)
        alert('เพิ่มข้อมูลไม่สำเร็จ!!')
    }

}