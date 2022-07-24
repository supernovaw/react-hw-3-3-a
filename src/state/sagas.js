import { put, spawn, debounce, takeLatest, retry } from "redux-saga/effects";
import searchRequestCreators from "./actionCreators/searchRequest";
import apiCalls from "./apiCalls";

function* searchRequestInitiateSaga() {
  function* worker({ payload }) {
    try {
      const data = yield retry(3, 500, apiCalls.searchRequest, payload.query);
      yield put(searchRequestCreators.succeeded(data));
    } catch (e) {
      yield put(searchRequestCreators.failed(e.message));
    }
  }
  yield takeLatest("search-request initiate", worker);
}

function* searchRequestQueueSaga() {
  function* worker({ payload }) {
    if (payload.query === '') return;
    yield put(searchRequestCreators.initiate(payload.query));
  }
  yield debounce(500, "search-request queue", worker);
}

export default function* masterSaga() {
  yield spawn(searchRequestQueueSaga);
  yield spawn(searchRequestInitiateSaga);
}
