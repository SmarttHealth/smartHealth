const db = require("../models/db")
const Compte = require("../models/compte.model")
const Patient = require("../models/patient.model")
const Medecin = require("../models/medecin.model")
const Assistant = require("../models/assistant.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

/*
exports.login = (req, res) => {
    
    const { email, password } = req.body;

    Compte.findOne({ email, password })
    .then(data => {
        if (data) {
            if(data.role === "patient"){
                Patient.findOne({'id_compte':data._id})
                .then(dataPat => {
                    if(dataPat){
                        res.send(data);
                    }else {
                        res.status(404).json({
                            error: 'no record found'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: 'internal server error'
                    });
                });
            }else if(data.role === "medecin"){
                Medecin.findOne({'id_compte':data._id})
                .then(dataPat => {
                    if(dataPat){
                        res.send(data);
                    }else {
                        res.status(404).json({
                            error: 'no record found'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: 'internal server error'
                    });
                });
            }else if(data.role === "assistant"){
                Assistant.findOne({'id_compte':data._id})
                .then(dataPat => {
                    if(dataPat){
                        res.send(data);
                    }else {
                        res.status(404).json({
                            error: 'no record found'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: 'internal server error'
                    });
                });
            }
        } else {
            res.status(404).json({
                error: 'no record found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: 'internal server error'
        });
    });
}
*/

exports.login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
    return res.status (400).json({ message: 'All fields are required' })
    }
    const foundUser = await Compte.findOne({ email }).exec()
    if (!foundUser || !foundUser.active) {
    return res.status(401).json({ message: 'Unauthorized', foundUser:foundUser, activate: foundUser.activate })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorized' })
    const accessToken = jwt.sign(
        {
        "UserInfo": {
        "email": foundUser.email,
        "role": foundUser.role
        }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
    )
    const refreshToken = jwt.sign(
        { "email": foundUser.email},
        process.env. REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    // Create secure cookie with refresh token |
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: false, //https
        sameSite: 'None', //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })
        // Send accessToken containing username and roles

        // Récupération des informations utilisateur spécifiques
        console.log(foundUser);
        let userData;
        if (foundUser.role === 'Patient') {
            userData = await Patient.findOne({ id_compte: foundUser._id }).exec();
        } else if (foundUser.role === 'Medecin') {
            userData = await Medecin.findOne({ id_compte: foundUser._id }).exec();
        } else if (foundUser.role === 'Assistant') {
            userData = await Assistant.findOne({ id_compte: foundUser._id }).exec();
        }

        if (!userData) {
            return res.status(404).json({ error: 'User details not found' });
        }

        // Ajout de l'accessToken aux informations utilisateur
        userData = {
            ...userData.toObject(),
            accessToken
        }

        res.json({ userData });
}

exports.refresh = (req, res)=>{
    const cookies = req.cookies
    console.log(cookies);

    if(!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized'})
    
    const refreshToken = cookies.jwt 

    jwt.verify(
        refreshToken,
        process.env. REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })
       
        const foundUser = await  Compte.findOne({ username: decoded.username })
       
        if (!foundUser) return res.status(401).json({ message: 'Unauthorized'})
       
        const accessToken = jwt.sign (
            {
            "UserInfo": {
            "username": foundUser.username,
            "role": foundUser.role
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
            )
            res.json({ accessToken })
        }
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public just to clear cookie if exists
exports.logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus (204) //No content
    res.clearCookie('jwt', { httpOnly: true, 
        sameSite: 'None', 
        secure: true })
    res.json({ message: 'Cookie cleared' })
}