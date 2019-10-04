import React, {Component} from "react"
import './App.css'
import moment from 'moment'

class App extends Component {
    constructor() {
        super()
        this.state = {
            date: moment().format("MM/DD/YYYY"),
            expenseName: "",
            expenseSum: "",
            expensesList: [],
            sortBy: ""
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
                sum: Number(this.state.expenseSum)
            },
            ...this.state.expensesList
        ]
        this.setState({
            expensesList: expensesList,
            date: moment().format("MM/DD/YYYY"),
            expenseName: "",
            expenseSum: "",
        }, () => {
            // this.sortExpensesBy("date")()
            //or:
            const sortByDate = this.sortExpensesBy(this.state.sortBy)
            sortByDate()
        })
    }
    
    sortExpensesBy = (columnName) => () => {
        let expensesList
        if (columnName === "expense") {
            expensesList = this.state.expensesList.sort((a, b) => a.name.toUpperCase() === b.name.toUpperCase() ? 0 : ((a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1))
        } else if (columnName === "sum") {
            expensesList = this.state.expensesList.sort((a, b) => a.sum === b.sum ? 0 : ((a.sum > b.sum) ? -1 : 1))
        } else {
            expensesList = this.state.expensesList.sort((a, b) => a.date === b.date ? 0 : ((a.date > b.date) ? -1 : 1))
        }
        this.setState({
            expensesList: expensesList,
            sortBy: columnName
        })
    }
    
    
    render() {
        const expensesList = this.state.expensesList.map(item =>
          <div key={item.date+item.name+item.sum} className="expenses-list-item">
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
                        <div
                            onClick={this.sortExpensesBy("date")}
                        >
                            Date
                        </div>
                        <div
                            onClick={this.sortExpensesBy("expense")}
                        >
                            Expense
                        </div>
                        <div
                            onClick={this.sortExpensesBy("sum")}
                        >
                            Sum
                        </div>
                    </div>
                <div>{expensesList}</div>
            </div>
        )
    }
}

export default App

//{JSON.stringify(this.state.expensesList)}