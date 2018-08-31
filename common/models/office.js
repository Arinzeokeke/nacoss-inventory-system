'use strict'

module.exports = function(Office) {
  Office.observe('before save', function filterProperties(ctx, cb) {
    if (ctx.isNewInstance) {
      ctx.instance.createdAt = new Date()
    } else if (ctx.instance) {
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    cb()
  })
}
