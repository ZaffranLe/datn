import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as exploreActions from "./slice";
import UserCard from "./user-card";
import UserGrid from "./user-grid";
import "./index.scss";

function Explore(props) {
    const { layout } = useSelector((state) => state.explore);
    const dispatch = useDispatch();

    const handleChangeLayout = (name) => {
        dispatch(exploreActions.setLayout(name));
    };

    const handleKeyUp = (e) => {
        const SKIP_KEY_CODE = 37;
        const FOLLOW_N_CONTINUE_KEY_CODE = 39;
        if (e.keyCode === SKIP_KEY_CODE) {

        }
        if (e.keyCode === FOLLOW_N_CONTINUE_KEY_CODE) {
            
        }
    };

    return (
        <>
            <div onKeyUp={handleKeyUp} tabIndex="0" style={{ outline: "none" }}>
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
                    <Col md={11}>
                        {layout === "grid" && <UserGrid />}
                        {layout === "swipe" && <UserCard />}
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Explore;
