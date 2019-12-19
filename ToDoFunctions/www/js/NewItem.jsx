function NewItem() {
    const [displayNewItemPane, setDisplayNewItemPane] = React.useState(false);
    var newAction = () => {
        setDisplayNewItemPane(true);
    }

    if (displayNewItemPane) {
        return (
            <NewItemPane />
        );
    } else {
        return (
            <input type="button" className="btn btn-default" onClick={() => newAction()} value="Add A New To Do Item" />
        );
    }

}

async function createAction(taskTitle = '', taskDescription = '', taskDueDate = '', url = '', id = '', priority = '') {
    var form = {
        title: taskTitle,
        description: taskDescription,
        due: taskDueDate,
        isComplete: false,
        priority: priority
    };

    // TodoClient.prototype.create = function (todo, callback) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('POST', this.baseUrl + '/api/todos');
    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.onload = function () {
    //         if (xhr.status === 200 || xhr.status === 201) {
    //             callback(null, safeJsonParse(xhr.responseText));
    //         }
    //         else {
    //             callback(xhr.responseText);
    //         }
    //     };
    //     xhr.send(JSON.stringify(todo));


    //     var endpoint = url + id;
    //     console.log(endpoint);
    //     const response = await fetch(endpoint, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ isComplete: true })
    //     });
    //     return await response.json();
    // }
}

function NewItemPane(props) {
    const [title, setTitle] = React.useState();
    const [description, setDescription] = React.useState();
    const [dueDate, setDueDate] = React.useState();
    const [priority, setPriority] = React.useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        props.onSubmit({
            title,
            description,
            dueDate,
            priority
        });
    }

    return (
        <div className="new-item-pane">
            <div className="header">
                Add New To Do Item
            </div>
            <div className="form-body">
                <form id="new-item" onSubmit={handleFormSubmit}>
                    <input id="title" name="Title" type="text" className="new-item-control" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
                    <br />
                    <textarea name="Description" id="description" className="new-item-control" rows="4" columns="40" onChange={(event) => setDescription(event.target.value)}>{description}</textarea>
                    <br />
                    <input type="date" id="date" name="Due Date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
                    <br />
                    <select name="priority" value={priority} onChange={(event) => setPriority(event.target.value)}>
                        <option value="high">High</option>
                        <option value="normal" selected>Normal</option>
                        <option value="low">Low</option>
                    </select>
                    <button type="submit" className="new-item-control" onClick={() => createAction()} > Add</button>
                </form>
            </div>
        </div>
    );
}
