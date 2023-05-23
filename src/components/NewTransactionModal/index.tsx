import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTramsactions } from "../../hooks/UseTransactions";

import closeImg from "../../assets/close.svg"
import income from '../../assets/income.svg'
import outcome from '../../assets/outcome.svg'

import { ContainerForm, TransactionTypeContainer, RadioBox } from "./styles";


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}
 
export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {

    const { createTransaction } = useTramsactions();

    const [type, setType] = useState('deposit')
    const [title, setTitle] = useState('');
    const [amount, setAmaunt] = useState(0);
    const [category, setCategory] = useState('');


    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

       await createTransaction({
            title,
            amount,
            category,
            type,

        });
        setTitle('');
        setAmaunt(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >

            <button type="button" onClick={onRequestClose} className="react-close-modal">
                <img src={closeImg} alt="Fecha modal" />
            </button>
            <ContainerForm onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>
 
                <input
                    type="text"
                    placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input 
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmaunt(Number(event.target.value))}

                />

                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit') }}
                        isactive={type === 'deposit'}
                        activecolor="gree"
                    >
                        <img src={income} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button" 
                        onClick={() => { setType('withdraw') }}
                        isactive={type === 'withdraw'}
                        activecolor="red"
                    >
                        <img src={outcome} alt="Sainda" />
                        <span>Saida</span>
                    </RadioBox>

                </TransactionTypeContainer>


                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />
                <button type="submit">
                    Cadastrar
                </button>

            </ContainerForm>


        </Modal>
    );
} 