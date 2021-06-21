import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import DefaultBanner from "../../assets/img/default-banner.jpg";
import { LazyImage, ProfileNonExist } from "../../components";
import { history } from "../history";
import "./index.scss";
import * as profileActions from "./slice";
import * as messageActions from "../message/slice";
import * as imageModalActions from "../../components/album/image-modal/slice";
import { Link } from "react-router-dom";
import { getImageUrl, getUserInfoFromToken } from "../../common/common";
import classNames from "classnames";
import ProfilePost from "./components/post-tab";
import ProfilePanes from "./components/panes";
import ProfileImage from "./components/image-tab";

function Profile(props) {
    const userInfo = getUserInfoFromToken();
    const [activePane, setActivePane] = useState("post");

    const { user, isError, isFollowLoading, isFollowing } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        const _slug = props.match.params.slug;
        if (!_slug) {
            history.push(`/profile/${userInfo.slug}`);
        } else {
            dispatch(profileActions.getUserBySlug(_slug));
        }
        setActivePane("post");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.slug, dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(profileActions.getPostByUserId());
            if (userInfo.id !== user.id) {
                dispatch(profileActions.checkFollowUser(user.id));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch]);

    const handleChangeFollowUser = () => {
        dispatch(profileActions.changeFollowUser(user.id));
    };

    const handleViewImage = (idImage) => {
        dispatch(imageModalActions.openModal(idImage));
    };

    const getProfileBtnClassName = (name) => {
        return classNames("profile__btn", {
            active: activePane === name,
        });
    };

    const panes = [
        {
            name: "post",
            render: () => <ProfilePost />,
        },
        {
            name: "image",
            render: () => <ProfileImage />,
        },
    ];

    if (isError || !user) {
        return <ProfileNonExist />;
    }

    return (
        <>
            <Row className="bg-facebook--darker h-100">
                <Col md={12}>
                    <Row className="justify-content-center">
                        <Col md={9} className="bg-facebook--dark br-10">
                            <Row>
                                <Col md={12} className="text-center">
                                    <LazyImage
                                        onClick={() => handleViewImage(user.banner ? user.banner.id : null)}
                                        className="profile__banner"
                                        src={user.banner ? getImageUrl(user.banner.fileName) : DefaultBanner}
                                    />
                                    <LazyImage
                                        onClick={() => handleViewImage(user.avatar ? user.avatar.id : null)}
                                        className="avatar profile__avatar"
                                        src={user.avatar ? getImageUrl(user.avatar.fileName) : DefaultAvatar}
                                        style={{ width: 200, height: 200, borderRadius: 200 }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12} className="text-center">
                                    <Row>
                                        <Col md={12}>
                                            <span className="font-weight-bold h1">
                                                {user.lastName} {user.firstName}
                                            </span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <span className="h5">{user.bio}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr className="bg-light" />
                            <Row className="justify-content-center mb-3">
                                <Col md={11}>
                                    <Row>
                                        <Col md={6}>
                                            <span
                                                className={getProfileBtnClassName("post")}
                                                onClick={() => setActivePane("post")}
                                            >
                                                Bài đăng
                                            </span>
                                            <span
                                                className={getProfileBtnClassName("image")}
                                                onClick={() => setActivePane("image")}
                                            >
                                                Ảnh
                                            </span>
                                        </Col>
                                        <Col md={6} className="text-right">
                                            {userInfo.id === user.id ? (
                                                <Link to="/update-info">
                                                    <Button variant="dark">
                                                        <i className="fas fa-pencil-alt" /> Sửa thông tin cá nhân
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <>
                                                    <Button
                                                        variant="dark"
                                                        onClick={handleChangeFollowUser}
                                                        className="mr-2"
                                                    >
                                                        {isFollowLoading ? (
                                                            <i className="fas fa-spinner fa-spin" />
                                                        ) : (
                                                            <>
                                                                <i
                                                                    className={`fas ${
                                                                        isFollowing ? "fa-user-minus" : "fa-user-plus"
                                                                    }`}
                                                                />{" "}
                                                                {isFollowing ? "Huỷ theo dõi" : "Theo dõi"}
                                                            </>
                                                        )}
                                                    </Button>
                                                    <Button variant="dark">
                                                        <i className="fas fa-comment" /> Nhắn tin
                                                    </Button>
                                                </>
                                            )}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md={9}>
                            <ProfilePanes active={activePane} panes={panes} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Profile;
