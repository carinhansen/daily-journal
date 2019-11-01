module.exports = {


  friendlyName: 'View admin stories',


  description: 'Display "Admin stories" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/admin-stories'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
