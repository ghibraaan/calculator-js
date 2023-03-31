class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay
        this.currentOperandDisplay = currentOperandDisplay
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        $('.calc-operation').html('')
        $('.calc-typed').html('')
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // this.currentOperand = number
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            case '%':
                computation = (prev / 100) * current
                break
            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        // const floatNumber = parseFloat(number)
        // if (isNaN(floatNumber))return ''
        // return floatNumber.toLocaleString('en')
    }

    updateDisplay() {
        // this.currentOperandDisplay.innerText = this.currentOperand
        $('.calc-typed').html(this.getDisplayNumber(this.currentOperand))
        if (this.operation != null) {
            $('.calc-operation').html(this.getDisplayNumber(this.previousOperand) + this.operation)
        } else {
            $('.calc-operation').html(this.getDisplayNumber(this.previousOperand))
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelectorAll('[data-clear]');
const deleteButton = document.querySelectorAll('[data-delete]');
const manipulateButton = document.querySelectorAll('[data-manipulate]');
const equalsButton = document.querySelectorAll('[data-equals]');

const previousOperandDisplay = document.querySelectorAll('[data-previous-operand]');
const currentOperandDisplay = document.querySelectorAll('[data-current-operand]');

const calculator = new Calculator(previousOperandDisplay,currentOperandDisplay)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

manipulateButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.currentOperand *= -1
        calculator.updateDisplay()
    })
})

equalsButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.compute()
        calculator.updateDisplay()
    })
})

clearButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.clear()
    })
})

deleteButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.delete()
        calculator.updateDisplay()
    })
})