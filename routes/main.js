const router = require('express').Router();
const fetch = require('node-fetch');
const Word = require('../models/word');

router.route('/').get((_, res) => {
    res.render('search');
});

router.route('/').post(async (req, res) => {
    try {
        const fetchRes = await fetch(
            `https://wordsapiv1.p.rapidapi.com/words/${req.body.word}/${req.body.type}`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': process.env.API_KEY,
                    'x-rapidapi-host': process.env.API_HOST,
                },
            }
        );
        const fetchResJson = await fetchRes.json();

        if (fetchResJson.word) {
            if (res.locals.user) {
                const word = await Word.findOne({
                    word: fetchResJson.word,
                }).exec();

                if (word) {
                    word.searchCount += 1;
                    word.lastSearch = Date.now();
                    await word.save();
                } else {
                    const word = new Word({
                        owner: res.locals.user._id,
                        word: fetchResJson.word,
                    });

                    await word.save();
                }
            }

            res.render('word/card', {
                type: req.body.type,
                defs: fetchResJson[req.body.type],
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404);
        res.render('word/card', {
            [req.body.type]: [error.message],
        });
    }
});

module.exports = router;
