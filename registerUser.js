// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     const hashedPassword = await bcrypt.hash('defaultPassword', 10);
//     const user = new User({
//       email: 'employee@email.com',
//       password: hashedPassword,
//       role: 'Employee'
//     });
//     await user.save();
//     console.log('Employee registered!');
//     mongoose.disconnect();
//   })
//   .catch(err => {
//     console.error('Error:', err);
//   });

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');
// require('dotenv').config();

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     const hashedPassword = await bcrypt.hash('managerPassword', 10);
//     await User.create({
//       email: 'manager@example.com',
//       password: hashedPassword,
//       role: 'Manager'
//     });
//     console.log('Manager user created!');
//     mongoose.disconnect();
//   })
//   .catch(err => console.error(err));

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const hashedPassword = await bcrypt.hash('financePassword', 10);
    await User.create({
      email: 'finance@example.com',
      password: hashedPassword,
      role: 'Finance'
    });
    console.log('Finance user created!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
