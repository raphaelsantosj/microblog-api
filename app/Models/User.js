'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
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
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  thinkings () {
    return this.hasMany('App/Models/Thinking')
  }

  followers () {
    return this.belongsToMany(
        'App/Models/User',
        'user_id',
        'follower_id'
    ).pivotTable('followers')
  }

  following () {
    return this.belongsToMany(
        'App/Models/User',
        'follower_id',
        'user_id'
    ).pivotTable('followers')
  }

  replies () {
    return this.hasMany('App/Models/Reply')
  }

  favorites () {
      return this.hasMany('App/Models/Favorite')
  }

}

module.exports = User
