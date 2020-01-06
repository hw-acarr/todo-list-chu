function App() {
    const [items, setItems] = React.useState([]);

    const addItems = (newItems) => {
        setItems(...items, ...newItems);
    };

    const replaceItems = (items) => {
        setItems(items);
    };

    const getItems = () => {
        return items;
    };

    return (
        <div>
            <TitleBar />
            <NewItem addItems={addItems} />
            <TodoCardList addItems={addItems} getItems={getItems} replaceItems={replaceItems} />
        </div>
    );
}