import React from "react";
import { Helmet } from "react-helmet";

function Today() {
    return (
        <React.Fragment>
            <Helmet title="Today" />
            <label>Today</label>
        </React.Fragment>
    );
}

export default Today;
