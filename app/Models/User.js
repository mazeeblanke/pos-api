'use strict'

const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/User.js` file to
     * check the hashPassword method
     */
    this.addHook("beforeCreate", "User.hashPassword");
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany("App/Models/Token");
  }

  static get hidden () {
    return ['password']
  }

  setStatus (status) {
    if (status) {
      return 'active'
    } 
    return status
  }

  branch() {
    return this.belongsTo("App/Models/Branch", "branch_id");
  }

  store() {
    return this.belongsTo("App/Models/Store", "store_id");
  }

}

module.exports = User
