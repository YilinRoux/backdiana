const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3005',
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
