import { configureStore } from '@reduxjs/toolkit'

import transactions from './reducers/transactions'

export const store = configureStore({
  reducer: {
    transactions
  },
})

export type RootState = ReturnType<typeof store.getState>