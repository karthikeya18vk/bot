const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const otpStore = {};
// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/auth/signup - create user and send OTP
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ msg: 'User already verified. Please login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!user) {
      user = new User({ name, email, password: hashedPassword });
    } else {
      user.name = name;
      user.password = hashedPassword;
    }

    await user.save();

    // ✅ Store OTP in memory
    otpStore[email] = {
      otp,
      expiry: Date.now() + 10 * 60 * 1000 // 10 minutes
    };

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Signup Verification',
      text: `Your OTP is ${otp}`
    });

    res.status(200).json({ msg: 'OTP sent to email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during signup' });
  }
});

// POST /api/auth/verify-otp - verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ msg: 'No OTP found for this email' });
  }

  if (record.otp !== otp || record.expiry < Date.now()) {
    return res.status(400).json({ msg: 'Invalid or expired OTP' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    user.isVerified = true;
    await user.save();

    // ✅ Clear OTP from memory after verification
    delete otpStore[email];

    res.status(200).json({ msg: 'OTP verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error during OTP verification' });
  }
});



/*router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});*/

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, name: user.name }); // Send name along with token
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
