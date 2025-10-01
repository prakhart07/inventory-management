
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from  "../src/Components/LoginPage"
import ExpencePage from "../src/Components/ExpensePage"
import Inventory from "../src/Components/Inventory"
import ExpenseTracker from '../src/Components/ExpenseTracker';
import Budget from "../src/Components/Budget"


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='*' element = {<LoginPage/>}/>
    <Route path='/expense' element = {<ExpencePage/>}/>
    <Route path='/inventory' element={<Inventory />} />
    <Route path='/expensetrake' element = {<ExpenseTracker/>}/>
    <Route path = '/budget' element = {<Budget/>}/>
    
    


   </Routes>
   </BrowserRouter>
  );
}

export default App;
