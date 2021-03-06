import React, { useRef, useState } from "react";
import { FormFile, Form } from "react-bootstrap";
import DefaultAvatar from "../../assets/img/default-avatar.png";
import { getImageUrl, getUserInfoFromToken } from "../../common/common";
import constants from "../../common/constants";
import { LazyImage } from "../../components";
import { uploadImages } from "../../utils/api/common";

function UploadAvatar({ handleChangeAvatar }) {
    const userInfo = getUserInfoFromToken();
    const [errorMsg, setErrorMsg] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(userInfo.avatar ? userInfo.avatar.fileName : null);
    const timeoutRef = useRef(null);

    const uploadImage = async (e) => {
        try {
            let image = null;
            if (e.target.files.length > 0) {
                image = e.target.files[0];
            } else {
                return null;
            }
            if (image.size > constants.MAX_FILE_SIZE) {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                setErrorMsg("Ảnh vượt quá kích thước tối đa 5MB!");
                timeoutRef.current = setTimeout(() => setErrorMsg(null), 5000);
                return null;
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setErrorMsg(null);
            const data = await uploadImages([image]);
            const uploadedImage = data[0];
            handleChangeAvatar(uploadedImage["id"]);
            setAvatarUrl(uploadedImage["fileName"]);
        } catch (e) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setErrorMsg(e.response.data.message);
            timeoutRef.current = setTimeout(() => setErrorMsg(null), 5000);
        }
    };

    return (
        <>
            <FormFile.Label
                htmlFor="avatar-file"
                className="display--table-cell vertical-align-middle clickable"
            >
                <LazyImage
                    id="avatar"
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 200,
                    }}
                    className="avatar"
                    src={avatarUrl ? getImageUrl(avatarUrl) : DefaultAvatar}
                />
                <span>Ảnh đại diện</span>
                {errorMsg && <Form.Text className="text-error text-bold">{errorMsg}</Form.Text>}
            </FormFile.Label>
            <FormFile.Input
                id="avatar-file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={uploadImage}
            />
        </>
    );
}

export default UploadAvatar;
