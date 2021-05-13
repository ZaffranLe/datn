import React, { useEffect, useRef, useState } from "react";
import { Container, Image, Row, Col, Button, Form, InputGroup, FormFile, Tooltip, Overlay } from "react-bootstrap";
import { HobbyPill } from "../../components";
import Select from "react-select";
import DatePicker from "react-datepicker";
import HobbyModal from "./hobby-modal";
import { Transition } from "react-transition-group";
import { useDispatch, useSelector } from "react-redux";
import { handleInputNumber } from "../../common/handle-input";
import { duration, defaultStyle, transitionStyles } from "../../common/transition-style";
import constants from "../../common/constants";
import * as provinceActions from "../province/slice";
import * as genderActions from "../gender/slice";
import * as preferenceActions from "../preference/slice";
import * as hobbyActions from "../hobby/slice";
import * as updateInfoActions from "./slice";
import * as updateInfoApi from "./api";
import { Link } from "react-router-dom";
import UploadAvatar from "./upload-avatar";

function UpdateInfo(props) {
    const TODAY = new Date();
    // User must be 18 or older
    const MAX_DATE_FOR_DOB = new Date(TODAY.getFullYear() - 18, TODAY.getMonth(), TODAY.getDate());

    const [inProp, setInProp] = useState(false);
    const [hobbyModal, setHobbyModal] = useState(false);
    const [genderOptions, setGenderOptions] = useState([]);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [preferenceOptions, setPreferenceOptions] = useState([]);
    const [profileInfo, setProfileInfo] = useState({
        lastName: "",
        firstName: "",
        dob: "",
        idGender: "",
        idPreference: "",
        weight: "",
        height: "",
        province: "",
        hobbies: [],
        bio: "",
        avatar: "",
        slug: "",
    });
    const [profileInfoValidation, setProfileInfoValidation] = useState({
        isWeightValid: true,
        weightInvalidMsg: "",
        isFocusingWeight: false,
        isHeightValid: true,
        heightInvalidMsg: "",
        isFocusingHeight: false,
        isSlugValid: true,
        isFocusingSlug: false,
        slugInvalidMsg: "",
    });

    const { genders } = useSelector((state) => state.gender);
    const { preferences } = useSelector((state) => state.preference);
    const { hobbies } = useSelector((state) => state.hobby);
    const { provinces } = useSelector((state) => state.province);
    const { isLoading } = useSelector((state) => state.updateInfo);

    const dispatch = useDispatch();

    const {
        isWeightValid,
        isHeightValid,
        isSlugValid,
        isFocusingWeight,
        isFocusingHeight,
        isFocusingSlug,
        weightInvalidMsg,
        heightInvalidMsg,
        slugInvalidMsg,
    } = profileInfoValidation;

    useEffect(() => {
        const _userInfo = window.userInfo;
        Object.keys(_userInfo).forEach((_key) => {
            if (_userInfo[_key] === null) {
                _userInfo[_key] = "";
            }
        });
        setProfileInfo((p) => ({
            ...p,
            ..._userInfo,
            dob: _userInfo.dob ? new Date(_userInfo.dob) : "",
        }));
    }, []);

    useEffect(() => {
        setInProp(true);
        dispatch(provinceActions.getAll());
        dispatch(genderActions.getAll());
        dispatch(preferenceActions.getAll());
        dispatch(hobbyActions.getAll());
        return () => setInProp(false);
    }, [dispatch]);

    useEffect(() => {
        const _options = genders.map((i) => ({
            key: i.id,
            label: i.name,
            icon: i.icon,
            value: i.id,
        }));
        setGenderOptions(_options);
    }, [genders]);

    useEffect(() => {
        const _options = preferences.map((i) => ({
            key: i.id,
            label: i.name,
            icon: i.icon,
            value: i.id,
        }));
        setPreferenceOptions(_options);
    }, [preferences]);

    useEffect(() => {
        const _options = provinces.map((i) => ({
            key: i.id,
            label: i.name,
            value: i.id,
        }));
        setProvinceOptions(_options);
        if (profileInfo.idProvince && !profileInfo.province) {
            const _province = _options.find((_opt) => _opt.value === profileInfo.idProvince);
            setProfileInfo((p) => ({
                ...p,
                province: _province,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinces]);

    const handleChangeInfo = (name) => (e) => {
        setProfileInfo({
            ...profileInfo,
            [name]: e.target.value,
        });
    };

    const handleChangeSlug = (e) => {
        let _value = e.target.value;
        _value = _value.replace(/[^a-zA-Z0-9]/g, "");
        setProfileInfo({
            ...profileInfo,
            slug: _value,
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
        if (
            profileInfo.weight &&
            (profileInfo.weight < constants.MIN_WEIGHT || profileInfo.weight > constants.MAX_WEIGHT)
        ) {
            _isValid = false;
            _msg = "Cân nặng lạ ghê nha";
        }
        setProfileInfoValidation({
            ...profileInfoValidation,
            isWeightValid: _isValid,
            isFocusingWeight: false,
            weightInvalidMsg: _msg,
        });
        return _isValid;
    };

    const handleCheckHeight = () => {
        let _isValid = true;
        let _msg = "";
        if (
            profileInfo.height &&
            (profileInfo.height < constants.MIN_HEIGHT || profileInfo.height > constants.MAX_HEIGHT)
        ) {
            _isValid = false;
            _msg = "Chiều cao cứ sai sai";
        }
        setProfileInfoValidation({
            ...profileInfoValidation,
            isHeightValid: _isValid,
            isFocusingHeight: false,
            heightInvalidMsg: _msg,
        });
        return _isValid;
    };

    const handleCheckSlug = async () => {
        let _isValid = true;
        let _msg = "";
        const _slug = profileInfo.slug;
        if (!_slug) {
            _isValid = false;
            _msg = "Đường dẫn tới trang cá nhân không được để trống.";
        } else {
            if (_slug !== window.userInfo.slug) {
                try {
                    _isValid = await updateInfoApi.checkSlug(_slug);
                } catch (e) {
                    _isValid = false;
                }
            }
            if (!_isValid) {
                _msg = "Đường dẫn này đã được sử dụng.";
            }
        }
        setProfileInfoValidation({
            ...profileInfoValidation,
            isSlugValid: _isValid,
            isFocusingSlug: false,
            slugInvalidMsg: _msg,
        });
        return _isValid;
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

    const handleFocusSlug = () => {
        setProfileInfoValidation({
            ...profileInfoValidation,
            isFocusingSlug: true,
        });
    };

    const handleChangeProvince = (_option) => {
        setProfileInfo({
            ...profileInfo,
            province: _option,
        });
    };

    const handleUpdateInfo = async () => {
        let _isValid = handleCheckHeight();
        _isValid = _isValid ? handleCheckWeight() : _isValid;
        _isValid = _isValid ? await handleCheckSlug(profileInfo.slug) : _isValid;
        if (_isValid) {
            dispatch(updateInfoActions.updateInfo(profileInfo));
        }
    };

    const handleAddHobby = (_hobby) => {
        setProfileInfo({
            ...profileInfo,
            hobbies: profileInfo.hobbies.concat([_hobby]),
        });
    };

    const handleRemoveHobby = (_hobby) => {
        setProfileInfo({
            ...profileInfo,
            hobbies: profileInfo.hobbies.filter((item) => item.id !== _hobby.id),
        });
    };

    const handleChangeAvatar = (id) => {
        setProfileInfo({
            ...profileInfo,
            avatar: id,
        });
    };

    const slugRef = useRef(null);

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
                        <Row className="full-width mt-5 mb-5">
                            <Col className="container--p-30 bg-white" md={{ span: 8, offset: 2 }}>
                                <Form>
                                    <Row>
                                        <Col md={12} className="text-center">
                                            <h4>Chỉnh sửa thông tin cá nhân</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Row className="full-height pb-15">
                                                <Col md={12} className="full-height">
                                                    <div className="full-height display--table text-center">
                                                        <UploadAvatar handleChangeAvatar={handleChangeAvatar} />
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
                                                                value={profileInfo.lastName}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="firstName">
                                                            <Form.Label>Tên</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                onChange={handleChangeInfo("firstName")}
                                                                value={profileInfo.firstName}
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="slug">
                                                            <Form.Label>Đường dẫn tới trang cá nhân</Form.Label>
                                                            <InputGroup>
                                                                <Form.Control
                                                                    ref={slugRef}
                                                                    type="text"
                                                                    onChange={handleChangeSlug}
                                                                    value={profileInfo.slug}
                                                                    onBlur={handleCheckSlug}
                                                                    onFocus={handleFocusSlug}
                                                                    className={
                                                                        !isSlugValid && !isFocusingSlug
                                                                            ? `border-danger`
                                                                            : ""
                                                                    }
                                                                />
                                                                <Overlay
                                                                    target={slugRef.current}
                                                                    placement="top"
                                                                    show={isFocusingSlug}
                                                                >
                                                                    <Tooltip id="password-tooltip">
                                                                        <div className="text-left">
                                                                            <span>- Chỉ nhập ký tự chữ và số</span>
                                                                        </div>
                                                                    </Tooltip>
                                                                </Overlay>
                                                                <InputGroup.Append>
                                                                    <InputGroup.Text>
                                                                        <i
                                                                            className={`fas ${
                                                                                isSlugValid
                                                                                    ? "fa-check text-success"
                                                                                    : "fa-times text-error"
                                                                            }`}
                                                                        />
                                                                    </InputGroup.Text>
                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                            {!isSlugValid && !isFocusingSlug && (
                                                                <Form.Text className="text-danger">
                                                                    {slugInvalidMsg}
                                                                </Form.Text>
                                                            )}
                                                        </Form.Group>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="dob">
                                                            <Form.Label>Ngày sinh</Form.Label>
                                                            <DatePicker
                                                                className="form-control"
                                                                selected={profileInfo.dob}
                                                                onChange={handleChangeDob}
                                                                dateFormat="dd/MM/yyyy"
                                                                showMonthDropdown
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                maxDate={MAX_DATE_FOR_DOB}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} controlId="city">
                                                            <Form.Label>Quê quán</Form.Label>
                                                            <Select
                                                                options={provinceOptions}
                                                                value={profileInfo.province}
                                                                onChange={handleChangeProvince}
                                                                placeholder=""
                                                            />
                                                        </Form.Group>
                                                    </Form.Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="gender">
                                                    <Form.Label>Giới tính</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        onChange={handleChangeInfo("idGender")}
                                                        value={profileInfo.idGender}
                                                    >
                                                        {genderOptions.map((_option) => (
                                                            <option key={_option.key} value={_option.value}>
                                                                {_option.label}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="preference">
                                                    <Form.Label>Xu hướng</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        onChange={handleChangeInfo("idPreference")}
                                                        value={profileInfo.idPreference}
                                                    >
                                                        {preferenceOptions.map((_option) => (
                                                            <option key={_option.key} value={_option.value}>
                                                                {_option.label}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Form.Group>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="weight">
                                                    <Form.Label>Cân nặng</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                            min={30}
                                                            onChange={handleChangeInfo("weight")}
                                                            onKeyPress={handleInputNumber}
                                                            value={profileInfo.weight}
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
                                                            value={profileInfo.height}
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
                                            </Form.Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group controlId="hobby">
                                                <Form.Label>Sở thích</Form.Label>
                                                {profileInfo.hobbies.length > 0 ? (
                                                    <Container
                                                        className="border p-3 hobby-container"
                                                        onClick={() => setHobbyModal(true)}
                                                    >
                                                        {profileInfo.hobbies.map((_hobby, _idx) => (
                                                            <HobbyPill
                                                                key={_idx}
                                                                hobby={_hobby}
                                                                hoverable
                                                                onClick={() => setHobbyModal(true)}
                                                            />
                                                        ))}
                                                    </Container>
                                                ) : (
                                                    <Form.Control
                                                        onClick={() => setHobbyModal(true)}
                                                        placeholder={"Bạn thích làm gì lúc rảnh?"}
                                                    />
                                                )}
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
                                                    value={profileInfo.bio}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-15">
                                        <Col md={3} className="text-left">
                                            <Link to="/profile">
                                                <Button variant="link">Bỏ qua</Button>
                                            </Link>
                                        </Col>
                                        <Col md={9} className="text-right" onClick={handleUpdateInfo}>
                                            <Button variant="info" disabled={isLoading}>
                                                {isLoading && <i className="fas fa-spinner fa-spin" />} Hoàn tất
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Transition>
            <HobbyModal
                open={hobbyModal}
                onClose={() => setHobbyModal(false)}
                hobbies={hobbies}
                currentHobbies={profileInfo.hobbies}
                handleAddHobby={handleAddHobby}
                handleRemoveHobby={handleRemoveHobby}
            />
        </>
    );
}

export default UpdateInfo;
