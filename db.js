const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/config.env' });

let db;

if (process.env.NODE_ENV === 'development') {
  db = process.env.DATABASE_LOCAL;
} else if (process.env.NODE_ENV === 'production') {
  db = process.env.DATABASE;
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`DB connected at => ${db}`);
    // logger.info(`DB connected at => ${db}`);
    // logger.error(`DB connected at => ${db}`);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
