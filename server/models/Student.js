const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const studentSchema = new mongoose.Schema({
    // ....
});

module.exports = mongoose.model('Student', studentSchema);