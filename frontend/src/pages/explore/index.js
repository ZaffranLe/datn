import React from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as exploreActions from "./slice";

function Explore(props) {
    const { layout } = useSelector((state) => state.explore);
    const dispatch = useDispatch();

    const handleChangeLayout = (name) => {
        dispatch(exploreActions.setLayout(name));
    };

    return (
        <>
            <Row className="mt-2">
                <Col md={2}>
                    <Button variant="dark" disabled={layout === "grid"} onClick={() => handleChangeLayout("grid")}>
                        <i className="fas fa-th" />
                    </Button>
                    <Button
                        variant="dark"
                        className="ml-2"
                        disabled={layout === "swipe"}
                        onClick={() => handleChangeLayout("swipe")}
                    >
                        <i className="fas fa-user" />
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col md={11}></Col>
            </Row>
        </>
    );
}

export default Explore;
