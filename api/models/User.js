/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: http://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string'
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true
    },
    firstName: {
      type: 'string',
      defaultsTo: ''
    },
    lastName: {
      type: 'string',
      defaultsTo: ''
    },
    photo: {
      type: 'string',
      defaultsTo: '',
      isURL: true
    },
    socialProfiles: {
      type: 'json',
      defaultsTo: {}
    }
  },

  customToJSON: function () {
    delete this.password;
    delete this.socialProfiles;
    return this;
  },

  beforeUpdate: function (values, next) {
    AuthService.hashPassword(values);
    next();
  },
  beforeCreate: function (values, next) {
    AuthService.hashPassword(values);
    next();
  }
};

