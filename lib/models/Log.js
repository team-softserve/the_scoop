const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  place_id: {
    type: String,
    require: [true, 'place_id required']
  },
  name: {
    type: String,
    required: [true, 'place name required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: [true, 'user required']
  },
  rating: {
    price: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },
    vibe: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    },
    flavor: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
    }
  },
  tags: {
    type: [String],
    required: true,
    validate: {
      validator: tags => tags.length > 0,
      message: () => 'at least one tag required'
    }
  },
  price: {
    type: Number,
    min: 0,
    max: 3,
    required: [true, 'price required 0-3']
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Log', logSchema);
