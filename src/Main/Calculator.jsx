import React,{Component} from 'react';
import './Calculator.css';
import Btn from '../Components/Button';
import Dpl from '../Components/Display'

const initialState ={
    displayValue : '0',
    clearDisplay : false,
    operation : null,
    values : [0, 0],
    current: 0
}

export default class Calculator extends Component {
    
    state ={...initialState}

    ClearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){

        if (this.state.current === 0) {
            this.setState({operation, current: 1, clearDisplay: true})
        }else{
            const equals = operation === "="
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            console.log(this.state.values[0])
            console.log(this.state.values[1])

            /*
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            }catch(e){
                values[0] = this.state.values[0]
            }
            */

            switch (currentOperation) {
                case '-':
                    values[0] -= values[1]
                    break;
                
                case '+':
                    values[0] += values[1]
                    break;
            
                case '*':
                    values[0] *= values[1]
                    break;

                case '/':
                    values[0] /= values[1]
                    break;

                default:
                    break;
            }

            values[1] = 0

            this.setState({
                displayValue : values[0],
                values: values,
                operation : equals ? null : operation,
                current : equals ? 0 : 1,
                clearDisplay : !equals,

            })
        }
    }

    AddDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0'|| this.state.clearDisplay
        const currentvalue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentvalue + n
        this.setState({displayValue, clearDisplay: false})

        if (n !== '.') {
            const i = this.state.current
            const NewValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = NewValue
            this.setState({values})
        }
    }

    render(){

        const AddDigit = n => this.AddDigit(n)
        const setOperation = n => this.setOperation(n)

        return(
            <div className="calculator">
                    <Dpl value={this.state.displayValue}></Dpl>
                    <Btn value="AC" click={() => this.ClearMemory()} triple></Btn>
                    <Btn value="/" click={setOperation} operation></Btn>
                    <Btn value="7" click={AddDigit}></Btn>
                    <Btn value="8" click={AddDigit}></Btn>
                    <Btn value="9" click={AddDigit}></Btn>
                    <Btn value="*" click={setOperation} operation></Btn>
                    <Btn value="4" click={AddDigit}></Btn>
                    <Btn value="5" click={AddDigit}></Btn>
                    <Btn value="6" click={AddDigit}></Btn>
                    <Btn value="+" click={setOperation} operation></Btn>
                    <Btn value="1" click={AddDigit}></Btn>
                    <Btn value="2" click={AddDigit}></Btn>
                    <Btn value="3" click={AddDigit}></Btn>
                    <Btn value="-" click={setOperation} operation></Btn>
                    <Btn value="0" click={AddDigit} double></Btn>
                    <Btn value="." click={AddDigit}></Btn>
                    <Btn value="=" click={setOperation} operation></Btn>
                </div>
        )
    }
}