'use strict'

module.exports = server => {
  const User = server.models.Account
  const Role = server.models.Role
  const RoleMapping = server.models.RoleMapping

  RoleMapping.belongsTo(User)
  User.hasMany(RoleMapping, { foreignKey: 'principalId' })
  Role.hasMany(User, { through: RoleMapping, foreignKey: 'roleId' })

  // Register the sme-admin role resolver
  Role.registerResolver('super-admin', (role, context, cb) => {
    function reject() {
      process.nextTick(() => {
        cb(null, false)
      })
    }

    // do not allow anonymous users
    let empId = context.accessToken.userId
    if (!empId) {
      return reject()
    }
  })

  // Register the sme-manager role resolver
  Role.registerResolver('manager', (role, context, cb) => {
    function reject() {
      process.nextTick(() => {
        cb(null, false)
      })
    }

    // do not allow anonymous users
    let empId = context.accessToken.userId
    if (!empId) {
      return reject()
    }

    function isEmployeeManagerForOffice(empId, officeId) {
      User.findById(empId, { include: 'roles' }, (err, employee) => {
        let empRoles
        let emp = employee.toJSON()
        if (err) {
          return reject(err)
        }
        if (
          String(employee.officeId) !== String(officeId) ||
          emp.roles.length < 1
        ) {
          return reject('Not a Manager at this Office.')
        }
        cb(null, true)
      })
    }

    if (context.modelName !== 'Office' && context.modelId === undefined) {
      return reject()
    }

    context.model.findById(context.modelId, (err, office) => {
      if (err || !office) {
        return reject(err)
      }
      isEmployeeManagerForOffice(empId, office.id)
    })
  })
}
