const {Posts, Comments} = require('../models/models.js')
//const sqlz = require('../DB');
class postController {
    async addPost(req, res) {
        try {
            const {title, text, picture} = req.body;
            if (text && title) {
                let Post = await Posts.create({text: text, title: title, picture: picture});
                return res.redirect('/posts');
            }
        } catch(e) {
            console.log(e);
            res.status(500).json({message: "Registration error!"});
        }
    }
    async getPosts(req, res, n) {
        const somePosts = await  Posts.findAll({
            order: [ [ 'createdAt', 'DESC' ]]});
        if(somePosts) {
            return res.render('posts', {
                posts: somePosts,
                layout: false,
            });
        }
    }
}

module.exports = new postController;