import React, {Fragment} from 'react';

import './App.css';
import './styles/global.css';

import InputForm from "./components/input-form";
import DisplayResults from "./components/display-results";

function App() {
  return (
   <Fragment>
       <div className="wrapper">
           <div className="MainBox">
               <InputForm/>
               <DisplayResults days="--" months="--" years="2025"/>
           </div>
       </div>
   </Fragment>
  );
}

export default App;
