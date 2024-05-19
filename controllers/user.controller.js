const { use } = require("../routes")
const utils = require("../utils")

const User = require("../models").User

let createUser = async (req, res, next) => {
  const user = req.body
  // console.log
  try {
    let createdUser = await User.create({
      name: user.name,
      school: user.school,
      gender: user.gender
    })
    res.status(200).json({
      data: createdUser,
    });

  } catch (error) {
    res.json({ error: error.message });
  }
}

let getUser = async (req, res, next) => {
  const { userID } = req.params
  // console.log(userID)
  try {
    let user = await User.findByPk(userID)
    // console.log(user)
    res.status(200).json({
      data: user,
    });

  } catch (error) {
    res.json({ error: error.message });
  }
}

let getUsers = async (req, res, next) => {
  const page = utils.parser.tryParseInt(req.query.page, 0);
  const limit = utils.parser.tryParseInt(req.query.limit, 10);
  // console.log("in get users")
  try {
    const result = await User.findAndCountAll({
      where: {},
      offset: limit * page,
      limit: limit,
      order: [["name", "ASC"]],
    })
    // console.log(result)
    res.status(200).json(utils.paging.paginate(result, page, limit));
  } catch (error) {
    res.json({ error: error.message });
  }
}

let updateUserInfo = async (req, res, next) => {
  const { userID } = req.params;
  const newUserInfo = req.body;
  console.log("update user:" + userID)
  try {
    const user = await User.findByPk(userID);
    await user.update({
      id: userID,
      name: newUserInfo.name,
      school: newUserInfo.school,
      gender: newUserInfo.gender
    });
    await user.save().then()
    console.log("updated")
    res.status(200).json({
      "data": {
        "id": userID
      }
    });

  } catch (error) {
    res.json({ error: error.message });

  }
}
let deleteUser = async (req, res, next) => {
  const { userID } = req.params;
  try {
    const user = await User.findByPk(userID);
    await user.destroy()

    res.status(200).json({
      "data": {
        "id": userID
      }
    });

  } catch (error) {
    res.json({ error: error.message });

  }
}


module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUserInfo,
  deleteUser
}
