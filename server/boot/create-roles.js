'use strict'
const Promise = require('bluebird')

module.exports = (server, cb) => {
  const Role = server.models.Role

  return Promise.all([
    Role.findOne({ where: { name: 'super-admin' } }),
    Role.findOne({ where: { name: 'manager' } })
  ])
    .spread((admin, manager) => {
      if (!admin) {
        Role.create({ name: 'super-admin' }, (err, role) => {
          if (err) Promise.reject(err)
          console.log('Created role:', role)
        })
      }
      if (!manager) {
        Role.create({ name: 'manager' }, (err, role) => {
          if (err) Promise.reject(err)
          console.log('Created role:', role)
        })
      }
      return true
    })
    .asCallback(cb)
}
