import "./App.css";
import classNames from "classnames";
import { useStateAccess } from "./state/store";

const App = () => {
  const { queueSearch, searchRequest } = useStateAccess();
  const handleChangeSearch = e => queueSearch(e.target.value);

  const requestStatus = <div className={classNames("request-status", { "error": !!searchRequest.status.error })}>
    {searchRequest.status.loading && "Loading…"}
    {!!searchRequest.status.error && "Server failure (" + searchRequest.status.error + ")"}
  </div>

  return (
    <div className="App">
      <input type="text" onChange={handleChangeSearch} placeholder="Type something to search" />
      {requestStatus}
      <div className="search-results">
        {searchRequest.items?.map(item => <div key={item.id}>
          {item.name}
        </div>)}
      </div>
    </div>
  );
}

export default App;
