import type { JSX } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import CartList from './components/CartList';

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <CartList />
    </>
  )
}

export default App
