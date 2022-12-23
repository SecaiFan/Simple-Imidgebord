const {Posts, Comments} = require('../models/models.js')
const hbs = require('hbs')
const request = require('request');

hbs.registerHelper('each_upto', function(posts, max, options) {
    if(!posts || posts.length === 0)
        return options.inverse(this);
    let ret = "";
    for(let i = 0; i < posts.length; i++) {
        if(i < max) {
            ret = ret + "<div class=\"post\">"+ options.fn(posts[i]) + "</div>";
        }
        else {
            ret = ret + "<div class=\"post_hidden\">"+ options.fn(posts[i]) + "</div>";
        }
    }
    return ret;
});

hbs.registerHelper('com_upto', function(e, options) {
    const postId = options.hash['postId'];
    const comments = options.hash['com'];
    if(!comments || comments.length === 0)
        return options.inverse(this);
    let ret = "";

    for (let i = 0; i < comments.length; i++) {
        if(comments[i].dataValues.postId === postId) {
            ret = ret + "<div class='comment'>" + options.fn(comments[i]) + "</div>";
        }
    }

    return ret;
});

class postController {
    async addPost(req, res) {
        try {
            const {title, text, picture} = req.body;
            if (text && title) {
                let Post = await Posts.create({text: text, title: title, picture: picture});
                return res.redirect('/posts/all');
            }
        } catch(e) {
            console.log(e);
        }
    }
    async getPost(req, res) {
        try {
            let {num} = req.body;
            num = num ?? 10;
            const somePosts = await Posts.findAll({
                order: [['createdAt', 'DESC']]
            });
            const someComments = await Comments.findAll({
                order: [['createdAt', 'DESC']]
            });
            if (somePosts) {
                return res.render('posts', {
                    posts: somePosts,
                    comments: someComments,
                    n: num,
                    layout: false,
                });
            } else {
                return res.render('posts', {
                    layout: false
                });
            }
        } catch(e) {
            console.log(e);
        }
    }
    async addComment(req, res) {
        try {
            const {comText, postId} = req.body;
            if (comText) {
                let Comment = await Comments.create({text: comText, postId: postId});
                return res.redirect('/posts/all');
            }
        } catch(e) {
            console.log(e);
        }
    }

    async incLikes(req, res) {
        try {
            let {num} = req.body;
            num = num ?? 10;
            const {id} = req.body;
            let [postId, value] = id;
            postId = +postId;
            value = value.toLowerCase()+'s';
            const likePost = await Posts.findOne({where: {id: postId}});
            await likePost.increment(value);
            const somePosts = await Posts.findAll({
                order: [['createdAt', 'DESC']]
            });
            return res.redirect('/posts/all');
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new postController;