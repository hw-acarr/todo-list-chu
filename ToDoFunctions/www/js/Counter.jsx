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
            </div>
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
            <button onClick={() => this.state.increaseCount(state.count - 1)}>+</button>
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

