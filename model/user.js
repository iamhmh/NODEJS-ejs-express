const Mongoose = require('mongoose');
const UserSchema = Mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: 6},
    role: {type: String, required: true, default: 'admin'}
});

const User = Mongoose.model('User', UserSchema);

module.exports = User;