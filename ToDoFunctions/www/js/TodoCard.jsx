class TodoCard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="panel-container">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.title}</h3>
                </div>
                <div class="panel-body">
                    {this.props.description}
                </div>
            </div>
        )
    };
}

function TodoCardList() {
    const [items, setItems] = React.useState([]);
    const [hasLoaded, setLoadedStatus] = React.useState(false);

    React.useEffect(() => {
        async function retrieveTasks() {
            await fetch('/api/todos?includecompleted=false&includeactive=true')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setItems(data);
                    setLoadedStatus(true);
                })
                .catch(error => console.log(error));
        }
        retrieveTasks();
    }, []);

    return (
        <div>
            {hasLoaded && items.map((item, index) => (
                <TodoCard key={item.id} title={item.title} description={item.description} />
            ))}
        </div>
    );
}