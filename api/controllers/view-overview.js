module.exports = {

  friendlyName: 'View overview',


  description: 'Display "Overview" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/overview'
    }

  },

  fn: async function () {
    // Respond with view.
    return {
    };

  }


};
