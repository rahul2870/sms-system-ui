import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: [
        {
            "id": 1,
            "firstName": "John",
            "lastName": "Doe",
            "number": "+91 1234567890"
        },
        {
            "id": 2,
            "firstName": "Jane",
            "lastName": "Smith",
            "number": "+91 9876543210"
        },
        {
            "id": 3,
            "firstName": "Alice",
            "lastName": "Brown",
            "number": "+91 7890123456"
        },
        {
            "id": 4,
            "firstName": "David",
            "lastName": "Wilson",
            "number": "+91 4567890123"
        },
        {
            "id": 5,
            "firstName": "Emily",
            "lastName": "Davis",
            "number": "+91 8901234567"
        },
        {
            "id": 6,
            "firstName": "Michael",
            "lastName": "Miller",
            "number": "+91 2345678901"
        },
    ]

}

export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addList: (state, payload) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.list = payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { addList } = contactSlice.actions;

export default contactSlice.reducer

