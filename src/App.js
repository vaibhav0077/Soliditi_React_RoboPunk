import { useState } from 'react';
import './App.css';
import Mainmint from './Mainmint';
import Navbar from './Navbars';
import SetISPublicMintEnabled from './SetISPublicMintEnabled';

function App() {

  const [accounts, setAccounts] = useState([]);
  return (
    <div className='overlay'>
      <div className="App">
        <Navbar accounts={accounts} setAccounts={setAccounts} />
        <Mainmint accounts={accounts} setAccounts={setAccounts} />
        <SetISPublicMintEnabled />
      </div>
      <div className='moving-background'></div>
    </div>
  );
}

export default App;
