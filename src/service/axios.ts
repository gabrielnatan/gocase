import axios from "axios";

function getCookieValue(key:string) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split("=");
        if (cookieKey === key) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; 
}


const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
})

export { api, getCookieValue }