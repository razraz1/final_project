const massageModel = require("../dal/user.model");

async function create(data) {
  return userModel.create(data);
}

async function read() {
  return await userModel.find({ isActive: true });
}

async function readOne(filter) {
  return await userModel.findOne({...filter,  isActive: true });
}

async function update(filter, data) {
  return await userModel.update({...filter, isActive: true}, data);
}

async function updateMany(filter, data) {
  return await userModel.updateMany({...filter, isActive: true}, data);
}

async function delMany(filter) {
  return await userModel.updateMany(filter, { isActive: false });
}

async function delOne(filter) {
  return await userModel.updateOne(filter, { isActive: false });
}


module.exports = {create, read, readOne, update, updateMany, delOne, delMany}
