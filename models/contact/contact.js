const { Schema, model } = require('mongoose');
const Joi = require('joi')

const phoneRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: phoneRegexp
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).trim().required(),
  favorite: Joi.bool()
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required()
});

module.exports = {Contact, joiSchema, favoriteJoiSchema};