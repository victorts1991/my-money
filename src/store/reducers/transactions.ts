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
  initialState: [] as IData[],
  reducers: {
    create: (state, action: PayloadAction<IData>) => {
      state.push(action.payload)
    }
  },
})

export const { create } = transactionSlice.actions

export default transactionSlice.reducer