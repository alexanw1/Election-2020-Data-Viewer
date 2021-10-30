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
          var output = []
          var country_data = []
          states.data.forEach((state) => {
              results.data.forEach((resultData) => {
                  if (state.stateid === resultData.stateid){
                    country_data.push({demvotes: resultData.demvotes, repvotes: resultData.repvotes, othervotes: resultData.othervotes})
                  }
              })
          })
          
          globalVar.update_stats({})
          var demvotes = 0
          var repvotes = 0
          var othervotes = 0

          country_data.forEach((data)=> {
            demvotes += data.demvotes
            repvotes += data.repvotes
            othervotes += data.othervotes
          })

          globalVar.update_stats({title: "U.S 2020 Election Results", "Democratic Votes": demvotes.toLocaleString(), "Republican Votes": repvotes.toLocaleString(), "Other Votes": othervotes.toLocaleString()})

      })
      
    })
  }

  render () {
    return (
        <button className='button' onClick={this.handleClick}>Results</button>
    )
  }
} 

export default ResultState