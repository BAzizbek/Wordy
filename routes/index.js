const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req,res)=> {
  if(req.body.definitions) {
    const {definitions} = req.body
    console.log(req.body)
    // console.log(definitions[0]['definition'])
    res.render('index', {layout:false,definitions})

  } else if(req.body.synonyms) {
    const {synonyms} = req.body
    res.render('index', {layout:false, synonyms})

  } else if(req.body.examples) {
    const {examples} = req.body
    res.render('index', {layout:false, examples})
  }
})

module.exports = router
