/**
 * StoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  add:function(req,res){
    res.view('pages/add-story');
  },
  create:function(req, res){
    let title = req.body.title;
    let text = req.body.text;
    const owner = req.me.id;
    let category = req.body.category;
    let published = req.body.published;

    Story.create({title:title, text:text, owner: owner, category: category, published: published}).exec((err) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.redirect('/your-stories');
    });
  },
  delete:function(req, res){
    Story.destroy({id:req.params.id}).exec((err) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.redirect('/your-stories');
    });

    return false;
  },
  edit: function(req, res){
    Story.findOne({id:req.params.id}).exec((err, story) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }

      res.view('pages/edit-story', {story:story});
    });
  },
  update: function(req, res){
    let title = req.body.title;
    let text = req.body.text;
    let category = req.body.category;
    let published = req.body.published;

    Story.updateOne({id: req.params.id},{title:title, text:text, category: category, published: published}).exec((err) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }

      res.redirect('/your-stories');
    });
  },
  publish: async function(req, res){
    let publish = await Story.findOne({id:req.params.id});
    Story.update({id:req.params.id},{published: !publish.published}).exec((err) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }

      res.redirect('/your-stories');
    });
  },
  overview: function(req,res){
    let search = req.param('search');
    let category = req.param('category');

    if (category && search) {
      Story.find({
        published: true,
        category: category,
        or: [
          {title: { contains: search }},
          {text: { contains: search }},
        ]
      }).exec((err, stories) => {
        if (err) {
          res.send(500, {error: 'DB Error'});
        }
        res.view('pages/overview', {stories: stories});
      });
    } else if(category && !search){
      Story.find({
        published: true,
        category: category,
      }).exec((err, stories) => {
        if (err) {
          res.send(500, {error: 'DB Error'});
        }
        res.view('pages/overview', {stories: stories});
      });
    } else if (!category && search) {
      Story.find({
        published: true,
        or: [
          {title: { contains: search }},
          {text: { contains: search }}
        ]
      }).exec((err, stories) => {
        if (err) {
          res.send(500, {error: 'DB Error'});
        }
        res.view('pages/overview', {stories: stories});
      });
    } else {
      Story.find({
        published: true,
      }).exec((err, stories) => {
        if (err) {
          res.send(500, {error: 'DB Error'});
        }
        res.view('pages/overview', {stories: stories});
      });
    }
  },
  personalOverview:function(req,res){
    Story.find({owner: req.me.id}).exec((err, stories) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.view('pages/your-stories', {stories:stories});
    });
  },
  adminOverview:function(req,res){
    Story.find({}).exec((err, stories) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.view('pages/admin-stories', {stories:stories});
    });
  },
  detail: async function(req, res){
    let story = await Story.findOne({id:req.params.id});
    let comments = await Comment.find({storyId: req.params.id});
    let user = await User.findOne({id: req.me.id});
    let enoughComments = false;

    let like = await Like.findOne({storyId: req.params.id, userId: req.me.id});
    let userLiked = true;

    if(like === undefined){
      userLiked = false;
    }

    if(user.numberOfComments >= 4){
      enoughComments = true;
    }

    res.view('pages/detail', {story: story, comments: comments, enoughComments: enoughComments, userLiked: userLiked});
  },
};

