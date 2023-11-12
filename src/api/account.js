import axios from "axios";

export const userInfo = () => axios.get("http://localhost:3000/api/user/info", {
    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')},
    params: {
        'userID': localStorage.getItem('userID')
    }
})

export const updateUser = (username, fullname, description) => axios.put('http://localhost:3000/api/user', {
    'userID': localStorage.getItem('userID'),
    'username': username,
    'fullname': fullname,
    'description': description
})