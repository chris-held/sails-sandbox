/**
 * AuthController
 * @description :: Server-side logic for manage user's authorization
 */
var passport = require('passport');
var AuthService = require('../services/auth-service');
/**
 * Triggers when user authenticates via passport
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function _onPassportAuth(req, res, error, user, info) {
  if (error) {
    return res.serverError(error);
  } 
  if (!user) {
    return res.unauthorized(null, info && info.code, info && info.message);
  } 
 
  return res.ok({
    token: AuthService.createToken(user),
    user: user
  });
}
 
module.exports = {
  /**
   * Sign up in system
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signup: function (req, res) {
    User
      .create(_.omit(req.allParams(), 'id'))
      .meta({fetch: true})
      .then(function (user) {
        return {
          token: AuthService.createToken(user),
          user: user
        };
      })
      .then(function(ret) {
        return res.json(ret);
      })
      .catch(res.serverError);
  },
 
  /**
   * Sign in by local strategy in passport
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signin: function (req, res) {
    passport.authenticate('local', 
      _onPassportAuth.bind(this, req, res))(req, res);
  },
};