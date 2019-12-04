function Counter() {
    const [count, setCount] = React.useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    React.useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>You clicked {count} times</p>
            <DecrementCount count={count} setCount={setCount} />
            <button onClick={() => setCount(count + 1)}>
                Click me
        </button>
        </div>
    );
}

function DecrementCount(props) {
    return (
        <button onClick={() => props.setCount(props.count - 1)}>-</button>
    );
}