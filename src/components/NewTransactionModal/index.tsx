import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal'

import { Container, TransactionTypeContainer, RadioBox, ErrorMessage } from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { create } from '../../store/reducers/transactions'

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

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
            ariaHideApp={false}
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
                data-testid={"react-modal-close"}
                className='react-modal-close'
                onClick={onRequestClose}
            >
                <img src={closeImg} alt="Fechar"/>
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transa????o</h2>  
                <input 
                    placeholder='T??tulo'
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
                    <ErrorMessage>Campo obrigat??rio!</ErrorMessage>
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
                    <ErrorMessage>Campo obrigat??rio!</ErrorMessage>
                }
                <TransactionTypeContainer>
                    <RadioBox
                        data-testid="deposit-button"
                        type="button"
                        isActive={type === 'deposit'}
                        activeColor={'green'}
                        onClick={() => { setType('deposit') }}
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        data-testid="withdraw-button"
                        type="button"
                        isActive={type === 'withdraw'}
                        activeColor={'red'}
                        onClick={() => { setType('withdraw')}}
                    >
                        <img src={outcomeImg} alt="Sa??da"/>
                        <span>Sa??da</span>
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
                    <ErrorMessage>Campo obrigat??rio!</ErrorMessage>
                }
                <button type='submit'>Cadastrar</button>
            </Container>
        </Modal>
    )
}