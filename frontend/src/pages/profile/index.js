import React, { useEffect, useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import DefaultBanner from "../../assets/img/default-banner.jpg";
import { ProfileNonExist } from "../../components";
import { history } from "../history";
import BannerModal from "./banner-modal";
import "./index.scss";
import Info from "./info";
import NewPost from "./new-post";
import * as profileActions from "./slice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

function Profile(props) {
    const [showBannerImg, setShowBannerImg] = useState(false);

    const userInfo = window.userInfo;

    const { user, isLoading, isError } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        const _slug = props.match.params.slug;
        if (!_slug) {
            history.push(`/profile/${window.userInfo.slug}`);
        } else {
            dispatch(profileActions.getUserBySlug(_slug));
        }
    }, [props.match.params.slug, dispatch]);

    if (isError) {
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
                                            onClick={() => setShowBannerImg(true)}
                                            style={{
                                                background: `url(${DefaultBanner})`,
                                            }}
                                        ></div>
                                        <Image
                                            src={DefaultAvatar}
                                            width={200}
                                            height={200}
                                            roundedCircle
                                            className="avatar profile__avatar"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="text-center">
                                        <Row>
                                            <Col md={12}>
                                                <span className="font-weight-bold h1">
                                                    {isLoading ? (
                                                        <Skeleton />
                                                    ) : (
                                                        user && `${user.lastName} ${user.firstName}`
                                                    )}
                                                </span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <span className="h5">
                                                    {isLoading ? <Skeleton /> : user && user.bio}
                                                </span>
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
                                                {user && userInfo.id === user.id ? (
                                                    <Link to="/update-info">
                                                        <Button variant="dark">
                                                            <i className="fas fa-pencil-alt" /> Sửa thông tin cá nhân
                                                        </Button>
                                                    </Link>
                                                ) : (
                                                    <Button variant="dark">
                                                        <i className="fas fa-user-plus" /> Theo dõi
                                                    </Button>
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
                                    <Col md={5}>{isLoading ? <Skeleton count={10} /> : <Info user={user} />}</Col>
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
                <BannerModal show={showBannerImg} onHide={() => setShowBannerImg(false)} imgSrc={DefaultBanner} />
            </SkeletonTheme>
        </>
    );
}

export default Profile;
