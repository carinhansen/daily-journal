/**
 * LikeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  like: async function(req, res){
    let liked = await Like.findOne({storyId: req.params.id, userId: req.me.id});
    if(liked === undefined) {
      Like.create({storyId: req.params.id, userId: req.me.id}).exec((err) => {
        if(err){
          res.send(500, {error: 'DB Error'});
        }
      });
    }
    res.redirect('/detail/' + req.params.id);
  },
  unlike: async function(req, res){
    await Like.destroy({storyId: req.params.id, userId: req.me.id});
    res.redirect('/detail/' + req.params.id);
  }
};

