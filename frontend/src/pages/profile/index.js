import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import DefaultBanner from "../../assets/img/default-banner.jpg";
import { ProfileNonExist } from "../../components";
import { history } from "../history";
import "./index.scss";
import Info from "./components/info";
import NewPost from "./components/new-post";
import * as profileActions from "./slice";
import * as imageModalActions from "../../components/album/image-modal/slice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import UserListModal from "./components/user-list-modal";
import { getImageUrl } from "../../common/common";

function Profile(props) {
    const userInfo = window.userInfo;
    const [showUserList, setShowUserList] = useState(false);
    const [userList, setUserList] = useState([]);

    const { user, isLoading, isError, isFollowLoading, isFollowing } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        setShowUserList(false);
        const _slug = props.match.params.slug;
        if (!_slug) {
            history.push(`/profile/${window.userInfo.slug}`);
        } else {
            dispatch(profileActions.getUserBySlug(_slug));
        }
    }, [props.match.params.slug, dispatch]);

    useEffect(() => {
        if (user && userInfo.id !== user.id) {
            dispatch(profileActions.checkFollowUser(user.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, dispatch]);

    const handleChangeFollowUser = () => {
        dispatch(profileActions.changeFollowUser(user.id));
    };

    const handleShowUserList = (_userList) => {
        setShowUserList(true);
        console.log(_userList);
        setUserList(_userList);
    };

    const handleCloseUserList = () => {
        setShowUserList(false);
    };

    const handleViewImage = (idImage) => {
        dispatch(imageModalActions.openModal(idImage));
    };

    if (isError || !user) {
        return <ProfileNonExist />;
    }

    return (
        <>
            <SkeletonTheme color="#242526">
                <Row className="bg-facebook--darker">
                    <Col md={12}>
                        <Row className="justify-content-center">
                            <Col md={9} className="bg-facebook--dark br-10">
                                <Row>
                                    <Col md={12} className="text-center">
                                        <div
                                            className="profile__banner"
                                            onClick={() => handleViewImage(user.banner ? user.banner.id : null)}
                                            style={{
                                                background: `url(${
                                                    user.banner ? getImageUrl(user.banner.fileName) : DefaultBanner
                                                })`,
                                            }}
                                        ></div>
                                        <Image
                                            src={user.avatar ? getImageUrl(user.avatar.fileName) : DefaultAvatar}
                                            width={200}
                                            height={200}
                                            roundedCircle
                                            className="avatar profile__avatar"
                                            onClick={() => handleViewImage(user.avatar ? user.avatar.id : null)}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="text-center">
                                        <Row>
                                            <Col md={12}>
                                                <span className="font-weight-bold h1">
                                                    {isLoading ? <Skeleton /> : `${user.lastName} ${user.firstName}`}
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <span className="h5">{isLoading ? <Skeleton /> : user.bio}</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr className="bg-light" />
                                <Row className="justify-content-center mb-3">
                                    <Col md={11}>
                                        <Row>
                                            <Col md={6}>
                                                <span className="profile__btn active">Bài đăng</span>
                                                <span className="profile__btn">Ảnh</span>
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
                                                                            isFollowing
                                                                                ? "fa-user-minus"
                                                                                : "fa-user-plus"
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
                                <Row className="bg-facebook--darker pt-4 pb-5 justify-content-center">
                                    <Col md={5}>
                                        {isLoading ? (
                                            <Skeleton count={10} />
                                        ) : (
                                            <Info handleShowUserList={handleShowUserList} user={user} />
                                        )}
                                    </Col>
                                    <Col md={7}>
                                        <Row className="justify-content-center pl-3">
                                            <Col md={12}>
                                                <NewPost />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <UserListModal open={showUserList} onClose={handleCloseUserList} users={userList} />
            </SkeletonTheme>
        </>
    );
}

export default Profile;
