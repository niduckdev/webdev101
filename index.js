function submitData(){
    let firstnameDOM = document.querySelector('input[name=firstname]')
    let lastnameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOM = document.querySelector('input[name=gender]:checked')
    let emailDOM = document.querySelector('input[name=email]')
    let phonenumberDOM = document.querySelector('input[name=phonenumber]')
    let descriptionDOM = document.querySelector('input[name=description]')



    let userData = {
        firstname : firstnameDOM.value,
        lastname : lastnameDOM.value,
        age : ageDOM.value,
        gender: genderDOM.value,
        email : emailDOM.value,
        phonenumber : phonenumberDOM.value,
        description : descriptionDOM.value
    }

    console.log('already submit', userData)
}