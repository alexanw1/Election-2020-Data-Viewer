import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Heatmap from './Heatmap';
import ResultState from './ResultState';
import SelectState from './SelectState';
import Statistics from './Statistics';
import Statistics2 from './Statistics2';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <Heatmap />,
  document.getElementById('heatmap')
);

ReactDOM.render(
  <Statistics />,
  document.getElementById('statistics')
);

ReactDOM.render(
  <Statistics2 />,
  document.getElementById('statistics2')
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
