const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }
  },
  { versionKey: false, timestamps: true }
);

const contactScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ukr"] },
    })
    .required(),
  phone: Joi.string().length(10).pattern(/^\d+$/).required(),
  favorite: Joi.boolean(),
  // joi.string().length(14).regex(/^\d+$/)
});

const favoriteScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, contactScheme, favoriteScheme };
