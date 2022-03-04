import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IData {
    title: '';
    value: 0,
    type: 'deposit',
    category: ''
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: [] as IData[],
  reducers: {
    create: (state, action: PayloadAction<IData>) => {
      state = [...state, action.payload]
    }
  },
})

export const { create } = transactionSlice.actions

export default transactionSlice.reducer