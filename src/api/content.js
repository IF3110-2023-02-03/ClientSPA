import axios from 'axios';

const register = (username, fullname, email, password) => axios.get('http://localhost:3000/api/user', {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        userID
    }
})

export default register;