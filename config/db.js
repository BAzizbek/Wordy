const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(
            'mongodb://localhost:27017/CheckPoint',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                autoIndex: false,
            }
        );

        console.log(`MongoDB Host: ${db.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
