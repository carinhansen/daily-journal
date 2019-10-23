/**
 * StoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list:function(req,res){
    Story.find({}).exec(function(err, stories){
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.view('pages/your-stories', {stories:stories});
    });
  },
  add:function(req,res){
    res.view('pages/add-story');
  },
  create:function(req, res){
    let title = req.body.title;
    let text = req.body.text;
    const owner = req.me.id;

    Story.create({title:title, text:text, owner: owner}).exec(function(err){
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.redirect('/your-stories');
    });
  },
  delete:function(req, res){
    Story.destroy({id:req.params.id}).exec(function(err){
      if(err){
        res.send(500, {error: 'DB Error'});
      }
      res.redirect('/your-stories');
    });

    return false;
  },
  edit: function(req, res){
    Story.findOne({id:req.params.id}).exec(function(err, story){
      if(err){
        res.send(500, {error: 'DB Error'});
      }

      res.view('pages/edit-story', {story:story});
    });
  },
  update: function(req, res){
    let title = req.body.title;
    let text = req.body.text;

    Story.updateOne({id: req.params.id},{title:title, text:text}).exec(function(err){
      if(err){
        res.send(500, {error: 'DB Error'});
      }

      res.redirect('/your-stories');
    });
  }
};

