import Chart from "react-google-charts";
import React, { Component } from 'react';
import axios from 'axios'

import globalVar from './globals'
class myChart extends Component {
    constructor () {
        super()
        this.state = {}
    
        function GoogleCharts() {
            return (
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                ['Task', 'Hours per Day'],
                ['Work', 11],
                ['Eat', 2],
                ['Commute', 2],
                ['Watch TV', 2],
                ['Sleep', 7],
                ]}
                options={{
                title: 'My Daily Activities'
                }}
                rootProps={{ 'data-testid': '1' }} />
            );
        };
    }
    componentDidMount(){
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

                globalVar.update_stats({title: "U.S. 2020 Election Results", "Democratic Votes": demvotes.toLocaleString(), "Republican Votes": repvotes.toLocaleString(), "Other Votes": othervotes.toLocaleString()})

            });
        });
    }
    


    
    render() {
        return (
            <chart />
        );
    };
};


export {globalVar}
export default myChart