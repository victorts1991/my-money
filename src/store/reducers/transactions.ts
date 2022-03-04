import { createSlice } from '@reduxjs/toolkit'

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    title: '',
    value: 0,
    type: 'deposit',
    category: ''
  },
  reducers: {
    create: (state) => {
      state.value += 1
    }
  },
})

export const { create } = transactionSlice.actions

export default transactionSlice.reducer