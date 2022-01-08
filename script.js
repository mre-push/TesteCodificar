const transactions = document.querySelector('#transactions')
const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionsName = document.querySelector('#text')
const inputTransactionsAmount = document.querySelector('#amount')

/*console.log({inputTransactiosAmountName, inputTransactiosAmount})*/
/*console.log({incomeDisplay, expenseDisplay, balanceDisplay})*/

let transactions = [
    {id: 1, name: 'Pneus', amount: -20},
    {id: 2, name: 'Pagamentos', amount: 300},
    {id: 3, name: 'Alinhamento', amount: -10},
    {id: 4, name: 'Recebimentos', amount: 150}
]

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let n = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransactions = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionsIntoDOM = ({ amount, name, id}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const amountWithoutOperator = Math.abs(amount)
    const li = document.createElement(li)

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${name} 
        <span>${operator} R$ ${amountWithoutOperator} </span> 
        <button class="delete-btn" onClick = "removeTransactions(${id})" > x </button> `
    
    transactionsUl.append(li)
}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator,value) => accumulator + value, 0))
    .toFixed(2)

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator +  value, 0)
    .toFixed(2)

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((acumulator, transaction) => acumulator + transaction, 0)
    .toFixed(2)

const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(({amount}) => amount)
    const total = getTotal(transactionsAmounts)
    const income = getIncome(transactionsAmounts) 
    const expense = getExpenses(transactionsAmounts)
 
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`  
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addTotransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(),
        Name: transactionName,
        amount: Number(transactionAmount)
    })
}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubmit =  Event => {
    Event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName ===  '' || transactionAmount === ''

    if(isSomeInputEmpty) {
        alert('Este é um programa feito para processo seletivo, preencha o nome e o valor da transação para executar. ')
        return 
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)