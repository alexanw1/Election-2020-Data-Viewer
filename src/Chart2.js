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


        globalVar.updateResults2 = (data) => {
            this.setState({demvotes: data[0].demvotes, repvotes: data[0].repvotes, othervotes: data[0].othervotes})
        }


        axios.get(`https://election2020api.herokuapp.com/api/results/`).then(results => {
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
                this.setState({demvotes: demvotes, repvotes: repvotes, othervotes: othervotes})
            });
        });
    }
    


    render() {
        return (
            <>
            <Chart
            width={'100%'}
            height={'100%'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
            ['Type of Votes', 'Number of Votes'],
            ['Democrat', this.state.demvotes],
            ['Republican', this.state.repvotes],
            ['Other', this.state.othervotes]
            ]}
            options={{
                title: 'Votes in the 2020 Election Total',
                legend: 'bottom',
                backgroundColor: '#ff5f4a',
                titleTextStyle:{
                    fontSize: 25,
                    
                },
                is3D: true
            }}
            rootProps={{ 'data-testid': '1' }} />
            </>
        );
    };
    
};


export {globalVar}
export default myChart