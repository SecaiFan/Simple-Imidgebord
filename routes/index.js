const Router = require('express');
const router = Router.Router();
const postRouter = require('./postRouter');
const postController = require("../controllers/postController");

router.get('/', (req,res) => {
    return res.render('index', {layout: false});
});
router.post('/posts/likes', postController.incLikes);
router.use('/posts', postRouter);

module.exports = router;