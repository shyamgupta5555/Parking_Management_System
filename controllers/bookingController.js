const Booking = require("../models/bookingModel");
const ParkingSlot = require("../models/parkingSlotModel");
const Pricing = require("../models/pricingModel");
const { sendResponse } = require("../helper/responseMessage");
const userModel = require("../models/userModel");
const {
  registerUserSchema,
  bookingValidationSchema,
} = require("../helper/validation");

exports.bookParkingSlot = async (req, res) => {
  try {
    const { userId, slotId, vehicleType, startTime, endTime, paymentStatus } =
      req.body;
    const validate = await bookingValidationSchema.validateAsync(req.body);
    const slot = await ParkingSlot.findOne({ _id: slotId, isOccupied: false });
    if (!slot) return sendResponse(res, false, 400, "Slot not available");

    if (slot.vehicleType != vehicleType)
      return sendResponse(res, false, 400, "Slot not available");

    const userFind = await userModel.findById(userId);
    if (!userFind) return sendResponse(res, true, 400, "User Not Found");

    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInHours = (end - start) / (1000 * 60 * 60);
    const durationInDays = Math.ceil(durationInHours / 24);

    const pricing = await Pricing.findOne({ vehicleType });
    if (!pricing) return sendResponse(res, false, 404, "Pricing not found");

    const months = Math.floor(durationInDays / 30);
    const remainingDaysAfterMonths = durationInDays % 30;
    const weeks = Math.floor(remainingDaysAfterMonths / 7);
    const remainingDays = remainingDaysAfterMonths % 7;

    let totalPrice = 0;

    if (months > 0) totalPrice += months * pricing.monthlyRate;
    if (weeks > 0) totalPrice += weeks * pricing.weeklyRate;
    if (remainingDays > 0) totalPrice += remainingDays * pricing.dailyRate;

    const booking = new Booking({
      userId,
      slotId,
      vehicleType,
      vehicleNumber: userFind.vehicleNumber,
      totalPrice,
      startTime: start,
      endTime: end,
      paymentStatus,
      status: "pending",
    });

    await booking.save();
    await ParkingSlot.updateOne({ _id: slotId }, { isOccupied: true });

    return sendResponse(res, true, 201, "Booking successful!", booking);
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

exports.cancelParkingSlot = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);
    if (!booking) return sendResponse(res, false, 404, "Booking not found");

    await ParkingSlot.updateOne({ _id: booking.slotId }, { isOccupied: false });
    await Booking.updateOne({ _id: bookingId }, { status: "completed" });

    return sendResponse(res, true, 200, "Booking Complete and slot freed!");
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.searchParkingByVehicle = async (req, res) => {
  try {
    const { vehicleNumber } = req.query;

    if (!vehicleNumber) {
      return sendResponse(res, false, 400, "Vehicle number is required");
    }

    const booking = await Booking.findOne({
      vehicleNumber: vehicleNumber,
      status: "pending",
    }).populate("slotId");

    if (!booking) {
      return sendResponse(
        res,
        false,
        404,
        "No active booking found for this vehicle"
      );
    }

    return sendResponse(res, true, 200, "Parking slot found", {
      slotId: booking.slotId._id,
      bookingId: booking._id,
      location: booking.slotId.location,
      vehicleType: booking.vehicleType,
      vehicleNumber: booking.vehicleNumber,
      startTime: booking.startTime,
      endTime: booking.endTime,
    });
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};
