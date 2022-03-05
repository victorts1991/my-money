import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { formatForMoney } from "../../utils/formatForMoney";
import { RootState } from "../../store";
import { Container, SmallScreen, EmptyMessage } from "./styles";

import { remove } from '../../store/reducers/transactions'

import trashImg from "../../assets/trash.svg"

export function TransactionsTable () {

    const dispatch = useDispatch()

    const transactions = useSelector((state: RootState) => state.transactions.data)
    
    function deleteItem(itemKey: number) {
        dispatch(remove(itemKey))
    }

    if(transactions.length === 0){
        return (<EmptyMessage>Nenhuma transação cadastrada.</EmptyMessage>)
    }

    console.log('transactions->', transactions)
    
    return (
        <Container>
            
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        transactions.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{value.title}</td>
                                    <td className={value.type}>{(value.type === 'withdraw' ? '-' : '') + formatForMoney(value.value)}</td>
                                    <td>{value.category}</td>
                                    <td>{value.date}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteItem(index)}
                                        >
                                            <img src={ trashImg } alt="Excluir" />
                                        </button>
                                    </td>
                                </tr>
                                
                            )
                        })
                    }
                </tbody>
            </table>

            <SmallScreen>
                {
                    transactions.map((value, index) => {
                        return (
                            <div key={index}>
                                <header>
                                    <span>{value.title}</span>
                                    <button
                                        onClick={() => deleteItem(index)}
                                    >
                                        <img src={ trashImg } alt="Excluir" />
                                    </button>
                                </header>
                                <span className={value.type}>{(value.type === 'withdraw' ? '-' : '') + formatForMoney(value.value)}</span>
                                <footer>
                                    <span>{value.category}</span>
                                    <span>{value.date}</span>
                                </footer>
                            </div>
                        )
                    })
                }
            </SmallScreen>
        </Container>
    )
}