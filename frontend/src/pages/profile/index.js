import React, { useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import BannerModal from "./banner-modal";
import "./index.scss";
import Info from "./info";
import NewPost from "./new-post";

function Profile(props) {
    // mock data
    const bannerUrl = "https://i.pinimg.com/originals/14/c3/d2/14c3d2fdf8e849813349a5115564e36e.jpg";

    const [showBannerImg, setShowBannerImg] = useState(false);

    const user = {
        lastName: "Sơn",
        firstName: "Tùng",
        bio: "[Noni? Ghé thăm rồi thì chào nhau một tiếng đi nào]",
    };

    return (
        <>
            <Row className="bg-facebook--darker">
                <Col md={12}>
                    <Row className="justify-content-center">
                        <Col md={9} className="bg-facebook--dark br-10">
                            <Row>
                                <Col md={12} className="text-center">
                                    <div
                                        onClick={() => setShowBannerImg(true)}
                                        style={{
                                            height: 400,
                                            overflowY: "hidden",
                                            background: `url(${bannerUrl})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover",
                                            width: "100%",
                                            position: "absolute",
                                            left: 0,
                                            zIndex: 0,
                                        }}
                                    ></div>
                                    <Image
                                        src={DefaultAvatar}
                                        width={200}
                                        height={200}
                                        roundedCircle
                                        className="profile__avatar"
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
                                            <span className="profile__btn active">Bài đăng</span>
                                            <span className="profile__btn">Ảnh</span>
                                        </Col>
                                        <Col md={6} className="text-right">
                                            <Button variant="dark">
                                                <i className="fas fa-pencil-alt" /> Sửa thông tin cá nhân
                                            </Button>
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
                                    <Info />
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
            <BannerModal show={showBannerImg} onHide={() => setShowBannerImg(false)} imgSrc={bannerUrl} />
        </>
    );
}

export default Profile;
