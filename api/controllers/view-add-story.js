module.exports = {


  friendlyName: 'View add story',


  description: 'Display "Add story" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/add-story'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
