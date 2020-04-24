const mongoose = require('mongoose');

// Usage
// expire_from_now: Date.now() // after specific seconds it will vanish
// expire_date: new Date('2020-04-16T14:30:46.815+00:00') // got from mongodb timeStamp

const LogSchema = new mongoose.Schema({
  // const levels = {
  //     error: 0,
  //     warn: 1,
  //     info: 2,
  //     verbose: 3,
  //     debug: 4,
  //     silly: 5
  //   }; winston reference
  level: {
    type: String,
    required: true
  },
  IP: String,
  user: String,
  route: String,
  method: String,
  req: String,
  res: String,
  timeStamp: {
    type: Date,
    default: Date.now
  },
  expire_date: {
    type: Date,
    expires: 0
  },
  expire_from_now: {
    type: Date,
    expires: 2629800
  }
});

module.exports = Log = mongoose.model('log', LogSchema);
