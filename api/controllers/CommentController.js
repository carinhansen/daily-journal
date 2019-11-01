/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  comment: async function(req, res){
    await Comment.create({comment: req.body.comment, owner: req.me.id, storyId: req.params.id, userId: req.me.id});

    let user = await User.findOne({id: req.me.id});
    let count = user.numberOfComments + 1;
    await User.update({id: req.me.id}, {numberOfComments: count});

    res.redirect('/detail/' + req.params.id);
  }
};

