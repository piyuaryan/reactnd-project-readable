import React from "react";
import {render} from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import Root from "./components/Root";

render(
    <Root />,
    document.getElementById('root')
);

registerServiceWorker();
