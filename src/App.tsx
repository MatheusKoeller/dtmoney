import { GlobalStyle } from './styles/global';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import Modal from 'react-modal';
import { useState } from 'react'
import { NewTransactionModal } from './components/NewTransactionModal';
import { TrasactionsProvider} from './hooks/UseTransactions';


Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionMondaOpen, setIsNewTransactionMondaOpen] = useState(false);

  function handleOpenNewTransactionModal(){
      setIsNewTransactionMondaOpen(true)
  }
  function handleCloseNewTransactionModal(){
      setIsNewTransactionMondaOpen(false)
  }

  return (
    < TrasactionsProvider >
      <Header onOPenewTransactionModal={handleOpenNewTransactionModal}/>
      <Dashboard/>
      <NewTransactionModal
      isOpen={isNewTransactionMondaOpen} onRequestClose={handleCloseNewTransactionModal}/>
      <GlobalStyle/>
    </TrasactionsProvider > 
  );
}


