const massageModel = require('../dal/massage.model')

async function create(data) {
  return massageModel.create(data);
}

//SHOW ALL
async function read(filter) {
  return await massageModel.find({ ...filter});
}

//SHOW TRASH
async function readTrash(filter) {
  return await massageModel.find({ ...filter, isActive: false });
}

//SHOW ONE
async function readOne(filter) {
  console.log(filter);
  return await massageModel.findOne({ ...filter });
}

//UPDATE
async function update(filter, data) {
  return await massageModel.updateOne({ ...filter, isActive: true }, data);
}

//SEARCH
async function searchEmail(userEmail, text) {
  const query = await massageModel.find({
    $or: [
      { from: userEmail, massageBody: { $regex: text, $options: 'i' }, isActive: true },
      { to: userEmail, massageBody: { $regex: text, $options: 'i' }, isActive: true }
    ]
  });
  return query;
}

//STATUS READ
async function readMassage(filter, update, condition) {
  return await massageModel.updateOne(filter, update, condition)
}

//DELETE MASSAGE
async function delOne(filter, update, condition) {
  return await massageModel.updateOne(filter, update, condition);
}

async function updateMany(filter, data) {
  return await massageModel.updateMany({ ...filter, isActive: true }, data);
}

async function delMany(filter) {
  return await massageModel.updateMany(filter, { isActive: false });
}



module.exports = {
  create,
  read,
  readOne,
  update,
  updateMany,
  delOne,
  delMany,
  readTrash,
  searchEmail,
  readMassage,
}
