import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        addUser(state, action) {
            state.push(action.payload);
        },
        removeUser(state, action) {
            state.splice(action.payload, 1);
        },
        clearAllUsers(state, action) {
            return []
        }
    }
})

export default userSlice.reducer
export const { addUser, removeUser, clearAllUsers } = userSlice.actions
