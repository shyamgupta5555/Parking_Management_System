const mongoose =require("mongoose")


const parkingSlotSchema = new mongoose.Schema({
    slotId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    vehicleType: {
        type: String,
        required: true,
        enum: ['cycle', 'motorcycle', 'car']
    },
    location: {
        type: String,
        required: true
    },
    isOccupied: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);


