class CounterPane extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    render() {
        return (
            <div>
                <Counter count={this.state.count} />
                <PlusButton count={this.state.count} increaseCount={(count) => this.setState({ count })} />
                <MinusButton count={this.state.count} decreaseCount={(count) => this.setState({ count })} />
            </div>
        );
    }
}

class MinusButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: props.count, decreaseCount: props.decreaseCount }
    }

    render() {
        return (
            <button onClick={() => this.state.decreaseCount(this.state.count - 1)}>-</button>
        );
    }
}

class PlusButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: props.count, increaseCount: props.increaseCount }
    }

    render() {
        return (
            <button onClick={() => this.state.increaseCount(this.state.count - 1)}>+</button>
        );
    }
}

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: props.count }
    }

    render() {
        return (
            <div className='counter'>Current count: {this.state.count}</div>
        );
    }
}

