import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducer";
import CRUDTABLE from "./CRUDTable.js";

const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <CRUDTABLE />
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
