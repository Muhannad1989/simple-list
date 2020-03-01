const mongoose = require('mongoose');

const { String } = mongoose.Schema.Types;

const StudentSchema = new mongoose.Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Student || mongoose.model('Student', StudentSchema);
