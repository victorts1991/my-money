import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { App } from '../App'


describe('App Page', () => {
  
  it('the modal should be closed when the user clicks the close button inside it', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const newTransactionButton = screen.getByText('Nova transação')
    fireEvent.click(newTransactionButton)

    expect(screen.getAllByText('Cadastrar').length).toEqual(1)

    const closeButton = screen.getByTestId('react-modal-close')
    fireEvent.click(closeButton)

    expect(screen.queryByText("Cadastrar")).toBeNull()
  })

    it('should not be able to add a transaction with empty fields', () => {
        render(
            <Provider store={store}>
              <App />
            </Provider>
        )

        const newTransactionButton = screen.getByText('Nova transação')
        fireEvent.click(newTransactionButton)

        const titleInput = screen.getByPlaceholderText('Título')
        const valueInput = screen.getByPlaceholderText('Valor')
        const categoryInput = screen.getByPlaceholderText('Categoria')

        const createButton = screen.getByText('Cadastrar')
        fireEvent.click(createButton)

        expect(screen.getAllByText("Campo obrigatório!").length).toEqual(3)

        fireEvent.change(titleInput, {
            target: {
              value: 'Desenvolvimento de aplicativo'
            }
        })
        expect(screen.getAllByText("Campo obrigatório!").length).toEqual(2)

        fireEvent.change(valueInput, {
            target: {
              value: '3000'
            }
        })
        expect(screen.getAllByText("Campo obrigatório!").length).toEqual(1)
        fireEvent.change(categoryInput, {
          target: {
            value: 'trabalho'
          }
        })
        expect(screen.queryByText("Campo obrigatório!")).toBeNull()
    })

    it('should be able to add a transaction', () => {
      render(
          <Provider store={store}>
            <App />
          </Provider>
      )

      const newTransactionButton = screen.getByText('Nova transação')
      fireEvent.click(newTransactionButton)

      const titleInput = screen.getByPlaceholderText('Título')
      const valueInput = screen.getByPlaceholderText('Valor')
      const categoryInput = screen.getByPlaceholderText('Categoria')

      const createButton = screen.getByText('Cadastrar')

      fireEvent.change(titleInput, {
          target: {
            value: 'Desenvolvimento de aplicativo'
          }
      })
      fireEvent.change(valueInput, {
          target: {
            value: '3000'
          }
      })
      fireEvent.change(categoryInput, {
        target: {
          value: 'Trabalho'
        }
      })
      fireEvent.click(createButton)

      expect(screen.queryByText('submit')).toBeNull()

      const addedFirstTransactionTitle = screen.getAllByText('Desenvolvimento de aplicativo')

      //to equals 2 because the screen have one list for each screen type responsive
      expect(addedFirstTransactionTitle.length).toEqual(2)
  })

  //react-media was not used to test delete button on small screen because it causes a lot of bugs along with jest
  //It doesn't work every time: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
  
  it('should be able to remove a transaction', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    window = Object.assign(window, { innerWidth: 500 });


    const deleteButton = screen.getAllByTestId('delete-button-0')[0]
    fireEvent.click(deleteButton)

    expect(screen.queryByText("Desenvolvimento de aplicativo")).toBeNull()
  })

  it('the income card must show the right account', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const newTransactionButton = screen.getByText('Nova transação')
    fireEvent.click(newTransactionButton)

    const createButton = screen.getByText('Cadastrar')

    //As we are going to interact multiple times with the same fields, we cannot use const variables
    fireEvent.change(screen.getByPlaceholderText('Título'), {
        target: {
          value: 'Desenvolvimento de mais um aplicativo'
        }
    })
    fireEvent.change(screen.getByPlaceholderText('Valor'), {
        target: {
          value: '3001'
        }
    })
    fireEvent.click(screen.getByTestId('deposit-button'))
    fireEvent.change(screen.getByPlaceholderText('Categoria'), {
      target: {
        value: 'Trabalho'
      }
    })
    fireEvent.click(createButton)

    expect(screen.queryByText('submit')).toBeNull()
    const addedFirstTransactionTitle = screen.getAllByText('Desenvolvimento de mais um aplicativo')
    expect(addedFirstTransactionTitle.length).toEqual(2)
    
    //add other
    fireEvent.click(newTransactionButton)

    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: {
        value: 'Desenvolvimento de outro aplicativo'
      }
    })
    
    fireEvent.change(screen.getByPlaceholderText('Valor'), {
      target: {
        value: '3200'
      }
    })
    fireEvent.click(screen.getByTestId('deposit-button'))
    fireEvent.change(screen.getByPlaceholderText('Categoria'), {
      target: {
        value: 'Trabalho'
      }
    })
    fireEvent.click(screen.getByText('Cadastrar'))

    expect(screen.queryByText('submit')).toBeNull()
    const addedSecondTransactionTitle = screen.getAllByText('Desenvolvimento de outro aplicativo')
    expect(addedSecondTransactionTitle.length).toEqual(2)

    const depositTotalCard = screen.getByTestId('deposit-total-card').textContent
    expect(depositTotalCard).toEqual('R$ 6.201,00')
  })

  it('the outcome card must show the right account',  () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const newTransactionButton = screen.getByText('Nova transação')
    fireEvent.click(newTransactionButton)

    fireEvent.change(screen.getByPlaceholderText('Título'), {
        target: {
          value: 'Almoço'
        }
    })
    fireEvent.change(screen.getByPlaceholderText('Valor'), {
        target: {
          value: '30'
        }
    })
    fireEvent.click(screen.getByTestId('withdraw-button'))
    fireEvent.change(screen.getByPlaceholderText('Categoria'), {
      target: {
        value: 'Alimentação'
      }
    })
    fireEvent.click(screen.getByText('Cadastrar'))
    //add other
    
    fireEvent.click(newTransactionButton)

    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: {
        value: 'Café'
      }
    })
    fireEvent.change(screen.getByPlaceholderText('Valor'), {
        target: {
          value: '7'
        }
    })
    
    fireEvent.click(screen.getByTestId('withdraw-button'))

    fireEvent.change(screen.getByPlaceholderText('Categoria'), {
      target: {
        value: 'Alimentação'
      }
    })

    fireEvent.click(screen.getByText('Cadastrar'))

    const depositTotalCard = screen.getByTestId('withdraw-total-card').textContent
    expect(depositTotalCard).toEqual('-R$ 37,00')
  })

  it('the total card must show the right account', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    const totalCard = screen.getByTestId('total-card').textContent
    expect(totalCard).toEqual('R$ 6.164,00')
  })
})