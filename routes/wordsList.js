const router = require('express').Router();
const Word = require('../models/word');

router.get('/', async (_, res) => {
    if (res.locals.user?._id) {
        let words = await Word.find({ owner: res.locals.user._id });

        words = words.map((el) => ({
            word: el.word,
            searchCount: el.searchCount,
            lastSearch: el.lastSearch,
            isFavourite: el.isFavourite,
        }));

        res.render('word/list', { words });
    } else {
        res.render('word/list', { words: [] });
    }
});

module.exports = router;
