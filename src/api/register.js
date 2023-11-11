import axios from 'axios';

const register = (username, fullname, email, password) => axios.post('http://localhost:3000/api/user', {
    username, fullname, email, password
})

export default register;