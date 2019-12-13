function NewItem() {
    const [displayNewItemPane, setDisplayNewItemPane] = React.useState(false);
    var newAction = () => {
        setDisplayNewItemPane(true);
        //var location = "Create.html";
        //window.location = location;
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

function NewItemPane() {
    return (
        <div className="new-item-pane">
            <div className="header">
                Add New To Do Item
            </div>
            <div className="form-body">
                <form id="new-item">
                    <input id="title" name="Title" type="text" className="new-item-control" placeholder="Title" />
                    <br />
                    <textarea name="Description" id="description" className="new-item-control" rows="4" columns="40"></textarea>
                    <br />
                    <input type="date" id="date" name="Due Date" />
                    <br />
                    <button type="submit" className="new-item-control">Add</button>
                </form>
            </div>
        </div>
    );
}

/*
    <div class="container">
        <div class="page-header">
            <h2>Add New To Do Item</h2>
        </div>
        <form id="todoform">
            <input id="Title" name="Title" type="text" class="form-control" placeholder="Title" /><br />
            <input id="Description" name="Description" type="text" class="form-control"
                placeholder="Description" /><br />
            Due: <input id="Due" name="Due" type="date" class="form-control" /><br />
            <button type="submit" class="btn btn-default">Add</button>
            <input type="button" onclick="location.href = 'index.html';" value="Go Back" class="btn btn-default" />
        </form>
    </div>
*/