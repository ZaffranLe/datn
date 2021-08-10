import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  FormControl,
  OverlayTrigger,
  Tooltip,
  Overlay,
  Popover,
} from "react-bootstrap";
import { useContext, useEffect, useRef } from "react";
import { getImageUrl, getUserInfoFromToken } from "../../../common/common";
import { useState } from "react";
import { LazyImage } from "../../../components";
import DefaultAvatar from "../../../assets/img/default-avatar.png";
import Skeleton from "react-loading-skeleton";
import TextareaAutosize from "react-textarea-autosize";
import * as messageActions from "../slice";
import { SocketContext } from "../../../context";
import { Link } from "react-router-dom";
import { uploadImages } from "../../../utils/api/common";
import constants from "../../../common/constants";
import { toast } from "react-toastify";

function MessageWithUser({ messageGroups }) {
  const socket = useContext(SocketContext);
  const { currentUser, isUserInfoLoading } = useSelector(
    (state) => state.message
  );

  const [selfInfo, setSelfInfo] = useState({
    avatar: null,
    firstName: "User",
    lastName: "Soulatte",
  });
  const [image, setImage] = useState(null);
  const [isImageLoading, setImageLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userInfo = getUserInfoFromToken();
    setSelfInfo(userInfo);
  }, []);

  useEffect(() => {
    if (messageGroups.length > 0) {
      const chatbox = document.getElementById("chatbox");
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }, [messageGroups]);

  const dispatch = useDispatch();

  const handleKeyUp = (e) => {
    const ENTER = "Enter";
    if (e.key === ENTER && !e.shiftKey && message) {
      const info = {
        idUserTo: currentUser.id,
        content: message.trim(),
        image,
        createdAt: new Date(),
      };
      dispatch(messageActions.sendMessage(info, socket));
      setMessage("");
      setImage(null);
    }
  };

  const handleAddImage = async (e) => {
    try {
      let image = null;
      if (e.target.files.length > 0) {
        image = e.target.files[0];
      } else {
        return null;
      }
      const exceedSizeImg = image.size > constants.MAX_FILE_SIZE;
      if (exceedSizeImg) {
        toast.error("Ảnh vượt quá kích thước tối đa 5MB!");
        return null;
      }
      setImageLoading(true);
      const uploadedImages = await uploadImages([image]);
      setImage(uploadedImages[0]);
    } catch (e) {
      console.error(e);
      toast.error(e.response.data.message);
    } finally {
      setImageLoading(false);
    }
  };

  const inputRef = useRef(null);

  return (
    <>
      {currentUser && (
        <Row className="bg-facebook--dark m-2 p-4 br-10 h-90 message--box__wrapper">
          <Col md={12} className="h-100 message--box">
            <Row className="">
              <Col md={12}>
                {isUserInfoLoading ? (
                  <>
                    <Skeleton count={1} />
                  </>
                ) : (
                  <div className="display--flex pb-4 mb-3 border-bottom message-box__header">
                    <Link to={`/profile/${currentUser.slug}`}>
                      <LazyImage
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 60,
                        }}
                        src={
                          currentUser.avatar
                            ? getImageUrl(currentUser.avatar)
                            : DefaultAvatar
                        }
                      />
                    </Link>
                    <div style={{ height: 60 }} className="display--table ml-2">
                      <span className="display--table-cell vertical-align-middle">
                        <Link to={`/profile/${currentUser.slug}`}>
                          <big className="text-white">
                            {currentUser.lastName} {currentUser.firstName}
                          </big>
                        </Link>
                      </span>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            {/* Chat box is a body of message--box */}
            <Row className="message--box__body" id="chatbox">
              <Col md={12} className="message-content-wrapper">
                {messageGroups.map((_group, _idx) => (
                  <Row key={_idx}>
                    <Col
                      md={{
                        span: 4,
                        offset: _group.fromSelf ? 8 : 0,
                      }}
                    >
                      <div className="display--flex">
                        {!_group.fromSelf && (
                          <div
                            style={{ alignSelf: "flex-end" }}
                            className="mr-2"
                          >
                            <Link to={`/profile/${currentUser.slug}`}>
                              <LazyImage
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 40,
                                }}
                                src={
                                  currentUser.avatar
                                    ? getImageUrl(currentUser.avatar)
                                    : DefaultAvatar
                                }
                              />
                            </Link>
                          </div>
                        )}
                        <div className="w-100">
                          <Link
                            to={`/profile/${
                              _group.fromSelf ? selfInfo.slug : currentUser.slug
                            }`}
                          >
                            <p className="text-white">
                              {_group.fromSelf
                                ? selfInfo.firstName
                                : currentUser.firstName}
                            </p>
                          </Link>
                          {_group.messages.map((__msg, __idx) => (
                            <div
                              key={__idx}
                              className="p-2 msg__bg--light br-10 mt-2"
                            >
                              <pre className="comment text-white mb-0 message-content">
                                {__msg.content}
                              </pre>
                              {__msg.image && (
                                <LazyImage
                                  className="br-10 mt-2"
                                  src={getImageUrl(__msg.image)}
                                  style={{ width: 300, height: 200 }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        {_group.fromSelf && (
                          <div
                            style={{ alignSelf: "flex-end" }}
                            className="ml-2"
                          >
                            <LazyImage
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 40,
                              }}
                              src={
                                selfInfo.avatar
                                  ? getImageUrl(selfInfo.avatar.fileName)
                                  : DefaultAvatar
                              }
                            />
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
            {/* Message input box */}
            <Row className="w-100 display--table m-0 mt-3">
              <div className="display--table-cell vertical-align-middle w-100">
                <FormControl
                  className="w-100"
                  type="text"
                  placeholder="Tin nhắn"
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyUp={handleKeyUp}
                  as={TextareaAutosize}
                  maxRows={1}
                  value={message}
                  // Should have a resize script or use resizable library
                  style={{ resize: "none" }}
                  ref={inputRef}
                />
                <Overlay
                  placement="top-end"
                  show={Boolean(image)}
                  target={inputRef.current}
                >
                  <Popover onClick={() => setImage(null)}>
                    <LazyImage
                      className="br-10 m-1"
                      style={{
                        width: 150,
                        height: 100,
                      }}
                      src={getImageUrl(image && image.fileName)}
                    />
                  </Popover>
                </Overlay>
                <div className="mt-1">
                  {isImageLoading ? (
                    <i className="fas fa-spin fa-spinner" />
                  ) : (
                    <>
                      <OverlayTrigger
                        placement="top"
                        delay={{ show: 400, hide: 200 }}
                        overlay={(_props) => <Tooltip {..._props}>Ảnh</Tooltip>}
                      >
                        <label htmlFor="upload-image" className="mb-0">
                          <i className="fas fa-image text-success fa-2x clickable" />
                        </label>
                      </OverlayTrigger>
                      <input
                        type="file"
                        className="d-none"
                        id="upload-image"
                        multiple
                        accept="image/*"
                        onChange={handleAddImage}
                      />
                    </>
                  )}
                </div>
              </div>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default MessageWithUser;
