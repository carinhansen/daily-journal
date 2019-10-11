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

};

