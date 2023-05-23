import logoImg from '../../assets/logo.svg'


import {Container, Content} from '../Header/styles'

interface HeaderProps{
    onOPenewTransactionModal:() => void;
}


export function Header({ onOPenewTransactionModal}: HeaderProps){
    return(
        <Container>
            <Content>
            <img src={logoImg} alt="dt money" />
            <button type='button' onClick={onOPenewTransactionModal} >
                Nova Transação 
            </button>
            </Content>
        </Container>
    )
}