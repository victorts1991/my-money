import { configureStore } from '@reduxjs/toolkit'

import transactions from './reducers/transactions'

export default configureStore({
  reducer: {
    transactions
  },
})