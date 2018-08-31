'use strict'

module.exports = function(Equipmenttype) {
  Equipmenttype.observe('before save', function filterProperties(ctx, cb) {
    if (ctx.isNewInstance) {
      ctx.instance.createdAt = new Date()
    } else if (ctx.instance) {
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    cb()
  })

  // Get equipment type for all equipments of an office
  // Get equipment type for all equipments

  Equipmenttype.getOfficeEquipmentType = function(id, cb) {
    const equipMap = {}
    const typeMap = {}
    return Equipmenttype.find()
      .then(types => {
        types.forEach(t => {
          typeMap[t.id] = {
            detail: t,
            excellent: 0,
            good: 0,
            bad: 0,
            missing: 0,
            total: 0
          }
        })
        return types
      })
      .then(types => {
        return Equipmenttype.app.models.Equipment.find({
          where: { officeId: id }
        })
      })
      .then(equips => {
        equips.forEach(e => {
          const curr = typeMap[e.equipmentTypeId]
          switch (e.status) {
            case 'excellent':
              curr.excellent += 1
              break
            case 'good':
              curr.good += 1
              break
            case 'bad':
              curr.bad += 1
              break
            case 'missing':
              curr.missing += 1
              break
          }
          curr.total += 1
          typeMap[e.equipmentTypeId] = curr
        })
        return typeMap
        cb()
      })
      .catch(err => {
        throw err
        cb(null, err)
      })
  }

  Equipmenttype.remoteMethod('getOfficeEquipmentType', {
    accepts: { arg: 'id', type: 'string' },
    http: { path: '/getOfficeEquipmentTypes', verb: 'get' },
    returns: { arg: 'types', type: 'object', root: true }
  })

  Equipmenttype.getAllEquipmentType = function(id, cb) {
    const equipMap = {}
    const typeMap = {}
    return Equipmenttype.find()
      .then(types => {
        types.forEach(t => {
          typeMap[t.id] = {
            detail: t,
            excellent: 0,
            good: 0,
            bad: 0,
            missing: 0,
            total: 0
          }
        })
        return types
      })
      .then(types => {
        return Equipmenttype.app.models.Equipment.find({})
      })
      .then(equips => {
        equips.forEach(e => {
          const curr = typeMap[e.equipmentTypeId]
          switch (e.status) {
            case 'excellent':
              curr.excellent += 1
              break
            case 'good':
              curr.good += 1
              break
            case 'bad':
              curr.bad += 1
              break
            case 'missing':
              curr.missing += 1
              break
          }
          curr.total += 1
          typeMap[e.equipmentTypeId] = curr
        })
        return typeMap
        cb()
      })
      .catch(err => {
        throw err
        cb(null, err)
      })
  }

  Equipmenttype.remoteMethod('getAllEquipmentType', {
    http: { path: '/getAllEquipmentTypes', verb: 'get' },
    returns: { arg: 'types', type: 'object', root: true }
  })
}
