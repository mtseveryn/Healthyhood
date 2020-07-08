const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const errorMiddle = require('./middleware/errorHandling');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, './../client/index.html'), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });
console.log('g-MapsKey', process.env.GMAPSKEY);
// Startup files
require('./startup/logging')();
require('./startup/cors')(app);
require('./startup/routes')(app);

// Global express error handler
app.use(errorMiddle);

// Listens on port 3000 -> http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
