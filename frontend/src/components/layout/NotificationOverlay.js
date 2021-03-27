import React from "react";
import { Overlay } from "react-bootstrap";

function NotificationOverlay({ show, target }) {
    return (
        <Overlay placement="bottom-end" show={show} target={target}>
            {({ placement, arrowProps, show: _show, popper, ...props }) => <div {...props}>Test</div>}
        </Overlay>
    );
}

export default NotificationOverlay;
