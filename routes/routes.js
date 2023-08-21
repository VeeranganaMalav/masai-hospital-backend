const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createAppointment, getAppointments, register, login } = require('../controller/appointmentController');

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/appointments", authMiddleware, createAppointment);
router.get("/appointments", getAppointments);

module.exports = router;