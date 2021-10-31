import React, { Component } from 'react'

import axios from 'axios'
import globalVar from './globals'

class ResultState extends Component {
  constructor () {
    super()
    this.state = {
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    globalVar.clear_state()
    axios.get(`https://election2020api.herokuapp.com/api/results`).then(results => {
          axios.get('https://election2020api.herokuapp.com/api/states/').then(states => {
              var country_data = []
              states.data.forEach((state) => {
                  results.data.forEach((resultData) => {
                      if (state.stateabrv === resultData.stateid){
                          country_data.push({demvotes: resultData.demvotes, repvotes: resultData.repvotes, othervotes: resultData.othervotes})
                      }
                  });
              });
              
              var demvotes = 0
              var repvotes = 0
              var othervotes = 0

              country_data.forEach((data)=> {
                  demvotes += data.demvotes
                  repvotes += data.repvotes
                  othervotes += data.othervotes
              });
              var total_data = []
              total_data.push({demvotes: demvotes, repvotes: repvotes, othervotes: othervotes})
              globalVar.update_stats({title: "U.S. Totals", "Democratic Votes": demvotes.toLocaleString(), "Republican Votes": repvotes.toLocaleString(), "Other Votes": othervotes.toLocaleString()})
              globalVar.updateResults(total_data)
              //globalVar.updateResults2(total_data)
          });
          
      });
  }

  render () {
    return (
        <button className='button' onClick={this.handleClick}>Reset Stats and Charts</button>
    )
  }
} 

export default ResultState