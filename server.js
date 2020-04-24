const express = require('express');
const app = express();
const connectDB = require('./db');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');


if (process.env.NODE_ENV === 'development') {
  // Add headers
  app.use(function (req, res, next) {
    // Website you wish to allow to connect
    //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });
}

// Init Middleware
app.use(express.json());

// Connect Database
connectDB();

// Limiting request rate from each IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from your IP, Please try again later'
});
app.use('/api', limiter);

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

const Log = require('./models/Log');

// // intercepting request, response before sending to the client
app.use((req, res, next) => {
  let oldSchool = res.send;
  let ip = req.headers['x-forwarded-for'];
  let user;

  console.log(req.originalUrl);
  // This will run right before sending response so manupulate as needed like sensitive data field
  res.send = async function (data) {
    req.body.password = undefined;
    if (
      req.originalUrl !== '/api/v1/auth' &&
      req.originalUrl !== '/api/v1/admin/getalllogs'
    ) {
      if (req.user) {
        user = req.user.id;
      } else {
        user = '';
      }
      log = new Log({
        level: 'reqResInfo',
        IP: ip,
        user,
        method: req.method,
        route: req.originalUrl,
        req: JSON.stringify(req.body),
        res: data
        // expire_from_now: Date.now() // Set time at schema/Index
        // expire_date: new Date('2020-04-16T14:30:46.815+00:00')
      });
      await log.save();
    }
    oldSchool.apply(res, arguments);
  };
  next();
});

// Define Routes
app.use('/api/v1/drive', require('./routes/driveRoutes'));

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
