function NewItem() {
    var newAction = () => {
        var location = "Create.html";
        window.location = location;
    }

    return (
        <input type="button" className="btn btn-default" onclick="() => newAction()" value="Add A New To Do Item" />
    );
}