const { Schema, model } = require('mongoose');
const Joi = require('joi')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    }
  }, { versionKey: false, timestamps: true })

const User = model('user', userSchema)

const joiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
  avatarURL: Joi.string()
})

const joiLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required()
})

const joiEmailVerifySchema = Joi.object({
  email: Joi.string().email().required()
})

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required()
})

module.exports = {
  User,
  joiSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
  joiEmailVerifySchema
}