const userModel = require("./user.model");

async function create(data) {
  return userModel.create(data);
}

async function read(filter) {
  return await userModel.find(...filter, { isActive: true });
}

async function readOne(filter) {
  return await userModel.findOne(...filter, { isActive: true });
}

async function update(filter, data) {
  return await userModel.update(filter, data);
}

async function updateMany(filter, data) {
  return await userModel.updateMany(filter, data);
}

async function delMany(filter) {
  return await userModel.updateMany(filter, { isActive: false });
}

async function delOne(filter) {
  return await userModel.deleteOne(filter, { isActive: false });
}


module.exports = {create, read, readOne, update, updateMany, delOne, delMany}
