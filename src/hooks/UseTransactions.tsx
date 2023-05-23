import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";



interface Trasaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionProviderProps {
    children: ReactNode;
}

// interface TransactionInput{
//     title: string;
//     amount: number;
//     type: string;
//     category: string;
//     createdAt: string;
// }

type TransactionInput = Omit<Trasaction, 'id' | 'createdAt'>



interface TransactionContextData {
    transactions: Trasaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

 const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData
);

export function TrasactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, settransactions] = useState<Trasaction[]>([]);

    useEffect(() => {
        api.get('/transactions')
            .then(response => settransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });


        const { transaction } = response.data;

        settransactions([
            ...transactions,
            transaction,
        ])
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )

}

export function useTramsactions(){
    const context = useContext(TransactionsContext)

    return context;
}  
 