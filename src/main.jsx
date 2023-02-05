import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom";
// import "./setupProxy";
import Context from "./components/ContextProvider/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context>
      <BrowserRouter>
        <App />    
      </BrowserRouter>
    </Context>
  </React.StrictMode>
)
