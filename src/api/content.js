import axios from 'axios';

export const getContent = () => axios.get('http://localhost:3000/api/content', {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})

export const addContent = (formData) => axios.post('http://localhost:3000/api/content', formData, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "multipart/form-data"
    }
})
