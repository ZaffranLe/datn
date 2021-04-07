import React, { useEffect, useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import DefaultAvatar from "../../assets/img/default-avatar.png";

function NewPostModal(props) {
    
}

function NewPost(props) {
    const [imgHeight, setImgHeight] = useState(40);

    const IMG_RATIO = 1; // ratio = width / height

    const quotes = [
        "Bạn có muốn chia sẻ điều gì không?",
        "Bạn đang suy nghĩ về gì vậy?",
        "Bạn vừa gặp chuyện vui? Hãy để chúng tôi cùng biết và chúc mừng",
    ];

    const pickRandomQuote = () => {
        const random = Math.floor(Math.random() * quotes.length);
        return quotes[random];
    };

    useEffect(() => {
        const newPostBtn = document.getElementById("new-post-btn");
        setImgHeight(newPostBtn.clientHeight);
    });

    return (
        <>
            <Row>
                <Col md={12} className="bg-facebook--dark br-10 p-3">
                    <Row>
                        <Col md={1} className="text-center">
                            <Image src={DefaultAvatar} roundedCircle width={imgHeight * IMG_RATIO} height={imgHeight} />
                        </Col>
                        <Col md={11} className="pl-0">
                            <div className="br-50 w-100 p-3 profile__new-post-btn" id="new-post-btn">
                                <span>{pickRandomQuote()}</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default NewPost;
