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

// async function createAction(taskTitle = '', taskDescription = '', taskDueDate = '', url = '', id = '', priority = '') {
//     const data = {
//         title: taskTitle,
//         description: taskDescription,
//         due: taskDueDate,
//         isComplete: false,
//         priority: priority
//     };

//     fetch('/api/todos', {
//         method: 'POST', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });

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
//}

function NewItemPane(props) {
    const [taskTitle, setTitle] = React.useState();
    const [taskDescription, setDescription] = React.useState();
    const [taskDueDate, setDueDate] = React.useState();
    const [taskPriority, setPriority] = React.useState("normal");

    const handleFormSubmit = (event) => {
        event.preventDefault();

        console.log(event.target);

        const data = {
            title: taskTitle,
            description: taskDescription,
            due: taskDueDate,
            isComplete: false,
            priority: taskPriority
        };

        fetch('/api/todos', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div className="new-item-pane">
            <div className="header">
                Add New To Do Item
            </div>
            <div className="form-body">
                <form id="new-item" onSubmit={handleFormSubmit}>
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
                </form>
            </div>
        </div>
    );
}
