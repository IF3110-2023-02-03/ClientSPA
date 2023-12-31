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

export const getSource = (name) => axios.get('http://localhost:3000/api/content/src/' + name, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    responseType: "blob"

})

export const updateContent = (broadcast, id) => axios.put('http://localhost:3000/api/content/' + id, {
    'userID': localStorage.getItem('userID'),
    'description': broadcast
})

export const deleteContent = (id) => axios.delete('http://localhost:3000/api/content/' + id)

export const deleteSource = (path) => axios.delete('http://localhost:3000/api/content/src/' + path)

export const deleteContentComment = (id) => axios.delete('http://localhost:3000/api/content/comment/' + id)

export const getLikeCount = (id) => axios.get('http://localhost:3000/api/content/like/' + id, {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})

export const getComment = (id) => axios.get('http://localhost:3000/api/content/comment/' + id, {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})

