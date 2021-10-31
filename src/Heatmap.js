import Chart from "react-google-charts";
import React, { Component } from 'react';
import axios from 'axios'

import globalVar from './globals'
class myChart extends Component {
    constructor () {
        super()
        this.state = {}
    }
    componentDidMount(){


        globalVar.updateResults = (data) => {
            this.setState({demvotes: data[0].demvotes, repvotes: data[0].repvotes, othervotes: data[0].othervotes})
        }


        axios.get(`https://election2020api.herokuapp.com/api/results/`).then(results => {
            axios.get('https://election2020api.herokuapp.com/api/states/').then(states => {
                var output = []
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
                //this.state.push(demvotes, repvotes, othervotes)
                this.setState({demvotes: demvotes, repvotes: repvotes, othervotes: othervotes})
                globalVar.update_stats({title: "U.S. 2020 Election Results", "Democratic Votes": demvotes.toLocaleString(), "Republican Votes": repvotes.toLocaleString(), "Other Votes": othervotes.toLocaleString()})

            });
        });
    }
    
    

    //AFK


    render() {
        return (
            <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
            ['Type of Votes', 'Number of Votes'],
            ['Democrat', this.state.demvotes],
            ['Republican', this.state.repvotes],
            ['Other', this.state.othervotes]
            ]}
            options={{
            title: 'Votes in the 2020 Election'
            }}
            rootProps={{ 'data-testid': '1' }} />
        );
    };
    
};


export {globalVar}
export default myChart