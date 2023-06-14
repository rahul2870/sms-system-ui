import { configureStore } from '@reduxjs/toolkit'
import contactSlice from './contact-slice'

export const store = configureStore({
    reducer: {
        contact: contactSlice
    },
})