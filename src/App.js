import React, {Component} from "react"
import './App.css'
import moment from 'moment'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            date: moment().format("MM/DD/YYYY"),
            expenseName: "",
            expenseSum: "",
            expensesList: []
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    
    handleFormChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value,
        })  
    }
    
    handleFormSubmit(event) {
        event.preventDefault()
        const newDate = moment(this.state.date).format('MM/DD/YYYY')
        const expensesList = [
                {
                    date: newDate,
                    name: this.state.expenseName,
                    sum: this.state.expenseSum
                },
                ...this.state.expensesList
            ]
        expensesList.sort((a, b) => a.date === b.date ? 0 : ((a.date > b.date) ? -1 : 1))
        this.setState({
            expensesList: expensesList,
            date: moment().format("MM/DD/YYYY"),
            expenseName: "",
            expenseSum: "",
        })
    }
    
    render() {
        const expensesList = this.state.expensesList.map(item =>
          <div className="expenses-list-item">
            <div>{item.date}</div>
            <div>{item.name}</div>
            <div>{item.sum}</div>
          </div>)
        return (
            <div>
                <h1>My Expeneses</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="expense-inputs">
                      <button
                          type="submit"
                          className="expense-btn"
                      >+ Add expense
                      </button>
                        <input 
                            onChange={this.handleFormChange}
                            type="text"
                            name="date"
                            placeholder=""
                            className="expense-input"
                            value={this.state.date}
                        />
                        <input
                            onChange={this.handleFormChange}
                            type="text"
                            name="expenseName"
                            placeholder="Expense name"
                            className="expense-input"
                            value={this.state.expenseName}
                        />
                        <input 
                            onChange={this.handleFormChange}
                            type="text"
                            name="expenseSum"
                            placeholder="Expense sum"
                            className="expense-input"
                            value={this.state.expenseSum}
                        />
                    </div>
                </form>
                <div className="expenses-list-item">
                        <div>Date</div>
                        <div>Expense</div>
                        <div>Sum</div>
                    </div>
                <div>{expensesList}</div>
            </div>
        )
    }
}

export default App

//{JSON.stringify(this.state.expensesList)}