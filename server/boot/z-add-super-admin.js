'use strict'
const Promise = require('bluebird')

module.exports = (server, cb) => {
  const AccessToken = server.models.AccessToken
  const User = server.models.Account
  const Role = server.models.Role
  const RoleMapping = server.models.RoleMapping
  const email = 'admin@nacoss.org'
  const password = 'astroworld'
  const firstName = 'Bukola'
  const lastName = 'Saraki'
  const accessToken = 'astroworld'

  return Promise.resolve()
    .then(() => User.findOne({ where: { email } }))
    .then(
      res => (res ? res : User.create({ email, password, firstName, lastName }))
    )
    .then(user => {
      // create the super admin role
      Role.findOne({ where: { name: 'super-admin' } }, (err, roleFound) => {
        if (err) {
          Promise.reject(err)
        }
        if (!roleFound) {
          Role.create({ name: 'super-admin' }, (err, roleCreated) => {
            if (err) Promise.reject(err)
            console.log('Created role:', roleCreated)
            // make SkillNav Support a super admin
            roleCreated.principals.create(
              {
                principalType: RoleMapping.USER,
                principalId: user.id
              },
              (err, principal) => {
                if (err) Promise.reject(err)
                console.log('Created Super Admin principal:', principal)
              }
            )
          })
        } else {
          // Check if SkillNav Support is already super admin
          user.roles((err, roles) => {
            if (err) Promise.reject(err)

            let userRoles = roles.map(r => r.name)
            if (!userRoles.includes('super-admin')) {
              // make SkillNav Support a super admin
              roleFound.principals.create(
                {
                  principalType: RoleMapping.USER,
                  principalId: user.id
                },
                (err, principal) => {
                  if (err) Promise.reject(err)
                  console.log('Created Super Admin principal:', principal)
                }
              )
            }
          })
        }
        return AccessToken.upsert({ id: accessToken, userId: user.id })
      })
    })
    .asCallback(cb)
}
