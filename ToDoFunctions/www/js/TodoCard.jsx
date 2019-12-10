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

class BasicCard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="taskcard">
                <BasicTaskDescription item={this.props.item} />
                <BasicTaskActions id={this.props.item.id} />
            </div>
        );
    }
}

class BasicTaskDescription extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="task-item">
                <div className="task-title">Title: {this.props.item.title}</div>
                <div className="task-description">Description: {this.props.item.description}</div>
                <div className="task-duedate">Due Date: {this.props.item.due}</div>
                <div className="task-priority">Priority: {this.props.item.priority}</div>
            </div>
        );
    };
}

class BasicTaskActions extends React.Component() {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div className="task-actions">
                <button name="modify" type="button" onClick={Edit(this.props.id)} >Modify</button>
                <button name="complete" type="button">Complete</button>
            </div>
        );
    }
}

function Edit(rowKey) {
    var location = "Update.html?id=" + rowKey;
    window.location = location;
}

function TodoCardList() {
    const [items, setItems] = React.useState([]);
    const [hasLoaded, setLoadedStatus] = React.useState(false);

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
                    <BasicCard key={item.id} item={item} />
                    <hr></hr>
                </div>
            ))}
        </div>
    );
}