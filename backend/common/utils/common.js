const _ = require("lodash");

function mutableTrimObj(obj) {
    Object.keys(obj).forEach((key) => {
        if (_.isString(obj[key])) {
            obj[key] = obj[key].trim();
            if (!obj[key]) {
                obj[key] = null;
            }
        }
    });
}

function immutableTrimObj(obj) {
    const _obj = _.cloneDeep(obj);
    Object.keys(_obj).forEach((key) => {
        if (_.isString(_obj[key])) {
            _obj[key] = _obj[key].trim();
            if (!_obj[key]) {
                _obj[key] = null;
            }
        }
    });
    return _obj;
}

const getSlug = (str) => {
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
};

module.exports = {
    mutableTrimObj,
    immutableTrimObj,
    getSlug,
};
