const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  online: { type: Boolean, default: false },
})

UserSchema.method('toJSON', function () {
  const { __v, password, _id, ...object } = this.toObject()
  object.uid = _id
  return object
})

module.exports = model('User', UserSchema)
