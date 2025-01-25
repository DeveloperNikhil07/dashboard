import axios from 'axios';

// const UserLoginUrl = process.env.UserSignUp;
const UserLoginUrl = 'http://localhost:3001/api';

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

    }
}