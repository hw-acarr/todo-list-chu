class TitleBar extends Component {
    render() {
        return (
            <div class="jumbotron" style="background-color: white">
                <h2>To Do List Using Azure Functions</h2>
            </div>
        );
    }
}

function App() {
    return (
        <div>
            <TitleBar />
        </div>
    )
}