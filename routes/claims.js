const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Claim = require('../models/Claim');
const authorizeRoles = require('../middleware/auth');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/invoices/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// File filter to accept only PDFs and images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only PDF and images are allowed.'));
//   }
// };

const fileFilter = (req, file, cb) => {
  cb(null, true);  // Allow all file types temporarily for testing
};


const upload = multer({ storage, fileFilter });

router.post(
  '/submit',
  authorizeRoles(['Employee']),
  (req, res) => {
    upload.single('invoice')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: err.message });
      }

      try {
        console.log('Received body:', req.body);
        console.log('Received file:', req.file);
        
        const { title, category, amount, vendor, reason } = req.body;
        const employeeId = req.user.id;
        const invoiceUrl = req.file?.path;

        if (!title || !category || !amount || !vendor || !reason || !invoiceUrl) {
          console.error('Missing required field');
          return res.status(400).json({ message: 'All fields are required.' });
        }

        const claim = new Claim({
          employee: employeeId,
          title,
          category,
          amount,
          invoiceUrl,
          vendor,
          reason
        });

        await claim.save();
        console.log('Claim saved:', claim);

        res.status(201).json({ message: 'Claim submitted successfully', claim });
      } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    
    });
  }


);


module.exports = router;
