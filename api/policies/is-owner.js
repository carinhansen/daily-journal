/**
 * is-owner
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {
  let story = await Story.findOne({id: req.params.id});
  let userId = await story.owner;
  console.log(!req.me.isSuperAdmin)
  console.log(!userId === req.me.id)
  console.log(userId === req.me.id)

  if (userId === req.me.id) {
    return proceed();
  } else if(req.me.isSuperAdmin) {
    return proceed();
  } else {
    return res.forbidden();
  }
};
