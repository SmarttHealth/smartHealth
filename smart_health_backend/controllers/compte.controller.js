const db = require("../models/db")
const Compte = require("../models/compte.model")
const Patient = require("../models/patient.model")
const Medecin = require("../models/medecin.model")
const Assistant = require("../models/assistant.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

exports.login = async (req, res) => {
    console.log("data from front: ",req)
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
        { expiresIn: '1d' }
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
            accessToken,
            role:foundUser.role
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
exports.activateAccount = async (req, res) => {
    const { accountId } = req.body;
  
    try {
      // Recherche du compte par son ID
      const foundAccount = await Compte.findById(accountId);
  
      // Vérifie si le compte existe
      if (!foundAccount) {
        return res.status(404).json({ message: "Account not found" });
      }
  
      // Met à jour l'attribut 'active' à true
      foundAccount.active = true;
  
      // Sauvegarde les modifications dans la base de données
      await foundAccount.save();
  
      // Réponse réussie
      res.json({ message: "Account activated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };