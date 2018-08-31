'use strict'

module.exports = function(Account) {
  Account.observe('before save', function filterProperties(ctx, cb) {
    if (ctx.isNewInstance) {
      ctx.instance.createdAt = new Date()
    } else if (ctx.instance) {
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    cb()
  })

  Account.observe('after save', function(ctx, next) {
    //your logic goes here

    return ctx.Model.app.models.Role.findOne({ where: { name: 'manager' } })
      .then(role => {
        console.log(role)
        return role.principals.create({
          principalType: ctx.Model.app.models.RoleMapping.USER,
          principalId: ctx.instance.id
        })
      })
      .then(r => {
        console.log(r)
        // next()
      })
      .catch(err => {
        console.log(err)
        next()
      })
  })

  Account.getRoleMembers = function(name, cb) {
    let admins = []
    return Account.find({ include: ['roles', 'offices'] })
      .then(users => {
        users.forEach(user => {
          let userRoles = user.toJSON().roles.map(r => r.name)
          if (userRoles.includes(name)) {
            admins = [].concat(admins, user)
          }
        })
        return admins
        cb()
      })
      .catch(err => {
        throw err
        cb(null, err)
      })
  }

  Account.remoteMethod('getRoleMembers', {
    accepts: { arg: 'name', type: 'string' },
    http: { path: '/getRoleMembers', verb: 'get' },
    returns: { arg: 'members', type: 'array', root: true }
  })
}
