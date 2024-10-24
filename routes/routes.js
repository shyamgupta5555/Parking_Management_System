const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/userController");
const {
  createParkingSlot,
  getAvailableSlots,
  removeParkingSlot,
} = require("../controllers/parkingSlotController");
const { createOrUpdatePricing } = require("../controllers/pricingController");
const {
  bookParkingSlot,
  cancelParkingSlot,
  searchParkingByVehicle,
} = require("../controllers/bookingController");

router.post("/register", registerUser);

// Admin Can Create Slots And Pricing Define

router.post("/parking-slots", createParkingSlot);
router.get("/parking-slots", getAvailableSlots);
router.delete("/parking-slots/:slotId", removeParkingSlot);
router.post("/pricing", createOrUpdatePricing);

// Booking System User

router.post("/bookings", bookParkingSlot);
router.put("/bookings/:bookingId", cancelParkingSlot);
router.get("/booking/searchByVehicle", searchParkingByVehicle);

module.exports = router;
