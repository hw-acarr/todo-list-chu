function BasicCard(props) {
    return (
        <React.Fragment>
            <BasicTaskDescription item={props.item} />
            <hr />
        </React.Fragment>
    );
}

function BasicTaskDescription(props) {
    /*
<task>
  <modify-button />
  <priority />
  <task-info>
    <task-description />
    <task-details />
  </task-info>
  <due-date />
  <complete-button />
</task>
    */
    return (
        <div className="task">
            <div className="task-element">
                <button className="task-button" name="complete" type="button">Done</button>
            </div>
            <Priority priority={props.item.priority} />
            <TaskInfo title={props.item.title} description={props.item.description} />
            <TaskDueDate due={props.item.due} />
            <div className="task-element">
                <button className="task-button" name="modify" type="button">Modify</button>
            </div>
        </div>
    );
}

function TaskInfo(props) {

    if (props.description) {
        return (
            <div className="task-info">
                <div className="task-title">{props.title}</div>
                <div className="task-description">{props.description}</div>
            </div>
        );
    }

    return (
        <div className="task-info">
            <div className="task-title">{props.title}</div>
        </div>
    );
}

function Priority(props) {
    // TODO - what if props.property doesn't exist?
    let image = "./img/normal.png";
    switch (props.priority) {
        case "high":
            image = "./img/high.png";
            break;
        case "low":
            image = "./img/low.png";
            break;
        default:
            image = "./img/normal.png";
    }

    return (
        <div className="task-element">
            <img src={image} height="32" width="32" />
        </div>
    );
}


function formatDate(date) {
    let current = getNewDate();

    if (dateWithinTheWeek(date)) {
        if (current.getUTCDate() == date.getUTCDate()) {
            return "Today";
        } else if ((current.getUTCDate() + 1) == date.getUTCDate()) {
            return "Tomorrow";
        }
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[date.getUTCDay()];
    }

    const format = { month: 'short', day: 'numeric' };

    // Only add the year if it's not this year.
    if (current.getFullYear() != date.getFullYear()) {
        format.year = 'numeric';
    }

    return date.toLocaleDateString('en-us', format);
}

/*
    Determine if the provided date is occuring in the next 7 days.
    TODO:
        - if (proposed date - 7) >= today, return true
*/
function dateWithinTheWeek(date) {
    let week = getNewDate();
    let today = getNewDate();

    // Advance the date 7 days to encompass the week
    week.setUTCDate(week.getUTCDate() + 7);

    //console.log("Checking that <" + date + "> >= <" + today + "> && <" + date + "> < <" + week + ">");
    // If the date is today or within the next 7 days, return true
    return date >= today && date < week;
}

/*
    Returns the current date with the time zero'ed out.
*/
function getNewDate() {
    let current = new Date();
    current.setUTCHours(0, 0, 0, 0);
    return current;
}

// Render the due date
// 
function TaskDueDate(props) {
    var dueby = "";

    if (props.due != null) {
        dueby = formatDate(new Date(props.due));
    }

    return (
        <div className="task-element">{dueby}</div>
    );
}

async function patchData(url = '', id = '') {
    var endpoint = url + id;

    const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isComplete: true })
    });
    return await response.json();
}

function BasicTaskActions(props) {
    var editAction = (id) => {
        var location = "Update.html?id=" + id;
        window.location = location;
    }

    var completeAction = (id, remove) => {
        try {
            const data = patchData('/api/todos/', id);
            remove(id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="task-actions">
            <button name="modify" type="button" onClick={() => editAction(props.item.id)}  >Modify</button>
            <button name="complete" type="button" onClick={() => completeAction(props.item.id, props.removeFunction)}>Complete</button>
        </div>
    );
}

function TodoCardList(props) {
    const [hasLoaded, setLoadedStatus] = React.useState(false);

    var removeItem = (key) => {
        let filtered = props.getItems.filter(item => item.id !== key);
        props.replaceItems(filtered);
    }

    React.useEffect(() => {
        fetch('/api/todos?includecompleted=false&includeactive=true')
            .then(res => res.json())
            .then(data => {
                props.addItems(data);
                setLoadedStatus(true);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="task-list">
            {hasLoaded && props.getItems().map((item, index) => (
                <BasicCard key={item.id} item={item} removeFunction={removeItem} />
            ))}
        </div>
    );
}