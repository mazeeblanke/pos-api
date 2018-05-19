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

  branch() {
    return this.belongsTo("App/Models/Branch", "branch_id");
  }

  store() {
<<<<<<< HEAD
    return this.belongsTo("App/Models/Store", "branch_id");
=======
    return this.belongsTo("App/Models/Store", "store_id");
>>>>>>> 08e0b4053d0674ae3030ce42053a5d31e70c8660
  }

}

module.exports = User
