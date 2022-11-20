const Router = require('express');
const router = Router.Router();
const postRouter = require('./postRouter');

router.get('/', (req,res) => {
    return res.render('index', {layout: false});
});

router.use('/posts', postRouter);

module.exports = router;