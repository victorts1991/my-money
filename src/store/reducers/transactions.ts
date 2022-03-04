import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IData {
    title: string;
    value: number;
    type: string;
    category: string;
    date: string;
}

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {data: [] as IData[]},
  reducers: {
    create: (state, action: PayloadAction<IData>) => {
      state.data.push(action.payload)
    },
    remove: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((value, index) => index !== action.payload)
    },
  },
})

export const { create, remove } = transactionSlice.actions

export default transactionSlice.reducer