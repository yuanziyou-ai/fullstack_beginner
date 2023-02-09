const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, '备注']
  },
  amount: {
    type: Number,
    required: [true, '正数和负数']
  },
  purpose: {
    type: String,
    required: [false]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);