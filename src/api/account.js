import axios from "axios";

export const userInfo = () => axios.get("http://localhost:3000/api/user/info", {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})

export const getFollowersCount = () => axios.get("http://localhost:3000/api/get-followers-count", {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'creatorID': localStorage.getItem('userID')
    }
})

export const updateUser = (username, fullname, description, pp_url) => axios.put('http://localhost:3000/api/user', {
    'userID': localStorage.getItem('userID'),
    'username': username,
    'fullname': fullname,
    'description': description,
    'pp_url': pp_url
})

export const changeProfile = (formData) => axios.post('http://localhost:3000/api/user/profile', formData, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": "multipart/form-data"
    }
})

export const getSource = (name) => axios.get('http://localhost:3000/api/user/profile/' + name, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    responseType: "blob"

})