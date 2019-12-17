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
            <div>
                <button name="modify" type="button">Modify</button>
            </div>
            <Priority priority={props.item.priority} />
            <div className="task-info">
                <div className="task-title">Title: {props.item.title}</div>
                <div className="task-description">Description: {props.item.description}</div>
            </div>
            <TaskDueDate due={props.item.due} />
            <div className="task-duedate">Due Date: {props.item.due}</div>
            <div>
                <button name="complete" type="button">Complete</button>
            </div>
        </div>
    );
}

function Priority(props) {
    var image = "./img/high.png";
    // At this point, do a switch statement to figure out the correct value of 'image' and {props.priority}
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
        <div className="task-list">
            {hasLoaded && items.map((item, index) => (
                <BasicCard key={item.id} item={item} removeFunction={removeItem} />
            ))}
        </div>
    );
}