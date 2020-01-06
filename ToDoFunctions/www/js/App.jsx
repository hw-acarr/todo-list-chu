function App() {
    const [items, setItems] = React.useState([]);

    const addItems = (newItems) => {
        setItems(Array.of(...items, newItems));
    };

    const replaceItems = (items) => {
        setItems(items);
    };

    const getItems = () => {
        console.log("ITEMS");
        console.log(typeof items);
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