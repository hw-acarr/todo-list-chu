function BasicCard(props) {
    return (
        <React.Fragment>
            <BasicTaskDescription item={props.item} />
            <hr />
        </React.Fragment>
    );
}

function BasicTaskDescription(props) {
    /*
<task>
  <modify-button />
  <priority />
  <task-info>
    <task-description />
    <task-details />
  </task-info>
  <due-date />
  <complete-button />
</task>
    */
    return (
        <div className="task">
            <div className="task-button">
                <button name="modify" type="button">Modify</button>
            </div>
            <Priority priority={props.item.priority} />
            <TaskInfo title={props.item.title} description={props.item.description} />
            <TaskDueDate due={props.item.due} />
            <div className="task-button">
                <button name="complete" type="button">Complete</button>
            </div>
        </div>
    );
}

function TaskInfo(props) {
    return (
        <div className="task-info">
            <div className="task-title">Title: {props.title}</div>
            <div className="task-description">Description: {props.description}</div>
        </div>
    );
}

function Priority(props) {
    // TODO - what if props.property doesn't exist?
    let image = "./img/normal.png";
    switch (props.priority) {
        case "high":
            image = "./img/high.png";
            break;
        case "low":
            image = "./img/low.png";
            break;
        default:
            image = "./img/normal.png";
    }

    return (
        <img src={image} height="32" width="32" />
    );
}

function TaskDueDate(props) {
    return (
        <div className="task-duedate">Due Date: {props.due}</div>
    );
}

async function patchData(url = '', id = '') {
    var endpoint = url + id;

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

function TodoCardList(props) {
    const [hasLoaded, setLoadedStatus] = React.useState(false);

    var removeItem = (key) => {
        let filtered = props.getItems.filter(item => item.id !== key);
        props.replaceItems(filtered);
    }

    React.useEffect(() => {
        fetch('/api/todos?includecompleted=false&includeactive=true')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                props.addItems(data);
                setLoadedStatus(true);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="task-list">
            {hasLoaded && props.getItems().map((item, index) => (
                <BasicCard key={item.id} item={item} removeFunction={removeItem} />
            ))}
        </div>
    );
}