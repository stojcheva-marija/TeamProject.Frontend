import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myProfile: [],
  profile: [],
  myOrders:[]
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMyProfile: (state, action) => {
      return { ...state, myProfile: action.payload }; 
    },
    setProfile: (state, action) => {
      return { ...state, profile: action.payload };
    },
    setMyOrders : (state,action) => {
      return{...state, myOrders: [...action.payload]};
    },
  }
});

export const { setMyProfile, setProfile,setMyOrders} = userSlice.actions;

export default userSlice.reducer;
