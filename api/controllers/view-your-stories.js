module.exports = {


  friendlyName: 'View your stories',


  description: 'Display "Your stories" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/your-stories'
    }

  },


  fn: async function () {
    // Respond with view.
    return {
    };

  }


};
