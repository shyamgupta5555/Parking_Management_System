const mongoose =require("mongoose")
const pricingSchema = new mongoose.Schema({
    vehicleType: {
        type: String,
        required: true,
        enum: ['cycle', 'motorcycle', 'car'],
        unique: true
    },
    dailyRate: {
        type: Number,
        required: true
    },
    weeklyRate: {
        type: Number,
        required: true
    },
    monthlyRate: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Pricing', pricingSchema);
