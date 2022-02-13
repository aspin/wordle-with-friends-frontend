import * as React from "react";
import { hot } from "react-hot-loader";

const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import { TextField } from "@mui/material";

class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <TextField />
        <TextField />
        <TextField />
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
