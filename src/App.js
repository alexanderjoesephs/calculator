import {useState} from 'react';
import './App.css';

const NumberButton = (props) =>{
  return(
    <button className="button" onClick={()=>{props.click(props.number)}}>{props.number}</button>
  )
}

const PointButton = (props) =>{
  return(
    <button className="button" onClick={()=>{props.click()}}>.</button>
  )
}

const FunctionButton = (props) =>{
  return(
    <button className="button" onClick={()=>{props.click(props.function)}}>{props.function}</button>
  )
}

const Display = (props) => {
  return(<div className="screen">{props.screen}</div>)
}

const EqualsButton = (props) => {
  return(
    <button className="button" onClick={()=>{props.click(props.operation)}}>=</button>
  )
}

const ClearButton = (props) => {
  return(
    <button className="button-long" onClick={()=>{props.click()}}>Clear</button>
  )
}



function App() {
  const[screen, setScreen] = useState("");
  const[memory, setMemory] = useState("");
  const[operation, setOperation] = useState("");
  const[calculated, setCalculated] = useState(false);
  const[pointUsed, setPointUsed] = useState(false);
  

  const handleClick = (digit) => {
    if(!calculated){
      if(screen.length<10){
        setScreen(prevScreen => prevScreen + digit);
      }
    }
    if(calculated){
      setScreen(digit)
      setCalculated(false)
    }
  }

  const handlePoint = () => {
    if(!pointUsed){
      if(!calculated){
        setScreen(prevScreen => prevScreen + ".");
        setPointUsed(true);
      }
      if(calculated){
        setScreen(".");
        setCalculated(false);
        setPointUsed(true);
      }
    }
  }

  const handleOperationClick = (operation) => {
    if(((screen==="" || screen==="0") && operation==="-") || (calculated===true && operation==="-") ){
      setScreen("-");
      setCalculated(false);
    }
    else{ 
      setMemory(screen);
      setScreen("");
      setOperation(operation);
      setPointUsed(false);
    }

  }


  const handleClear = () => {
    setScreen("");
    setMemory("");
    setOperation("");
    setPointUsed(false);
  }
  const equals = (operation) => {
    if(memory!=="" && screen!==""){
      let num = parseFloat(memory)
      let num2 = parseFloat(screen)
      
      let result;
      if(operation==="+"){
        result = num + num2;
      }
      if(operation==="-"){
        result = num - num2;
      }
      if(operation==="/"){
        result = num / num2;
      }
      if(operation==="x"){
        result = num * num2;
      }
      
      setScreen(result.toString());
      setMemory("");
      setOperation("");
      setCalculated(true);
      setPointUsed(false);
    }
  }


  return (
    <div className='calculator-body'>
      <Display screen={screen} />
      
      <div className="grid-container">
      <NumberButton className="grid-item" click={handleClick} number="1"/>
      <NumberButton className="grid-item" click={handleClick} number="2"/>
      <NumberButton className="grid-item" click={handleClick} number="3"/>
      <FunctionButton click={handleOperationClick} function="+"/>
      <NumberButton className="grid-item" click={handleClick} number="4"/>
      <NumberButton className="grid-item" click={handleClick} number="5"/>
      <NumberButton className="grid-item" click={handleClick} number="6"/>
      <FunctionButton click={handleOperationClick} function="-"/>

      <NumberButton className="grid-item" click={handleClick} number="7"/>
      <NumberButton className="grid-item" click={handleClick} number="8"/>
      <NumberButton className="grid-item" click={handleClick} number="9"/>
      <FunctionButton click={handleOperationClick} function="/"/>

      <PointButton className="grid-item" click={handlePoint} number="."/>
      <NumberButton className="grid-item" click={handleClick} number="0"/>
      <EqualsButton className="grid-item"  click={equals} operation={operation} />
      <FunctionButton click={handleOperationClick} function="x"/>

      </div>
      <ClearButton click={handleClear} />
  
    </div>
  );
}

export default App;
