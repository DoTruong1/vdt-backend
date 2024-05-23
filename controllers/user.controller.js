const {
  User,
} = require('../models');

const utils = require("../utils")

// const User = require("../models").User

let createUser = async (req, res, next) => {
  const user = req.body
  const objKeys = Object.keys(user);
  const requiredField = ["name", "school", "gender"];
  const missingRequired = requiredField.reduce(
    (missing, key) => {
      if (!objKeys.includes(key)) {
        missing.push(key);
      }
      return missing;
    }, []
  );
  const hasRequiredKeys = missingRequired.length === 0;

  if (!hasRequiredKeys) {
    console.error("Thiếu một hoặc nhiều trường bắt buộc: " + missingRequired.toString())
    return res.status(400).json({
      detail: "Thiếu một hoặc nhiều trường bắt buộc: " + missingRequired.toString(),
      error: "Thiếu một hoặc nhiều trường bắt buộc"
    })
  }

  // console.log
  try {
    let createdUser = await User.create({
      name: user.name,
      school: user.school,
      gender: user.gender
    })

    if (createdUser) {
      return res.status(200).json({
        data: createdUser,
      });
    } else {
      return res.status(500).json({
        error: "Có lỗi xảy ra khi tạo người dùng",
      });
    }


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

let getUser = async (req, res, next) => {
  const { userID } = req.params

  // if (userID === undefined) {
  //   return res.status(400).json({
  //     error: "Request để lấy thông tin người dùng không hợp lệ"
  //   });
  // }
  // console.log(userID)
  try {
    let user = await User.findByPk(userID)
    if (user) {
      return res.status(200).json({
        data: user,
      });
    } else {
      console.error("Không tìm thấy thông tin người dùng với id: " + userID)
      return res.status(404).json({
        error: "Không tìm thấy thông tin người dùng",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
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
