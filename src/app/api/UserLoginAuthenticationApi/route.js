import axios from 'axios';

const UserLoginUrl = 'http://localhost:3001/api';
// const UserAuthApi = process.env.LOGIN_AUTH_API+'/api'

// User New signup api 
export const UserSignUp = async (userInfo) => {
    try {
        const response = await axios.post(`${UserLoginUrl}/signup`,
            userInfo,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// User login api
export const LoginUser = async (LoginData) => {
    try {
        const response = await axios.post(`${UserLoginUrl}/login`,
            LoginData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, // Include credentials (cookies)
            }
        );
        return response.data;
    } catch (error) {
        // Keeping the catch block as is (no additional logic)
    }
};
