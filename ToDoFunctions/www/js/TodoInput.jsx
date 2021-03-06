class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    async componentDidMount() {
        await fetch('/api/todos?includecompleted=false&includeactive=true')
            .then(res => res.json())
            .then((data) => {
                this.setState({ items: data });
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="container">
                <hr />
                <div className="btn-group">
                    <input type="button" className="btn btn-default" onClick="location.href='Create.html';"
                        value="Add A New To Do Item" />
                    <input type="button" className="btn btn-default" onClick="location.href = 'History.html';"
                        value="View To Do Item History" />
                </div>
                <hr />
            </div>
        );
    }
}
