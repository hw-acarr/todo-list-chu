// Not used....
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
                <div className="panel-body">
                    <ReactMarkdown source={this.props.description} />
                </div>
            </div>
        )
    };
}

function BasicCard(props) {
    return (
        <div className="taskcard" id={props.item.id}>
            <BasicTaskDescription item={props.item} />
            <BasicTaskActions item={props.item} removeFunction={props.removeFunction} />
        </div>
    );
}

function BasicTaskDescription(props) {
    return (
        <div className="task-item">
            <div className="task-title">Title: {props.item.title}</div>
            <div className="task-description">Description: {props.item.description}</div>
            <div className="task-duedate">Due Date: {props.item.due}</div>
            <div className="task-priority">Priority: {props.item.priority}</div>
        </div>
    );
}

async function patchData(url = '', id = '') {
    var endpoint = url + id;
    console.log(endpoint);
    const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isComplete: true })
    });
    return await response.json();
}

function BasicTaskActions(props) {
    var editAction = (id) => {
        var location = "Update.html?id=" + id;
        window.location = location;
    }

    var completeAction = (id, remove) => {
        try {
            const data = patchData('/api/todos/', id);
            console.log(JSON.stringify(data));
            remove(id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="task-actions">
            <button name="modify" type="button" onClick={() => editAction(props.item.id)}  >Modify</button>
            <button name="complete" type="button" onClick={() => completeAction(props.item.id, props.removeFunction)}>Complete</button>
        </div>
    );
}

function TodoCardList() {
    const [items, setItems] = React.useState([]);
    const [hasLoaded, setLoadedStatus] = React.useState(false);

    var removeItem = (key) => {
        let filtered = items.filter(item => item.id !== key);
        console.log(filtered);
        setItems(filtered);
    }

    React.useEffect(() => {
        fetch('/api/todos?includecompleted=false&includeactive=true')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setItems(data);
                setLoadedStatus(true);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            {hasLoaded && items.map((item, index) => (
                <div>
                    <BasicCard key={item.id} item={item} removeFunction={removeItem} />
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}