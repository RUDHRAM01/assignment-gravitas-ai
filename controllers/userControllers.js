const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sendVerifyMail } = require('../mail');
require('dotenv').config();



const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        
        if (user) {
            if (!user.isAuthenticated) return res.status(400).json({ msg: 'Please verify your email' });
            const passwordMatch = await bcrypt.compare(password, user?.password);
            if (!passwordMatch) return res.status(401).json({ msg: 'Invalid credentials' });
            
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_SECRET, { expiresIn: '30d' });
            res.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            });
        } else {
            res.status(401).json({ msg: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const RegisterUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    if(password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            if (user.isAuthenticated) return res.status(400).json({ msg: 'User already exists' });
            else {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.JWT_SECRET, { expiresIn: 3600 });
                const mail = sendVerifyMail(email, token);
                console.log(mail);
                if (!mail) {
                    return res.status(500).json({ msg: 'Internal server error' });
                }
                return res.status(201).json({ msg: 'verify your email!' });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword
        });
        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email
        },process.env.JWT_SECRET , { expiresIn: 3600 });
        const mail = sendVerifyMail(email, token);
        if (!mail) {
            return res.status(500).json({ msg: 'Internal server error' });
        } else {
            return res.status(201).json({ msg: 'verify your email!' });
        }
    }
    catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { LoginUser, RegisterUser };