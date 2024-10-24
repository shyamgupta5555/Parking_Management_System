const Pricing = require("../models/pricingModel");
const { sendResponse } = require("../helper/responseMessage");

exports.createOrUpdatePricing = async (req, res) => {
  try {
    const { vehicleType, dailyRate, weeklyRate, monthlyRate } = req.body;
    const pricing = await Pricing.findOneAndUpdate(
      { vehicleType },
      { dailyRate, weeklyRate, monthlyRate },
      { upsert: true, new: true }
    );

    return sendResponse(
      res,
      true,
      200,
      "Pricing created/updated successfully!",
      pricing
    );
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};
