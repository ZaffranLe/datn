import React from "react";

function Private(props) {
    const auth = false;
   return auth ? props.children : <></>
}

export default Private;