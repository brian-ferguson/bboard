const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const secret = process.env.jwtSecret;

const urlencodedParser = bodyParser.urlencoded({extended:false});

const User = require('../../models/User');

//@route POST api/auth
//@desc Auth user
//@access Public
router.post('/',urlencodedParser, [
    check('email')
        .not().isEmpty()
        .withMessage('Enter an email')
        .bail()
        .isEmail()
        .normalizeEmail()
        .withMessage('Email is not valid')
        .bail()
        .custom(value => {
            return User.findOne({email: value}).then(user =>{
                if(!user){
                    return Promise.reject('E-mail is not registered')
                }
                return true
            });
        }),
        
    check('password')
        .not().isEmpty()
        .withMessage('Enter a password')
],

(req, res) => {

    const {email, password} = req.body;
    const errors = validationResult(req);

    if(errors.isEmpty()){
        User.findOne({email})
            .then(user => {
             bcrypt.compare(password, user.password)
             .then(isMatch => {
                 if(!isMatch) return res.status(400).json([{msg: "Pasword Invalid"}]);
                 jwt.sign(
                     {id: user.id},
                     secret,
                     {expiresIn: 3600},
                     (err, token) => {
                         if(err) throw err;
                         res.json({
                             token,
                             id: user.id,
                             name: user.name,
                             role: user.role
                         });
                     }
                 )
             })               
            })
    }else{
        return res.status(400).json(errors.array());
    }
});

//@route GET api/auth/user
//@desc Get user data
//@access Private
router.get('/user', auth, (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;