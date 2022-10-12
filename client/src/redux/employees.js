import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employee: null
    },
    reducers: {
        setEmployee: (state, action) => {
            state.employee = action.payload
        }
    }
})

export const { setEmployee } = employeeSlice.actions