import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { formatForMoney } from "../../utils/formatForMoney";
import { RootState } from "../../store";
import { Container } from "./styles";

export function TransactionsTable () {

    const transactions = useSelector((state: RootState) => state.transactions)

    //console.log(transactions)

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
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
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </Container>
    )
}