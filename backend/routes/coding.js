const router = require('express').Router();
const path = require('path');
const fs = require('fs');
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
