const mongoose = require('mongoose')
const isUrl = require('validator/lib/isURL')

const urlSchema = new mongoose.Schema({
  destinationUrl: {
    type: mongoose.SchemaTypes.String,
    required: true,
    validate: value => {
      return isUrl(value, { message: 'Must be a Valid URL', require_protocol: true })
    }
  },
  shortUrl: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
    default: () => {
      const generatedUrl = Math.random().toString(36).substr(2, 8)
      return generatedUrl
    }
  },
  creatorIP: {
    type: mongoose.SchemaTypes.String,
    required: true
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Url', urlSchema)