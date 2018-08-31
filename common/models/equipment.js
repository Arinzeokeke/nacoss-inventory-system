'use strict'

module.exports = function(Equipment) {
  Equipment.observe('before save', function filterProperties(ctx, cb) {
    if (ctx.isNewInstance) {
      ctx.instance.createdAt = new Date()
    } else if (ctx.instance) {
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    cb()
  })

  Equipment.createEquipments = function(equipmentDetails, cb) {
    console.log(equipmentDetails)
    const equipPromises = []
    const equipTypeId = equipmentDetails.equipmentTypeId
    delete equipmentDetails.equipmentTypeId

    Object.keys(equipmentDetails).forEach(key => {
      const allowedKeys = ['excellent', 'good', 'bad']
      if (!allowedKeys.includes(key)) return

      for (let i = 0; i < equipmentDetails[key]; i++) {
        equipPromises.push(
          Equipment.create({
            status: key.toLowerCase(),
            equipmentTypeId: equipTypeId
          })
        )
      }
    })

    return equipPromises.then(r => r.toJSON()).catch(err => {
      throw err
      cb(null, err)
    })
  }

  Equipment.remoteMethod('createEquipments', {
    accepts: { arg: 'equipmentDetails', type: 'object' },
    http: { path: '/createEquipments', verb: 'post' },
    returns: { arg: 'equipments', type: 'object', root: true }
  })
}
