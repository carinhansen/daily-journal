/**
 * StoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list:function(req,res){
    Story.find({owner: req.me.id}).exec((err, stories) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.view('pages/your-stories', {stories:stories});
    });
  },
  overview: function(req,res){
    let search = req.param('search');
    Story.find({
      published: true,
      or : [
        {title: search },
        {text: search},
        {category: search}
    ]}).exec((err, stories) => {
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.view('pages/overview', {stories:stories});
    });
  },
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
  }
};

