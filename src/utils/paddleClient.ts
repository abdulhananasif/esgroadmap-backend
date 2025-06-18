import axios from "axios";

export const paddle = axios.create({
    baseURL: 'https://api.paddle.com',
    headers: {
        authorization: `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type' : 'application/json'
    }
})