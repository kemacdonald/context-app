const router = require('express').Router();
let Coding = require('../models/coding.model');

// TODO: handle get request to pull coding information from db
// router.route('/').get((req, res) => {
//     Coding.find()
//         .then(coding => res.json(coding))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const filename = req.body.filename
    const code = req.body.code;

    console.log(req.body)
    const options = { upsert: true, new: true, setDefaultsOnInsert: true }
    Coding.findOneAndUpdate(
        { username: username },
        {$push: {
                coding_files: {
                    filename: filename,
                    code: code
                }
            } 
        },
        options
    )
        .then(() => res.json('Coding updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;