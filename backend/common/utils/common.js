const _ = require("lodash");

function mutableTrimObj(obj) {
    Object.keys(obj).forEach((key) => {
        if (_.isString(obj[key])) {
            obj[key] = obj[key].trim();
        }
    });
}

function immutableTrimObj(obj) {
    const _obj = _.cloneDeep(obj);
    Object.keys(_obj).forEach((key) => {
        if (_.isString(_obj[key])) {
            _obj[key] = _obj[key].trim();
        }
    });
    return _obj;
}

module.exports = {
    mutableTrimObj,
    immutableTrimObj,
};
