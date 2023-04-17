const Mongoose = require('mongoose');
const localDB = "mongodb://127.0.0.1:27017/roleAuth";

const connectDB = async () => {
    try {
        await Mongoose.connect(localDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;