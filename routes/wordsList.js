const router = require('express').Router();
const Word = require('../models/word');

router.get('/', async (_, res) => {
    if (res.locals.user?._id) {
        let words = await Word.find({ owner: res.locals.user._id });
        words = words.map((el) => (el = { word: el.word }));
        console.log({ words });
    } else {
        res.render('wordsList', { words: [] });
    }
});

module.exports = router;
