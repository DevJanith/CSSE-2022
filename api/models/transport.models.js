import mongoose from "mongoose";

const transportSchema = mongoose.Schema({
    busNO: {
        type: String,
        require: true,
    },
    dateTime: {
        type: Date,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    travelingRoot: {
        type: String,
        require: true
    },
    startLocation: {
        type: Number,
        require: true,
    },
    endLocation: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
    
});

const Transport = mongoose.model("Transports", transportSchema);

export default Transport;
