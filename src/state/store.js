import { useDispatch, useSelector } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import searchRequest from "./reducers/searchRequest";
import searchRequestCreators from "./actionCreators/searchRequest";
import masterSaga from "./sagas";

export function useStateAccess() {
  const dispatch = useDispatch();
  return {
    queueSearch: query => dispatch(searchRequestCreators.queue(query)),
    searchRequest: useSelector(s => s.searchRequest)
  };
};

const reducer = combineReducers({
  searchRequest
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(masterSaga);

export default store;
