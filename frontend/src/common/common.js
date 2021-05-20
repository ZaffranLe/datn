import jwt from "jsonwebtoken";
import config from "../utils/config/cfg";
import moment from "moment";

const _config = config[config.environment];

function getSlug(str) {
    let _str = str;
    _str = _str.toLowerCase();
    _str = _str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    _str = _str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    _str = _str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    _str = _str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    _str = _str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    _str = _str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    _str = _str.replace(/(đ)/g, "d");
    _str = _str.replace(/([^0-9a-z-\s])/g, "");
    _str = _str.replace(/- /g, "");
    _str = _str.replace(/(\s+)/g, "-");
    _str = _str.replace(/^-+/g, "");
    _str = _str.replace(/-+$/g, "");
    return _str;
}

function appendTokenInfo(token) {
    localStorage.setItem("token", token);
    const userInfo = jwt.decode(token);
    userInfo.exp = new Date(userInfo.exp * 1000);
}

function getUserInfoFromToken() {
    const token = localStorage.getItem("token");
    if (token) {
        const userInfo = jwt.decode(token);
        return userInfo;
    } else {
        return null;
    }
}

function getImageUrl(name) {
    return `${_config.originBackend}/images/${name}`;
}

function calcTimeDifferenceFromNow(time) {
    const timeConverter = [
        {
            label: "ngày trước",
            ms: 86400000,
            maxValue: 7,
            minValue: 1,
        },
        {
            label: "giờ trước",
            ms: 3600000,
            maxValue: 23,
            minValue: 1,
        },
        {
            label: "phút trước",
            ms: 60000,
            maxValue: 59,
            minValue: 1,
        },
        {
            label: "giây trước",
            ms: 1000,
            maxValue: 59,
            minValue: 0,
        },
    ];
    const now = new Date();
    const _time = new Date(time);
    const timeDifference = now.getTime() - _time.getTime();
    let result = {
        display: "",
        isFitInTimeConverter: false, // if time
    };
    for (let i = 0; i < timeConverter.length; ++i) {
        const _timeValue = Math.floor(timeDifference / timeConverter[i].ms);
        if (_timeValue >= timeConverter[i].minValue && _timeValue <= timeConverter[i].maxValue) {
            result.display = `${_timeValue} ${timeConverter[i].label}`;
            result.isFitInTimeConverter = true;
            break;
        }
    }

    if (!result.isFitInTimeConverter) {
        result.display = moment(_time).format("DD/MM/YYYY");
    }

    return result.display;
}

export { getSlug, appendTokenInfo, getImageUrl, getUserInfoFromToken, calcTimeDifferenceFromNow };
