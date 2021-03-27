import React from "react";
import { Overlay } from "react-bootstrap";

function SettingOverlay({ show, target }) {
    return (
        <Overlay placement="bottom-end" show={show} target={target}>
            {({ placement, arrowProps, show: _show, popper, ...props }) => <div {...props}>Test</div>}
        </Overlay>
    );
}

export default SettingOverlay;
