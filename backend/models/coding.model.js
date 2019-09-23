const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CodedFile = new Schema({
    filename: String,
    code: String
});

const CodingBlock = new Schema({
    username: String, 
    coding_files: [CodedFile]
});

const Coding = mongoose.model('Coding', CodingBlock);

module.exports = Coding;