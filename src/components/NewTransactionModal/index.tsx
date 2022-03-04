import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal'
import { Container, TransactionTypeContainer, RadioBox } from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { create } from '../../store/reducers/transactions'

//For accessibility
Modal.setAppElement('#root')

interface INewTransactionModal {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: INewTransactionModal){

    const dispatch = useDispatch()

    const [title, setTitle] = useState<string>('')
    const [value, setValue] = useState<number>(0)
    const [type, setType] = useState<string>('deposit')
    const [category, setCategory] = useState<string>('')

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        const data = {title, value, type, category, date: new Date().toLocaleDateString()}
        dispatch(create(data))
        onRequestClose()
    }

    return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName='react-modal-overlay'
          className='react-modal-content'
        >   
            <button 
                type="button" 
                className='react-modal-close'
                onClick={onRequestClose}
            >
                <img src={closeImg} alt="Fechar"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>  
                <input 
                    placeholder='Título'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    type='number'
                    placeholder='Valor'
                    value={value}
                    onChange={event => setValue(Number(event.target.value))}
                />
                
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={type === 'deposit'}
                        activeColor={'green'}
                        onClick={() => { setType('deposit') }}
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        isActive={type === 'withdraw'}
                        activeColor={'red'}
                        onClick={() => { setType('withdraw')}}
                    >
                        <img src={outcomeImg} alt="Saída"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder='Categoria'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type='submit'>Cadastrar</button>
            </Container>
        </Modal>
    )
}