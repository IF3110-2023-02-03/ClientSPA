import axios from 'axios';

const login = (username, password) => axios.post('http://localhost:3000/api/user/token', {
    username, password
})

export default login;