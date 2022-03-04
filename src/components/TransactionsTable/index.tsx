import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { formatForMoney } from "../../utils/formatForMoney";
import { RootState } from "../../store";
import { Container, EmptyMessage } from "./styles";

import trashImg from "../../assets/trash.svg"

export function TransactionsTable () {

    const transactions = useSelector((state: RootState) => state.transactions)
    
    if(transactions.length === 0){
        return (<EmptyMessage>Nenhuma transação cadastrada.</EmptyMessage>)
    }

    function deleteItem(itemKey: number) {
        
    }

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
                                    <td className={value.type}>{(value.type === 'withdraw' ? '- ' : '') + formatForMoney(value.value)}</td>
                                    <td>{value.category}</td>
                                    <td>{value.date}</td>
                                    <td>
                                        <button
                                            onClick={() => deleteItem(index)}
                                        >
                                            <img src={ trashImg } alt="Entradas" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Container>
    )
}