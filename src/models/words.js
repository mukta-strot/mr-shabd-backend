const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
  en: {
    type: String,
    required: true
  },
  mr: {
    type: String,
    required: true
  },
  tags: {
    type: String
  },
  en_ex: {
    type: String
  },
  mr_ex: {
    type: String
  }
})

module.exports = mongoose.model('mrshabd', wordSchema)
