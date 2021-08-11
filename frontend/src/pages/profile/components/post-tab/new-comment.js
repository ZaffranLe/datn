import React, { useState } from "react";
import {
  Row,
  Col,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { LazyImage } from "../../../../components";
import { toast } from "react-toastify";
import { getImageUrl, getUserInfoFromToken } from "../../../../common/common";
import { uploadImages } from "../../../../utils/api/common";
import constants from "../../../../common/constants";
import * as api from "../../api";
import _ from "lodash";

function NewComment({ post, setPost, replyComment = null }) {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [isPostingComment, setPostingComment] = useState(false);

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (comment || image) {
        setComment(comment.trim());
        submitComment();
      }
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
      const uploadedImages = await uploadImages([image]);
      setImage(uploadedImages[0]);
    } catch (e) {
      console.error(e);
      toast.error(e.response.data.message);
    }
  };

  const submitComment = async () => {
    try {
      setPostingComment(true);
      const newComment = await api.submitCommentToPost(
        post.id,
        comment.trim(),
        image,
        replyComment ? replyComment.id : null
      );
      setComment("");
      setImage(null);
      const userInfo = getUserInfoFromToken();
      setPost({
        ...post,
        comments: [
          ...post.comments,
          {
            content: comment.trim(),
            imgFileName: image ? image.fileName : null,
            imgId: image ? image.id : null,
            createdAt: new Date(),
            userSlug: userInfo.slug,
            userFirstName: userInfo.firstName,
            userLastName: userInfo.lastName,
            userAvatar: userInfo.avatar ? userInfo.avatar.fileName : null,
            id: newComment.id,
            idComment: replyComment ? replyComment.id : null,
            comments: [],
          },
        ],
      });
    } catch (e) {
      console.error(e);
      toast.error("Hệ thống gặp sự cố! Vui lòng thử lại sau.");
    } finally {
      setPostingComment(false);
    }
  };

  return (
    <>
      <Row className="mt-3 mb-2">
        <Col md={11}>
          <FormControl
            className="bg-facebook--darker border-0 br-10"
            placeholder="Để lại bình luận của bạn"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={handleKeyUp}
            as={TextareaAutosize}
            minRows={1}
            disabled={isPostingComment}
          />
        </Col>
        <Col md={1}>
          {isPostingComment ? (
            <i className="fas fa-spin fa-spinner" />
          ) : (
            <>
              <OverlayTrigger
                placement="top"
                delay={{ show: 400, hide: 200 }}
                overlay={(_props) => <Tooltip {..._props}>Ảnh</Tooltip>}
              >
                <label htmlFor="post__upload-image" className="mb-0">
                  <i className="fas fa-image text-success fa-2x clickable" />
                </label>
              </OverlayTrigger>
              <input
                type="file"
                className="d-none"
                id="post__upload-image"
                accept="image/*"
                onChange={handleAddImage}
              />
            </>
          )}
        </Col>
      </Row>
      {image && (
        <Row>
          <Col md={12}>
            <LazyImage
              className="br-10 mt-2"
              style={{
                width: 300,
                height: 225,
              }}
              src={getImageUrl(image.fileName)}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default NewComment;
