function App() {
    const [items, setItems] = React.useState([]);

    // Add the provided new items to the list of rendered items
    const addItems = (newItems) => {
        setItems(Array.of(...items, ...newItems));
    };

    // Replace the currently rendered items with a new list of items
    const replaceItems = (items) => {
        setItems(items);
    };

    // Return the list of items currently rendered
    const getItems = () => {
        return items;
    };

    return (
        <div className="task-app">
            <TitleBar />
            <NewItem addItems={addItems} />
            <TodoCardList addItems={addItems} getItems={getItems} replaceItems={replaceItems} />
        </div>
    );
}