const Router = require('express');
const router = Router.Router();
const postController = require('../controllers/postController.js');

router.get('/', (req, res) => {
    return res.redirect('/posts/all')
});
router.get('/all', postController.getPost);
router.post('/all', postController.addPost);
/*router.post('posts/likes', postController.incLikes);*/

module.exports = router;