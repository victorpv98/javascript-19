const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  contraseña: {
    type: String,
    required: false
  },
  favorites: {
    type: Object,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', userSchema);
