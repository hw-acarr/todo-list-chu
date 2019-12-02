class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('/api/todos?includecompleted=true&includeactive=true')
            .then(res => res.json())
            .then((data) => {
                this.setState({ items: data })
            })
            .catch(console.log)
        console.log(this.state.items);
    }

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
