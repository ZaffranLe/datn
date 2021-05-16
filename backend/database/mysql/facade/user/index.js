const knex = require("../knex-client");
const _ = require("lodash");
const { v4 } = require("uuid");
const { mutableTrimObj } = require("../../../../common/utils/common");

async function getUserBasicInfoById(id) {
    const fields = {
        id: "t1.id",
        avatar: "t1.avatar",
        firstName: "t1.firstName",
        lastName: "t1.lastName",
        slug: "t1.slug",
    };
    const user = await knex("user AS t1").where("id", id).column(fields).first();
    return user;
}

async function getUserByEmail(email) {
    const user = await knex("user").where({ email: email }).first();
    return user;
}

async function getUserBySlug(slug) {
    const user = await knex("user").where("slug", slug).first();
    return user;
}

async function getUserById(id) {
    const user = await knex("user").where("id", id).first();
    if (!user) {
        throw new UserError("Không tồn tại người dùng.", "USER_NOT_EXIST");
    }
    delete user.password;

    const hobbyFields = {
        id: "t2.id",
        name: "t2.name",
        slug: "t2.slug",
        icon: "t2.icon",
    };
    const hobbies = await knex("user_hobby AS t1")
        .join("hobby AS t2", "t1.idHobby", "t2.id")
        .column(hobbyFields)
        .where("t1.idUser", user.id);
    user.hobbies = hobbies;

    const gender = await knex("gender").where("id", user.idGender).first();
    user.gender = gender || {};

    const preference = await knex("preference").where("id", user.idPreference).first();
    user.preference = preference || {};

    const province = await knex("province").where("id", user.idProvince).first();
    user.provinceName = province ? province.name : "";

    const following = await knex("user_follow").where("idUserFrom", user.id);
    const followingPromise = [];
    for (let follower of following) {
        followingPromise.push(getUserBasicInfoById(follower.idUserTo));
    }
    const followingResult = await Promise.all(followingPromise);
    user.following = followingResult;

    const followedPromise = [];
    const followed = await knex("user_follow").where("idUserTo", user.id);
    for (let follower of followed) {
        followedPromise.push(getUserBasicInfoById(follower.idUserFrom));
    }
    const followedResult = await Promise.all(followedPromise);
    user.followed = followedResult;

    const avatar = await knex("image").where("id", user.avatar).first();
    user.avatar = avatar;

    const banner = await knex("image").where("id", user.banner).first();
    user.banner = banner;

    return user;
}

async function register(info, transaction = null) {
    const _knex = transaction || knex;
    const fields = ["email", "password", "createdAt"];
    const data = _.pick(info, fields);
    data.lastName = "Soulatte";
    data.firstName = "User";
    data.slug = v4();
    const result = await _knex("user").insert(data);
    if (result.length) {
        return result[0];
    }
    return null;
}

async function update(id, info, transaction = null) {
    const _knex = transaction || (await knex.transaction());
    try {
        const fields = [
            "firstName",
            "lastName",
            "dob",
            "idGender",
            "idPreference",
            "weight",
            "height",
            "bio",
            "slug",
            "avatar",
            "banner",
        ];
        const data = _.pick(info, fields);
        data.idProvince = info.province ? info.province.value : undefined;
        data.dob = new Date(data.dob);
        mutableTrimObj(data);
        await _knex("user").update(data).where("id", id);

        const _hobbies = info.hobbies.map((_hobby) => _hobby.id);
        let _currentHobbies = await knex("user_hobby").where("idUser", id);
        _currentHobbies = _currentHobbies.map((_hobby) => _hobby.idHobby);

        let _newHobbies = _hobbies.filter((_hobby) => !_currentHobbies.find((_id) => _id === _hobby));
        _newHobbies = _newHobbies.map((_idHobby) => ({
            idUser: id,
            idHobby: _idHobby,
        }));
        if (_newHobbies.length > 0) {
            await _knex("user_hobby").insert(_newHobbies);
        }

        const _deleteHobbies = _currentHobbies.filter((_id) => !_hobbies.find((_hobby) => _id === _hobby));
        if (_deleteHobbies.length > 0) {
            await _knex("user_hobby").whereIn("idHobby", _deleteHobbies).del();
        }

        if (data.avatar) {
            await _knex("image").update({ idUser: id }).where("id", data.avatar);
        }
        if (data.banner) {
            await _knex("image").update({ idUser: id }).where("id", data.banner);
        }

        if (!transaction) {
            await _knex.commit();
        }
        const _newUserInfo = await getUserById(id);
        return _newUserInfo;
    } catch (e) {
        if (!transaction) {
            await _knex.rollback();
        }
        throw e;
    }
}

async function checkSlugExist(slug) {
    const slugExist = await knex("user").where("slug", slug).first();
    return slugExist;
}

async function checkFollowUser(from, to) {
    const isFollowing = await knex("user_follow")
        .where({
            idUserFrom: from,
            idUserTo: to,
        })
        .first();
    return isFollowing;
}

async function changeFollowUser(from, to, transaction = null) {
    const _knex = transaction || knex;
    const isFollowing = await _knex("user_follow")
        .where({
            idUserFrom: from,
            idUserTo: to,
        })
        .first();
    if (isFollowing) {
        await _knex("user_follow")
            .where({
                idUserFrom: from,
                idUserTo: to,
            })
            .del();
    } else {
        await _knex("user_follow").insert({ idUserFrom: from, idUserTo: to });
    }
    return !isFollowing;
}

module.exports = {
    getUserByEmail,
    getUserById,
    register,
    update,
    checkSlugExist,
    getUserBySlug,
    checkFollowUser,
    changeFollowUser,
};
