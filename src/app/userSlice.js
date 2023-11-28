import { createSlice, createAction } from '@reduxjs/toolkit';

export const editMyProfilePasswordError = createAction('editMyProfilePasswordError');
export const editMyProfileError = createAction('editMyProfileError');

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
    editMyProfile: (state, action) => {
      return { ...state, myProfile: { ...state.myProfile, ...action.payload } };
    }
      }
});

export const { setMyProfile, setProfile,setMyOrders,editMyProfile} = userSlice.actions;


export default userSlice.reducer;
