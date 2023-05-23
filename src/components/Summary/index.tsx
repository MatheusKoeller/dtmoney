import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'
import total from '../../assets/total.svg'
import { Container } from "./style";
import {  useTramsactions } from '../../hooks/UseTransactions';

export function Summary(){
        const { transactions } = useTramsactions();
    console.log('transactions',transactions)

    // const totalDeposits = transactions.reduce((acc, transaction) => {
    //     if(transaction.type === 'deposit'){
    //         return acc + transaction.amount;
    //     }
    //     return acc;
    // }, 0)

    const summary = transactions.reduce((acc, transaction)=>{
        if(transaction.type ==='deposit'){
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else{
            acc.widthdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        widthdraws:0,
        total: 0,
    })
    return(
        <Container>
            <div>
                <header>
                    <p>Entrada</p>
                    <img src={income} alt="Entradas " />
                </header>
                <strong> 
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saida</p>
                    <img src={outcome} alt="Saidas " />
                </header>
                <strong> -
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.widthdraws)}
                </strong>
            </div>

            <div className='fundo-total'>
                <header>
                    <p>Total</p>
                    <img src={total} alt="Total " />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}