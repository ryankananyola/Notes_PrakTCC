import User from "../models/UserModel.js";

// GET
async function getUsers(req, res) {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// GET
async function getUserById(req, res) {
  try {
    const response = await User.findOne({
      where:{
        id: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// CREATE
async function createUser(req, res) {
  try {
    const inputResult = req.body;
    await User.create(inputResult);
    res.status(201).json({ msg: "Notes Created" });
  } catch (error) {
    console.log(error.message);
  }
}

export { getUsers, createUser, getUserById };


export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ msg: "Notes Updated" });
  }
  catch (error) {
    console.log(error.message);
  }
}

export const deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    if (result === 0) {
      res.status(404).json({ msg: "Notes Not Found" });
    } else {
      res.status(200).json({ msg: "Notes Deleted" });
    }
  }
  catch (error) {
    console.log(error.message);
  }
}