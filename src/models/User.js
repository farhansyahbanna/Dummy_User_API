const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  saldo: {
    type: Number,
    required: [true, 'Saldo is required'],
    default: 0,
    min: [0, 'Saldo cannot be negative']
  },
  hutang: {
    type: Number,
    required: [true, 'Hutang is required'],
    default: 0,
    min: [0, 'Hutang cannot be negative']
  }
}, {
  timestamps: true,
  versionKey: false
});

// Virtual for net worth
userSchema.virtual('netWorth').get(function() {
  return this.saldo - this.hutang;
});

// Ensure virtuals are included in JSON output
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);