/**
 * CmsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  index: function (req, res) {
    return res.json({ message: 'Welcome to My CMS' });
  }
};


