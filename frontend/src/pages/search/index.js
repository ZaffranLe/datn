import React, { useEffect } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as searchActions from "./slice";
import { CustomLoader, LazyImage } from "../../components";
import queryString from "query-string";
import { getImageUrl } from "../../common/common";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import { Link } from "react-router-dom";

function Search(props) {
    const { users, isLoading } = useSelector((state) => state.search);
    const dispatch = useDispatch();

    useEffect(() => {
        const searchQuery = queryString.parse(props.location.search);
        const { name } = searchQuery;
        if (name) {
            dispatch(searchActions.searchUser(name));
        } else {
            dispatch(searchActions.setUsers([]));
        }
    }, [props.location.search]);

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
                <>
                    {users.map((_user) => (
                        <Row key={_user.id}>
                            <Col
                                className="bg-facebook--dark mt-2 mb-2 p-4 br-10"
                                md={{ span: 6, offset: 3 }}
                            >
                                <Link to={`/profile/${_user.slug}`}>
                                    <Row>
                                        <Col md={12}>
                                            <div className="display--flex">
                                                <LazyImage
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 40,
                                                    }}
                                                    src={
                                                        _user.avatar
                                                            ? getImageUrl(_user.avatar)
                                                            : DefaultAvatar
                                                    }
                                                />
                                                <div
                                                    style={{ height: 40 }}
                                                    className="display--table ml-2"
                                                >
                                                    <span className="display--table-cell vertical-align-middle text-white">
                                                        {`${_user.lastName} ${_user.firstName}`.trim()}
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Link>
                            </Col>
                        </Row>
                    ))}
                </>
            )}
        </>
    );
}

export default Search;
