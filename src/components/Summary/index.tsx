import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { formatForMoney } from "../../utils/formatForMoney";
import { RootState } from "../../store"

import { Container } from "./styles"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"
import totalImg from "../../assets/total.svg"


export function Summary () {

    const transactions = useSelector((state: RootState) => state.transactions.data)

    const [totalIncome, setTotalIncome] = useState<number>(0)
    const [totalOutcome, setTotalOutcome] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)

    useEffect(() => {
        let totalIncomeAux = 0
        let totalOutcomeAux = 0
        for(let i in transactions) {
            if(transactions[parseInt(i)].type === 'deposit'){
                totalIncomeAux += transactions[parseInt(i)].value   
            }
            if(transactions[parseInt(i)].type === 'withdraw'){
                totalOutcomeAux += transactions[parseInt(i)].value   
            }
        }
        setTotalIncome(totalIncomeAux)
        setTotalOutcome(totalOutcomeAux)
        setTotal(totalIncomeAux - totalOutcomeAux)

    }, [transactions])
    
    return (
        <Container >
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={ incomeImg } alt="Entradas" />
                </header>
                <strong>{ formatForMoney(totalIncome) }</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={ outcomeImg } alt="Saídas" />
                </header>
                <strong>{ (totalOutcome > 0 ? '-' : '') + formatForMoney(totalOutcome) }</strong>
            </div>
            <div>
                <header>
                    <p>Totall</p>
                    <img src={ totalImg } alt="Total" />
                </header>
                <strong>{formatForMoney(total) }</strong>
            </div>
        </Container>
    )
}