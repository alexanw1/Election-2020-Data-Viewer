import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Chart from './Chart';
import Chart2  from './Chart2';
import ResultState from './ResultState';
import SelectState from './SelectState';
import Statistics from './Statistics';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <Chart />,
  document.getElementById('chart')
);

ReactDOM.render(
  <Chart2 />,
  document.getElementById('chart2')
);

ReactDOM.render(
  <Statistics />,
  document.getElementById('statistics')
);

ReactDOM.render(
  <ResultState />,
  document.getElementById('result-selector')
);

ReactDOM.render(
  <SelectState />,
  document.getElementById('state-dropdown')
);

reportWebVitals();
