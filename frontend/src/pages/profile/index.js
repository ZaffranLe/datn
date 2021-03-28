import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import BannerModal from "./banner-modal";
import "./index.scss";

function Profile(props) {
    // mock data
    const bannerUrl = "https://i.pinimg.com/originals/14/c3/d2/14c3d2fdf8e849813349a5115564e36e.jpg";

    const [showBannerImg, setShowBannerImg] = useState(false);

    return (
        <>
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
                    <Image src={DefaultAvatar} width={200} height={200} roundedCircle className="profile__avatar" />
                </Col>
            </Row>
            <BannerModal show={showBannerImg} onHide={() => setShowBannerImg(false)} imgSrc={bannerUrl} />
        </>
    );
}

export default Profile;
