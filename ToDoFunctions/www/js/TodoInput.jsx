class TitleBar extends React.Component {
    render() {
        return (
            <div className="container">
                <hr />
                <div className="btn-group">
                    <input type="button" className="btn btn-default" onclick="location.href='Create.html';"
                        value="Add A New To Do Item" />
                    <input type="button" className="btn btn-default" onclick="location.href = 'History.html';"
                        value="View To Do Item History" />
                </div>
                <hr />
            </div>
        );
    }
}
