const {Posts, Comments} = require('../models/models.js')
const hbs = require('hbs')
const request = require('request');

hbs.registerHelper('each_upto', function(arr, max, options) {
    if(!arr || arr.length === 0)
        return options.inverse(this);
    let ret = "";
    for(let i = 0; i < arr.length; i++) {
        if(i < max) {
            ret = ret + "<div class=\"post\">"+ options.fn(arr[i]) + "</div>";
        }
        else {
            ret = ret + "<div class=\"post_hidden\">"+ options.fn(arr[i]) + "</div>";
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
            if (somePosts) {
                return res.render('posts', {
                    posts: somePosts,
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
    async incLikes(req, res) {
        try {
            let {num} = req.body;
            num = num ?? 10;
            const {id} = req.body;
            const likePost = await Posts.findOne({where: {id: id}});
            await likePost.increment("likes");
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