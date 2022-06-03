const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
    }
  ],
});

module.exports = mongoose.model('city', CitySchema);
