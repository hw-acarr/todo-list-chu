class TodoCard extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div clasName="panel-container">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.Title}</h3>
                </div>
                <div class="panel-body">
                    {this.props.Description}
                    <br />

                </div>
            </div>
        )
    };
}

function TodoCardList() {
    const [items, setItems] = React.useState([]);
    const [hasLoaded, setLoadedStatus] = React.useState(false);

    React.useEffect(() => {
        fetch('/api/todos?includecompleted=false&includeactive=true')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setItems(data);
                setLoadedStatus(true);
            })
            .catch(error => console.log(error));
    });

    return (
        <div>
            {hasLoaded && console.log(items)

                //items.map((item, index) => (
                //  <TodoCard Title={item.title} Description={item.description} />
                // loop through the tasks and display them now.
                //))
            }
        </div>
    );
}