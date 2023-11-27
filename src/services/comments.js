import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Comments`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const AddComment = async (dispatch, commentDTO, rating) => {
    try {
      // Make the API call using the Axios instance
      const response = await axiosInstance.post('/addComment', commentDTO, {
        params: { rating: rating },
      });
  
      console.log('Comment added successfully:', response.data);
      return response.data; // Return the added comment data if needed
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error; // Rethrow the error to be caught by the caller if needed
    }
  };