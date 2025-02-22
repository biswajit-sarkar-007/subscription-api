import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'subscription name is required'],
        trim:true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['USD','EUR','GBP'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily','weekly','monthly','yearly'],
    },
    catagory: {
        type: String,
        enum: ['sports','news', 'entertainment', 'lifestyle'],
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancelled','expired'],
        defaultl: 'active',

    },
    startDate: {
        type: Date,
        required:true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'start data must be in the past',
        }
    },
    renewalDate: {
        type: Date,
    
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },  
            message: 'Renewal date must be after the start date',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

}, {timestamps: true});


// auto calculated renwel date if missing

subscriptionSchema.pre(  'save', function(next) {
    if(!this.renewalDate){
        const renwelPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renwelPeriods[this.frequency]);
    }



    // auto-update the status if renewal date has passed
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = new mongoose.model('Subscription', subscriptionSchema);
export default Subscription;