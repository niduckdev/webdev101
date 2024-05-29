const BASE_URL = 'http://localhost:8000'


window.onload = async () => {
    // console.log('on load')
    await loadData()
}

const loadData = async () => {
    //  Load all user form API
    const response = await axios.get(`${BASE_URL}/users`)
    console.log(response.data)

    // Get user to html
    const userDOM = document.getElementById('user')

    let htmlData = `<table>
    <thead>
        <tr>
            <th> User ID </th>
            <th> Firstname </th>
            <th> Lastname </th>
            <th></th>
            <th></th>
        </tr>
    </thead>
    <tbody>`
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i]
        htmlData += `<tr>
        <td>${user.id}</td>
        <td>${user.firstname}</td>
        <td>${user.lastname}</td>
        <td><a href='myform.html?id=${user.id}'><button>Edit</button></a></td>
        <td><button class='delete' data-id='${user.id}'>Delete</button></td>
        </tr>`
    }

    htmlData += '</tbody></table>'

    userDOM.innerHTML = htmlData
    
    const deleteDOMs = document.getElementsByClassName('delete')

    for (let i = 0 ; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/users/${id}`)
                loadData()
            } catch (error){
                console.log('error', error)
            }
        })
    }
}
