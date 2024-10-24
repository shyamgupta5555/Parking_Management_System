const cron = require("node-cron");
const Booking = require("../models/bookingModel");
const moment = require("moment");
const { sendEmail } = require("../cron/mailSender");

cron.schedule("0 * * * *", async () => {
  try {
    console.log("Running payment reminder job...");

    const upcomingDueBookings = await Booking.find({
      paymentStatus: false,
      endTime: { $lte: moment().add(1, "days").toDate() },
    }).populate("userId", "email");

    for (const booking of upcomingDueBookings) {
      await sendEmail(
        booking.userId.email,
        `Reminder Your parking slot payment is due by ${booking.endTime}`
      );
    }
  } catch (error) {
    console.error("Error in payment reminder job:", error);
  }
});

