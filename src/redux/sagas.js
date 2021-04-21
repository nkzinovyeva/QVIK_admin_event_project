import {call, put, takeEvery} from 'redux-saga/effects';
import {
  addFetchedEvents,
  addFetchedMainEvent,
  fetchAllEvents as fetchAllEventsAction,
} from './actions';

// events sagas

function* fetchMainEvent() {
  try {
    const result = yield call(
      fetch,
      "https://qvik.herokuapp.com/api/v1/initial-setup"
    );
    const body = yield call([result, "json"]);
    yield put(addFetchedMainEvent(body.data));
  } catch (err) {
    console.error(err);
  }
}

function* fetchAllEvents() {
  try {
    const result = yield call(
      fetch,
      "https://qvik.herokuapp.com/api/v1/events"
    );
    const body = yield call([result, "json"]);
    yield put(addFetchedEvents(body.data[0].data));
  } catch (err) {
    console.error(err);
  }
}

// saga to add new sub-event
function* addNewEvent(action) {
  try {
    yield call(fetch, "https://qvik.herokuapp.com/api/v1/events/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action),
    });
    yield put(fetchAllEventsAction());
  } catch (err) {
    console.error(err);
  }
}

// saga to edit event

function* editEvent(action) {
  try {
    yield call(fetch, "https://qvik.herokuapp.com/api/v1/events/" + action.data.eventId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action),
    });
    yield put(fetchAllEventsAction());
  } catch (err) {
    console.error(err);
  }
}

// saga to delete sub-event

function* deleteEvent(action) {
    try {
      yield call(fetch, "https://qvik.herokuapp.com/api/v1/events/" + action.data, {
        method: "DELETE",
      });
      yield put(fetchAllEventsAction());
    } catch (err) {
      console.error(err);
    }
}

// MAIN SAGA
export default function* mainSaga() {
  yield takeEvery("FETCH_MAIN_EVENT", fetchMainEvent);
  yield takeEvery("FETCH_ALL_EVENTS", fetchAllEvents);
  yield takeEvery("ADD_NEW_EVENT", addNewEvent);
  yield takeEvery("EDIT_EVENT", editEvent);
  yield takeEvery("DELETE_EVENT", deleteEvent);
}