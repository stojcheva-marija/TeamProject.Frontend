import axios from 'axios';

export const GetProfile = async (dispatch, username) => {
    try {
        console.log(username)
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/User/${username}`);
        console.log(data)
        return data;
    } catch {
        console.log("Error from get profile service")
    }
}