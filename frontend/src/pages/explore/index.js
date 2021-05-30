import React, { useEffect } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as exploreActions from "./slice";
import UserCard from "./user-card";
import UserGrid from "./user-grid";
import "./index.scss";
import { CustomLoader } from "../../components";

function Explore(props) {
    const { layout, currentUser, isLoading } = useSelector((state) => state.explore);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(exploreActions.getUserSuggestions());
    }, [dispatch]);

    const handleChangeLayout = (name) => {
        dispatch(exploreActions.setLayout(name));
    };

    const handleKeyUp = (e) => {
        if (layout === "swipe" && currentUser) {
            const SKIP_KEY_CODE = 37;
            const FOLLOW_N_CONTINUE_KEY_CODE = 39;
            if (e.keyCode === SKIP_KEY_CODE) {
                dispatch(exploreActions.changeSkipUser(currentUser.id));
            }
            if (e.keyCode === FOLLOW_N_CONTINUE_KEY_CODE) {
                alert("Followed");
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <Row className="h-100">
                    <Col md={12} className="text-center h-100 display--table">
                        <div className="display--table-cell vertical-align-middle">
                            <CustomLoader />
                        </div>
                    </Col>
                </Row>
            ) : (
                <div onKeyUp={handleKeyUp} tabIndex="0" style={{ outline: "none" }}>
                    <Row className="mt-2">
                        <Col md={2}>
                            <Button
                                variant="dark"
                                disabled={layout === "grid"}
                                onClick={() => handleChangeLayout("grid")}
                            >
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
                        <Col md={10} className="text-right">
                            {layout === "swipe" && (
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <Tooltip className="text-left">
                                            <span>- Bấm nút mũi tên sang phải để bỏ qua</span>
                                            <br />
                                            <span>
                                                - Bấm nút mũi tên sang trái để theo dõi và tìm kiếm
                                                người mới
                                            </span>
                                        </Tooltip>
                                    }
                                >
                                    <Button variant="dark" className="br-50">
                                        <i className="fas fa-question" />
                                    </Button>
                                </OverlayTrigger>
                            )}
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-5">
                        <Col md={11}>
                            {layout === "grid" && <UserGrid />}
                            {layout === "swipe" && <UserCard />}
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
}

export default Explore;
