import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <div className="selector" id="result-selector"></div>
          <div id="state-dropdown"></div>
        </div>
        <div className="row">
          <div className="column-heatmap" style={{backgroundColor: "#aaa"}}>
            <div id="chart"></div>
          </div>
          <div className="column-statistics" style={{backgroundColor: "black"}}>
            <div id="statistics"></div>
          </div>
          <div className="column-heatmap" style={{backgroundColor: "#aaa"}}>
            <div id="chart2"></div>
          </div>

        </div>
      </header>
    </div>
  );
}

export default App;
