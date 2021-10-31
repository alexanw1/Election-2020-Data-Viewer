import React, { Component } from 'react'
import Select from 'react-select'
import axios from 'axios'
import globalVar from './globals'
import puns from './puns'
class SelectState extends Component {
    constructor (props) {
        super(props)
        this.handler = this.handler.bind(this)
        this.state = {
            selectRef: null,
            selectOptions: [],
            selected: "",
            updated: false,
            clear: false
        }
    }
    
    async getOptions(){
        const res = await axios.get('https://election2020api.herokuapp.com/api/states/')
        const data = res.data
    
        const options = data.map(d => ({
          "value" : d.stateabrv,
          "label" : d.statename
        }))
        this.setState({selectOptions: options})
      }

    handler() {
        this.setState({updated: false})
    }


    getResults(stateabrv){
        axios.get(`https://election2020api.herokuapp.com/api/states/?stateabrv=${stateabrv}`).then(state => {
            axios.get(`https://election2020api.herokuapp.com/api/results/?statename=${state.data[0].statename}`).then(results => {
                var Resultdata = results.data[0]
                var randomNumber = Math.floor((Math.random() * 466));
                globalVar.update_stats({title: state.data[0].statename, "Democratic Votes": Resultdata.demvotes.toLocaleString(), "Republican Votes": Resultdata.repvotes.toLocaleString(), "Other Votes": Resultdata.othervotes.toLocaleString(), "Random Pun": puns.puns[randomNumber]})
            })
        })
    }

   
    handleChange (event) {
        this.getResults(event.value)
    
        axios.get(`https://election2020api.herokuapp.com/api/results/?statename=${event.label}`).then(response => {
            this.setState({selected: event.value, data: response.data, updated: true, demvotes: response.data[0].demvotes})
            globalVar.updateResults(response.data)
           // globalVar.updateResults2(response.data)
        })
        

    }

    render () {
        if (this.state.selectRef != null){
            
            if (this.state.clear){
                this.setState({value: null, clear: false})
                return null
            }
        }

        const customStyles = {
            control: (base, state) => ({
                ...base,
                background: '#fff',
                borderColor: '#9e9e9e',
                minHeight: '35px',
                height: '35px',
                boxShadow: state.isFocused ? null : null,
              }),

              option: (base) => ({
                ...base,
                color: "black",
              }),
          
              valueContainer: (base) => ({
                ...base,
                height: '38px',
                padding: '0 6px'
              }),
          
              input: (base) => ({
                ...base,
                margin: '0px',
              }),
              indicatorSeparator: base => ({
                display: 'none',
              }),
              indicatorsContainer: (base) => ({
                ...base,
                height: '38px',
              }),
        };
        return (
            <div>
                <div className="dropdown-selector">
                    <Select
                    ref={ref => {
                        this.state.selectRef = ref
                    }}  
                    styles={customStyles}
                    onChange={this.handleChange.bind(this)}
                    options={this.state.selectOptions}
                    placeholder='Select a State'
                    />
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.getOptions()

        globalVar.clear_state = () => {
            this.setState({clear: true})
        }
    }
}

export default SelectState