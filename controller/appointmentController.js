const User = require('../model/user');
const Appointment = require('../model/appointment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const tokenExpiration = process.env.TOKEN_EXPIRATION;

const createAppointment = async (req, res) => {
    const { name, image, specialization, experience, location, slots, fee } = req.body;

    try{
        let createdAppointment = await Appointment.create({
            name,
            image,
            specialization,
            experience,
            location,
            slots,
            fee
        });

        res.status(201).send(createdAppointment);
    }
    catch(err){
        res.status(500).send(err);
    }
}

const getAppointments = async (req, res) => {
    try{

        let q = {};


        let { specialization, order, name } = req.query;

        // if(specialization){
        //     q.specialization = { $in: ["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"] }
        // }

        
        // if(name){
        //     q.name = { $regex: `${name}`, $options: 'i' }
        // }
        
        let appointments = await Appointment.find(q);

        // if(order){
        //     appointments.sort({ "date" : (order == "asc") ? 1 : -1 })
        // }

        res.status(200).send(appointments);
    }
    catch(err){
        res.status(500).send(err);
    }
}


const register = async (req, res) => {
    try{
        const { email, password } = req.body;

        let hashedPassword = await bcrypt.hash(password, 10);

        let createdUser = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).send(createdUser);
    }
    catch(err){
        res.status(500).send(err);
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        let existingUser = await User.findOne({ email: email });

        if(!existingUser){
            res.status(400).send("User does not exist");
            return;
        }

        let passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch){
            res.status(400).send("Invalid credentials");
            return;
        }
        else{
            let accessToken = jwt.sign({ userId: existingUser._id }, jwtSecret, { expiresIn: tokenExpiration });

            res.status(200).send({token: accessToken, user: existingUser});
        }

        res.status(201).send(createdUser);
    }
    catch(err){
        res.status(500).send(err);
    }
}

module.exports = { createAppointment, getAppointments, register, login };