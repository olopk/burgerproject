import axios from 'axios';

const order = axios.create({
    baseURL: 'https://burger-app-project-ade51.firebaseio.com/'
})

export default order;