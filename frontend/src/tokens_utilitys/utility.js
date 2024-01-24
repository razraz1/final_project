import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getRefreshTokens = async (refreshToken, accessToken) => {
    console.log(accessToken);
    try {
        const decoded = jwtDecode(refreshToken);
        if (new Date(decoded.exp * 1000) < Date.now()) {
            console.log(1);
            localStorage.removeItem('token');
            const newRefreshToken = await refreshTokens(accessToken);
            console.log(newRefreshToken);
            localStorage.setItem('token', newRefreshToken)
            return newRefreshToken
        }
        return refreshToken;
    } catch (error) {
        console.error('Error decoding token:', error);
    }
}


export const refreshTokens = async (accessToken) => {
    try {
        const res = await axios.post('http://localhost:3000/refresh', { accessToken });
        // console.log(res);
        const refreshToken = res.data.refresh
        localStorage.setItem('token', refreshToken)
        return refreshToken
    } catch (error) {
        console.error("login err", error)
    }
}

export function getTokensFromLocalStorage() {
    const authToken = localStorage.getItem('token')
    const accessToken = localStorage.getItem('accessToken')
    return { authToken, accessToken }
}