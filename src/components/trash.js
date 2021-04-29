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