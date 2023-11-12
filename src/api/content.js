import axios from 'axios';

export const getContent = (username, fullname, email, password) => axios.get('http://localhost:3000/api/user', {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        userID
    }
})

export const addContent = (username, fullname, email, password) => axios.get('http://localhost:3000/api/user', {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        userID
    }
})

export default register;