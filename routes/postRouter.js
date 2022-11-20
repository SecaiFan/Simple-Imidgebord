const Router = require('express');
const router = Router.Router();
const postController = require('../controllers/postController.js');

router.get('/:num', postController.getPosts);
router.post('/:num', postController.addPost);
/*
router.get();
router.post();
router.get();
router.post();
router.get();
router.post();
router.get();
router.post();
router.get();
router.post();*/

module.exports = router;