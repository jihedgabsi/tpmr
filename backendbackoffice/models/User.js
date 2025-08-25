const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phoneNumber: {
    type: String,
    trim: true,
    sparse: true, // Allows multiple documents to have no value for this field
    index: true // Add index for faster queries
  },
  fcmToken: {
    type: String,
    trim: true,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String,
    default: null
  },
  verificationCodeExpires: {
    type: Date,
    default: null
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  roles: {
    type: [String],
    default: ['user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: null
  }
});

// Pre-save middleware to hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Update FCM token method
UserSchema.methods.updateFCMToken = function(fcmToken) {
  this.fcmToken = fcmToken;
  return this.save();
};

// Static method to find users by FCM token
UserSchema.statics.findByFCMToken = function(fcmToken) {
  return this.findOne({ fcmToken });
};

// Find users with valid FCM tokens (for sending notifications)
UserSchema.statics.findUsersWithFCMTokens = function() {
  return this.find({ 
    fcmToken: { $ne: null },
    isVerified: true
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;