//get mainEvent from the database
const getMainEvent = () => {
  fetch("https://qvik.herokuapp.com/api/v1/initial-setup")
    .then((response) => response.json())
    .then((jsondata) => { 
      setMainEvent(jsondata.data);
    })
      .catch(err => console.error(err));
};
 //get list of tags
 const getTags = () => {
  fetch("https://qvik.herokuapp.com/api/v1/tags")
    .then((response) => response.json())
    .then((jsondata) => { 
      setTags(jsondata.data);
    })
      .catch(err => console.error(err));
};


//update event
const updateEvent = (event, id) => {
    console.log('stingify', JSON.safeStringify(event))
    fetch("https://qvik.herokuapp.com/api/v1/events/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.safeStringify(event)
    })
    .then(_ => getEvents())
    .then(_ => {
        setMsg("Event updated");
        setOpen(true);
    })
      .catch((err) => console.log(err));
};

//delete event
const deleteEvent = (id) => {
    console.log('id', id)
    if (window.confirm("Are you sure?")) {
        fetch("https://qvik.herokuapp.com/api/v1/events/" + id, {
          method: "DELETE"
        })
        .then(_ => getEvents())
        .then(_ => {
            setMsg("Sub-event deleted")
            setOpen(true)
        })
        .catch(err => console.error(err));
      }
  };

  //get Sub-events from the database
  const getEvents = () => {
    fetch(link)
      .then((response) => response.json())
      .then((jsondata) => { 
        setEvents(jsondata.data[0].data);
      })
        .catch(err => console.error(err));
};


//create event
const createEvent = (event, stage, presenter) => {
  fetch("https://qvik.herokuapp.com/api/v1/events/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.safeStringify(event)
  })
  //.then(_ => getEvents())
  .then(_ => linkEventStage(stage))
  .then(_ => linkEventPresenter(presenter))
  .then(_ => {
      setMsg("New Sub-event added");
      setOpen(true);
  })
    .catch((err) => console.log(err));
};

//link stage to the event 
const linkEventStage = (stage) => {
 // getEvents();
  fetch("https://qvik.herokuapp.com/api/v1/link-event-stage/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: {"sourceId":stage, "destinationId":events.slice(-1).pop().eventId}
  })
  //.then(_ => getEvents())
  .then(_ => {
      setMsg("New Link between event and stages created");
      setOpen(true);
      console.log(stage);
      console.log(events.slice(-1).pop().eventId);
  })
    .catch((err) => console.log(err));
};

//link presenter to the event
const linkEventPresenter = (presenter) => {
 // getEvents();
  fetch("https://qvik.herokuapp.com/api/v1/link-event-presenter/", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: {"sourceId":presenter, "destinationId":events.slice(-1).pop().eventId}
  })
  //.then(_ => getEvents())
  .then(_ => {
      setMsg("New Link between event and presenters created");
      setOpen(true);
      console.log(presenter);
      console.log(events.slice(-1).pop().eventId);
  })
    .catch((err) => console.log(err));
};

//method for safe Stringify JSON
JSON.safeStringify = (obj, indent = 2) => {
    let cache = [];
    const retVal = JSON.stringify(
      obj,
      (key, value) =>
        typeof value === "object" && value !== null
          ? cache.includes(value)
            ? undefined // Duplicate reference found, discard key
            : cache.push(value) && value // Store value in our collection
          : value,
      indent
    );
    cache = null;
    return retVal;
  };

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");