const router = require('express').Router();
const fetch = require('node-fetch');
const Word = require('../models/word');

router.route('/').get((_, res) => {
    res.render('wordListCard');
});

router.route('/').post(async (req, res) => {
    try {
        const data = await fetch(
            `https://wordsapiv1.p.rapidapi.com/words/${req.body.word}/${req.body.type}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': process.env.API_KEY,
                    'x-rapidapi-host': process.env.API_HOST,
                },
            }
        );
        // const words = await Word.find({ owner: req.session.user._id })
        //     .populate('owner')
        //     .exec();
        console.log(words);
        const jsonData = await data.json();
        if (jsonData.word) {
            // if (req.session.user._id) {
            //     const word = new Word({
            //         owner: req.session.user._id,
            //         word: jsonData.word,
            //     });
            //     await word.save();
            // }

            res.render('wordListCard', {
                [req.body.type]: jsonData[req.body.type],
            });
        } else {
            throw Error('word not found ');
        }
    } catch (error) {
        res.render('wordListCard', {
            [req.body.type]: [error.message],
        });
    }
});

module.exports = router;
