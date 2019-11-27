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
                    Due: {this.props.Due}
                </div>
            </div>
        )
    };
}