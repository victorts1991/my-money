import { render } from "@testing-library/react"
import { TransactionsTable } from "."
import axios from 'axios'

beforeAll(() => {
    const mockGet = jest.spyOn(axios, 'get')
    mockGet.mockImplementation((url): any => {
        switch (url) {
          case '/transactions':
            return Promise.resolve({ data: [
                {
                  id: 1,
                  title: 'Transcation 1',
                  amount: 400,
                  type: 'deposit',
                  category: 'Food',
                  createdAt: new Date()
        
                }
              ] })
        }
      })
})

test("TransactionsTable renders correctly", async () => {
    render(<TransactionsTable />)

    
})