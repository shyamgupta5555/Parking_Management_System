const { registerUserSchema,bookingValidationSchema } = require("../helper/validation");
const { sendResponse } = require("../helper/responseMessage");
const userModel = require("../models/userModel");

exports.registerUser = async (req, res, next) => {
  try {
    let { email, name ,vehicleType } = req.body;

    const validate = await registerUserSchema.validateAsync(req.body);

    const findEmail = await userModel.findOne({ email: email });
    if (findEmail)
      return sendResponse(
        res,
        true,
        400,
        "Email Already Exist Try Another mail"
      );

    let user = await userModel.create(req.body);

    return sendResponse(res, true, 201, "User registered successfully",user);
  } catch (error) {
    if (error.isJoi == true) {
      return sendResponse(
        res,
        false,
        400,
        error.details[0]?.message || "Invalid request data"
      );
    }
    return sendResponse(res, false, 500, error.message);
  }
};
