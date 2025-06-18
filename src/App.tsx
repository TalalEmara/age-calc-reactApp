import React, {Fragment, useState} from 'react';

import './App.css';
import './styles/global.css';

import InputForm from "./components/input-form";
import DisplayResults from "./components/display-results";

function App() {
    const [age, setAge] = useState({
        years: '--',
        months: '--',
        days: '--',
    });
    const handleBirthDate = (day: string, month: string, year: string) => {
        const d = parseInt(day, 10);
        const m = parseInt(month, 10);
        const y = parseInt(year, 10);

        const birthDate = new Date(y, m - 1, d); // month is 0-indexed
        const today = new Date();

        let years = today.getFullYear() - y;
        let months = today.getMonth() - (m - 1);
        let days = today.getDate() - d;


        if (days < 0) {
            months -= 1;
            const daysInPrevMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            days += daysInPrevMonth;
        }

        // Adjust if months are negative
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        setAge({
            years: years.toString(),
            months: months.toString(),
            days: days.toString(),
        });
    };

    return (
   <Fragment>
       <div className="wrapper">
           <div className="MainBox">
               <InputForm onSubmit={handleBirthDate}/>
               <DisplayResults {...age}/>
           </div>
       </div>
   </Fragment>
  );
}

export default App;
