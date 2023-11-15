import axios from 'axios';

export const getContent = () => axios.get('http://localhost:3000/api/content', {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})

export const addContent = (username, fullname, email, password) => axios.get('http://localhost:3000/api/user', {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        userID
    }
})
