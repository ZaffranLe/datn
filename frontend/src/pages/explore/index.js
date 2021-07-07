import React, { useEffect } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as exploreActions from "./slice";
import UserCard from "./user-card";
import "./index.scss";
import { CustomLoader } from "../../components";

function Explore(props) {
    const { currentUser, isLoading } = useSelector((state) => state.explore);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(exploreActions.getUserSuggestions());
    }, [dispatch]);

    const handleKeyUp = (e) => {
        if (currentUser) {
            const SKIP_KEY_CODE = 37;
            const FOLLOW_N_CONTINUE_KEY_CODE = 39;
            if (e.keyCode === SKIP_KEY_CODE) {
                dispatch(exploreActions.changeSkipUser(currentUser.id));
            }
            if (e.keyCode === FOLLOW_N_CONTINUE_KEY_CODE) {
                dispatch(exploreActions.changeFollowUser(currentUser.id));
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
                        <Col md={12} className="text-right">
                            <OverlayTrigger
                                placement="bottom"
                                overlay={
                                    <Tooltip className="text-left">
                                        <span>- Bấm nút mũi tên sang phải để bỏ qua</span>
                                        <br />
                                        <span>- Bấm nút mũi tên sang trái để theo dõi và tìm kiếm người mới</span>
                                    </Tooltip>
                                }
                            >
                                <Button variant="dark" className="br-50">
                                    <i className="fas fa-question" />
                                </Button>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-5">
                        <Col md={11}>
                            <UserCard />
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
}

export default Explore;
