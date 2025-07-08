const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    username: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true }
  },

  // customToJSON: function () {
  //   return _.omit(this, ['password']);
  // },

  // beforeCreate: async function (user, proceed) {
  //   const hash = await bcrypt.hash(user.password, 10);
  //   user.password = hash;
  //   return proceed();
  // }
};
