const ParkingSlot = require("../models/parkingSlotModel");
const { sendResponse } = require("../helper/responseMessage");


exports.createParkingSlot = async (req, res) => {
  try {
    const { slotId, vehicleType, location } = req.body;

    const existingSlot = await ParkingSlot.findOne({ slotId });

    if (existingSlot) {
      return sendResponse(
        res,
        false,
        400,
        "Parking slot with this ID already exists."
      );
    }

    const obj = {
      slotId,
      vehicleType,
      location,
      isOccupied: false,
    };

    await ParkingSlot.create(obj);

    return sendResponse(res, true, 201, "Parking slot created successfully!");
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const { vehicleType } = req.query;
    let obj = { isOccupied: false };
    if (vehicleType) {
      obj.vehicleType = vehicleType;
    }
    const availableSlots = await ParkingSlot.find(obj);
    return sendResponse(res, true, 200, availableSlots);
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};

exports.removeParkingSlot = async (req, res) => {
  try {
    const { slotId } = req.params;

    const deletedSlot = await ParkingSlot.deleteOne({ slotId });
    if (deletedSlot.deletedCount === 0) {
      return sendResponse(res, false, 404, "Parking slot not found.");
    }

    return sendResponse(res, true, 200, "Parking slot removed successfully!");
  } catch (error) {
    return sendResponse(res, false, 500, error.message);
  }
};
