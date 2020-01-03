function NewItem() {
    const [displayNewItemPane, setDisplayNewItemPane] = React.useState(false);
    var newAction = () => {
        setDisplayNewItemPane(true);
    }

    var closeNewActionPane = () => {
        setDisplayNewItemPane(false);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
        console.log(event.target.title.name);
        console.log(event.target.title.value);
        console.log("Hi!");
        const data = {
            title: event.target.title,
            description: event.target.description,
            due: event.target.date,
            isComplete: false,
            priority: event.target.priority
        };

        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .then(() => {
                closeNewActionPane();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    if (displayNewItemPane) {
        return (
            <NewItemPane submitAction={handleFormSubmit} closeAction={closeNewActionPane} />
        );
    } else {
        return (
            <input type="button" className="btn btn-default" onClick={() => newAction()} value="Add A New To Do Item" />
        );
    }

}

function NewItemPane(props) {
    const [taskTitle, setTitle] = React.useState('');
    const [taskDescription, setDescription] = React.useState('');
    const [taskDueDate, setDueDate] = React.useState();
    const [taskPriority, setPriority] = React.useState("normal");

    return (
        <div className="new-item-pane">
            <div className="header">
                Add New To Do Item
            </div>
            <div className="form-body">
                <form id="new-item" onSubmit={props.submitAction}>
                    <input id="title" name="Title" type="text" className="new-item-control" placeholder="Title" value={taskTitle} onChange={(event) => setTitle(event.target.value)} />
                    <br />
                    <textarea name="Description" id="description" className="new-item-control" rows="4" columns="40" onChange={(event) => setDescription(event.target.value)}>{taskDescription}</textarea>
                    <br />
                    <input type="date" id="date" name="Due Date" value={taskDueDate} onChange={(event) => setDueDate(event.target.value)} />
                    <br />
                    <select name="priority" value={taskPriority} onChange={(event) => setPriority(event.target.value)}>
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                    </select>
                    <button type="submit" className="new-item-control"> Add</button>
                    <button type="button" className="new-item-control" onClick={props.closeAction}>Cancel</button>
                </form>
            </div>
        </div>
    );
}
