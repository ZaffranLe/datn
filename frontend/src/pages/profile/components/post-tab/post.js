import {
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Button,
  FormControl,
} from "react-bootstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import "./index.scss";
import PhotoSection from "./photo-section";
import * as api from "../../api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LazyImage } from "../../../../components";
import {
  getImageUrl,
  calcTimeDifferenceFromNow,
  getUserInfoFromToken,
} from "../../../../common/common";
import Comment from "./comment";
import NewComment from "./new-comment";
import { useDispatch } from "react-redux";
import * as postActions from "../../slice";

function Post({ post, user }) {
  const MAX_CONTENT_LENGTH = 300;
  const [_post, setPost] = useState(null);
  const [_comments, setComments] = useState([]);
  const [isLikeBtnLoading, setLikeBtnLoading] = useState(false);
  const [isContentExtended, setContentExtended] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const userInfo = getUserInfoFromToken();

  const dispatch = useDispatch();

  useEffect(() => {
    const shortedContent =
      post.content.length > MAX_CONTENT_LENGTH
        ? `${post.content.slice(0, MAX_CONTENT_LENGTH)}...`
        : post.content;
    setPost({ ...post, shortedContent });
  }, [post]);

  useEffect(() => {
    if (_post) {
      const processedComments = _post.comments.map((_comment) => {
        return {
          ..._comment,
          comments: _post.comments.filter(
            (__comment) => __comment.idComment === _comment.id
          ),
        };
      });
      setComments(processedComments.filter((_comment) => !_comment.idComment));
    }
  }, [_post]);

  const changeLikeStatus = async () => {
    setLikeBtnLoading(true);
    try {
      const data = await api.changeLikeStatus(_post.id);
      setPost({ ..._post, isLiked: data.isLiked, numOfLike: data.numOfLike });
    } catch (e) {
      toast.error("Hệ thống gặp sự cố! Vui lòng thử lại sau.");
    }
    setLikeBtnLoading(false);
  };

  const handleDeletePost = () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá bài đăng này?");
    if (confirm) {
      dispatch(postActions.deletePost(post.id))
    }
  }

  return (
    <>
      {_post && (
        <Row className="justify-content-center pl-3 mt-3">
          <Col md={12}>
            <Row>
              <Col md={12} className="bg-facebook--dark br-10 p-3">
                <Row>
                  <Col md={12}>
                    <div className="display--flex">
                      <span>
                        <LazyImage
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                            margin: "auto",
                          }}
                          src={
                            user.avatar
                              ? getImageUrl(user.avatar.fileName)
                              : null
                          }
                        />
                      </span>
                      <span className="w-100 ml-3">
                        <div className="display--table h-100">
                          <span className="display--table-cell vertical-align-middle">
                            <Row>
                              <Col md={12}>
                                <span
                                  className="clickable text-white"
                                  as={Link}
                                  to={`${user.slug}`}
                                >
                                  {user.lastName} {user.firstName}
                                </span>{" "}
                                {userInfo.id === _post.idUser && (
                                  <OverlayTrigger show={showToolbar} placement="right" overlay={
                                    <Tooltip>
                                      <p className="clickable">Sửa bài đăng</p>
                                      <p className="clickable" onClick={handleDeletePost}>Xoá bài đăng</p>
                                    </Tooltip>
                                  }>
                                    <i onClick={() => setShowToolbar(!showToolbar)} className="fas fa-ellipsis-h clickable text-white-50" />
                                  </OverlayTrigger>
                                )}
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12}>
                                <OverlayTrigger
                                  key="bottom"
                                  placement="bottom"
                                  overlay={
                                    <Tooltip>
                                      <span>
                                        {moment(_post.createdAt).format(
                                          "DD/MM/YYYY HH:mm"
                                        )}
                                      </span>
                                    </Tooltip>
                                  }
                                >
                                  <span className="text-white-50">
                                    {calcTimeDifferenceFromNow(_post.createdAt)}
                                  </span>
                                </OverlayTrigger>
                              </Col>
                            </Row>
                          </span>
                        </div>
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="pl-4 pt-3 pr-4">
                    <p>
                      {isContentExtended ? _post.content : _post.shortedContent}{" "}
                      {_post.content.length > MAX_CONTENT_LENGTH && (
                        <span
                          className="clickable"
                          onClick={() => setContentExtended(!isContentExtended)}
                        >
                          {isContentExtended ? "Ẩn bớt" : "Xem thêm"}
                        </span>
                      )}
                    </p>
                  </Col>
                </Row>
                {_post.images.length > 0 && (
                  <PhotoSection
                    images={_post.images.map((img) =>
                      getImageUrl(img.fileName)
                    )}
                  />
                )}
                <Row>
                  <Col md={3} className="text-center p-3">
                    <Button
                      className={`bg-facebook--dark border-0 ${
                        _post.isLiked ? "post-btn-liked" : "post-btn-like"
                      }`}
                      block
                      disabled={isLikeBtnLoading}
                      onClick={changeLikeStatus}
                    >
                      <i
                        className={`fas ${
                          isLikeBtnLoading
                            ? "fa-spin fa-spinner"
                            : "fa-thumbs-up"
                        }`}
                      />{" "}
                      {_post.isLiked ? "Đã thích" : "Thích"}
                    </Button>
                  </Col>
                  <Col md={9}>
                    <div className="h-100 display--table">
                      <span className="display--table-cell vertical-align-middle">
                        {_post.numOfLike !== 0 && (
                          <span className="text-primary">
                            <i className="fas fa-thumbs-up" /> {_post.numOfLike}
                          </span>
                        )}
                      </span>
                    </div>
                  </Col>
                </Row>
                <div style={{ maxHeight: 400, overflowY: "auto" }}>
                  {_comments.map((_comment) => (
                    <Comment
                      key={_comment.id}
                      comment={_comment}
                      post={_post}
                      setPost={setPost}
                    />
                  ))}
                </div>
                <NewComment post={_post} setPost={setPost} />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Post;
