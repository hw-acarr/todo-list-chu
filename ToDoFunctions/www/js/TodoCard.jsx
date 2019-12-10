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
                <BasicTaskDescription />
                <BasicTaskActions />
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
            <div className="taskdescription">
                <div>Title: {this.props.item.title}</div>
                <div>Description: {this.props.item.description}</div>
                <div>Due Date: {this.props.item.duedate}</div>
                <div>Priority: {this.props.item.priority}</div>
            </div>
        );
    };
}

function BasicTaskActions() {
    return (
        <div className="taskactions">
            <button name="Modify" />
            <button name="Complete" />
        </div>
    );
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
                <TodoCard key={item.id} title={item.title} description={item.description} />
                <hr></hr>
                <BasicCard key={item.id} item={item} />
                <hr></hr>
            ))}
        </div>
    );
}