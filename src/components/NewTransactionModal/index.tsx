import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal'

import { Container, TransactionTypeContainer, RadioBox, ErrorMessage } from './styles'
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
    const [errorFields, setErrorFields] = useState<string[]>([])

    function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        if(validateForm()){
            const data = {title, value, type, category, date: new Date().toLocaleDateString()}
            dispatch(create(data))
            
            clearFields()
            onRequestClose()
        }
    }

    function validateForm() {
        let errors = []
        if(title.length === 0){
            errors.push('title')
        }

        if(value === 0){
            errors.push('value')
        }
        
        if(category.length === 0){
            errors.push('category')
        }

        if(errors.length > 0){
            setErrorFields(errors)
            return false
        }

        return true
    }

    function clearFields() {
        setTitle('')
        setValue(0)
        setType('deposit')
        setCategory('')
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                clearFields()
                onRequestClose()
            }}
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
                    onChange={event => {
                        if(event.target.value.length > 0){
                            setErrorFields(errorFields.filter(value => value !== 'title'))
                        }
                        setTitle(event.target.value)
                    }}
                />
                {
                    errorFields.filter(value => value === 'title').length > 0 &&
                    <ErrorMessage>Campo obrigatório!</ErrorMessage>
                }
                <input 
                    type='number'
                    placeholder='Valor'
                    value={value}
                    onChange={event => { 
                        if(event.target.value.length > 0){
                            setErrorFields(errorFields.filter(value => value !== 'value'))
                        }
                        setValue(Number(event.target.value))
                    }}
                />
                {
                    errorFields.filter(value => value === 'value').length > 0 &&
                    <ErrorMessage>Campo obrigatório!</ErrorMessage>
                }
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
                    onChange={event => {
                        if(event.target.value.length > 0){
                            setErrorFields(errorFields.filter(value => value !== 'category'))
                        }
                        setCategory(event.target.value)
                    }}
                />
                {
                    errorFields.filter(value => value === 'category').length > 0 &&
                    <ErrorMessage>Campo obrigatório!</ErrorMessage>
                }
                <button type='submit'>Cadastrar</button>
            </Container>
        </Modal>
    )
}