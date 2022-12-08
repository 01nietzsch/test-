import React from 'react';


class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: -2
        };
    }

    render() {
        let number = this.state.number;
        return (
            <div>
            <h1 style={{color: Number.isInteger(number) ? this.props.colorInteger : this.props.colorElse}}>{number}</h1>
            <button onClick={() => this.setState({number: number + 1})}>Increment by 1</button>
            <button onClick={() => this.setState({number: number - 1})}>Decrement by 1</button>
            <button onClick={() => this.setState({number: number / 2})}>Divide by 2</button>
            <button onClick={() => this.setState({number: number * 2})}>Multiply by 2</button>
            </div>
        );
    }
}


export default class Page1 extends React.Component {
    render() {
        return (
            <div>
                <Counter colorInteger="green" colorElse="red" />
                <Counter colorInteger="yellow" colorElse="blue" />
            </div>
        );
    }
}

