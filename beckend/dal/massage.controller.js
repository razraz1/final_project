const massageModel = require('../dal/massage.model')

async function create(data) {
  return massageModel.create(data);
}

//SHOW ALL
async function read(filter) {
  return await massageModel.find({...filter, isActive: true });
}

//SHOW ONE
async function readOne(filter) {
  return await massageModel.findOne({ ...filter, isActive: true });
}

//UPDATE
async function update(filter, data) {
  return await massageModel.updateOne({ ...filter, isActive: true }, data);
}

async function updateMany(filter, data) {
  return await massageModel.updateMany({ ...filter, isActive: true }, data);
}

async function delMany(filter) {
  return await massageModel.updateMany(filter,{ isActive: false });
}

async function delOne(filter) {
  return await massageModel.updateOne(filter, {isActive: false });
}


module.exports = {
  create,
  read,
  readOne,
  update,
  updateMany,
  delOne,
  delMany
}
