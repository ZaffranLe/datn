import React, { useEffect, useRef, useState } from "react";
import { Container, Image, Row, Col, Button, Form, InputGroup, Overlay } from "react-bootstrap";
import { Transition } from "react-transition-group";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import DatePicker from "react-datepicker";
import { handleInputNumber } from "../../common/handle-input";
import { duration, defaultStyle, transitionStyles } from "../../common/transition-style";
import constants from "../../common/constants";
import Select from "react-select";

function UpdateInfo(props) {
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
        setInProp(true);
        return () => setInProp(false);
    }, []);

    const TODAY = new Date();
    // User must be 18 or older
    const MAX_DATE_FOR_DOB = new Date(TODAY.getFullYear() - 18, TODAY.getMonth(), TODAY.getDate());

    const [profileInfo, setProfileInfo] = useState({
        lastName: "",
        firstName: "",
        dob: "",
        gender: "",
        preference: "",
        weight: "",
        height: "",
        homeTown: "",
        hobbies: [],
        bio: "",
        avatar: "",
    });

    const [profileInfoValidation, setProfileInfoValidation] = useState({
        isWeightValid: true,
        weightInvalidMsg: "",
        isFocusingWeight: false,
        isHeightValid: true,
        heightInvalidMsg: "",
        isFocusingHeight: false,
    });

    const hobbyOptions = [
        {
            key: 0,
            label: "Đọc sách",
            icon: "fa-book",
            value: 0,
        },
        {
            key: 1,
            label: "Chơi game",
            icon: "fa-gamepad",
            value: 1,
        },
        {
            key: 2,
            label: "Ăn uống",
            icon: "fa-cutlery",
            value: 2,
        },
    ];

    const { lastName, firstName, dob, gender, preference, weight, height, homeTown, hobbies, bio } = profileInfo;
    const {
        isWeightValid,
        isHeightValid,
        isFocusingWeight,
        isFocusingHeight,
        weightInvalidMsg,
        heightInvalidMsg,
    } = profileInfoValidation;

    const handleChangeInfo = (name) => (e) => {
        setProfileInfo({
            ...profileInfo,
            [name]: e.target.value,
        });
    };

    const handleChangeDob = (date) => {
        setProfileInfo({
            ...profileInfo,
            dob: date,
        });
    };

    const handleCheckWeight = () => {
        let _isValid = true;
        let _msg = "";
        if (weight < constants.MIN_WEIGHT || weight > constants.MAX_WEIGHT) {
            _isValid = false;
            _msg = "Cân nặng lạ ghê nha";
        }
        setProfileInfoValidation({
            ...profileInfoValidation,
            isWeightValid: _isValid,
            isFocusingWeight: false,
            weightInvalidMsg: _msg,
        });
    };

    const handleCheckHeight = () => {
        let _isValid = true;
        let _msg = "";
        if (height < constants.MIN_HEIGHT || height > constants.MAX_HEIGHT) {
            _isValid = false;
            _msg = "Chiều cao cứ sai sai";
        }
        setProfileInfoValidation({
            ...profileInfoValidation,
            isHeightValid: _isValid,
            isFocusingHeight: false,
            heightInvalidMsg: _msg,
        });
    };

    const handleFocusWeight = () => {
        setProfileInfoValidation({
            ...profileInfoValidation,
            isFocusingWeight: true,
        });
    };

    const handleFocusHeight = () => {
        setProfileInfoValidation({
            ...profileInfoValidation,
            isFocusingHeight: true,
        });
    };

    const handleChangeHobbies = (value) => {
        setProfileInfo({
            ...profileInfo,
            hobbies: value,
        });
    };

    return (
        <>
            <Transition in={inProp} timeout={duration}>
                {(state) => (
                    <Container
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                        className="d-flex align-items-center full-height"
                        id="register-update-info-page"
                    >
                        <Row className="full-width">
                            <Col className="login-container" md={{ span: 8, offset: 2 }}>
                                <Form>
                                    <Row>
                                        <Col md={12} className="text-center">
                                            <h4>Bổ sung thông tin cá nhân</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Row className="full-height pb-15">
                                                <Col md={12} className="full-height">
                                                    <div className="full-height">
                                                        <Image
                                                            src={DefaultAvatar}
                                                            alt="Default avatar"
                                                            fluid
                                                            thumbnail
                                                        />
                                                        <Form.File id="avatar-file" label="Ảnh đại diện" custom />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={8}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="lastName">
                                                            <Form.Label>Họ</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                onChange={handleChangeInfo("lastName")}
                                                                value={lastName}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="firstName">
                                                            <Form.Label>Tên</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                onChange={handleChangeInfo("firstName")}
                                                                value={firstName}
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="dob">
                                                            <Form.Label>Ngày sinh</Form.Label>
                                                            <DatePicker
                                                                className="form-control"
                                                                selected={dob}
                                                                onChange={handleChangeDob}
                                                                dateFormat="dd/MM/yyyy"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                maxDate={MAX_DATE_FOR_DOB}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="gender">
                                                            <Form.Label>Giới tính</Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                onChange={handleChangeInfo("gender")}
                                                                value={gender}
                                                            >
                                                                <option value={0}>Không rõ</option>
                                                                <option value={1}>Nam</option>
                                                                <option value={2}>Nữ</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="preference">
                                                            <Form.Label>Quan tâm đến</Form.Label>
                                                            <Form.Control
                                                                as="select"
                                                                onChange={handleChangeInfo("preference")}
                                                                value={preference}
                                                            >
                                                                <option value={0}>Không rõ</option>
                                                                <option value={1}>Nam</option>
                                                                <option value={2}>Nữ</option>
                                                                <option value={2}>Cả nam lẫn nữ</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form.Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="weight">
                                                    <Form.Label>Cân nặng</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            min={30}
                                                            onChange={handleChangeInfo("weight")}
                                                            onKeyPress={handleInputNumber}
                                                            value={weight}
                                                            onBlur={handleCheckWeight}
                                                            onFocus={handleFocusWeight}
                                                            className={
                                                                !isWeightValid && !isFocusingWeight
                                                                    ? `border-danger`
                                                                    : ""
                                                            }
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>kg</InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                    {!isWeightValid && !isFocusingWeight && (
                                                        <Form.Text className="text-danger">
                                                            {weightInvalidMsg}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="height">
                                                    <Form.Label>Chiều cao</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            min={120}
                                                            onChange={handleChangeInfo("height")}
                                                            onKeyPress={handleInputNumber}
                                                            value={height}
                                                            onBlur={handleCheckHeight}
                                                            onFocus={handleFocusHeight}
                                                            className={
                                                                !isHeightValid && !isFocusingHeight
                                                                    ? `border-danger`
                                                                    : ""
                                                            }
                                                        />
                                                        <InputGroup.Append>
                                                            <InputGroup.Text>cm</InputGroup.Text>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                    {!isHeightValid && !isFocusingHeight && (
                                                        <Form.Text className="text-danger">
                                                            {heightInvalidMsg}
                                                        </Form.Text>
                                                    )}
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="city">
                                                    <Form.Label>Quê quán</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        onChange={handleChangeInfo("homeTown")}
                                                        value={homeTown}
                                                    >
                                                        <option value={1}>Hà Nội</option>
                                                        <option value={2}>Hồ Chí Minh</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group controlId="hobby">
                                                <Form.Label>Sở thích</Form.Label>
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    isMulti
                                                    options={hobbyOptions}
                                                    value={hobbies}
                                                    onChange={handleChangeHobbies}
                                                    placeholder="Bạn thường thích làm gì khi rảnh?"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group controlId="bio">
                                                <Form.Label>Giới thiệu bản thân</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={5}
                                                    placeholder="Cho mọi người biết một vài thông tin thú vị về bản thân bạn đi nào."
                                                    onChange={handleChangeInfo("bio")}
                                                    value={bio}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-15">
                                        <Col md={3} className="text-left">
                                            <Button variant="link">Bỏ qua</Button>
                                        </Col>
                                        <Col md={9} className="text-right">
                                            <Button variant="info" onClick={() => console.log(profileInfo)}>Hoàn tất</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Transition>
        </>
    );
}

export default UpdateInfo;
