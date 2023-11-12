import axios from "axios";

const confirmFollow = (creatorID, followerID, isApproved) => {
    if (isApproved) {
        return axios.post('http://localhost:3000/api/follow/accept', { creatorID, followerID }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    } else {
        return axios.post('http://localhost:3000/api/follow/reject', { creatorID, followerID }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    }
}

const getFollowers = (creatorID) => axios.get('http://localhost:3000/api/follow', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    params: {
        creatorID
    }
})

const getPendingFollowers = (creatorID) => axios.get('http://localhost:3000/api/pending-follow', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    params: {
        creatorID
    }
})


export { confirmFollow, getFollowers, getPendingFollowers }

