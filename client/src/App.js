import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from "react-router-dom"
import Travel from "./Travel"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])
  
  return (
    <div className="App">
        <Router>
            <Navbar/>
            <Travel/>
        </Router>
    </div>
  );
}

export default App;
