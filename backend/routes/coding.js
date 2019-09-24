const router = require('express').Router();
const fs = require('fs');
const path = require('path');
let Coding = require('../models/coding.model');

router.route('/create_coding_block').post((req, res) => {
    const username = req.body.username; 

    // add coding block from disk
    let rawdata = fs.readFileSync('data/coding_data.json');
    let coding_block = JSON.parse(rawdata);
    
    const newUser = new Coding({ 
        username: username,
        coding_files: coding_block
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get_audio_file').get((req, res) => {
    const filename = req.query.filename;
    // generate file path
    const filePath = path.resolve(__dirname, '../data/raw_audio/', filename);
    // get file size info
    const stat = fs.statSync(filePath);

    // set response header info
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });
    //create read stream
    const readStream = fs.createReadStream(filePath);
    // attach this stream with response stream
    readStream.pipe(res);
});

router.route('/add_coded_file').post((req, res) => {
    const username = req.body.username;
    const filename = req.body.filename
    const code = req.body.code;
    const options = { upsert: false, new: true, setDefaultsOnInsert: true }

    Coding.findOneAndUpdate(
        { 'username': username, 'coding_files.filename': filename},
        {"$set": {
                "coding_files.$.code": code
            }
        },
        options
    )
        .then(() => res.json('Coding document updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
