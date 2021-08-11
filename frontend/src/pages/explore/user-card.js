import {
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
  Alert,
} from "react-bootstrap";
import { LazyImage } from "../../components";
import DefaultBanner from "../../assets/img/default-banner.jpg";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import { getImageUrl } from "../../common/common";
import moment from "moment";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import {
  duration,
  defaultStyle,
  transitionStyles,
} from "../../common/transition-style";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as imageModalActions from "../../components/album/image-modal/slice";
import * as exploreActions from "./slice";

function UserCard(props) {
  const { users } = useSelector((state) => state.explore);
  return (
    <>
      {users.length > 0 ? (
        <UserInfo user={users[0]} key={users[0].id} />
      ) : (
        <Row>
          <Col md={12}>
            <Alert variant="secondary">
              Hiện chưa có đối tượng phù hợp để bắt cặp với bạn, vui lòng quay
              lại sau nha :D
            </Alert>
          </Col>
        </Row>
      )}
    </>
  );
}

function UserInfo({ user }) {
  const [inProp, setInProp] = useState(false);
  const { isSkippedBtnLoading } = useSelector((state) => state.explore);

  const dispatch = useDispatch();

  useEffect(() => {
    setInProp(true);
  }, [user]);

  const handleViewImage = (idImage) => {
    dispatch(imageModalActions.openModal(idImage));
  };

  const handleSkipUser = () => {
    dispatch(exploreActions.changeSkipUser(user.id));
  };

  const handleFollowUser = () => {
    dispatch(exploreActions.changeFollowUser(user.id));
  };

  return (
    <>
      <Transition in={inProp} timeout={duration}>
        {(state) => (
          <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <Row>
              <Col
                className="bg-facebook--darker br-10 pb-4 pt-0 pl-4 pr-4"
                md={{ span: 6, offset: 3 }}
              >
                <Row>
                  <Col md={12} className="p-2 mb-4">
                    <LazyImage
                      onClick={() =>
                        handleViewImage(user.banner ? user.banner.id : null)
                      }
                      className="w-100"
                      style={{
                        height: 200,
                        position: "absolute",
                        overflow: "hidden",
                        left: 0,
                        zIndex: 0,
                      }}
                      src={
                        user.banner
                          ? getImageUrl(user.banner.fileName)
                          : DefaultBanner
                      }
                    />
                    <LazyImage
                      onClick={() =>
                        handleViewImage(user.avatar ? user.avatar.id : null)
                      }
                      className="avatar"
                      style={{
                        height: 200,
                        width: 200,
                        borderRadius: 200,
                        position: "relative",
                        marginTop: 0,
                        zIndex: 1,
                        overflow: "hidden",
                      }}
                      src={
                        user.avatar
                          ? getImageUrl(user.avatar.fileName)
                          : DefaultAvatar
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <p className="h4">{`${user.lastName} ${user.firstName}`}</p>
                    <p>{user.bio}</p>
                  </Col>
                  <Col md={6} className="text-right">
                    <p>
                      {user.gender && (
                        <>
                          <i className={`${user.gender.icon}`} />{" "}
                          {user.gender.name} -{" "}
                        </>
                      )}
                      {user.preference && (
                        <>
                          <i className={`${user.preference.icon}`} />{" "}
                          {user.preference.name}
                        </>
                      )}
                    </p>
                    <p>
                      {user.height && <>Cao: {user.height}cm - </>}
                      {user.weight && <>Nặng: {user.weight}kg</>}
                    </p>
                  </Col>
                </Row>
                <Row className="mb-5">
                  {user.dob && (
                    <Col md={6}>
                      <i className="fas fa-birthday-cake" />{" "}
                      {moment(user.dob).format("DD-MM-YYYY")}
                    </Col>
                  )}
                  {user.provinceName && (
                    <Col md={6} className={user.dob && "text-right"}>
                      <i className="fas fa-home" /> {user.provinceName}
                    </Col>
                  )}
                </Row>
                <span className="h4">
                  <b>Sở thích</b>
                </span>
                {user.hobbies.length > 0 ? (
                  <Row>
                    <Col md={12}>
                      {user.hobbies.map((hobby, idx) => (
                        <div key={idx} className="profile__hobby">
                          <i className={`${hobby.icon}`} /> {hobby.name}
                        </div>
                      ))}
                    </Col>
                  </Row>
                ) : (
                  <p>- Hiện người dùng này chưa có sở thích nào</p>
                )}
                <Row className="mt-3">
                  <Col md={3}>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Bỏ qua</Tooltip>}
                    >
                      <Button
                        variant="danger"
                        className="user-card__btn"
                        disabled={isSkippedBtnLoading}
                        onClick={handleSkipUser}
                      >
                        {isSkippedBtnLoading ? (
                          <i className="fas fa-spin fa-spinner 2x" />
                        ) : (
                          <i className="fas fa-thumbs-down fa-2x" />
                        )}
                      </Button>
                    </OverlayTrigger>
                  </Col>
                  <Col md={3} className="text-center">
                    <Link to={`/profile/${user.slug}`}>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Xem trang cá nhân</Tooltip>}
                      >
                        <Button variant="info" className="user-card__btn">
                          <i className="fas fa-home fa-2x" />
                        </Button>
                      </OverlayTrigger>
                    </Link>
                  </Col>
                  <Col md={3} className="text-center">
                    <Link to={`/messages/${user.slug}`}>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Nhắn tin</Tooltip>}
                      >
                        <Button variant="info" className="user-card__btn">
                          <i className="fas fa-comment-dots fa-2x" />
                        </Button>
                      </OverlayTrigger>
                    </Link>
                  </Col>
                  <Col md={3} className="text-right">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Theo dõi và tiếp tục</Tooltip>}
                    >
                      <Button
                        variant="success"
                        className="user-card__btn"
                        onClick={handleFollowUser}
                      >
                        <i className="fas fa-thumbs-up fa-2x" />
                      </Button>
                    </OverlayTrigger>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Transition>
    </>
  );
}

export default UserCard;
