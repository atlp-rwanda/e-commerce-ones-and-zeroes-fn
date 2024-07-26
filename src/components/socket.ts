import {io} from "socket.io-client";


// const url = "http://localhost:8000"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const token = localStorage.getItem('token');

const  socketIo = io(BACKEND_URL || '', {
  auth: {

    password: '123',
    token: token
  }
});

export default socketIo;