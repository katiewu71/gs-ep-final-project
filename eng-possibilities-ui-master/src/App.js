import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar";
import ForecasterHome from './pages/Forecaster'
import InvestmentTable from './InvestmentTable'

import "./App.css";

function App() {
  return (
    <div>
      <Container fluid className="App">
        <NavBar />
        <Container fluid>
         <ForecasterHome/>
         <InvestmentTable/>
        </Container>
        
      </Container>
      
      
    </div>

    
  );
}

export default App;
