import axios from 'axios';

export const getBroadcast = () => axios.get('http://localhost:3000/api/broadcast', {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})

export const addBroadcast = (broadcast) => axios.post('http://localhost:3000/api/broadcast', {
    'userID': localStorage.getItem('userID'),
    'description': broadcast
})

export const updateBroadcast = (broadcast, id) => axios.put('http://localhost:3000/api/broadcast/' + id, {
    'userID': localStorage.getItem('userID'),
    'description': broadcast,
})

export const deleteBroadcast = (id) => axios.delete('http://localhost:3000/api/broadcast/' + id)

export const deleteBroadcastComment = (id) => axios.delete('http://localhost:3000/api/broadcast/comment/' + id)

export const getLikeCount = (id) => axios.get('http://localhost:3000/api/broadcast/like/' + id, {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})

export const getComment = (id) => axios.get('http://localhost:3000/api/broadcast/comment/' + id, {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})