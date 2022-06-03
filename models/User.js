const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true,
    },
    position: [
        {
            x: {
                type: String,
                required: true
            },
            y: {
                type: String,
                required: true
            }
        }],
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    request: [
        {
            ownerName: {
                type: String,
                default: ''
            },
            walkerName: {
                type: String,
                default: ''
            },
            dogName: {
                type: String,
                default: ''
            },
            deadline: {
                from: {
                    type: Date,
                    default: "2000.01.01"
                },
                to: {
                    type: Date,
                    default: "2222.02.02"
                },
            },
            budget: {
                type: String,
                default: 0,
            },
            proposal: {
                type: String,
            },
            status: {
                type: String,
                default: "posted"
            },
        }
    ],
    pay: {
        type: String,
        default: ""
    },
    profile: {
        type: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            default: "",
        },
        birthday: {
            type: Date,
            default: "1990-01-01",
        },
        phone: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
        },
    },
    dogProfile: [{
        file: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: '',
        },
        birth: {
            type: Date,
            default: '',
        },
        description: {
            type: String,
            default: '',
        },
    }],
    messages: [{
        otherName: {
            type: String,
            default: ''
        },
        message: [{
            where: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        }],
    }]
});

module.exports = mongoose.model('user', UserSchema);
