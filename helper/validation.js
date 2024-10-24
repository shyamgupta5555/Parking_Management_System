const Joi = require("joi");

const registerUserSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  vehicleType: Joi.string()
    .valid("car", "motorcycle", "cycle")
    .required()
    .messages({
      "any.only": "Role must be either car or motorcycle or cycle",
      "string.empty": "vehicleType is required",
    }),
  vehicleNumber: Joi.string().required().messages({
    "string.empty": "vehicleNumber is required",
  }),
});

const bookingValidationSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "User ID must be a string.",
    "string.empty": "User ID is required.",
    "any.required": "User ID is required.",
  }),
  slotId: Joi.string().required().messages({
    "string.base": "Slot ID must be a string.",
    "string.empty": "Slot ID is required.",
    "any.required": "Slot ID is required.",
  }),
  vehicleType: Joi.string()
    .valid("cycle", "motorcycle", "car")
    .required()
    .messages({
      "string.base": "Vehicle Type must be a string.",
      "any.only":
        "Vehicle Type must be one of 'cycle', 'motorcycle', or 'car'.",
      "any.required": "Vehicle Type is required.",
    }),
  startTime: Joi.date().required().messages({
    "date.base": "Start Time must be a valid date.",
    "any.required": "Start Time is required.",
  }),
  endTime: Joi.date().required().messages({
    "date.base": "End Time must be a valid date.",
    "any.required": "End Time is required.",
  }),
  paymentStatus: Joi.boolean().messages({
    "any.required": "paymentStatus is required.",
  }),
});

const pricingValidationSchema = Joi.object({
  vehicleType: Joi.string()
    .valid("cycle", "motorcycle", "car")
    .required()
    .messages({
      "any.required": "Vehicle type is required.",
      "string.base": "Vehicle type must be a string.",
      "any.only":
        "Vehicle type must be one of the following: cycle, motorcycle, or car.",
    }),
  dailyRate: Joi.number().positive().required().messages({
    "any.required": "Daily rate is required.",
    "number.base": "Daily rate must be a number.",
    "number.positive": "Daily rate must be a positive number.",
  }),
  weeklyRate: Joi.number().positive().required().messages({
    "any.required": "Weekly rate is required.",
    "number.base": "Weekly rate must be a number.",
    "number.positive": "Weekly rate must be a positive number.",
  }),
  monthlyRate: Joi.number().positive().required().messages({
    "any.required": "Monthly rate is required.",
    "number.base": "Monthly rate must be a number.",
    "number.positive": "Monthly rate must be a positive number.",
  }),
});
module.exports = {
  registerUserSchema,
  bookingValidationSchema,
  pricingValidationSchema,
};
