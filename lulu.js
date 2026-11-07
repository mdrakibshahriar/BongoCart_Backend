const { ObjectId } = require("mongodb");

const tran_id = new ObjectId().toString();
console.log(tran_id);
